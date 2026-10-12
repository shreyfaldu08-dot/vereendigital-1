"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const steps = [
  { joiner: "from", word: "invisible" },
  { joiner: "to", word: "cited" },
  { joiner: "and", word: "chosen" },
];

/**
 * The accent moment: three enormous words in flare, each introduced by a
 * small lowercase joiner.
 *
 * The in-view trigger lives on the static wrapper, never on the element that
 * starts translated 115% down — an observer on the moving element can never
 * intersect, which leaves the word permanently invisible.
 */
const wrapper: Variants = {
  hidden: {},
  shown: {},
};

const rise: Variants = {
  hidden: { y: "115%" },
  shown: { y: "0%", transition: { duration: 1.05, ease: [0.16, 1, 0.3, 1] } },
};

const joiner: Variants = {
  hidden: { opacity: 0, x: -14 },
  shown: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] } },
};

export default function Arc() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-void py-24 md:py-36">
      <div aria-hidden className="gridlines absolute inset-0 opacity-30" />

      <div className="shell relative flex flex-col gap-6 md:gap-10">
        {steps.map((step) => (
          <motion.div
            key={step.word}
            className="flex flex-col"
            variants={wrapper}
            initial={reduced ? false : "hidden"}
            whileInView="shown"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.span
              variants={joiner}
              className="pl-1 text-[15px] font-light italic text-paper md:text-lg"
            >
              {step.joiner}
            </motion.span>

            <span className="block overflow-hidden pb-[0.04em]">
              <motion.span
                variants={rise}
                className="block text-[clamp(56px,13vw,210px)] font-extrabold lowercase leading-[0.8] tracking-[-0.06em] text-flare"
              >
                {step.word}
              </motion.span>
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
