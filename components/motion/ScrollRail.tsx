"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";
import clsx from "clsx";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** -1 travels left as you scroll down, 1 travels right. */
  direction?: -1 | 1;
  /** How far it travels, as a share of one copy's width. 1 = a full copy. */
  travel?: number;
  /** How many copies to lay down. More copies = wider track = no edge gaps. */
  repeat?: number;
  className?: string;
};

/**
 * A horizontal rail driven purely by scroll POSITION.
 *
 * Deliberately not an autoplaying marquee: it does not drift on its own when
 * the page is still, and it does not read scroll velocity, so it never surges
 * when you flick the wheel. Scroll down and it advances; stop and it stops;
 * scroll back and it rewinds. The spring only smooths the hand-off.
 */
export default function ScrollRail({
  children,
  direction = -1,
  travel = 1,
  repeat = 4,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.0005,
  });

  // One copy is (100 / repeat)% of the track, so travelling that far lands
  // exactly on the next copy and the seam is never visible.
  const span = (100 / repeat) * travel;
  const from = direction === -1 ? 0 : -span;
  const to = direction === -1 ? -span : 0;

  const x = useTransform(smooth, [0, 1], [`${from}%`, `${to}%`]);

  return (
    <div ref={ref} className={clsx("relative w-full overflow-hidden", className)}>
      <motion.div className="flex w-max flex-nowrap" style={reduced ? undefined : { x }}>
        {Array.from({ length: repeat }).map((_, i) => (
          <div key={i} aria-hidden={i > 0} className="flex flex-nowrap items-center">
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
