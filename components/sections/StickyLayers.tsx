"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import clsx from "clsx";
import Reveal from "@/components/motion/Reveal";
import RevealLines from "@/components/motion/RevealLines";

type Layer = {
  n: string;
  title: string;
  body: string;
  deliverable: string;
  accent?: boolean;
};

const layers: Layer[] = [
  {
    n: "Layer 01",
    title: "Technical foundations",
    body: "Crawlability and indexation across every service page, internal linking that connects services, locations and supporting content, canonical handling for filtered URLs, Core Web Vitals on mobile first.",
    deliverable: "Crawl audit + fix log",
  },
  {
    n: "Layer 02",
    title: "Entity and schema signals",
    body: "Organisation, Service, LocalBusiness and sector-specific schema so AI systems can identify and trust the business as a real entity — with licences, credentials and regions structured as citable facts on the page.",
    deliverable: "Entity map + schema spec",
  },
  {
    n: "Layer 03",
    title: "Source-worthy content",
    body: "Answer-first pages and comparison content built around the exact query structures buyers use in ChatGPT, Gemini and AI Overviews — written so a model can lift one paragraph and still be correct.",
    deliverable: "Query map + content plan",
  },
  {
    n: "Layer 04",
    title: "Citation tracking",
    body: "Monthly checks of who gets named for your priority queries across every platform that matters, with the transcript attached — so a change in visibility is evidence, not a claim.",
    deliverable: "Citation report + transcripts",
    accent: true,
  },
];

function LayerCard({
  layer,
  index,
  total,
}: {
  layer: Layer;
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.93]);

  return (
    <div
      ref={ref}
      className="sticky"
      style={{ top: `calc(104px + ${index * 16}px)`, zIndex: index + 1 }}
    >
      <motion.article
        style={reduced ? undefined : { scale }}
        className={clsx(
          "flex flex-col gap-5 border p-8 md:p-12",
          layer.accent ? "border-flare bg-flare text-void" : "border-hair-strong bg-pitch",
        )}
      >
        <div className="flex items-baseline justify-between gap-6">
          <span
            className={clsx(
              "font-mono text-[11px] uppercase tracking-[0.2em]",
              layer.accent ? "text-void/70" : "text-flare",
            )}
          >
            {layer.n}
          </span>
          <span
            className={clsx(
              "font-mono text-[11px]",
              layer.accent ? "text-void/70" : "text-ash",
            )}
          >
            {index + 1}/{total}
          </span>
        </div>

        <RevealLines
          as="h3"
          stagger={0.05}
          className="text-[clamp(26px,3.6vw,52px)] leading-[0.92]"
          lines={[{ text: layer.title }]}
        />

        <p
          className={clsx(
            "max-w-[60ch] text-[15px] font-light leading-relaxed",
            layer.accent ? "text-void/80" : "text-ash-light",
          )}
        >
          {layer.body}
        </p>

        <span
          className={clsx(
            "font-mono text-[11px] uppercase tracking-[0.16em]",
            layer.accent ? "text-void" : "text-ash",
          )}
        >
          Deliverable — {layer.deliverable}
        </span>
      </motion.article>
    </div>
  );
}

export default function StickyLayers() {
  return (
    <section className="relative bg-void">
      <div aria-hidden className="gridlines absolute inset-0 opacity-40" />

      <div className="shell relative flex flex-col gap-10 py-24 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Reveal>
              <span className="tick">The method — four layers</span>
            </Reveal>
            <RevealLines
              className="mt-6 max-w-[14ch] text-[clamp(32px,4.6vw,64px)] leading-[0.92]"
              lines={[{ text: "Foundations" }, { text: "first" }]}
            />
          </div>
          <p className="max-w-[32ch] text-[15px] font-light leading-relaxed text-ash-light">
            Visibility is the output, not the tactic. Each layer has a deliverable you can read,
            and a check we run before moving on.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {layers.map((layer, i) => (
            <LayerCard key={layer.n} layer={layer} index={i} total={layers.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
