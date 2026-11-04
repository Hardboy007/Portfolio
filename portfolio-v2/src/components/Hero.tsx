"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";
import { FaReact, FaNodeJs } from "react-icons/fa";
import {
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiGreensock,
} from "react-icons/si";
import MagneticButton from "./MagneticButton";
import HeroScene from "./HeroScene";

gsap.registerPlugin(SplitText, TextPlugin);

const TECH = [
  { icon: FaReact, label: "React" },
  { icon: FaNodeJs, label: "Node.js" },
  { icon: SiExpress, label: "Express" },
  { icon: SiMongodb, label: "MongoDB" },
  { icon: SiTailwindcss, label: "Tailwind" },
  { icon: SiGreensock, label: "GSAP" },
];

const BLOB_PATH =
  "M38,-52C48.8,-44.2,56.6,-32.2,62.4,-18.4C68.2,-4.6,72,11,67.8,24.2C63.6,37.4,51.4,48.2,37.6,55.8C23.8,63.4,8.4,67.8,-7.2,67.2C-22.8,66.6,-38.6,61,-49.8,50.4C-61,39.8,-67.6,24.2,-68.2,8.4C-68.8,-7.4,-63.4,-23.4,-53.4,-35C-43.4,-46.6,-28.8,-53.8,-14,-58.4C0.8,-63,27.2,-59.8,38,-52Z";

