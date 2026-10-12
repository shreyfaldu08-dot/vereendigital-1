"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import RevealLines from "@/components/motion/RevealLines";
import { services } from "@/lib/data";

function Card({ service, index }: { service: (typeof services)[number]; index: number }) {
  return (
    <article className="group relative flex h-[62vh] max-h-[560px] w-[78vw] shrink-0 flex-col justify-between overflow-hidden border border-hair-strong bg-void transition-colors duration-500 hover:border-flare lg:w-[38vw]">
      <span
        aria-hidden
        className="absolute left-0 top-0 h-[3px] w-full origin-left scale-x-0 bg-flare transition-transform duration-700 ease-vereen group-hover:scale-x-100"
      />
      <div className="flex flex-1 flex-col justify-between p-7 lg:p-9">
        <div className="flex items-start justify-between gap-6">
          <span className="font-mono text-[11px] text-flare">0{index + 1}</span>
          <span className="tick text-right leading-[1.9]">
            {service.points.length} deliverables
          </span>
        </div>

        <div className="flex flex-col gap-5">
          <h3 className="text-[clamp(28px,3.4vw,46px)] leading-[0.92]">{service.label}</h3>
          <p className="max-w-[38ch] text-[14px] font-light leading-relaxed text-ash-light">
            {service.headline}
          </p>
        </div>

        <ul className="flex flex-col gap-2.5">
          {service.points.slice(0, 3).map((point) => (
            <li
              key={point}
              className="flex gap-3 text-[13px] font-light leading-snug text-ash"
            >
              <span aria-hidden className="text-flare">
                —
              </span>
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* White footer strip with the category and a hard-edged View button. */}
      <div className="flex items-center justify-between gap-4 bg-paper px-6 py-4 text-void">
        <span className="text-[12px] font-semibold uppercase tracking-[0.12em]">
          {service.id.replace("-", " ")}
        </span>
        <Link
          href={service.href}
          className="bg-void px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-paper transition-colors duration-300 hover:bg-flare hover:text-void"
        >
          View
        </Link>
      </div>
    </article>
  );
}

/**
 * The section pins and the cards travel sideways as you scroll — the
 * reference's service rail, carrying Vereen's four channels.
 */
export default function ServiceRail() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["4%", "-74%"]);

  return (
    <section id="services" className="relative bg-void">
      <div aria-hidden className="gridlines absolute inset-0 opacity-50" />

      <div className="shell relative flex flex-wrap items-end justify-between gap-8 pt-24 md:pt-32">
        <div>
          <span className="tick">Pick the problem — the channel comes second</span>
          <RevealLines
            className="mt-6 max-w-[14ch] text-[clamp(36px,5.4vw,76px)] leading-[0.88]"
            lines={[{ text: "One visibility" }, { text: "engine" }]}
          />
        </div>
        <p className="max-w-[34ch] text-[15px] font-light leading-relaxed text-ash-light">
          We will tell you if a channel is not the answer. It is cheaper than pretending
          otherwise.
        </p>
      </div>

      {/* Pinned horizontal — desktop */}
      <div ref={ref} className="relative hidden h-[360vh] lg:block">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-6 pl-[max(40px,calc((100vw-1480px)/2))]">
            {services.map((service, i) => (
              <Card key={service.id} service={service} index={i} />
            ))}
            <div className="flex w-[30vw] shrink-0 flex-col justify-center gap-7 pr-10">
              <p className="text-[clamp(24px,2.6vw,38px)] font-extrabold uppercase leading-[0.95]">
                Not sure which one?
              </p>
              <p className="max-w-[32ch] text-[15px] font-light leading-relaxed text-ash-light">
                Start with the free visibility check. It tells you whether the problem is
                discovery, trust or conversion before anyone proposes a budget.
              </p>
              <Link href="/contact" className="btn-flare self-start">
                Request the check <span aria-hidden>↗</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stacked — tablet and phone */}
      <div className="shell relative flex snap-x snap-mandatory gap-5 overflow-x-auto py-14 lg:hidden">
        {services.map((service, i) => (
          <div key={service.id} className="snap-start">
            <Card service={service} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
