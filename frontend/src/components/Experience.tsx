import { experience } from "@/data/profile";
import { Reveal } from "./Reveal";
import { SectionHeading, shell } from "./ui";

export function Experience() {
  return (
    <section id="experience" className="pt-20 md:pt-28">
      <div className={shell}>
        <SectionHeading
          index="01"
          title="Experience"
          kicker="Five roles since 2024, from building web pages to owning security for AI products."
        />

        <ol>
          {experience.map((role) => (
            <Reveal
              key={`${role.org}-${role.title}`}
              as="li"
              className="grid gap-4 border-b border-line py-9 md:grid-cols-[210px_minmax(0,1fr)] md:gap-10"
            >
              <div className="flex flex-row flex-wrap gap-x-3 gap-y-1 font-mono text-[13px] text-muted md:flex-col">
                <Reveal as="span" variant="redact" delay={120} className="self-start">
                  {role.period}
                </Reveal>
                {role.place && <span className="text-faint">{role.place}</span>}
              </div>

              <div className="flex flex-col gap-3.5">
                <h3 className="flex flex-wrap items-center gap-x-2 gap-y-1 text-lg font-semibold md:text-xl">
                  {role.title}
                  <span className="font-normal text-muted">· {role.org}</span>
                  {role.current && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-text/40 bg-accent-soft px-2.5 py-0.5 font-mono text-[11px] font-normal text-accent-text">
                      <span aria-hidden="true" className="size-1.5 rounded-full bg-accent-text" />
                      current
                    </span>
                  )}
                </h3>

                <ul className="flex flex-col gap-2 text-[15px] leading-relaxed text-muted">
                  {role.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span aria-hidden="true" className="font-mono text-accent-text">
                        ›
                      </span>
                      <span className="min-w-0">{point}</span>
                    </li>
                  ))}
                </ul>

                <ul aria-label="Skills used" className="flex flex-wrap gap-2 pt-1">
                  {role.skills.map((skill) => (
                    <li key={skill} className="rounded-md border border-line bg-surface px-2 py-1 font-mono text-[11.5px] text-muted">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
