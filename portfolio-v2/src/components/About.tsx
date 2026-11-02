"use client";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import dynamic from "next/dynamic";
const AboutScene = dynamic(() => import("./AboutScene"), { ssr: false });

gsap.registerPlugin(ScrollTrigger, SplitText);

const STATS = [
  { value: "3", label: "Projects\nShipped" },
  { value: "4", label: "Team Members\nLed" },
  { value: "MERN", label: "Stack of\nChoice" },
];

const TIMELINE = [
  {
    year: "2026",
    title: "Final Year — B.Tech CSE",
    sub: "Dev Bhoomi Uttarakhand University, Dehradun",
  },
  {
    year: "Early '26",
    title: "Project Lead — PlaceRise",
    sub: "Led 4-member team, end-to-end delivery",
  },
  {
    year: "2025",
    title: "Full Stack Developer — CampusBite",
    sub: "PWA for campus food ordering",
  },
  {
    year: "2023",
    title: "Started B.Tech CSE",
    sub: "Began learning web development",
  },
];

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      const split = SplitText.create(headingRef.current!, { type: "lines" });

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

      gsap.from(".timeline-item", {
        opacity: 0,
        x: -30,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: ".timeline-item", start: "top 88%" },
      });

      // animated counters
      counterRefs.current.forEach((el, i) => {
        if (!el || STATS[i].value === "MERN") return;
        const target = parseInt(STATS[i].value);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.5,
          ease: "power2.out",
          snap: { val: 1 },
          scrollTrigger: { trigger: statsRef.current, start: "top 85%" },
          onUpdate: function () {
            if (el) el.textContent = Math.round(obj.val).toString();
          },
        });
      });

      return () => split.revert();
    },
    { scope: containerRef },
  );

  return (
    <motion.section
      id="about"
      ref={containerRef}
      className="px-6 md:px-16 py-28 md:py-36 relative overflow-hidden"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* 3D background */}
      <div className="absolute inset-0 z-0 opacity-25 pointer-events-none">
        <AboutScene />
      </div>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start relative z-10">
        {/* LEFT */}
        <div>
          <p className="font-mono text-xs tracking-widest text-signal mb-4">
            ABOUT
          </p>

          <div className="overflow-hidden">
            <h2
              ref={headingRef}
              className="font-display font-semibold text-2xl md:text-5xl text-paper leading-[1.1]"
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

          {/* stat cards */}
          <div ref={statsRef} className="grid grid-cols-3 gap-4 mt-10">
            {STATS.map(({ value, label }, i) => (
              <div
                key={label}
                className="stat-card rounded-xl border border-line bg-ink-soft p-4 text-center"
              >
                <p className="font-display font-semibold text-2xl md:text-3xl text-signal">
                  <span
                    ref={(el) => {
                      counterRefs.current[i] = el;
                    }}
                  >
                    {value}
                  </span>
                </p>
                <p className="font-mono text-[10px] text-paper-dim mt-1 whitespace-pre-line leading-relaxed">
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* timeline */}
          <div className="mt-12 space-y-6">
            <p className="font-mono text-xs tracking-widest text-signal">
              TIMELINE
            </p>
            {TIMELINE.map(({ year, title, sub }) => (
              <div
                key={year + title}
                className="timeline-item flex gap-5 items-start"
              >
                <span className="font-mono text-xs text-signal shrink-0 mt-1 w-16">
                  {year}
                </span>
                <div className="flex-1 border-l border-line pl-5">
                  <p className="text-sm text-paper font-medium">{title}</p>
                  <p className="text-xs text-paper-dim mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — terminal */}
        <div className="terminal-card rounded-2xl border border-line bg-ink-soft overflow-hidden">
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-line">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-2 font-mono text-[11px] text-paper-dim">
              status.sh
            </span>
          </div>

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
            <div className="flex gap-3">
              <span className="text-signal">❯</span>
              <span className="animate-pulse text-signal">▍</span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
