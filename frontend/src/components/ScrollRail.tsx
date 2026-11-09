import { clsx } from "clsx";
import { useEffect, useRef } from "react";
import { sections } from "@/data/sections";

/** Fixed section index on the right edge with a scroll-progress line (wide screens only). */
export function ScrollRail({ active }: { active: string }) {
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (fillRef.current) fillRef.current.style.transform = `scaleY(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <nav aria-label="Sections" className="fixed top-1/2 right-5 z-30 hidden -translate-y-1/2 xl:block">
      <span aria-hidden="true" className="absolute top-0 right-[5px] h-full w-px bg-line">
        <span ref={fillRef} className="absolute inset-0 origin-top scale-y-0 bg-accent-text" />
      </span>
      <ul className="relative flex flex-col gap-5">
        {sections.map((s, i) => {
          const isActive = active === s.id;
          return (
            <li key={s.id}>
              <a href={`#${s.id}`} className="group flex items-center justify-end gap-3" aria-current={isActive ? "location" : undefined}>
                <span
                  className={clsx(
                    "rounded bg-bg px-1.5 py-0.5 font-mono text-[11px] transition-opacity",
                    isActive ? "text-accent-text opacity-100" : "text-muted opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
                  )}
                >
                  0{i}&nbsp;{s.label}
                </span>
                <span
                  aria-hidden="true"
                  className={clsx(
                    "block size-[11px] border transition-colors",
                    isActive ? "border-accent-text bg-accent" : "border-line-strong bg-bg group-hover:border-fg",
                  )}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
