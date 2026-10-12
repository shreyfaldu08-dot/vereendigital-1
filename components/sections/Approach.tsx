"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import RevealLines from "@/components/motion/RevealLines";
import { principles } from "@/lib/data";

/**
 * The light chapter, and the quiet beat.
 *
 * Inverting one section to bone does more for a long scroll than any amount of
 * accent colour: it breaks the page into before and after, and it lets the
 * black sections either side land again. Set small and wide on purpose —
 * an editorial list, no cards, no boxes.
 */
export default function Approach() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="approach" className="relative bg-bone text-void">
      <div aria-hidden className="gridlines-ink absolute inset-0 opacity-70" />

      <div className="shell relative py-20 md:py-24">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-olive-ink md:text-[11px]">Why not hire in-house</span>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <RevealLines
              className="max-w-[22ch] text-[clamp(24px,2.8vw,40px)] leading-[1.04]"
              stagger={0.06}
              lines={[
                { text: "“Data-driven” means nothing" },
                { text: "if nobody can explain" },
                { text: "the next decision." },
              ]}
            />
          </div>
        </div>

        <ol className="mt-14 flex flex-col md:mt-20">
          {principles.map((principle, i) => {
            const on = active === i;
            return (
              <motion.li
                key={principle.key}
                className="group relative border-t border-void/15 last:border-b"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.2, 0.7, 0.2, 1] }}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-flare-deep transition-transform duration-700 ease-vereen group-hover:scale-x-100"
                />

                <div className="grid gap-4 py-7 transition-[padding] duration-500 ease-vereen group-hover:pl-4 md:grid-cols-12 md:gap-8 md:py-9">
                  <span
                    className={`font-mono text-[11px] tracking-[0.2em] transition-colors duration-300 md:col-span-1 ${
                      on ? "text-flare-deep" : "text-void/45"
                    }`}
                  >
                    {principle.key}
                  </span>

                  <h3 className="max-w-[26ch] text-[clamp(17px,1.7vw,23px)] leading-[1.2] md:col-span-6">
                    {principle.title}
                  </h3>

                  <p
                    className={`max-w-[44ch] text-[14px] font-light leading-relaxed transition-colors duration-500 md:col-span-5 ${
                      on ? "text-void/80" : "text-void/55"
                    }`}
                  >
                    {principle.body}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
