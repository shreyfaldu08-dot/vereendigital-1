"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import clsx from "clsx";
import Reveal from "@/components/motion/Reveal";
import RevealLines from "@/components/motion/RevealLines";
import Magnetic from "@/components/motion/Magnetic";
import { caseStudies, type CaseStudy } from "@/lib/data";

const filters = [
  { id: "all", label: "All work" },
  { id: "ai-seo", label: "AI SEO" },
  { id: "seo", label: "Technical SEO" },
  { id: "ads", label: "Paid media" },
];

/**
 * The three cases are a series, so they stay a consistent set — only the
 * ground tone shifts, void → moss → void. Inverting one of them to the light
 * ground was tried and pulled back: among three parallel items a full flip
 * reads as a different design rather than the next chapter.
 */
const TONES = [
  {
    section: "bg-void",
    rule: "border-hair",
    body: "text-ash-light",
    dim: "text-ash",
    accent: "text-flare",
    panel: "border-hair bg-pitch",
  },
  {
    section: "bg-moss",
    rule: "border-hair",
    body: "text-ash-light",
    dim: "text-ash",
    accent: "text-flare",
    panel: "border-hair bg-void/40",
  },
] as const;

/**
 * One engagement, told once and properly: the figure and the byline pin to the
 * left while the narrative scrolls past on the right.
 */
