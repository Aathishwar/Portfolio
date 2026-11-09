import { stack } from "@/data/profile";
import { Reveal } from "./Reveal";
import { SectionHeading, shell } from "./ui";

export function Stack() {
  return (
    <section id="stack" className="pt-20 md:pt-28">
      <div className={shell}>
        <SectionHeading index="03" title="Stack" kicker="What I reach for, grouped by the job it does." />
        <div className="grid gap-5 pt-10 md:grid-cols-2 lg:grid-cols-3">
          {stack.map((group, i) => (
            <Reveal key={group.key} variant="pixel" cols={9} rows={6} delay={(i % 3) * 110} className="rounded-2xl border border-line bg-surface p-7">
              <h3 className="font-mono text-xs text-accent-text">[ {group.label.toLowerCase()} ]</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="rounded-md border border-line bg-bg px-2.5 py-1.5 text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
