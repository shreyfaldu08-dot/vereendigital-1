"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import Reveal from "@/components/motion/Reveal";
import RevealLines from "@/components/motion/RevealLines";

// The 3D field is decorative and heavy — it never blocks the content.
const LiquidField = dynamic(() => import("@/components/three/LiquidField"), {
  ssr: false,
  loading: () => null,
});

const beliefs = [
  {
    title: "Being found is not the same as being named.",
    body: "An AI answer shortlists three providers. We work on the signals that decide which three — entity clarity, verifiable facts, quotable passages.",
  },
  {
    title: "Every number keeps its context.",
    body: "A figure without the method behind it is decoration. We show you the engagement, the market and the timeline that produced each one.",
  },
  {
    title: "The next decision gets explained.",
    body: "Hypothesis, result, next action — logged. Including the tests that failed, because those are the ones that stop you repeating a bad assumption.",
  },
];

/**
 * Sticky headline on the left, beliefs scrolling past on the right, the
 * liquid-chrome field drifting behind both.
 */
export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const fieldY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-void">
      <div aria-hidden className="gridlines absolute inset-0 opacity-50" />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={reduced ? undefined : { y: fieldY }}
      >
        <LiquidField className="h-full w-full opacity-70" />
      </motion.div>

      <div className="shell relative grid gap-14 py-28 md:py-44 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <span className="tick">What changed</span>
          </Reveal>
          <RevealLines
            className="mt-6 max-w-[11ch] text-[clamp(32px,4.4vw,60px)] leading-[0.94]"
            lines={[
              { text: "Search stopped" },
              { text: "being a list." },
              { text: "It became" },
              { text: "an answer." },
            ]}
          />
        </div>

        <div className="flex flex-col">
          {beliefs.map((belief, i) => (
            <motion.article
              key={belief.title}
              className="border-t border-hair py-9 first:border-t-0 first:pt-0 lg:py-12"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <span className="font-mono text-[11px] text-flare">0{i + 1}</span>
              <RevealLines
                as="h3"
                stagger={0.05}
                className="mt-4 max-w-[18ch] text-[clamp(21px,2.4vw,32px)] leading-[1.1]"
                lines={[{ text: belief.title }]}
              />
              <p className="mt-4 max-w-[46ch] text-[15px] font-light leading-relaxed text-ash-light">
                {belief.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
