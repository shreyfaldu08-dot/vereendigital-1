"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Magnetic from "@/components/motion/Magnetic";

const LINES = ["Be the"];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-void pb-8 pt-28 md:pb-10 md:pt-32"
    >
      <div aria-hidden className="gridlines gridlines-fade absolute inset-0 opacity-60" />

      {/* Vertical edge marks, the reference's side furniture. */}
      <span
        aria-hidden
        className="tick absolute right-4 top-1/2 hidden -translate-y-1/2 rotate-90 md:block"
      >
        AI visibility · est. 2024
      </span>

      <motion.div
        className="shell relative flex flex-1 flex-col justify-end gap-8"
        style={reduced ? undefined : { y, opacity }}
      >
        <motion.p
          className="tick max-w-[520px] leading-[2]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          For businesses tired of being invisible when buyers search
        </motion.p>

        <h1 className="text-[clamp(64px,18vw,268px)] leading-[0.8] tracking-[-0.055em]">
          {LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.04em]">
              <motion.span
                className="block"
                initial={reduced ? undefined : { y: "118%" }}
                animate={reduced ? undefined : { y: "0%" }}
                transition={{
                  duration: 1.1,
                  delay: 0.25 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
          <span className="block overflow-hidden pb-[0.04em]">
            <motion.span
              className="block text-flare"
              initial={reduced ? undefined : { y: "118%" }}
              animate={reduced ? undefined : { y: "0%" }}
              transition={{ duration: 1.1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              answer.
            </motion.span>
          </span>
        </h1>
      </motion.div>

      <motion.div
        className="shell relative flex flex-wrap items-end justify-between gap-8 border-t border-hair pt-7"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.85, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <p className="max-w-[46ch] text-[15px] font-light leading-relaxed text-ash-light">
          Buyers no longer only type into Google. They ask ChatGPT, Perplexity, Gemini and AI
          Overviews who to trust. If you are missing from those conversations, somebody else is
          getting the shortlist.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Magnetic>
            <Link href="/contact" className="btn-flare">
              Get in touch <span aria-hidden>↗</span>
            </Link>
          </Magnetic>
          <Magnetic>
            <Link href="/work" className="btn-ghost">
              See the proof
            </Link>
          </Magnetic>
        </div>

        <div aria-hidden className="hidden items-center gap-3 lg:flex">
          <span className="tick">Scroll to see the answer</span>
          <motion.span
            className="block h-6 w-px bg-flare"
            animate={{ scaleY: [0.2, 1, 0.2] }}
            style={{ originY: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
