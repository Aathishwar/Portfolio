import { clsx } from "clsx";
import { ArrowRight, Download } from "lucide-react";
import { capabilities, profile } from "@/data/profile";
import { DecryptText } from "./DecryptText";
import { PixelLock } from "./PixelLock";
import { Reveal } from "./Reveal";
import { GitHubIcon, LinkedInIcon, shell } from "./ui";

const iconLink =
  "grid size-12 place-items-center rounded-[10px] border border-line-strong text-fg transition-colors hover:border-accent-text hover:text-accent-text";

export function Hero() {
  return (
    <section id="top" aria-label="Introduction" className="relative isolate overflow-hidden pt-16">
      <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-0 -z-10" />

      <div className={clsx(shell, "grid items-center gap-16 pt-16 pb-16 md:pt-24 md:pb-20 lg:grid-cols-[minmax(0,1fr)_auto]")}>
        <div className="flex flex-col gap-7">
          <Reveal as="p" className="font-mono text-sm text-muted">
            <span className="text-accent-text">$</span> whoami
          </Reveal>

          <h1 translate="no" className="font-display text-[clamp(52px,10vw,124px)] leading-[0.92] font-semibold tracking-[-0.045em] text-balance">
            <DecryptText text={profile.name} duration={1100} delay={150} />
          </h1>

          <Reveal as="p" delay={550} className="font-display text-[clamp(22px,3.2vw,38px)] font-medium tracking-[-0.02em]">
            {profile.role}
            <span className="caret" aria-hidden="true" />
          </Reveal>

          <Reveal as="p" variant="redact" delay={800} className="max-w-[620px] text-lg leading-relaxed text-pretty text-muted">
            {profile.intro} Based in {profile.location}.
          </Reveal>

          <div className="flex flex-wrap gap-3">
            <Reveal
              variant="pixel"
              delay={1050}
              cols={12}
              rows={2}
              className="inline-flex items-center gap-2 rounded-full border border-accent-text/40 bg-accent-soft px-3.5 py-2 font-mono text-[12.5px] text-accent-text"
            >
              <span aria-hidden="true" className="size-2 rounded-full bg-accent-text motion-safe:animate-pulse" />
              {profile.current}
            </Reveal>
            <Reveal
              variant="pixel"
              delay={1150}
              cols={12}
              rows={2}
              className="inline-flex items-center rounded-full border border-line px-3.5 py-2 font-mono text-[12.5px] text-muted"
            >
              {profile.education}
            </Reveal>
          </div>

          <Reveal delay={1250} className="flex flex-wrap gap-3 pt-1">
            <a
              href="#work"
              className="group inline-flex h-12 items-center gap-2 rounded-[10px] bg-accent px-5 text-[15px] font-semibold text-accent-fg transition-[transform,box-shadow] hover:shadow-[0_0_0_4px_var(--accent-soft)] active:scale-[0.97]"
            >
              See selected work
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <a
              href={profile.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-[10px] border border-line-strong px-5 text-[15px] font-medium transition-colors hover:border-fg"
            >
              <Download className="size-4" aria-hidden="true" />
              Download CV
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)" className={iconLink}>
              <LinkedInIcon className="size-[18px]" />
            </a>
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)" className={iconLink}>
              <GitHubIcon className="size-[18px]" />
            </a>
          </Reveal>
        </div>

        <Reveal delay={300} className="hidden lg:block">
          <PixelLock />
        </Reveal>
      </div>

      <div className={clsx(shell, "pb-8")}>
        <ul aria-label="What I work on" className="grid divide-y divide-line overflow-hidden rounded-2xl border border-line md:grid-cols-3 md:divide-x md:divide-y-0">
          {capabilities.map((c, i) => (
            <Reveal key={c.tag} as="li" variant="pixel" delay={i * 140} cols={10} rows={6} className="flex flex-col gap-2.5 bg-surface p-7">
              <span className="font-mono text-xs text-accent-text">[ {c.tag} ]</span>
              <h3 className="font-display text-xl font-semibold tracking-[-0.01em]">{c.title}</h3>
              <p className="text-[14.5px] leading-relaxed text-muted">{c.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
