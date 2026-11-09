import { clsx } from "clsx";
import { ArrowUpRight, Lock } from "lucide-react";
import { type PointerEvent, useState } from "react";
import { type Project, type ProjectFilter, archive, projectFilters, projects } from "@/data/profile";
import { Reveal } from "./Reveal";
import { SectionHeading, shell } from "./ui";

function trackPointer(e: PointerEvent<HTMLElement>) {
  if (e.pointerType !== "mouse") return;
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
}

function StatusPill({ status }: { status: Project["status"] }) {
  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-text/40 bg-accent-soft px-2.5 py-1 text-accent-text">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-accent-text" />
        live
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-muted">
      {status === "private" && <Lock className="size-3" aria-hidden="true" />}
      {status}
    </span>
  );
}

function ProjectCard({ project, number, delay }: { project: Project; number: number; delay: number }) {
  const linkClass = "inline-flex items-center gap-1 underline-offset-4 transition-colors hover:text-accent-text hover:underline";
  return (
    <Reveal as="li" variant="pixel" cols={12} rows={7} delay={delay} className="rounded-2xl">
      <article
        onPointerMove={trackPointer}
        className="spotlight flex h-full flex-col gap-4 rounded-2xl border border-line bg-surface p-7 transition-colors hover:border-line-strong"
      >
        <div className="flex items-center justify-between font-mono text-xs">
          <span className="text-faint">
            /{String(number).padStart(2, "0")} · {project.year}
          </span>
          <StatusPill status={project.status} />
        </div>
        <h3 className="font-display text-2xl font-semibold tracking-[-0.02em]">{project.title}</h3>
        <p className="text-[15px] leading-relaxed text-muted">{project.summary}</p>
        <ul aria-label="Built with" className="mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-1 font-mono text-xs text-faint">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        {(project.live || project.code) && (
          <div className="flex gap-5 border-t border-line pt-4 text-sm font-medium">
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className={linkClass} aria-label={`Open ${project.title} (opens in a new tab)`}>
                Open live <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            )}
            {project.code && (
              <a href={project.code} target="_blank" rel="noopener noreferrer" className={linkClass} aria-label={`${project.title} source code (opens in a new tab)`}>
                Source <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </article>
    </Reveal>
  );
}

export function Work() {
  const [filter, setFilter] = useState<ProjectFilter>("All");
  const shown = filter === "All" ? projects : projects.filter((p) => p.groups.includes(filter));

  return (
    <section id="work" className="pt-20 md:pt-28">
      <div className={shell}>
        <SectionHeading index="02" title="Selected work" kicker="Things I built on my own time, at hackathons and for my degree." />

        <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2 pt-8 pb-8">
          {projectFilters.map((f) => {
            const count = f === "All" ? projects.length : projects.filter((p) => p.groups.includes(f)).length;
            const on = filter === f;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(f)}
                className={clsx(
                  "inline-flex h-10 items-center gap-2 rounded-full border px-4 font-mono text-[13px] transition-colors",
                  on ? "border-accent bg-accent text-accent-fg" : "border-line text-muted hover:border-line-strong hover:text-fg",
                )}
              >
                {f}
                <span className={on ? "opacity-70" : "text-faint"}>{count}</span>
              </button>
            );
          })}
        </div>

        <ul className="grid gap-5 md:grid-cols-2">
          {shown.map((project, i) => (
            <ProjectCard key={project.title} project={project} number={projects.indexOf(project) + 1} delay={(i % 2) * 120} />
          ))}
        </ul>

        <div className="pt-20">
          <Reveal as="p" className="font-mono text-sm text-muted">
            <span className="text-accent-text">$</span> ls ./archive
          </Reveal>
          <ul className="mt-5 border-t border-line">
            {archive.map((item, i) => (
              <Reveal
                key={item.title}
                as="li"
                delay={i * 50}
                className="grid grid-cols-[52px_minmax(0,1fr)_auto] items-baseline gap-x-4 gap-y-1 border-b border-line py-4 md:grid-cols-[72px_minmax(0,1.2fr)_minmax(0,1fr)_auto]"
              >
                <span className="font-mono text-xs text-faint">{item.year}</span>
                <span className="font-medium">{item.title}</span>
                <span className="col-start-2 row-start-2 font-mono text-xs text-muted md:col-start-3 md:row-start-1">{item.stack}</span>
                {item.code ? (
                  <a
                    href={item.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.title} source code (opens in a new tab)`}
                    className="col-start-3 row-start-1 inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-accent-text md:col-start-4"
                  >
                    Source <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                ) : (
                  <span className="col-start-3 row-start-1 font-mono text-xs text-faint md:col-start-4">private</span>
                )}
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
