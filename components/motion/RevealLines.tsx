"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import clsx from "clsx";
import type { ElementType } from "react";

export type Line = {
  text: string;
  /** Render this line in the accent green. */
  accent?: boolean;
};

type Props = {
  lines: Line[];
  as?: ElementType;
  className?: string;
  /** Seconds between lines. */
  stagger?: number;
  delay?: number;
  once?: boolean;
};

const rise: Variants = {
  hidden: { y: "118%" },
  shown: { y: "0%", transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Headline reveal: each line sits in its own clipped box and rises in, one
 * after another. The reference site's primary entrance, and the reason its
 * big type feels like it arrives rather than just being there.
 *
 * The in-view trigger is on the heading, never on the lines — a line starts
 * translated below its own box, so an observer on it could never intersect.
 */
export default function RevealLines({
  lines,
  as: TagName = "h2",
  className,
  stagger = 0.075,
  delay = 0,
  once = true,
}: Props) {
  const reduced = useReducedMotion();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag = motion[TagName as "h2"] as any;

  if (reduced) {
    const Plain = TagName as "h2";
    return (
      <Plain className={className}>
        {lines.map((line) => (
          <span key={line.text} className={clsx("block", line.accent && "text-flare")}>
            {line.text}
          </span>
        ))}
      </Plain>
    );
  }

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once, amount: 0.2 }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {lines.map((line) => (
        <span key={line.text} className="block overflow-hidden pb-[0.045em]">
          <motion.span
            variants={rise}
            className={clsx("block", line.accent && "text-flare")}
          >
            {line.text}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
