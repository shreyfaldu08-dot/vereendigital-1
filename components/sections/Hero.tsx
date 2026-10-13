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

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-void pb-10 pt-28 md:pb-12 md:pt-36"
    >
      {/* Precision architectural grid & subtle ambient depth */}
      <div aria-hidden className="gridlines gridlines-fade absolute inset-0 opacity-50" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[520px] w-[860px] rounded-full bg-flare/[0.035] blur-[150px]"
      />

      {/* Vertical edge coordinates */}
      <span
        aria-hidden
        className="tick absolute right-5 top-1/2 hidden -translate-y-1/2 rotate-90 md:block opacity-70"
      >
        AI visibility · est. 2024
      </span>

      {/* Main Kinetic Headline Area */}
      <motion.div
        className="shell relative flex flex-1 flex-col justify-end gap-6 pb-6 md:gap-8 md:pb-10"
        style={reduced ? undefined : { y, opacity }}
      >
        <motion.p
          className="tick max-w-[560px] leading-relaxed text-ash-light"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          For businesses tired of being invisible when buyers search
        </motion.p>

        <h1 className="text-[clamp(60px,16.5vw,240px)] font-extrabold uppercase leading-[0.82] tracking-[-0.05em] text-paper">
          {LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden py-[0.02em]">
              <motion.span
                className="block"
                initial={reduced ? undefined : { y: "115%" }}
                animate={reduced ? undefined : { y: "0%" }}
                transition={{
                  duration: 1.05,
                  delay: 0.22 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
          <span className="block overflow-hidden py-[0.02em]">
            <motion.span
              className="block text-flare"
              initial={reduced ? undefined : { y: "115%" }}
              animate={reduced ? undefined : { y: "0%" }}
              transition={{ duration: 1.05, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
            >
              answer.
            </motion.span>
          </span>
        </h1>
      </motion.div>

      {/* Bottom Subtext, Actions & Scroll Indicator */}
      <motion.div
        className="shell relative border-t border-hair pt-8 md:pt-9"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.75, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Supporting Copy */}
          <p className="max-w-[48ch] text-[15px] font-light leading-relaxed text-ash-light lg:col-span-6">
            Buyers no longer only type into Google. They ask ChatGPT, Perplexity, Gemini and AI
            Overviews who to trust. If you are missing from those conversations, somebody else is
            getting the shortlist.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 lg:col-span-4 lg:justify-start">
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

          {/* Subtle Kinetic Scroll Prompt */}
          <div
            aria-hidden
            className="hidden items-center justify-end gap-3 lg:col-span-2 lg:flex"
          >
            <span className="tick">Scroll to see the answer</span>
            <motion.span
              className="block h-6 w-px bg-flare"
              animate={{ scaleY: [0.25, 1, 0.25] }}
              style={{ originY: 0 }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
