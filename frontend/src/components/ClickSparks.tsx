import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/reveal";

type Spark = { x: number; y: number; vx: number; vy: number; size: number; born: number; color: string };

const LIFE = 520; // ms
const PER_CLICK = 11;
const MAX_SPARKS = 140;
const GRAVITY = 0.0016; // px / ms²

/**
 * Square "pixel" sparks on every click or tap. One canvas for the whole page; the
 * animation loop runs only while sparks are alive, so it costs nothing when idle.
 */
export function ClickSparks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || prefersReducedMotion()) return;

    let sparks: Spark[] = [];
    let raf = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const frame = (now: number) => {
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      sparks = sparks.filter((s) => now - s.born < LIFE);
      for (const s of sparks) {
        const t = now - s.born;
        const k = t / LIFE;
        const x = s.x + s.vx * t;
        const y = s.y + s.vy * t + 0.5 * GRAVITY * t * t;
        const size = s.size * (1 - k * 0.6);
        ctx.globalAlpha = 1 - k * k;
        ctx.fillStyle = s.color;
        // Snap to a 2px grid so the sparks read as pixels, not blurry dots.
        ctx.fillRect(Math.round(x / 2) * 2 - size / 2, Math.round(y / 2) * 2 - size / 2, size, size);
      }
      ctx.globalAlpha = 1;
      raf = sparks.length ? requestAnimationFrame(frame) : 0;
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      const styles = getComputedStyle(document.documentElement);
      const accent = styles.getPropertyValue("--accent").trim() || "#b6f23e";
      const fg = styles.getPropertyValue("--fg").trim() || "#e8ece9";
      const now = performance.now();
      for (let i = 0; i < PER_CLICK; i++) {
        const angle = (Math.PI * 2 * i) / PER_CLICK + (Math.random() - 0.5) * 0.5;
        const speed = 0.14 + Math.random() * 0.2;
        sparks.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.06,
          size: 3 + Math.random() * 4,
          born: now,
          color: i % 3 === 0 ? fg : accent,
        });
      }
      if (sparks.length > MAX_SPARKS) sparks = sparks.slice(-MAX_SPARKS);
      if (!raf) raf = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointerdown", onPointerDown);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] size-full" />;
}
