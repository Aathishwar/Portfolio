import { certifications, educationEntry, highlights } from "@/data/profile";
import { Reveal } from "./Reveal";
import { SectionHeading, shell } from "./ui";

export function Credentials() {
  return (
    <section id="credentials" className="pt-20 md:pt-28">
      <div className={shell}>
        <SectionHeading index="04" title="Credentials" kicker="Certifications, degree and hackathons." />

        <div className="grid gap-12 pt-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
          <div>
            <h3 className="font-mono text-xs text-muted">certifications/</h3>
            <ul className="mt-4 border-t border-line">
              {certifications.map((cert, i) => (
                <Reveal
                  key={cert.title}
                  as="li"
                  delay={i * 40}
                  className="flex flex-col gap-1 border-b border-line py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <span className="font-medium">{cert.title}</span>
                  <span className="shrink-0 font-mono text-xs text-muted">
                    {cert.issuer} · {cert.date}
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-5">
            <Reveal variant="pixel" cols={10} rows={5} className="rounded-2xl border border-line bg-surface p-7">
              <h3 className="font-mono text-xs text-accent-text">[ education ]</h3>
              <p className="mt-4 font-display text-xl font-semibold tracking-[-0.01em]">{educationEntry.degree}</p>
              <p className="mt-1 text-[15px] text-muted">{educationEntry.school}</p>
              <p className="mt-4 font-mono text-xs text-muted">
                {educationEntry.period} · {educationEntry.grade}
              </p>
            </Reveal>

            <Reveal variant="pixel" cols={10} rows={4} delay={120} className="rounded-2xl border border-line bg-surface p-7">
              <h3 className="font-mono text-xs text-accent-text">[ hackathons ]</h3>
              <ul className="mt-4 flex flex-col gap-2.5 text-[15px] text-muted">
                {highlights.map((h) => (
                  <li key={h} className="flex gap-3">
                    <span aria-hidden="true" className="font-mono text-accent-text">
                      ›
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
