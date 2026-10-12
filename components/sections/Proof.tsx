"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import RevealLines from "@/components/motion/RevealLines";
import { caseStudies, type CaseStudy } from "@/lib/data";

/**
 * Abstract browser frame standing in for the client screenshot. Deliberately
 * not a mocked-up fake of a real client site — it shows the engagement's own
 * numbers instead.
 */
function Frame({ study }: { study: CaseStudy }) {
  return (
    <div className="relative w-full border border-hair-strong bg-coal">
      <div className="flex items-center gap-2 border-b border-hair px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-hair-strong" />
        <span className="h-2 w-2 rounded-full bg-hair-strong" />
        <span className="h-2 w-2 rounded-full bg-flare" />
        <span className="ml-3 truncate font-mono text-[10px] text-ash">
          ai-overview / &quot;who to trust&quot;
        </span>
      </div>

      <div className="flex flex-col gap-5 p-7 md:p-9">
        <div className="flex items-end gap-4">
          <span className="text-[clamp(52px,7vw,96px)] font-extrabold leading-[0.82] tracking-[-0.055em] text-flare">
            {study.metric}
          </span>
          <span className="pb-3 text-[13px] font-light text-ash">{study.metricLabel}</span>
        </div>

        <div className="flex flex-col gap-2.5">
          {study.fixes.slice(0, 4).map((fix, i) => (
            <motion.div
              key={fix}
              className="flex items-center gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.25 + i * 0.1 }}
            >
              <span className="font-mono text-[10px] text-ash">0{i + 1}</span>
              <span className="h-px flex-1 overflow-hidden bg-hair">
                <motion.span
                  className="block h-full w-full origin-left bg-flare"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.8, delay: 0.35 + i * 0.1, ease: [0.2, 0.7, 0.2, 1] }}
                />
              </span>
              <span className="max-w-[58%] truncate text-[12px] font-light text-ash-light">
                {fix}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Row({ study, index }: { study: CaseStudy; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const flip = index % 2 === 1;

  return (
    <article
      ref={ref}
      className="shell relative grid items-center gap-10 border-t border-hair py-20 md:py-28 lg:grid-cols-2 lg:gap-16"
    >
      <motion.div
        className={flip ? "lg:order-2" : ""}
        style={reduced ? undefined : { y }}
      >
        <Frame study={study} />
      </motion.div>

      <div className={`flex flex-col gap-6 ${flip ? "lg:order-1" : ""}`}>
        <Reveal>
          <span className="tick block max-w-[40ch] leading-[1.9]">{study.meta}</span>
        </Reveal>

        <RevealLines
          as="h3"
          stagger={0.05}
          className="max-w-[16ch] text-[clamp(26px,3.6vw,52px)] leading-[0.92]"
          lines={[{ text: study.title }]}
        />

        <Reveal delay={0.1}>
          <p className="max-w-[52ch] text-[15px] font-light leading-relaxed text-ash-light">
            {study.problem}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="max-w-[52ch] border-l-2 border-flare pl-5 text-[15px] leading-relaxed">
            {study.result}
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <Link
            href="/work"
            className="group inline-flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.12em]"
          >
            Read the breakdown
            <span
              aria-hidden
              className="inline-block transition-transform duration-500 ease-vereen group-hover:translate-x-2"
            >
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </article>
  );
}

export default function Proof() {
  return (
    <section id="work" className="relative bg-void">
      {caseStudies.map((study, i) => (
        <Row key={study.id} study={study} index={i} />
      ))}
    </section>
  );
}
