import { clsx } from "clsx";
import { type CSSProperties, type ElementType, type HTMLAttributes, type ReactNode, useEffect, useMemo, useRef } from "react";
import { observeReveal, seeded } from "@/lib/reveal";

type Variant = "up" | "redact" | "pixel";

type RevealProps = {
  as?: ElementType;
  variant?: Variant;
  delay?: number;
  /** Pixel grid size for the "pixel" variant. */
  cols?: number;
  rows?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLElement>, "children" | "className" | "style">;

const variantClass: Record<Variant, string> = {
  up: "reveal-up",
  redact: "reveal-redact",
  pixel: "reveal-pixel",
};

export function Reveal({
  as: Tag = "div",
  variant = "up",
  delay = 0,
  cols = 8,
  rows = 5,
  className,
  style,
  children,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return observeReveal(el);
  }, []);

  const cells = useMemo(() => {
    if (variant !== "pixel") return null;
    const salt = cols * 31 + rows;
    return Array.from({ length: cols * rows }, (_, i) => Math.round(delay + seeded(i, salt) * 520));
  }, [variant, cols, rows, delay]);

  return (
    <Tag
      ref={ref}
      className={clsx(variantClass[variant], className)}
      style={{ ...style, "--delay": `${delay}ms` } as CSSProperties}
      {...rest}
    >
      {variant === "redact" ? <span className="rr-content">{children}</span> : children}
      {cells && (
        <span
          className="pixel-grid"
          aria-hidden="true"
          style={{ "--cols": cols, "--rows": rows } as CSSProperties}
        >
          {cells.map((d, i) => (
            <i key={i} style={{ "--d": `${d}ms` } as CSSProperties} />
          ))}
        </span>
      )}
    </Tag>
  );
}
