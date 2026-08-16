import { useEffect } from "react";
import type { RefObject } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  a: number;
  s: number;
}

export const useStarfield = (canvasRef: RefObject<HTMLCanvasElement | null>): void => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars: Star[] = [];
    let raf: number;

    const init = (): void => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      stars = Array.from({ length: 110 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.1 + 0.2,
        a: Math.random(),
        s: Math.random() * 0.004 + 0.001,
      }));
    };

    const draw = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        star.a += star.s;
        const alpha = ((Math.sin(star.a) + 1) / 2) * 0.55;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };

    init();
    draw();
    window.addEventListener("resize", init);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", init);
    };
  }, [canvasRef]);
};
