"use client";

import clsx from "clsx";
import ScrollRail from "@/components/motion/ScrollRail";
import RevealLines from "@/components/motion/RevealLines";

type Props = {
  /** Headline sitting between the two rails. */
  title: string;
  top: string[];
  bottom: string[];
  className?: string;
};

function Rail({ items, direction }: { items: string[]; direction: 1 | -1 }) {
  return (
    <ScrollRail direction={direction} travel={0.9} repeat={4}>
      <div className="flex flex-nowrap items-center gap-8 pr-8">
        {items.map((item) => (
          // Dim on purpose. These rails are texture passing BEHIND the
          // headline — at full contrast they cut through the letterforms and
          // both become unreadable.
          <span
            key={item}
            className="whitespace-nowrap text-[clamp(14px,1.5vw,20px)] font-semibold uppercase tracking-[0.04em] text-[#2E2E2C]"
          >
            {item}
            <span className="pl-8 text-flare-deep">/</span>
          </span>
        ))}
      </div>
    </ScrollRail>
  );
}

/**
 * Two tag rails running in opposite directions, skewed, crossing a giant
 * centred headline.
 *
 * Stays on black. A full-bleed lime ground was tried here and failed twice
 * over: the slab swamped the page, and black rails on lime collided with the
 * black headline until neither could be read. The colour chapters live in the
 * numbers, principles and closing sections instead; this one carries its
 * accent on the last word and the separators.
 */
export default function CrossRails({ title, top, bottom, className }: Props) {
  const words = title.split(" ");

  return (
    <section
      className={clsx(
        "relative isolate flex min-h-[70vh] items-center overflow-hidden bg-void py-24 text-paper",
        className,
      )}
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-[34%] w-[160%] -translate-x-[8%] -rotate-[4deg]">
          <Rail items={top} direction={-1} />
        </div>
        <div className="absolute left-0 top-[58%] w-[160%] -translate-x-[8%] rotate-[4deg]">
          <Rail items={bottom} direction={1} />
        </div>
      </div>

      <RevealLines
        className="shell text-center text-[clamp(44px,11vw,168px)] font-extrabold leading-[0.84]"
        lines={words.map((word, i) => ({ text: word, accent: i === words.length - 1 }))}
      />
    </section>
  );
}
