"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Hairline of signal lime across the top, tied to page progress. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-[80] h-[3px] w-full origin-left bg-flare"
      style={{ scaleX }}
    />
  );
}
