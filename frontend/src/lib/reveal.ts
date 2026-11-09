// One IntersectionObserver for the whole page. An element is revealed once, then forgotten.

type Callback = () => void;

const callbacks = new WeakMap<Element, Callback>();
let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        observer?.unobserve(el);
        el.dataset.revealed = "";
        callbacks.get(el)?.();
        callbacks.delete(el);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );
  return observer;
}

export function observeReveal(el: Element, onReveal?: Callback): () => void {
  if (onReveal) callbacks.set(el, onReveal);
  getObserver().observe(el);
  return () => {
    observer?.unobserve(el);
    callbacks.delete(el);
  };
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Stable pseudo-random number in [0, 1) for index i, so pixel delays don't reshuffle on re-render.
export function seeded(i: number, salt = 0): number {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}
