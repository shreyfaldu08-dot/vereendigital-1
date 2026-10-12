"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import RevealLines from "@/components/motion/RevealLines";

const faqs = [
  {
    q: "How is this different from the SEO we already pay for?",
    a: "Classic SEO optimises for a ranked list. AI SEO optimises for being named inside a generated answer, which depends on entity clarity and quotable passages as much as on links. The technical work overlaps; the content and schema work does not.",
  },
  {
    q: "How long before we see a citation?",
    a: "Our fastest documented case was under five months from the start of the technical overhaul to the first AI citation. It depends on how much of the foundation is missing — we tell you which layer you are starting from in the audit, before you commit.",
  },
  {
    q: "Can you guarantee we appear in ChatGPT?",
    a: "No, and nobody honestly can — the platforms do not sell placement in organic answers. What we can do is remove the reasons you are currently excluded, track who is named each month, and show you the transcripts either way.",
  },
  {
    q: "What do you need from us to start?",
    a: "Access to your analytics, search console and CMS, one person who can approve content, and an agreed definition of a qualified lead. That is the whole list.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative bg-void">
      <div aria-hidden className="gridlines absolute inset-0 opacity-40" />

      <div className="shell relative grid gap-12 py-24 md:py-32 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <span className="tick">Straight answers</span>
          </Reveal>
          <RevealLines
            className="mt-6 max-w-[12ch] text-[clamp(26px,3.2vw,46px)] leading-[0.98]"
            lines={[
              { text: "The questions" },
              { text: "you were" },
              { text: "going to ask" },
            ]}
          />
        </div>

        <div className="flex flex-col">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.q} className="border-t border-hair last:border-b">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="group flex min-h-[48px] w-full items-start gap-8 py-7 text-left"
                >
                  <span className="font-mono text-[11px] text-flare">0{i + 1}</span>
                  <span className="flex-1 text-[clamp(18px,2.1vw,28px)] font-extrabold uppercase leading-[1.1] tracking-[-0.03em] transition-colors duration-300 group-hover:text-flare">
                    {faq.q}
                  </span>
                  <motion.span
                    aria-hidden
                    className="font-mono text-xl leading-none text-flare"
                    animate={{ rotate: isOpen ? 135 : 0 }}
                    transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[62ch] pb-8 pl-[52px] text-[15px] font-light leading-relaxed text-ash-light">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
