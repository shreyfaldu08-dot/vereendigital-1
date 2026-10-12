"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import RevealLines from "@/components/motion/RevealLines";
import { process } from "@/lib/data";

export default function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 65%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 140, damping: 28 });

  return (
    <section id="process" className="relative bg-void">
      <div aria-hidden className="gridlines absolute inset-0 opacity-40" />

      <div className="shell relative flex flex-col gap-12 py-24 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Reveal>
              <span className="tick">After you reach out</span>
            </Reveal>
            <RevealLines
              className="mt-6 max-w-[16ch] text-[clamp(30px,3.6vw,52px)] leading-[0.98]"
              lines={[{ text: "No black" }, { text: "box" }]}
            />
          </div>
          <p className="max-w-[32ch] text-[15px] font-light leading-relaxed text-ash-light">
            No &ldquo;leave it with us&rdquo; and hope for the best. Five stages, each with
            something you can read at the end of it.
          </p>
        </div>

        <div className="relative">
          <div aria-hidden className="absolute left-0 top-0 hidden h-full w-px bg-hair md:block">
            <motion.div className="h-full w-full origin-top bg-flare" style={{ scaleY }} />
          </div>

          <ol ref={ref} className="flex flex-col md:pl-10">
            {process.map((step, i) => (
              <motion.li
                key={step.n}
                className="group grid cursor-default gap-4 border-t border-hair py-7 transition-colors duration-500 last:border-b hover:bg-coal md:grid-cols-[88px_148px_1fr] md:items-baseline md:py-9"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.65, delay: i * 0.04, ease: [0.2, 0.7, 0.2, 1] }}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                <span
                  className={`text-[clamp(32px,3.4vw,46px)] font-extrabold leading-none tracking-[-0.05em] transition-colors duration-300 ${
                    active === i ? "text-flare" : "text-paper"
                  }`}
                >
                  {step.n}
                </span>
                <span className="tick leading-[1.9]">{step.when}</span>
                <span className="flex flex-col gap-2">
                  <strong className="text-[clamp(20px,2.2vw,30px)] font-extrabold uppercase leading-[1.05] tracking-[-0.03em]">
                    {step.title}
                  </strong>
                  <span className="max-w-[52ch] text-[15px] font-light leading-relaxed text-ash-light">
                    {step.body}
                  </span>
                </span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
