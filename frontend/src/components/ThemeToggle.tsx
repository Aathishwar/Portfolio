import { Moon, Sun } from "lucide-react";
import { type MouseEvent, useState } from "react";
import { flushSync } from "react-dom";
import { prefersReducedMotion } from "@/lib/reveal";

const THEME_COLOR = { dark: "#0A0C0B", light: "#F5F3EE" };

function applyTheme(dark: boolean) {
  const root = document.documentElement;
  root.classList.toggle("dark", dark);
  root.style.colorScheme = dark ? "dark" : "light";
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? THEME_COLOR.dark : THEME_COLOR.light);
  try {
    localStorage.setItem("theme", dark ? "dark" : "light");
  } catch {
    /* private mode: the choice just isn't remembered */
  }
}

export function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));

  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    const next = !dark;
    const commit = () => {
      applyTheme(next);
      setDark(next);
    };

    if (!("startViewTransition" in document) || prefersReducedMotion()) {
      commit();
      return;
    }

    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    const transition = document.startViewTransition(() => flushSync(commit));
    transition.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 560, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-new(root)" },
        );
      })
      .catch(() => {
        /* transition skipped by the browser; the theme is already applied */
      });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      title={dark ? "Light theme" : "Dark theme"}
      className="grid size-11 place-items-center rounded-lg border border-line bg-surface text-fg transition-colors hover:border-line-strong"
    >
      {dark ? <Sun className="size-[18px]" strokeWidth={1.8} aria-hidden="true" /> : <Moon className="size-[18px]" strokeWidth={1.8} aria-hidden="true" />}
    </button>
  );
}