export default function Hero() {
  const promptRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<SVGSVGElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const scrollDotRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const nameSplit = SplitText.create(nameRef.current!, { type: "words" });
    const roleSplit = SplitText.create(roleRef.current!, { type: "words" });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 1.7 });

    tl.to(promptRef.current, { duration: 1, text: "$ whoami", ease: "none" })
      .from(
        nameSplit.words,
        { yPercent: 120, opacity: 0, duration: 0.8, stagger: 0.08 },
        "+=0.1",
      )
      .from(
        roleSplit.words,
        { yPercent: 120, opacity: 0, duration: 0.6, stagger: 0.05 },
        "-=0.4",
      )
      .from(subRef.current, { opacity: 0, y: 12, duration: 0.6 }, "-=0.2")
      .from(
        ctaRef.current!.children,
        { opacity: 0, y: 12, duration: 0.5, stagger: 0.1 },
        "-=0.3",
      )
      .from(
        visualRef.current,
        { opacity: 0, scale: 0.92, duration: 0.9 },
        "-=0.9",
      )
      .from(
        [badgeRef.current, card1Ref.current, card2Ref.current],
        { opacity: 0, y: 20, duration: 0.6, stagger: 0.15 },
        "-=0.5",
      );

    gsap.to(orbitRef.current, {
      rotate: 360,
      duration: 26,
      ease: "none",
      repeat: -1,
      transformOrigin: "50% 50%",
    });

    gsap.to(card1Ref.current, {
      y: -10,
      duration: 2.2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
    gsap.to(card2Ref.current, {
      y: 12,
      duration: 2.6,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 0.3,
    });
    gsap.to(badgeRef.current, {
      y: -8,
      duration: 1.8,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 0.5,
    });
    gsap.to(scrollDotRef.current, {
      y: 14,
      opacity: 0.25,
      duration: 1,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    return () => {
      nameSplit.revert();
      roleSplit.revert();
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center px-6 md:px-16 pt-20 md:pt-28 pb-16"
    >
      {/* Three.js background scene */}
      <div className="absolute inset-0 z-0 opacity-40">
        <HeroScene />
      </div>

      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center relative z-10">
        {/* LEFT: text column */}
        <div>
          <div className="inline-block mb-8 rounded-lg border border-line bg-ink-soft overflow-hidden">
            <div className="flex items-center gap-1.5 px-3 py-2 border-b border-line">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 font-mono text-[11px] text-paper-dim">
                portfolio.sh
              </span>
            </div>
            <div className="px-4 py-3 font-mono text-sm text-signal">
              <span ref={promptRef} />
              <span className="animate-pulse">▍</span>
            </div>
          </div>

          <p className="font-mono text-sm text-paper-dim flex items-center gap-2 mb-3">
            Hello, I'm
            <span className="w-1.5 h-1.5 rounded-full bg-signal inline-block animate-pulse" />
          </p>

          <div className="overflow-hidden">
            <h1
              ref={nameRef}
              className="font-display font-semibold text-4xl sm:text-5xl md:text-7xl leading-[1.05] text-paper"
            >
              Hardik Srivastava
            </h1>
          </div>

          <p
            ref={roleRef}
            className="font-display font-medium text-xl sm:text-2xl md:text-4xl mt-3 text-paper-dim"
          >
            Software Engineer &amp; Project Lead
          </p>

          <p
            ref={subRef}
            className="font-body text-base md:text-lg mt-6 max-w-xl text-paper-dim leading-relaxed"
          >
            From idea to deployment, I build web products that combine
            thoughtful design, solid engineering, and effective project
            leadership.
          </p>

          <div ref={ctaRef} className="flex flex-row flex-wrap gap-3 mt-9">
            <MagneticButton
              className="px-6 py-3 rounded-full bg-signal text-[#0b0e14] font-mono text-sm font-medium"
              onClick={() =>
                document
                  .querySelector("#projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View Projects
            </MagneticButton>
            <MagneticButton
              className="px-6 py-3 rounded-full border border-line text-paper font-mono text-sm font-medium"
              onClick={() =>
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Get In Touch
            </MagneticButton>
            <MagneticButton
              className="px-6 py-3 rounded-full border border-line text-paper font-mono text-sm font-medium"
              onClick={() =>
                window.open(
                  "https://drive.google.com/file/d/1cnMchFarxvXxXSopvSlNlnfznB8lBmW9/view?usp=drive_link",
                  "_blank",
                )
              }
            >
              Resume ↗
            </MagneticButton>
          </div>
        </div>

        {/* RIGHT: illustration */}
        <div
          ref={visualRef}
          className="block relative mx-auto w-full max-w-xs md:max-w-md aspect-square mt-8 md:mt-0"
        >
          <svg
            ref={orbitRef}
            viewBox="0 0 200 200"
            className="absolute inset-0 w-full h-full z-0"
          >
            <circle
              cx="100"
              cy="100"
              r="96"
              fill="none"
              stroke="var(--color-line)"
              strokeWidth="1"
              strokeDasharray="3 7"
            />
            <circle cx="100" cy="4" r="3.5" fill="var(--color-signal)" />
          </svg>

          <svg
            viewBox="0 0 200 200"
            className="absolute inset-[4%] w-[92%] h-[92%] z-0"
            overflow="visible"
          >
            <defs>
              <mask id="blobMask">
                <rect x="-50" y="-50" width="300" height="300" fill="black" />
                <path
                  d={BLOB_PATH}
                  transform="translate(100 100)"
                  fill="white"
                />
                <path
                  d={BLOB_PATH}
                  transform="translate(100 10) scale(1.08) translate(0 -6)"
                  fill="white"
                />
              </mask>
              <linearGradient id="fadeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0b0e14" stopOpacity="0" />
                <stop offset="100%" stopColor="#0b0e14" stopOpacity="0.55" />
              </linearGradient>
              <linearGradient id="blobBg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#565b66" />
                <stop offset="100%" stopColor="#33363d" />
              </linearGradient>
            </defs>
            <path
              d={BLOB_PATH}
              transform="translate(100 100)"
              fill="url(#blobBg)"
            />
            <image
              href="/images/profile.png"
              x="-10"
              y="-20"
              width="220"
              height="220"
              preserveAspectRatio="xMidYTop meet"
              mask="url(#blobMask)"
            />
            <rect
              x="0"
              y="130"
              width="200"
              height="70"
              fill="url(#fadeGrad)"
              mask="url(#blobMask)"
            />
          </svg>

          <div
            ref={badgeRef}
            className="absolute top-[6%] left-0 z-20 w-12 h-12 rounded-xl border border-line bg-ink-soft flex items-center justify-center font-mono text-signal shadow-lg shadow-black/40"
          >
            {"</>"}
          </div>

          <div
            ref={card1Ref}
            className="hidden md:block absolute top-[30%] -right-8 w-48 z-20 rounded-lg border border-line bg-ink-soft/95 backdrop-blur-sm p-3 shadow-xl shadow-black/40"
          >
            <p className="font-mono text-[10px] leading-relaxed">
              <span className="text-[#c586c0]">const</span>{" "}
              <span className="text-paper">dev</span> = {"{"}
              <br />
              &nbsp;&nbsp;focus: <span className="text-warn">'clean code'</span>
              ,<br />
              &nbsp;&nbsp;goal: <span className="text-warn">'real impact'</span>
              <br />
              {"}"}
            </p>
          </div>

          <div
            ref={card2Ref}
            className="hidden md:block absolute bottom-[4%] right-0 z-10 w-56 rounded-lg border border-line bg-ink-soft/95 backdrop-blur-sm p-4 shadow-xl shadow-black/40"
          >
            <p className="font-mono text-[11px] text-signal mb-1">
              Project Lead
            </p>
            <p className="text-xs text-paper-dim leading-relaxed">
              Leading end-to-end development of PlaceRise with a team of four
              developers.
            </p>
          </div>
        </div>
      </div>

      {/* scroll hint */}
      <div className="hidden md:flex items-center gap-3 absolute bottom-10 left-16">
        <div className="w-6 h-9 rounded-full border border-line flex justify-center pt-2">
          <span
            ref={scrollDotRef}
            className="w-1 h-1.5 rounded-full bg-signal block"
          />
        </div>
        <span className="font-mono text-[11px] text-paper-dim">
          Scroll to explore
        </span>
      </div>
    </section>
  );
}
