import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  { id: "hero", label: "INIT" },
  { id: "about", label: "BUILDING" },
  { id: "projects", label: "TESTING" },
  { id: "approach", label: "REVIEW" },
  { id: "contact", label: "DEPLOYED" },
];

export default function StatusBar() {
  const barRef = useRef(null);
  const [stage, setStage] = useState(STAGES[0].label);

  useGSAP(() => {
    // 1) Overall progress bar: width goes 0% -> 100% as you scroll the whole page.
    //    "scrub: true" ties the animation directly to scroll position (no easing lag).
    gsap.to(barRef.current, {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    // 2) One ScrollTrigger per section, just to flip the label when that
    //    section reaches the middle of the viewport.
    STAGES.forEach(({ id, label }) => {
      const section = document.getElementById(id);
      if (!section) return;
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => setStage(label),
        onEnterBack: () => setStage(label),
      });
    });
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center gap-3 h-8 px-4 bg-ink/80 backdrop-blur-sm border-b border-line">
      <span className="font-mono text-[11px] tracking-widest text-signal shrink-0">
        {stage}
      </span>
      <div className="relative flex-1 h-0.5 bg-line overflow-hidden rounded-full">
        <div
          ref={barRef}
          className="absolute left-0 top-0 h-full w-0 bg-signal"
        />
      </div>
    </div>
  );
}