function CaseChapter({ study, index }: { study: CaseStudy; index: number }) {
  const tone = TONES[index % TONES.length];

  return (
    <section id={`case-${study.id}`} className={clsx("relative scroll-mt-24", tone.section)}>
      <div className="shell grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <span className={clsx("font-mono text-[11px] tracking-[0.2em]", tone.accent)}>
            0{index + 1}
          </span>

          <RevealLines
            as="span"
            className={clsx(
              "mt-5 block text-[clamp(72px,10vw,150px)] font-extrabold leading-[0.8] tracking-[-0.06em]",
              tone.accent,
            )}
            lines={[{ text: study.metric }]}
          />

          <Reveal delay={0.2}>
            <p className={clsx("mt-4 text-[15px]", tone.body)}>{study.metricLabel}</p>

            <dl className={clsx("mt-8 flex flex-col gap-4 border-t pt-6", tone.rule)}>
              {[
                ["Client", study.client],
                ["Services", study.services],
                ["Market", study.market],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-wrap gap-x-6 gap-y-1">
                  <dt
                    className={clsx(
                      "w-20 font-mono text-[10px] uppercase tracking-[0.2em]",
                      tone.dim,
                    )}
                  >
                    {label}
                  </dt>
                  <dd className="flex-1 text-[14px] font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="flex flex-col gap-8 lg:col-span-7">
          <RevealLines
            as="h2"
            stagger={0.05}
            className="max-w-[20ch] text-[clamp(24px,3.2vw,46px)] leading-[1.02]"
            lines={[{ text: study.title }]}
          />

          <Reveal delay={0.08}>
            <p className={clsx("max-w-[62ch] text-[15px] font-light leading-relaxed", tone.body)}>
              {study.problem}
            </p>
          </Reveal>

          <div className="flex flex-col">
            <span className={clsx("font-mono text-[10px] uppercase tracking-[0.22em]", tone.dim)}>
              What we fixed
            </span>

            <ol className="mt-4 flex flex-col">
              {study.fixes.map((fix, i) => (
                <motion.li
                  key={fix}
                  className={clsx("flex gap-6 border-t py-4 last:border-b", tone.rule)}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
                >
                  <span className={clsx("pt-1 font-mono text-[11px]", tone.accent)}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="max-w-[56ch] text-[15px] font-light leading-relaxed">{fix}</span>
                </motion.li>
              ))}
            </ol>
          </div>

          <Reveal delay={0.1}>
            <p className={clsx("max-w-[62ch] border p-6 text-[15px] leading-relaxed", tone.panel)}>
              {study.result}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <Link
              href="/contact"
              className="group inline-flex w-fit items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.12em]"
            >
              Talk about a similar engagement
              <span
                aria-hidden
                className="transition-transform duration-500 ease-vereen group-hover:translate-x-2"
              >
                →
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function WorkIndex() {
  const [filter, setFilter] = useState("all");
  const visible =
    filter === "all" ? caseStudies : caseStudies.filter((study) => study.tags.includes(filter));

  return (
    <>
      <section className="relative overflow-hidden bg-void pb-14 pt-32 md:pt-40">
        <div aria-hidden className="gridlines gridlines-fade absolute inset-0 opacity-60" />
        <div className="shell relative flex flex-col gap-7">
          <Reveal>
            <span className="tick">Selected engagements · 2024—2026</span>
          </Reveal>
          <RevealLines
            as="h1"
            className="max-w-[11ch] text-[clamp(52px,12vw,186px)] leading-[0.8] tracking-[-0.055em]"
            lines={[{ text: "The work" }, { text: "speaks.", accent: true }]}
          />
          <Reveal delay={0.1}>
            <p className="max-w-[58ch] text-[15px] font-light leading-relaxed text-ash-light">
              Different businesses, different starting points, one goal: get growth moving and
              keep it moving. Every figure below comes with the context that produced it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* The index: the whole roster scannable in one screen, every row a jump
          link into its chapter. The filter now actually filters something. */}
      <section className="relative bg-void pb-20">
        <div className="shell relative flex flex-col gap-8">
          <div
            className="flex flex-wrap gap-2.5 border-t border-hair pt-7"
            role="group"
            aria-label="Filter engagements by service"
          >
            <LayoutGroup id="work-filters">
              {filters.map((item) => {
                const on = item.id === filter;
                const count =
                  item.id === "all"
                    ? caseStudies.length
                    : caseStudies.filter((study) => study.tags.includes(item.id)).length;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setFilter(item.id)}
                    className={clsx(
                      "relative min-h-[44px] border px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors duration-300",
                      on
                        ? "border-flare text-void"
                        : "border-hair text-ash hover:border-paper hover:text-paper",
                    )}
                  >
                    {on && (
                      <motion.span
                        layoutId="work-pill"
                        className="absolute inset-0 bg-flare"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">
                      {item.label} <span className="opacity-60">{count}</span>
                    </span>
                  </button>
                );
              })}
            </LayoutGroup>
          </div>

          <ul className="flex flex-col">
            <AnimatePresence mode="popLayout">
              {visible.map((study, i) => (
                <motion.li
                  key={study.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, delay: i * 0.05, ease: [0.2, 0.7, 0.2, 1] }}
                  className="group border-t border-hair last:border-b"
                >
                  <a
                    href={`#case-${study.id}`}
                    className="grid items-baseline gap-x-6 gap-y-2 py-6 transition-[padding] duration-500 ease-vereen group-hover:pl-3 md:grid-cols-12 md:py-7"
                  >
                    <span className="font-mono text-[11px] text-flare md:col-span-1">
                      0{caseStudies.indexOf(study) + 1}
                    </span>

                    <span className="text-[clamp(17px,1.9vw,26px)] font-extrabold uppercase leading-[1.1] tracking-[-0.02em] transition-colors duration-300 group-hover:text-flare md:col-span-4">
                      {study.client}
                    </span>

                    <span className="text-[13px] font-light text-ash md:col-span-3">
                      {study.services}
                    </span>

                    <span className="text-[13px] font-light text-ash md:col-span-2">
                      {study.market}
                    </span>

                    <span className="flex items-baseline justify-between gap-3 md:col-span-2">
                      <span className="text-[clamp(18px,2vw,28px)] font-extrabold leading-none tracking-[-0.04em]">
                        {study.metric}
                      </span>
                      <span
                        aria-hidden
                        className="text-flare transition-transform duration-500 ease-vereen group-hover:translate-y-1"
                      >
                        ↓
                      </span>
                    </span>
                  </a>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </section>

      {caseStudies.map((study, i) => (
        <CaseChapter key={study.id} study={study} index={i} />
      ))}

      <section className="relative bg-void">
        <div className="shell flex flex-wrap items-end justify-between gap-10 border-t border-hair py-20 md:py-24">
          <RevealLines
            className="max-w-[18ch] text-[clamp(26px,3.4vw,48px)] leading-[1.02]"
            stagger={0.06}
            lines={[
              { text: "Want the unflattering" },
              { text: "version — the tests" },
              { text: "that failed?" },
            ]}
          />
          <Reveal delay={0.1}>
            <p className="max-w-[34ch] text-[15px] font-light leading-relaxed text-ash-light">
              Ask for it on the call. We keep that log too, and it is usually more useful than
              the wins.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative bg-flare text-void">
        <div className="shell flex flex-wrap items-end justify-between gap-10 py-20 md:py-28">
          <RevealLines
            className="max-w-[13ch] text-[clamp(38px,7vw,112px)] leading-[0.84]"
            lines={[{ text: "Your category" }, { text: "already has" }, { text: "an answer." }]}
          />
          <Reveal delay={0.1}>
            <Magnetic strength={18}>
              <Link href="/contact" className="btn-void px-9 py-5">
                Make it yours <span aria-hidden>↗</span>
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </>
  );
}
