"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import RevealLines from "@/components/motion/RevealLines";
import ScrollRail from "@/components/motion/ScrollRail";

const serviceLinks = [
  { href: "/ai-seo", label: "AI SEO" },
  { href: "/contact", label: "Google Ads" },
  { href: "/contact", label: "Meta Ads" },
  { href: "/contact", label: "ChatGPT Ads" },
];

const companyLinks = [
  { href: "/work", label: "Work" },
  { href: "/#approach", label: "Approach" },
  { href: "/#process", label: "Process" },
  { href: "/contact", label: "Contact" },
];

/** Link that slides its label right and runs an accent rule under it on hover. */
function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="group w-fit">
      <span className="flex items-center gap-2 text-[14px] text-ash-light transition-colors duration-300 group-hover:text-flare">
        <span
          aria-hidden
          className="inline-block w-0 overflow-hidden text-flare transition-all duration-500 ease-vereen group-hover:w-3"
        >
          /
        </span>
        <span className="transition-transform duration-500 ease-vereen group-hover:translate-x-0.5">
          {label}
        </span>
      </span>
      <span
        aria-hidden
        className="block h-px w-0 bg-flare transition-all duration-500 ease-vereen group-hover:w-full"
      />
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-hair bg-void">
      {/* A slow rail across the top edge, so the footer is never a dead stop. */}
      <div aria-hidden className="border-b border-hair py-3">
        <ScrollRail direction={-1} travel={0.6} repeat={10}>
          <span className="whitespace-nowrap pr-10 font-mono text-[11px] uppercase tracking-[0.22em] text-ash">
            Marketing at a human pace
            <span className="px-10 text-flare">✶</span>
          </span>
        </ScrollRail>
      </div>

      <div className="shell relative flex flex-col gap-16 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="flex flex-col gap-5">
            <RevealLines
              as="h2"
              className="text-[clamp(38px,5vw,72px)] leading-[0.85] tracking-[-0.05em]"
              lines={[{ text: "Vereen" }, { text: "Digital", accent: true }]}
            />
            <Reveal delay={0.1}>
              <p className="max-w-[34ch] text-[14px] font-light leading-relaxed text-ash">
                Marketing at a human pace. Search, AI visibility and paid media for businesses
                that need the next decision explained.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.05}>
            <nav aria-label="Services" className="flex flex-col gap-3">
              <span className="tick">Services</span>
              {serviceLinks.map((link, i) => (
                <FooterLink key={`${link.label}-${i}`} href={link.href} label={link.label} />
              ))}
            </nav>
          </Reveal>

          <Reveal delay={0.1}>
            <nav aria-label="Company" className="flex flex-col gap-3">
              <span className="tick">Company</span>
              {companyLinks.map((link) => (
                <FooterLink key={link.label} href={link.href} label={link.label} />
              ))}
            </nav>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex flex-col gap-3">
              <span className="tick">Talk to us</span>
              <Link href="/contact" className="w-fit text-[14px] text-flare hover:underline">
                [HELLO@VEREENDIGITAL.COM]
              </Link>
              <span className="text-[14px] text-ash-light">[PHONE]</span>
              <span className="text-[14px] text-ash-light">[CITY, COUNTRY]</span>
            </div>
          </Reveal>
        </div>

        <motion.div
          className="flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-hair pt-6 font-mono text-[11px] text-ash"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <span>© {new Date().getFullYear()} Vereen Digital</span>
          <Link href="/contact" className="hover:text-flare">
            Privacy
          </Link>
          <Link href="/contact" className="hover:text-flare">
            Terms
          </Link>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group ml-auto flex items-center gap-2 uppercase tracking-[0.14em] hover:text-flare"
          >
            Back to top
            <span
              aria-hidden
              className="inline-block transition-transform duration-500 ease-vereen group-hover:-translate-y-1"
            >
              ↑
            </span>
          </button>
        </motion.div>
      </div>
    </footer>
  );
}
