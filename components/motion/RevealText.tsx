"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import clsx from "clsx";
import type { ElementType } from "react";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Stagger per word, in seconds. */
  stagger?: number;
  once?: boolean;
};

const rise: Variants = {
  hidden: { y: "112%" },
  shown: { y: "0%", transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Word-by-word mask reveal: each word sits in an overflow-hidden box and
 * rises into place.
 *
 * The in-view trigger sits on the heading itself and the words animate as
 * children. Watching the translated word instead would never fire — it starts
 * below its own box, so it cannot intersect the viewport.
 */
export default function RevealText({
  text,
  as: TagName = "h2",
  className,
  delay = 0,
  stagger = 0.035,
  once = true,
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag = motion[TagName as "h2"] as any;
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) {
    const Plain = TagName as "h2";
    return <Plain className={className}>{text}</Plain>;
  }

  return (
    <Tag
      className={clsx(className)}
      aria-label={text}
      initial="hidden"
      whileInView="shown"
      viewport={{ once, amount: 0.2 }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden
          className="inline-flex overflow-hidden align-bottom"
          style={{ paddingBottom: "0.12em", marginBottom: "-0.12em" }}
        >
          <motion.span variants={rise} className="inline-block whitespace-pre">
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
