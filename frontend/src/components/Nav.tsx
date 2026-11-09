import { clsx } from "clsx";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { sections } from "@/data/sections";
import { ThemeToggle } from "./ThemeToggle";

const links = sections.filter((s) => s.id !== "top");

export function Nav({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <nav
      aria-label="Main"
      className={clsx(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color] duration-300",
        scrolled || open ? "border-b border-line bg-bg/85 backdrop-blur-md" : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1160px] items-center justify-between gap-4 px-5 md:px-10">
        <a href="#top" translate="no" className="font-mono text-sm text-fg" onClick={() => setOpen(false)}>
          <span className="text-accent-text">~/</span>aathishwar
        </a>

        <div className="flex items-center gap-2 md:gap-7">
          <ul className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={active === link.id ? "location" : undefined}
                  className={clsx(
                    "font-mono text-[13px] transition-colors",
                    active === link.id ? "text-accent-text" : "text-muted hover:text-fg",
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <button
            type="button"
            className="grid size-11 place-items-center rounded-lg border border-line bg-surface md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <ul id="mobile-menu" className="mx-auto flex max-w-[1160px] flex-col px-5 pb-6 md:hidden">
          {links.map((link, i) => (
            <li key={link.id} className="border-t border-line">
              <a
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 py-4 font-display text-2xl font-medium"
              >
                <span className="font-mono text-xs text-accent-text">0{i + 1}</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
