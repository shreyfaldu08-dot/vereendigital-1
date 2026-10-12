"use client";

import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import RevealLines from "@/components/motion/RevealLines";
import Magnetic from "@/components/motion/Magnetic";
import ScrollRail from "@/components/motion/ScrollRail";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-flare text-void">
      <div className="shell relative flex flex-wrap items-end justify-between gap-10 py-24 md:py-32">
        <div className="flex flex-col gap-6">
          <Reveal>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-void/60 md:text-[11px]">Next step</span>
          </Reveal>
          <RevealLines
            className="max-w-[13ch] text-[clamp(40px,8vw,128px)] leading-[0.84]"
            lines={[{ text: "Find out" }, { text: "where you" }, { text: "stand." }]}
          />
          <p className="max-w-[52ch] text-[15px] font-light leading-relaxed text-void/75">
            We run your top five buyer queries through ChatGPT, Gemini, Perplexity and Google AI
            Overviews and send you the transcript — who gets named, and why it is not you yet.
            Free, in 48 hours.
          </p>
        </div>

        <Reveal delay={0.1}>
          <Magnetic strength={20}>
            <Link href="/contact" className="btn-void px-10 py-6 text-base">
              Request the visibility check <span aria-hidden>↗</span>
            </Link>
          </Magnetic>
        </Reveal>
      </div>

      <div aria-hidden className="border-y border-void/20 py-5">
        <ScrollRail direction={-1} travel={1} repeat={4}>
          <span className="whitespace-nowrap pr-10 text-[clamp(36px,7vw,112px)] font-extrabold uppercase leading-none tracking-[-0.05em] text-void">
            Be the answer
            <span className="px-10 text-paper">✶</span>
          </span>
        </ScrollRail>
      </div>
    </section>
  );
}
