// Small, dependency-free helpers for converting between the browser's
// native Float32 audio and the raw PCM16 the voice API sends/expects —
// confirmed empirically by connecting to the real WebSocket and watching
// what it does (see the tts_start/binary-frame/tts_end sequence).

/** Float32 samples in [-1, 1] -> a PCM16LE ArrayBuffer, ready to send as-is. */
export function floatToPCM16(input: Float32Array): ArrayBuffer {
  const out = new ArrayBuffer(input.length * 2);
  const view = new DataView(out);
  for (let i = 0; i < input.length; i++) {
    const s = Math.max(-1, Math.min(1, input[i]));
    view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
  return out;
}

/** Raw PCM16LE bytes from the server -> Float32 samples the Web Audio API can play. */
export function pcm16ToFloat(buffer: ArrayBuffer): Float32Array {
  const view = new DataView(buffer);
  const out = new Float32Array(buffer.byteLength / 2);
  for (let i = 0; i < out.length; i++) {
    out[i] = view.getInt16(i * 2, true) / 0x8000;
  }
  return out;
}

/**
 * Naive linear-interpolation resample. The mic's AudioContext runs at
 * whatever rate the OS gives it (usually 44100/48000Hz); the API expects a
 * fixed rate for ASR. Good enough for a speech demo — not broadcast-grade,
 * but this is a voice call widget, not a mastering tool.
 */
export function resample(input: Float32Array, fromRate: number, toRate: number): Float32Array {
  if (fromRate === toRate) return input;
  const ratio = fromRate / toRate;
  const outLength = Math.round(input.length / ratio);
  const out = new Float32Array(outLength);
  for (let i = 0; i < outLength; i++) {
    const srcPos = i * ratio;
    const i0 = Math.floor(srcPos);
    const i1 = Math.min(i0 + 1, input.length - 1);
    const frac = srcPos - i0;
    out[i] = input[i0] * (1 - frac) + input[i1] * frac;
  }
  return out;
}
