import { clsx } from "clsx";
import { type CSSProperties, useMemo, useState } from "react";
import { seeded } from "@/lib/reveal";

// 14 × 16 pixel padlock. s = shackle, b = body, . = empty (the keyhole is the gap in the body).
const MAP = [
  "....######....",
  "...########...",
  "..###....###..",
  "..##......##..",
  "..##......##..",
  "..##......##..",
  "..##......##..",
  "bbbbbbbbbbbbbb",
  "bbbbbbbbbbbbbb",
  "bbbbb....bbbbb",
  "bbbbb....bbbbb",
  "bbbbbb..bbbbbb",
  "bbbbbb..bbbbbb",
  "bbbbbb..bbbbbb",
  "bbbbbbbbbbbbbb",
  "bbbbbbbbbbbbbb",
];
const LIFT = 3;
// Shackle legs continue inside the body (hidden behind it) so they stay attached when it lifts.
const HIDDEN_LEGS = [2, 3, 10, 11].flatMap((x) => Array.from({ length: LIFT }, (_, i) => ({ x, y: 7 + i })));
// Rects overlap slightly so anti-aliasing never shows seams between pixels.
const PX = 1.06;
const SHACKLE_ROWS = 7;

type Px = { x: number; y: number; d: number };

// Real properties of this site (see public/_headers), redacted until the padlock is opened.
const SITE_FACTS: [string, string][] = [
  ["csp", "strict, no inline scripts"],
  ["hsts", "on"],
  ["trackers", "none"],
];

export function PixelLock() {
  const [unlocked, setUnlocked] = useState(false);

  const { shackle, body } = useMemo(() => {
    const shackle: Px[] = [];
    const body: Px[] = [];
    MAP.forEach((row, y) =>
      [...row].forEach((c, x) => {
        if (c === ".") return;
        const px = { x, y, d: Math.round(200 + seeded(y * 14 + x, 3) * 700) };
        (y < SHACKLE_ROWS && c === "#" ? shackle : body).push(px);
      }),
    );
    // Legs appear after the body has assembled, so they never show through it.
    for (const { x, y } of HIDDEN_LEGS) shackle.push({ x, y, d: 950 });
    return { shackle, body };
  }, []);

  return (
    <div className="flex w-[300px] flex-col overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3 font-mono text-xs text-muted">
        <span aria-hidden="true" className="size-2.5 rounded-full bg-line-strong" />
        <span aria-hidden="true" className="size-2.5 rounded-full bg-line-strong" />
        <span aria-hidden="true" className="size-2.5 rounded-full bg-line-strong" />
        <span className="ml-2">secure.sh</span>
      </div>

      <button
        type="button"
        onClick={() => setUnlocked((v) => !v)}
        aria-pressed={unlocked}
        aria-label="Unlock padlock"
        className="group grid place-items-center px-6 pt-8 pb-6"
      >
        <svg viewBox="0 -3 14 19" width="196" height="266" shapeRendering="crispEdges" aria-hidden="true">
          <g
            className={clsx(
              "transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
              unlocked ? "-translate-y-[3px]" : "group-hover:-translate-y-[0.5px]",
            )}
          >
            {shackle.map((p) => (
              <rect
                key={`s${p.x}-${p.y}`}
                x={p.x}
                y={p.y}
                width={PX}
                height={PX}
                className={clsx("lock-px transition-[fill] duration-300", unlocked ? "fill-accent-text" : "fill-fg")}
                style={{ "--d": `${p.d}ms` } as CSSProperties}
              />
            ))}
          </g>
          {body.map((p) => (
            <rect
              key={`b${p.x}-${p.y}`}
              x={p.x}
              y={p.y}
              width={PX}
              height={PX}
              className={clsx("lock-px transition-[fill] duration-300", unlocked ? "fill-fg" : "fill-accent-text")}
              style={{ "--d": `${p.d}ms` } as CSSProperties}
            />
          ))}
        </svg>
      </button>

      <div className="flex flex-col gap-0.5 border-t border-line px-4 py-3 font-mono text-xs" aria-live="polite">
        <p className="text-muted">
          <span className="text-accent-text">$</span> status --this-site
        </p>
        <p className={unlocked ? "text-accent-text" : "text-fg"}>{unlocked ? "› access granted" : "› locked · click to unlock"}</p>
        {SITE_FACTS.map(([key, value]) => (
          <p key={key} className="text-muted">
            › {key}:{" "}
            {unlocked ? (
              <span className="text-fg">{value}</span>
            ) : (
              <>
                <span aria-hidden="true" className="inline-block h-[0.85em] translate-y-[1px] bg-line-strong" style={{ width: `${value.length}ch` }} />
                <span className="sr-only">hidden until unlocked</span>
              </>
            )}
          </p>
        ))}
      </div>
    </div>
  );
}
