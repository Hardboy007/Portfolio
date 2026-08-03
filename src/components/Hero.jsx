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

gsap.registerPlugin(SplitText, TextPlugin);

const TECH = [
  { icon: FaReact, label: "React" },
  { icon: FaNodeJs, label: "Node.js" },
  { icon: SiExpress, label: "Express" },
  { icon: SiMongodb, label: "MongoDB" },
  { icon: SiTailwindcss, label: "Tailwind CSS" },
  { icon: SiGreensock, label: "GSAP" },
];

// A hand-picked organic blob shape - just geometry (like a lopsided circle),
// not artwork. Used to clip a rectangle into an organic form instead of a
// plain square/rounded-rect, which is what makes the visual feel designed
// rather than templated. The path is drawn centered on (0,0), which is why
// we translate it to (100,100) below to sit inside a 200x200 box.
const BLOB_PATH =
  "M38,-52C48.8,-44.2,56.6,-32.2,62.4,-18.4C68.2,-4.6,72,11,67.8,24.2C63.6,37.4,51.4,48.2,37.6,55.8C23.8,63.4,8.4,67.8,-7.2,67.2C-22.8,66.6,-38.6,61,-49.8,50.4C-61,39.8,-67.6,24.2,-68.2,8.4C-68.8,-7.4,-63.4,-23.4,-53.4,-35C-43.4,-46.6,-28.8,-53.8,-14,-58.4C0.8,-63,27.2,-59.8,38,-52Z";

export default function Hero() {
  const promptRef = useRef(null);
  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const visualRef = useRef(null);
  const orbitRef = useRef(null);
  const badgeRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const scrollDotRef = useRef(null);

  useGSAP(() => {
    const nameSplit = SplitText.create(nameRef.current, { type: "words" });
    const roleSplit = SplitText.create(roleRef.current, { type: "words" });

    // ---- ENTRANCE TIMELINE: plays once, top to bottom ----
    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 1 });

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
        ctaRef.current.children,
        { opacity: 0, y: 12, duration: 0.5, stagger: 0.1 },
        "-=0.3",
      )
      // right-side visual fades/scales in alongside the text (big negative
      // offset = "start this well before the previous step finishes")
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

    // ---- IDLE LOOPS: separate from the timeline, these run forever ----
    // (repeat: -1 means "repeat infinitely"). These are what make the hero
    // feel "alive" even after the entrance animation is done.

    // orbit ring spins slowly and continuously
    gsap.to(orbitRef.current, {
      rotate: 360,
      duration: 26,
      ease: "none",
      repeat: -1,
      transformOrigin: "50% 50%",
    });

    // floating cards drift up/down gently - yoyo makes it reverse instead
    // of jumping back to start, so the motion feels smooth both ways
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

    // scroll-hint dot bounces down inside its pill
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
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">
        {/* ============ LEFT: text column ============ */}
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
              className="font-display font-semibold text-4xl sm:text-5xl md:text-7xl leading-[1.05] text-paper wrap-break-word w-full"
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
            className="font-body text-base md:text-lg mt-6 w-full max-w-full md:max-w-xl text-paper-dim leading-relaxed pr-2"
          >
            From idea to deployment, I build web products that combine
            thoughtful design, solid engineering, and effective project
            leadership.
          </p>

          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row flex-wrap gap-3 mt-9"
          >
            <MagneticButton
              className="px-6 py-3 rounded-full bg-signal text-ink font-mono text-sm font-medium"
              onClick={() =>
                document
                  .querySelector("#projects")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              View Projects
            </MagneticButton>

            <MagneticButton
              className="px-6 py-3 rounded-full border border-line text-paper font-mono text-sm font-medium"
              onClick={() =>
                document
                  .querySelector("#contact")
                  .scrollIntoView({ behavior: "smooth" })
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

        {/* ============ RIGHT: illustration + floating cards ============ */}
        <div
          ref={visualRef}
          className="hidden md:block relative mx-auto md:mx-0 w-full max-w-md aspect-square"
        >
          {/* dashed orbit ring - purely decorative, sits behind everything */}
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

          {/* blob-clipped photo - the <clipPath> from the orbit svg's sibling
              crops this image into the organic blob shape instead of a plain
              rectangle. preserveAspectRatio="xMidYMid slice" makes an SVG
              <image> behave like CSS `object-fit: cover` - it fills the box
              and crops overflow instead of stretching/squishing the photo. */}
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
                  transform="translate(100 100) scale(1.05) translate(0 -8)"
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

              <clipPath id="hairClip">
                <path d="M35,10 C50,-15 90,-20 110,-8 C130,2 145,15 150,32 L50,32 C40,25 32,18 35,10 Z" />
              </clipPath>
            </defs>

            <path
              d={BLOB_PATH}
              transform="translate(100 100)"
              fill="url(#blobBg)"
            />

            <image
              href="/images/profile.png"
              x="-5"
              y="-20"
              width="210"
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

          {/* floating badge - top-left of the blob */}
          <div
            ref={badgeRef}
            className="md:block absolute top-[6%] left-0 z-20 w-12 h-12 rounded-xl border border-line bg-ink-soft flex items-center justify-center font-mono text-signal shadow-lg shadow-black/40"
          >
            {"</>"}
          </div>

          {/* floating card - "code snippet" */}
          <div
            ref={card1Ref}
            className="hidden md:block absolute top-[30%] -right-2 md:-right-8 w-48 z-20 rounded-lg border border-line bg-ink-soft/95 backdrop-blur-sm p-3 shadow-xl shadow-black/40"
          >
            <p className="font-mono text-[10px] leading-relaxed">
              <span className="text-[#c586c0]">const</span>{" "}
              <span className="text-paper">dev</span> = {"{"}
              <br />
              &nbsp;&nbsp;focus: <span className="text-warn">'clean code'</span>
              ,
              <br />
              &nbsp;&nbsp;goal: <span className="text-warn">'real impact'</span>
              <br />
              {"}"}
            </p>
          </div>

          {/* floating card - "Project Lead" info, bottom of the blob */}
          <div
            ref={card2Ref}
            className="hidden md:block absolute bottom-[4%] left-1/2 -translate-x-1/2 md:left-auto md:right-0 md:translate-x-0 z-10 w-56 rounded-lg border border-line bg-ink-soft/95 backdrop-blur-sm p-4 shadow-xl shadow-black/40"
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

      {/* scroll hint, bottom-left of the whole hero */}
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
