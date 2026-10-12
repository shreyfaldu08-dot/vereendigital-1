"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type Variants } from "framer-motion";
import ScrollRail from "@/components/motion/ScrollRail";

type Props = {
  word: string;
  rows?: number;
  /** Words rendered per repeat of each row. */
  perRow?: number;
};

const rise: Variants = {
  hidden: { y: "110%" },
  shown: { y: "0%", transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
};

/** Fixed, index-derived states — never random, so server and client agree. */
const TONES = {
  ghost: "#262626",
  flare: "#A8DB42",
  plain: "#FFFFFF",
} as const;

function toneFor(row: number, i: number): keyof typeof TONES {
  const n = (row * 5 + i * 3) % 7;
  if (n === 1 || n === 4) return "ghost";
  if (n === 2 || n === 6) return "flare";
  return "plain";
}

function Row({ word, row, perRow }: { word: string; row: number; perRow: number }) {
  // Alternate direction row to row, and vary how far each one travels, so the
  // rows slide against each other instead of moving as one block.
  const direction: -1 | 1 = row % 2 === 0 ? -1 : 1;
  const travel = 0.55 + (row % 3) * 0.3;

  return (
    <span className="block overflow-hidden">
      <motion.span variants={rise} className="block">
        <ScrollRail direction={direction} travel={travel} repeat={4}>
          <span className="flex flex-nowrap items-center">
            {Array.from({ length: perRow }).map((_, i) => {
              const tone = toneFor(row, i);
              return (
                <span
                  key={i}
                  className="vd-wall-word select-none whitespace-nowrap pr-6 text-[clamp(32px,7.4vw,112px)] font-extrabold uppercase leading-[1.04] tracking-[-0.045em] md:pr-10"
                  // --w is this cell's own colour; the pulse animates away from
                  // it and back. The delay staggers the pulse so it travels
                  // across the wall instead of blinking everywhere at once.
                  style={
                    {
                      "--w": TONES[tone],
                      animationDelay: `${((row * 3 + i) % 9) * 0.65}s`,
                    } as React.CSSProperties
                  }
                >
                  {word}
                </span>
              );
            })}
          </span>
        </ScrollRail>
      </motion.span>
    </span>
  );
}

/**
 * A wall of one word: rows travelling in opposite directions at different
 * speeds, reacting to scroll velocity, with an accent pulse running through
 * the cells. The loudest thing on the page and the reference site's
 * defining gesture.
 */
export default function TypeWall({ word, rows = 6, perRow = 5 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // The whole wall drifts slightly against the page as it passes.
  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <div ref={ref} aria-hidden className="relative overflow-hidden bg-void py-10 md:py-16">
      <motion.div
        className="flex flex-col gap-2 md:gap-4"
        style={reduced ? undefined : { y }}
        initial={reduced ? false : "hidden"}
        whileInView="shown"
        viewport={{ once: true, amount: 0.15 }}
        transition={{ staggerChildren: 0.07 }}
      >
        {Array.from({ length: rows }).map((_, row) => (
          <Row key={row} word={word} row={row} perRow={perRow} />
        ))}
      </motion.div>

      <span className="sr-only">{word}</span>
    </div>
  );
}
