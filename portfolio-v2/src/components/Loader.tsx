"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const loader = loaderRef.current;
    const bar = barRef.current;
    const text = textRef.current;
    const percent = percentRef.current;
    if (!loader || !bar || !text || !percent) return;

    const tl = gsap.timeline();

    tl.to(bar, { width: "100%", duration: 1.4, ease: "power2.inOut" })
      .to(percent, {
        innerHTML: "100",
        duration: 1.4,
        ease: "power2.inOut",
        snap: { innerHTML: 1 },
      }, "<")
      .to(text, { opacity: 0, duration: 0.3, ease: "power2.out" }, "-=0.2")
      .to(loader, { yPercent: -100, duration: 0.8, ease: "power4.inOut", delay: 0.1 })
      .set(loader, { display: "none" });
  }, []);

  return (
    <div ref={loaderRef} className="fixed inset-0 z-[99998] bg-ink flex flex-col items-center justify-center gap-6">
      <span ref={textRef} className="font-mono text-xs text-paper-dim tracking-widest">
        INITIALIZING
      </span>
      <div className="w-48 h-px bg-line overflow-hidden">
        <div ref={barRef} className="h-full w-0 bg-signal" />
      </div>
      <span className="font-mono text-xs text-signal">
        <span ref={percentRef}>0</span>%
      </span>
    </div>
  );
}