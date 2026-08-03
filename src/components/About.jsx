import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function About() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const statsRef = useRef(null);

  useGSAP(
    () => {
      const split = SplitText.create(headingRef.current, { type: "lines" });

      gsap.from(split.lines, {
        yPercent: 100,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
      });

      gsap.from(paraRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: paraRef.current, start: "top 85%" },
      });

      gsap.from(".stat-card", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: { trigger: statsRef.current, start: "top 85%" },
      });

      gsap.from(".terminal-card", {
        opacity: 0,
        x: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: statsRef.current, start: "top 80%" },
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      id="about"
      ref={containerRef}
      className="px-6 md:px-16 py-28 md:py-36"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        {/* LEFT COLUMN */}
        <div>
          <p className="font-mono text-xs tracking-widest text-signal mb-4">
            ABOUT
          </p>

          <div className="overflow-hidden">
            <h2
              ref={headingRef}
              className="font-display font-semibold text-3xl md:text-5xl text-paper leading-[1.1]"
            >
              I'm a CSE student who ships real products, not just assignments.
            </h2>
          </div>

          <p ref={paraRef} className="text-paper-dim mt-6 leading-relaxed">
            I build full-stack web products end to end — from UI to APIs to
            deployment. Currently leading a four-person team on{" "}
            <span className="text-paper font-medium">PlaceRise</span> while
            exploring new problem spaces to build in.
          </p>

          {/* 3 stat cards */}
          <div ref={statsRef} className="grid grid-cols-3 gap-4 mt-10">
            {[
              { value: "3", label: "Projects\nShipped" },
              { value: "4", label: "Team members\nLed" },
              { value: "MERN", label: "Stack of\nChoice" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="stat-card rounded-xl border border-line bg-ink-soft p-4 text-center"
              >
                <p className="font-display font-semibold text-2xl md:text-3xl text-signal">
                  {value}
                </p>
                <p className="font-mono text-[10px] text-paper-dim mt-1 whitespace-pre-line leading-relaxed">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN — terminal status card */}
        <div className="terminal-card rounded-2xl border border-line bg-ink-soft overflow-hidden min-w-0">
          {/* terminal top bar */}
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-line">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-2 font-mono text-[11px] text-paper-dim">
              status.sh
            </span>
          </div>

          {/* terminal content */}
          <div className="p-4 md:p-6 font-mono text-xs md:text-sm space-y-3 md:space-y-4">
            {[
              { key: "name", value: "Hardik Srivastava" },
              { key: "role", value: "Software Engineer & Project Manager" },
              { key: "location", value: "Dehradun, India" },
              { key: "status", value: "Open to opportunities ✓" },
              { key: "education", value: "B.Tech CSE — Final Year" },
            ].map(({ key, value }) => (
              <div key={key} className="flex gap-2 flex-wrap">
                <span className="text-signal shrink-0">❯</span>
                <span className="text-paper-dim shrink-0">{key}:</span>
                <span className="text-paper break-all">{value}</span>
              </div>
            ))}

            {/* blinking cursor at the end */}
            <div className="flex gap-3">
              <span className="text-signal">❯</span>
              <span className="animate-pulse text-signal">▍</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
