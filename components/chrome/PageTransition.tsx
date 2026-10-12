"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * Route change wipes an ink panel off the viewport and the new page rises
 * underneath it.
 *
 * Deliberately CSS, not JS: a requestAnimationFrame-driven curtain can stall
 * on a throttled or backgrounded tab and leave the page black. A keyframe with
 * `forwards` always lands, and `prefers-reduced-motion` is handled in CSS too.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const firstRender = useRef(true);
  const [key, setKey] = useState(pathname);

  useEffect(() => {
    // Skip the wipe on the very first paint — the preloader already covers it.
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setKey(pathname);
  }, [pathname]);

  const isFirst = firstRender.current;

  return (
    <div key={key} className="vd-page">
      {!isFirst && <div aria-hidden className="vd-curtain" />}
      <div className="vd-page-in">{children}</div>
    </div>
  );
}
