"use client";

import { motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";

type Props = {
  className?: string;
  delay?: number;
  /** Accent green instead of a hairline. */
  accent?: boolean;
};

/** A rule that draws itself left to right when it scrolls into view. */
export default function DrawRule({ className, delay = 0, accent = false }: Props) {
  const reduced = useReducedMotion();

  return (
    <span
      aria-hidden
      className={clsx("block h-px w-full overflow-hidden", accent ? "bg-flare/20" : "bg-hair", className)}
    >
      <motion.span
        className={clsx("block h-full w-full origin-left", accent ? "bg-flare" : "bg-paper/50")}
        initial={reduced ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, delay, ease: [0.2, 0.7, 0.2, 1] }}
      />
    </span>
  );
}
