import { clsx } from "clsx";
import { type ElementType, useEffect, useRef } from "react";
import { observeReveal, prefersReducedMotion } from "@/lib/reveal";

const GLYPHS = "!<>-_/[]{}=+*^?#$%&@01ABCDEF";
const WINDOW = 7;

type DecryptTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  duration?: number;
};

/**
 * Heading text that "decrypts": a short window of random glyphs sweeps left to right
 * and resolves into the real text. The final text is always in the DOM for layout and
 * screen readers; only the visual layer animates.
 */
export function DecryptText({ text, as: Tag = "span", className, delay = 0, duration = 900 }: DecryptTextProps) {
  const rootRef = useRef<HTMLElement>(null);
  const doneRef = useRef<HTMLSpanElement>(null);
  const scrambleRef = useRef<HTMLSpanElement>(null);
  const restRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const done = doneRef.current;
    const scramble = scrambleRef.current;
    const rest = restRef.current;
    if (!root || !done || !scramble || !rest) return;

    const show = (resolved: number) => {
      const n = Math.max(0, Math.min(resolved, text.length));
      const windowEnd = Math.min(n + WINDOW, text.length);
      let noise = "";
      for (let i = n; i < windowEnd; i++) {
        const ch = text[i];
        noise += ch === " " ? " " : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      done.textContent = text.slice(0, n);
      scramble.textContent = noise;
      rest.textContent = text.slice(windowEnd);
    };

    if (prefersReducedMotion()) {
      show(text.length);
      return;
    }

    let raf = 0;
    let timer = 0;
    const run = () => {
      const start = performance.now();
      let last = 0;
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        // ~30 updates per second reads as "decrypting" and halves the work.
        if (now - last > 32 || p === 1) {
          last = now;
          show(Math.floor(p * (text.length + WINDOW)) - WINDOW + 1);
        }
        if (p < 1) raf = requestAnimationFrame(tick);
        else show(text.length);
      };
      raf = requestAnimationFrame(tick);
    };

    const stop = observeReveal(root, () => {
      timer = window.setTimeout(run, delay);
    });

    return () => {
      stop();
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [text, delay, duration]);

  return (
    <Tag ref={rootRef} className={clsx("relative", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        <span ref={doneRef} />
        <span ref={scrambleRef} className="text-accent-text" />
        <span ref={restRef} className="invisible">
          {text}
        </span>
      </span>
    </Tag>
  );
}
