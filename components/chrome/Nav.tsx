"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import clsx from "clsx";
import { navLinks } from "@/lib/data";
import Magnetic from "@/components/motion/Magnetic";

export default function Nav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 24);
    if (menuOpen) return;
    setHidden(latest > previous && latest > 240);
  });

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className={clsx(
          "fixed inset-x-0 top-0 z-[70] transition-colors duration-500",
          scrolled && !menuOpen ? "border-b border-hair bg-void/80 backdrop-blur-md" : "",
        )}
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <nav className="shell flex items-center gap-6 py-4 md:py-5">
          <Link
            href="/"
            className="relative z-[1] flex items-baseline text-2xl font-extrabold uppercase tracking-[-0.045em] md:text-[26px]"
          >
            VEREEN
            <span className="text-flare">.</span>
          </Link>

          <div className="ml-auto hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "group relative py-2 text-[13px] font-semibold uppercase tracking-[0.1em] transition-colors duration-300 hover:text-flare",
                  pathname === link.href ? "text-flare" : "text-paper",
                )}
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-flare transition-all duration-500 ease-vereen group-hover:w-full" />
              </Link>
            ))}
            <Magnetic>
              <Link href="/contact" className="btn-flare px-6 py-3.5 text-[12px]">
                Get in touch
              </Link>
            </Magnetic>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="relative z-[1] ml-auto flex h-12 w-12 flex-col items-center justify-center gap-[6px] border border-hair-strong md:hidden"
          >
            <span
              aria-hidden
              className={clsx(
                "block h-[1.5px] w-5 bg-paper transition-transform duration-300",
                menuOpen && "translate-y-[3.75px] rotate-45",
              )}
            />
            <span
              aria-hidden
              className={clsx(
                "block h-[1.5px] w-5 bg-paper transition-transform duration-300",
                menuOpen && "-translate-y-[3.75px] -rotate-45",
              )}
            />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[65] flex flex-col justify-between bg-void px-5 pb-10 pt-28 md:hidden"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label="Main" className="flex flex-col">
              {[...navLinks, { href: "/contact", label: "Contact" }].map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ y: 44, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.18 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    className="flex items-baseline gap-4 border-b border-hair py-5 text-[38px] font-extrabold uppercase leading-none tracking-[-0.04em]"
                  >
                    <span className="font-mono text-[11px] font-normal text-flare">
                      0{i + 1}
                    </span>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <p className="tick">Marketing at a human pace</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
