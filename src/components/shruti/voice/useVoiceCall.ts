import { useCallback, useEffect, useRef, useState } from "react";
import { floatToPCM16, pcm16ToFloat, resample } from "./audioUtils";

// The rate we send mic audio at. Not confirmed by docs (there are none —
// see the empirical protocol probe), but 16kHz mono is the standard input
// rate for speech ASR pipelines; if it's wrong, the server's own
// `diagnostic` messages should flag it, which we surface in `warnings`.
const MIC_SEND_RATE = 16000;

const API_BASE = "https://api.dev.shruti.vihresearchlabs.ai";
// This is an `pk_...`-prefixed "publishable" key (mirrors Stripe's
// pk_/sk_ convention) — the assumption is it's meant to be embedded in a
// browser, unlike a secret key. Centralized here so it's a one-line swap
// if that assumption turns out wrong and this needs to move behind a
// server-side proxy instead.
const API_KEY = "pk_-u9o5URgW0mnGcJ6mN9LiK1XC0oWCC8HZhrLabmKmE4";

export type Turn = { from: "agent" | "user"; text: string; final: boolean };
export type CallState = "idle" | "connecting" | "active" | "ended" | "error";

export function useVoiceCall() {
  const [state, setState] = useState<CallState>("idle");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [agentSpeaking, setAgentSpeaking] = useState(false);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [muted, setMuted] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);
  const playbackCtxRef = useRef<AudioContext | null>(null);
  const nextPlayTimeRef = useRef(0);
  const ttsSampleRateRef = useRef(24000);

  const micCtxRef = useRef<AudioContext | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const micNodeRef = useRef<ScriptProcessorNode | null>(null);
  const mutedRef = useRef(muted);
  mutedRef.current = muted;

  const cleanupAudio = useCallback(() => {
    micNodeRef.current?.disconnect();
    micNodeRef.current = null;
    micStreamRef.current?.getTracks().forEach((t) => t.stop());
    micStreamRef.current = null;
    micCtxRef.current?.close().catch(() => {});
    micCtxRef.current = null;
    playbackCtxRef.current?.close().catch(() => {});
    playbackCtxRef.current = null;
  }, []);

  const end = useCallback(() => {
    wsRef.current?.close();
    wsRef.current = null;
    cleanupAudio();
    setState((s) => (s === "error" ? s : "ended"));
    setAgentSpeaking(false);
  }, [cleanupAudio]);

  useEffect(() => end, [end]); // stop everything if the component unmounts mid-call

  const playPCM16Chunk = useCallback((buf: ArrayBuffer) => {
    const ctx = playbackCtxRef.current;
    if (!ctx) return;
    const floatData = pcm16ToFloat(buf);
    const audioBuffer = ctx.createBuffer(1, floatData.length, ttsSampleRateRef.current);
    audioBuffer.copyToChannel(floatData as Float32Array<ArrayBuffer>, 0);
    const src = ctx.createBufferSource();
    src.buffer = audioBuffer;
    src.connect(ctx.destination);
    const startAt = Math.max(ctx.currentTime, nextPlayTimeRef.current);
    src.start(startAt);
    nextPlayTimeRef.current = startAt + audioBuffer.duration;
  }, []);

  const start = useCallback(
    async (agentId: string, templateParams?: Record<string, string>) => {
      setState("connecting");
      setTurns([]);
      setWarnings([]);
      try {
        const qs = new URLSearchParams(templateParams).toString();
        const res = await fetch(
          `${API_BASE}/agent/${encodeURIComponent(agentId)}/call${qs ? `?${qs}` : ""}`,
          { headers: { "X-API-Key": API_KEY } },
        );
        if (!res.ok) throw new Error(`Call setup failed (${res.status})`);
        const { url } = await res.json();

        // Mic first — if the user declines the permission prompt, there's
        // no point opening the call at all.
        const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        micStreamRef.current = micStream;

        const ws = new WebSocket(url);
        ws.binaryType = "arraybuffer";
        wsRef.current = ws;

        const playCtx = new AudioContext();
        playbackCtxRef.current = playCtx;
        nextPlayTimeRef.current = 0;

        ws.onopen = () => {
          // Stream mic audio continuously once the socket is open — the
          // server does its own turn/silence detection (confirmed: it said
          // goodbye on its own after we went quiet in testing), so the
          // client doesn't need to implement push-to-talk.
          const micCtx = new AudioContext();
          micCtxRef.current = micCtx;
          const source = micCtx.createMediaStreamSource(micStream);
          const processor = micCtx.createScriptProcessor(4096, 1, 1);
          micNodeRef.current = processor;
          processor.onaudioprocess = (e) => {
            if (mutedRef.current || ws.readyState !== WebSocket.OPEN) return;
            const input = e.inputBuffer.getChannelData(0);
            const down = resample(input, micCtx.sampleRate, MIC_SEND_RATE);
            ws.send(floatToPCM16(down));
          };
          source.connect(processor);
          // A ScriptProcessorNode only runs while connected into the graph
          // that reaches the destination — connect through a silent gain
          // so we don't actually play the mic back to the user.
          const silentGain = micCtx.createGain();
          silentGain.gain.value = 0;
          processor.connect(silentGain);
          silentGain.connect(micCtx.destination);
        };

        ws.onmessage = (e) => {
          if (typeof e.data === "string") {
            const msg = JSON.parse(e.data);
            if (msg.type === "ready") {
              setState("active");
            } else if (msg.type === "diagnostic") {
              setWarnings((w) => [...w, msg.text]);
            } else if (msg.type === "response_text") {
              setTurns((prev) => {
                const last = prev[prev.length - 1];
                if (last && last.from === "agent" && !last.final) {
                  return [...prev.slice(0, -1), { from: "agent", text: msg.text, final: msg.is_final }];
                }
                return [...prev, { from: "agent", text: msg.text, final: msg.is_final }];
              });
            } else if (msg.type === "tts_start") {
              ttsSampleRateRef.current = msg.sample_rate ?? 24000;
              nextPlayTimeRef.current = 0;
              setAgentSpeaking(true);
            } else if (msg.type === "tts_end") {
              setAgentSpeaking(false);
            } else if (msg.type === "transcript" || msg.type === "user_text") {
              // Best-effort: surface the caller's own recognized speech too,
              // if/when the server sends it under either message name.
              setTurns((prev) => [...prev, { from: "user", text: msg.text, final: true }]);
            }
          } else {
            playPCM16Chunk(e.data as ArrayBuffer);
          }
        };

        ws.onerror = () => setState("error");
        ws.onclose = () => {
          cleanupAudio();
          setState((s) => (s === "error" ? s : "ended"));
        };
      } catch (err) {
        cleanupAudio();
        setState("error");
        setWarnings((w) => [...w, err instanceof Error ? err.message : "Could not start the call."]);
      }
    },
    [cleanupAudio, playPCM16Chunk],
  );

  return { state, turns, agentSpeaking, warnings, muted, setMuted, start, end };
}
