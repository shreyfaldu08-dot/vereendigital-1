import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import RevealLines from "@/components/motion/RevealLines";
import Magnetic from "@/components/motion/Magnetic";
import Faq from "@/components/sections/Faq";
import StickyLayers from "@/components/sections/StickyLayers";
import TypeWall from "@/components/motion/TypeWall";

export const metadata: Metadata = {
  title: "AI SEO — Vereen Digital",
  description:
    "Get cited by the machines your buyers already trust: technical foundations, entity and schema signals, source-worthy content and citation tracking.",
};

const problems = [
  "No structured identity — the model cannot tell you apart from a directory listing.",
  "Pages written as brochures, with no quotable, answer-first passage.",
  "Credentials, licences and regions buried in images or PDFs.",
  "No comparison content, so a competitor's page defines the category for you.",
];

export default function AiSeoPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-void pb-16 pt-32 md:pt-40">
        <div aria-hidden className="gridlines gridlines-fade absolute inset-0 opacity-60" />

        <div className="shell relative flex flex-col gap-8">
          <Reveal>
            <nav aria-label="Breadcrumb" className="tick">
              <Link href="/" className="hover:text-flare">
                Home
              </Link>{" "}
              <span aria-hidden className="text-flare">
                /
              </span>{" "}
              Services{" "}
              <span aria-hidden className="text-flare">
                /
              </span>{" "}
              <span className="text-paper">AI SEO</span>
            </nav>
          </Reveal>

          <RevealLines
            as="h1"
            className="max-w-[12ch] text-[clamp(48px,11vw,168px)] leading-[0.82] tracking-[-0.055em]"
            lines={[
              { text: "Get cited by" },
              { text: "the machines", accent: true },
              { text: "your buyers trust" },
            ]}
          />

          <div className="flex flex-wrap items-end justify-between gap-8 border-t border-hair pt-7">
            <Reveal className="max-w-[58ch] text-[15px] font-light leading-relaxed text-ash-light">
              AI SEO is not a rebrand of keyword stuffing. It is making your business legible to
              systems that summarise before they link: clean technical foundations, verifiable
              entity signals, and content written to be quoted rather than skimmed.
            </Reveal>
            <Reveal delay={0.1}>
              <Magnetic>
                <Link href="/contact" className="btn-flare">
                  Request a visibility check <span aria-hidden>↗</span>
                </Link>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative bg-void">
        <div aria-hidden className="gridlines absolute inset-0 opacity-40" />
        <div className="shell relative grid gap-12 py-24 md:py-32 lg:grid-cols-2 lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <span className="tick">The shift</span>
            </Reveal>
            <RevealLines
              className="mt-6 max-w-[14ch] text-[clamp(34px,5.6vw,80px)] leading-[0.86]"
              lines={[
                { text: "Ranking tenth" },
                { text: "is the same as" },
                { text: "not existing", accent: true },
              ]}
            />
            <p className="mt-6 max-w-[48ch] text-[15px] font-light leading-relaxed text-ash-light">
              An AI answer names three providers. Not ten blue links — three. Whether you are one
              of them depends on whether the model can identify who you are, confirm what you do,
              and find a passage worth quoting. Most sites fail at step one.
            </p>
          </div>

          <ul className="flex flex-col">
            {problems.map((problem, i) => (
              <Reveal key={problem} delay={i * 0.06}>
                <li className="flex gap-6 border-t border-hair py-7 text-[15px] font-light leading-relaxed text-ash-light last:border-b">
                  <span className="font-mono text-[11px] text-flare">0{i + 1}</span>
                  <span className="max-w-[44ch]">{problem}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <TypeWall word="Cited" rows={4} perRow={6} />

      <StickyLayers />

      <section className="relative border-t border-hair bg-void">
        <div className="shell relative flex flex-wrap items-center justify-between gap-12 py-20 md:py-28">
          <div className="flex max-w-[22ch] flex-col gap-5">
            <Reveal>
              <span className="tick">Proof</span>
            </Reveal>
            <RevealLines
              className="text-[clamp(28px,4vw,56px)] leading-[0.9]"
              lines={[
                { text: "Under five months" },
                { text: "to the first" },
                { text: "AI citation", accent: true },
              ]}
            />
            <Reveal delay={0.1}>
              <Link
                href="/work"
                className="group inline-flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.12em]"
              >
                Read the engagement
                <span
                  aria-hidden
                  className="transition-transform duration-500 ease-vereen group-hover:translate-x-2"
                >
                  →
                </span>
              </Link>
            </Reveal>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-px bg-hair">
            <Reveal className="flex flex-col gap-2 bg-void p-7">
              <span className="text-[clamp(40px,5vw,72px)] font-extrabold leading-none tracking-[-0.05em] text-flare">
                7+
              </span>
              <span className="tick leading-[1.9]">businesses now cited in AI search</span>
            </Reveal>
            <Reveal delay={0.08} className="flex flex-col gap-2 bg-void p-7">
              <span className="text-[clamp(40px,5vw,72px)] font-extrabold leading-none tracking-[-0.05em]">
                ~25%
              </span>
              <span className="tick leading-[1.9]">average enquiry increase</span>
            </Reveal>
          </div>
        </div>
      </section>

      <Faq />

      <section className="relative border-t border-hair bg-void">
        <div className="shell relative flex flex-wrap items-end justify-between gap-10 py-24 md:py-32">
          <div className="flex flex-col gap-5">
            <RevealLines
              className="max-w-[13ch] text-[clamp(38px,7vw,112px)] leading-[0.84]"
              lines={[
                { text: "See who AI" },
                { text: "names instead" },
                { text: "of you", accent: true },
              ]}
            />
            <p className="max-w-[48ch] text-[15px] font-light leading-relaxed text-ash-light">
              Five buyer queries, four platforms, one transcript. No pitch deck until you have
              read it.
            </p>
          </div>
          <Reveal delay={0.1}>
            <Magnetic strength={18}>
              <Link href="/contact" className="btn-flare px-9 py-5">
                Request the visibility check <span aria-hidden>↗</span>
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </>
  );
}
