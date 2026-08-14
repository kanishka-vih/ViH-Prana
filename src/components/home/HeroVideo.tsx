import { useEffect, useRef, useState } from "react";
import { networkGraphDemo } from "../../assets/home";

const VIDEO_SRC = "/videos/hero-network-demo.mp4";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasPlayedRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [videoAvailable, setVideoAvailable] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.intersectionRatio >= 0.6 && !hasPlayedRef.current) {
            hasPlayedRef.current = true;
            video.currentTime = 0;
            video.play().catch(() => {});
            observer.unobserve(container);
          }
        }
      },
      { threshold: [0, 0.6, 1] },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const handleToggle = () => {
    const video = videoRef.current;
    if (!video) return;
    hasPlayedRef.current = true;

    if (hasEnded) {
      setHasEnded(false);
      video.currentTime = 0;
      video.play().catch(() => {});
      return;
    }

    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full rounded-[24px] overflow-hidden bg-black"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 size-full object-cover"
        src={VIDEO_SRC}
        poster={networkGraphDemo}
        muted
        playsInline
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          setIsPlaying(false);
          setHasEnded(true);
        }}
        onError={() => setVideoAvailable(false)}
        style={{ display: videoAvailable ? "block" : "none" }}
      />
      {!videoAvailable && (
        <img
          alt="Prana knowledge graph demo"
          className="absolute inset-0 object-cover size-full"
          src={networkGraphDemo}
        />
      )}

      {/* Feathered cover over the video's bottom-right corner — hides the
          generation watermark (a small sparkle mark baked into the source
          file) without showing a hard-edged rectangle. A flat bg-black box
          reads as a visibly mismatched patch against the video's actual
          near-black tone (which shifts with its content, e.g. the purple
          brain scene), so instead this fades from solid black at the exact
          corner out to fully transparent, blending into whatever the video
          is showing. Doubles as the play/pause/replay control. */}
      <div
        className="absolute bottom-0 right-0 flex items-end justify-end h-[180px] w-[260px]"
        style={{
          background: "radial-gradient(240px at 100% 100%, black 55%, transparent 100%)",
        }}
      >
        <button
          type="button"
          onClick={handleToggle}
          aria-label={hasEnded ? "Replay video" : isPlaying ? "Pause video" : "Play video"}
          className="flex items-center justify-center size-[68px] m-[16px] rounded-full bg-white/10 text-white cursor-pointer hover:bg-white/20 transition-colors"
        >
          {hasEnded ? (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"
                fill="currentColor"
              />
            </svg>
          ) : isPlaying ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="4" width="5" height="16" rx="1" fill="currentColor" />
              <rect x="14" y="4" width="5" height="16" rx="1" fill="currentColor" />
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 4l15 8-15 8V4z" fill="currentColor" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
