"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import Reveal from "@/components/motion/Reveal";
import RevealLines from "@/components/motion/RevealLines";
import Magnetic from "@/components/motion/Magnetic";

const needs = [
  "Invisible in AI answers",
  "Organic traffic flat",
  "Cost per lead rising",
  "Leads are poor quality",
];

const promises = [
  "A reply from the person who would run the work — within one business day.",
  "The transcript, in 48 hours. Yours to keep whether we work together or not.",
  "No proposal until we agree what a qualified lead looks like.",
];

const field =
  "min-h-[48px] border border-hair bg-pitch px-4 py-3.5 text-[15px] text-paper transition-colors duration-300 placeholder:text-ash/70 focus:border-flare";

export default function ContactScreen() {
  const [picked, setPicked] = useState<string[]>([needs[0]]);
  const [sent, setSent] = useState(false);

  const toggle = (label: string) =>
    setPicked((current) =>
      current.includes(label) ? current.filter((item) => item !== label) : [...current, label],
    );

  // No backend is wired up yet — point this at the client's form handler
  // (Formspree, HubSpot, a route handler) when it exists.
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <>
      <section className="relative overflow-hidden bg-void pb-24 pt-32 md:pt-40">
        <div aria-hidden className="gridlines gridlines-fade absolute inset-0 opacity-60" />

        <div className="shell relative grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <Reveal>
                <span className="tick">Free visibility check</span>
              </Reveal>
              <RevealLines
                as="h1"
                className="max-w-[11ch] text-[clamp(44px,8.4vw,128px)] leading-[0.82] tracking-[-0.055em]"
                lines={[{ text: "Ask who AI" }, { text: "recommends", accent: true }]}
              />
              <Reveal delay={0.1}>
                <p className="max-w-[46ch] text-[15px] font-light leading-relaxed text-ash-light">
                  Send five buyer queries. We run them through ChatGPT, Gemini, Perplexity and
                  Google AI Overviews and return the transcript with a short read on why you are
                  or are not named.
                </p>
              </Reveal>
            </div>

            <ul className="flex flex-col">
              {promises.map((promise, i) => (
                <Reveal key={promise} delay={i * 0.07}>
                  <li className="flex gap-5 border-t border-hair py-5 text-[14px] font-light leading-relaxed text-ash-light last:border-b">
                    <span className="font-mono text-[11px] text-flare">0{i + 1}</span>
                    <span className="max-w-[44ch]">{promise}</span>
                  </li>
                </Reveal>
              ))}
            </ul>

            <div className="flex flex-wrap gap-x-12 gap-y-7">
              <div className="flex flex-col gap-2">
                <span className="tick">Email</span>
                <Link href="/contact" className="text-[15px] font-semibold text-flare">
                  [HELLO@VEREENDIGITAL.COM]
                </Link>
              </div>
              <div className="flex flex-col gap-2">
                <span className="tick">Phone</span>
                <span className="text-[15px] font-semibold">[PHONE NUMBER]</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="tick">Hours</span>
                <span className="text-[15px] font-semibold">[TIMEZONE, 9—6]</span>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
                  className="flex flex-col gap-5 border border-flare bg-flare p-10 text-void md:p-12"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-void/70">
                    Received
                  </span>
                  <h2 className="text-[clamp(26px,3.4vw,44px)] leading-[0.95]">
                    Your queries are in the queue
                  </h2>
                  <p className="max-w-[46ch] text-[15px] font-light leading-relaxed text-void/80">
                    You will get the transcript within 48 hours, from the person who would run
                    the work. Nothing else happens to your details.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="w-fit text-[13px] font-semibold uppercase tracking-[0.12em] underline underline-offset-4"
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  exit={{ opacity: 0, y: -12 }}
                  className="flex flex-col gap-6 border border-hair-strong bg-pitch p-8 md:p-10"
                >
                  <div className="flex flex-col gap-2">
                    <h2 className="text-[clamp(22px,2.4vw,32px)] leading-[1]">
                      Tell us where you stand
                    </h2>
                    <p className="text-[14px] font-light leading-relaxed text-ash">
                      Four fields. No budget dropdown designed to disqualify you.
                    </p>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="tick">
                        Your name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Alex Moreau"
                        className={field}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="tick">
                        Work email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="alex@company.com"
                        className={field}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="website" className="tick">
                      Website
                    </label>
                    <input
                      id="website"
                      name="website"
                      type="url"
                      placeholder="company.com"
                      className={field}
                    />
                  </div>

                  <fieldset className="flex flex-col gap-3 border-0 p-0">
                    <legend className="tick pb-2">What is the problem right now?</legend>
                    <div className="flex flex-wrap gap-2.5">
                      {needs.map((need) => {
                        const on = picked.includes(need);
                        return (
                          <button
                            key={need}
                            type="button"
                            aria-pressed={on}
                            onClick={() => toggle(need)}
                            className={clsx(
                              "min-h-[44px] border px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.08em] transition-colors duration-300",
                              on
                                ? "border-flare bg-flare text-void"
                                : "border-hair text-ash hover:border-paper hover:text-paper",
                            )}
                          >
                            {need}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="queries" className="tick">
                      Five queries your buyers would ask
                    </label>
                    <textarea
                      id="queries"
                      name="queries"
                      rows={4}
                      placeholder={
                        "best outsourced bookkeeping for Australian SMEs\nwho to trust for home healthcare in Dubai"
                      }
                      className={clsx(field, "resize-y leading-relaxed")}
                    />
                  </div>

                  <Magnetic strength={8}>
                    <button type="submit" className="btn-flare w-full">
                      Send it over <span aria-hidden>↗</span>
                    </button>
                  </Magnetic>

                  <p className="font-mono text-[11px] leading-relaxed text-ash">
                    We use what you send to prepare your visibility check and nothing else. No
                    list, no sequence.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section className="relative border-t border-hair bg-void">
        <div className="shell flex flex-wrap items-end justify-between gap-8 py-16 md:py-20">
          <RevealLines
            className="max-w-[18ch] text-[clamp(26px,4vw,56px)] leading-[0.9]"
            lines={[{ text: "Prefer to read" }, { text: "the evidence first?" }]}
          />
          <Reveal delay={0.1}>
            <Magnetic>
              <Link href="/work" className="btn-ghost">
                See the proof <span aria-hidden>↗</span>
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </>
  );
}
