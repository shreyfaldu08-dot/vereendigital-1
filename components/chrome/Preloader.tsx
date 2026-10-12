"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Counter to 100 over a black field, then the panel splits and lifts.
 * Once per tab, and with a hard fail-safe so it can never trap the page.
 */
export default function Preloader() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduced) return;
    if (sessionStorage.getItem("vd-intro") === "done") return;

    setActive(true);
    document.body.style.overflow = "hidden";

    const duration = 1700;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * 100));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem("vd-intro", "done");
        setTimeout(() => {
          setActive(false);
          document.body.style.overflow = "";
        }, 380);
      }
    };

    frame = requestAnimationFrame(tick);

    const bail = window.setTimeout(() => {
      sessionStorage.setItem("vd-intro", "done");
      setActive(false);
      document.body.style.overflow = "";
    }, duration + 1400);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(bail);
      document.body.style.overflow = "";
    };
  }, [reduced]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[95] flex flex-col justify-between bg-void px-5 py-7 md:px-10 md:py-9"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xl font-extrabold uppercase tracking-[-0.045em]">
              VEREEN<span className="text-flare">.</span>
            </span>
            <span className="tick">Loading the answer</span>
          </div>

          <div className="flex items-end justify-between gap-6">
            <span className="text-[22vw] font-extrabold leading-[0.78] tracking-[-0.06em] md:text-[15vw]">
              {count}
            </span>
            <span className="pb-4 font-mono text-[11px] text-flare md:pb-8">%</span>
          </div>

          <div className="h-px w-full bg-hair">
            <div
              className="h-full bg-flare transition-[width] duration-150 ease-linear"
              style={{ width: `${count}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
