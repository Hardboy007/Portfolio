import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null);
  const logoRef = useRef(null);
  const lineRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // logo appear
    tl.from(logoRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      ease: "power3.out",
    })
      // line expand
      .from(
        lineRef.current,
        {
          scaleX: 0,
          duration: 0.8,
          ease: "power3.inOut",
          transformOrigin: "left center",
        },
        "-=0.2",
      )
      // text appear
      .from(
        textRef.current,
        {
          opacity: 0,
          y: 10,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3",
      )
      // hold for a moment
      .to({}, { duration: 0.4 })
      // whole loader slides up and exits
      .to(loaderRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
        onComplete,
      });
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-100 bg-ink flex flex-col items-center justify-center gap-6"
    >
      <p ref={logoRef} className="font-mono font-bold text-6xl text-signal">
        HS
      </p>
      <div ref={lineRef} className="w-24 h-px bg-signal" />
      <p
        ref={textRef}
        className="font-mono text-xs text-paper-dim tracking-widest"
      >
        LOADING PORTFOLIO...
      </p>
    </div>
  );
}
