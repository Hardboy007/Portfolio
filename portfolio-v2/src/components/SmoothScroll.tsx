"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    // Modal open hone pe Lenis stop karo
    const observer = new MutationObserver(() => {
      if (document.body.style.overflow === "hidden") {
        lenis.stop();
      } else {
        lenis.start();
      }
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      observer.disconnect();
    };
  }, []);

  return <>{children}</>;
}
