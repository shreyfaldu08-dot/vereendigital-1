"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import RevealLines from "@/components/motion/RevealLines";
import { metrics } from "@/lib/data";

/**
 * Asymmetric by design: one figure carries the section at display scale and the
 * supporting three run quietly beneath it. The previous version was a 2×2 card
 * grid identical to the principles section — that repetition was the problem.
 *
 * The contextless "40+ / 7+ / ~25%" band that used to sit on top is gone. It
 * repeated these same numbers without their method, which is precisely what
 * this section argues against.
 */
export default function Numbers() {
  const [lead, ...rest] = [metrics[1], metrics[0], metrics[2], metrics[3]];

  return (
    <section id="numbers" className="relative overflow-hidden bg-moss">
      <div aria-hidden className="gridlines absolute inset-0 opacity-40" />

      <div className="shell relative py-24 md:py-36">
        {/* The heading is deliberately small here — the number is the headline. */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1">
            <Reveal>
              <span className="tick">Evidence</span>
            </Reveal>
            <RevealLines
              className="mt-5 text-[clamp(26px,3vw,42px)] leading-[1.02]"
              stagger={0.06}
              lines={[
                { text: "You cannot pay" },
                { text: "salaries with" },
                { text: "impressions." },
              ]}
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[38ch] text-[15px] font-light leading-relaxed text-ash-light">
                Every number has a context. Every context has a method. We will show you both
                before you sign anything.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:row-start-1">
            {/* Always RevealLines for masked type: it keeps the viewport
                trigger on the static wrapper. Hand-rolling it puts the
                observer on the element that starts translated out of its own
                box, which can never intersect — the figure then never appears. */}
            <RevealLines
              as="span"
              className="block text-[clamp(96px,19vw,280px)] font-extrabold leading-[0.78] tracking-[-0.065em] text-flare"
              lines={[{ text: lead.value }]}
            />

            <Reveal delay={0.25}>
              <div className="mt-6 flex max-w-[46ch] flex-col gap-3 border-t border-hair pt-6">
                <h3 className="text-[clamp(18px,2vw,26px)] leading-[1.15]">{lead.title}</h3>
                <p className="text-[14px] font-light leading-relaxed text-ash">{lead.body}</p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Supporting figures: a quiet strip, not another grid of boxes. */}
        <div className="mt-20 grid gap-x-10 gap-y-12 border-t border-hair pt-10 md:mt-28 md:grid-cols-3">
          {rest.map((metric, i) => (
            <motion.div
              key={metric.title}
              className="flex flex-col gap-3"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 0.7, delay: i * 0.09, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <RevealLines
                as="span"
                delay={0.1 + i * 0.09}
                className="block text-[clamp(40px,4.4vw,64px)] font-extrabold leading-[0.9] tracking-[-0.05em]"
                lines={[{ text: metric.value }]}
              />
              <h3 className="max-w-[22ch] text-[15px] font-semibold uppercase leading-[1.25] tracking-[-0.01em]">
                {metric.title}
              </h3>
              <p className="max-w-[40ch] text-[14px] font-light leading-relaxed text-ash">
                {metric.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
