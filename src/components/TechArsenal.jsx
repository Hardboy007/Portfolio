import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { FaReact, FaNodeJs, FaGitAlt, FaGithub } from "react-icons/fa";
import { VscCode } from "react-icons/vsc";
import {
  SiVite,
  SiTailwindcss,
  SiReactrouter,
  SiExpress,
  SiJsonwebtokens,
  SiMongodb,
  SiCloudinary,
  SiVercel,
  SiRender,
  SiGithubactions,
  SiGooglegemini,
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger, SplitText);

const CATEGORIES = [
  {
    id: "frontend",
    label: "Frontend",
    color: "#38bdf8", // sky blue
    techs: [
      { icon: FaReact, name: "React 18" },
      { icon: SiVite, name: "Vite" },
      { icon: SiTailwindcss, name: "Tailwind CSS" },
      { icon: SiReactrouter, name: "React Router" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    color: "#a78bfa", // violet
    techs: [
      { icon: FaNodeJs, name: "Node.js" },
      { icon: SiExpress, name: "Express" },
      { icon: SiJsonwebtokens, name: "JWT Auth" },
      // Multer doesn't have an SI icon, using a text fallback below
    ],
  },
  {
    id: "data",
    label: "Data & Storage",
    color: "#34d399", // emerald
    techs: [
      { icon: SiMongodb, name: "MongoDB Atlas" },
      { icon: SiCloudinary, name: "Cloudinary" },
    ],
  },
  {
    id: "deployment",
    label: "Deployment",
    color: "#fb923c", // orange
    techs: [
      { icon: SiVercel, name: "Vercel" },
      { icon: SiRender, name: "Render" },
      { icon: SiGithubactions, name: "GitHub Actions" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    color: "#f472b6", // pink
    techs: [
      { icon: FaGitAlt, name: "Git" },
      { icon: FaGithub, name: "GitHub" },
      { icon: VscCode, name: "VS Code" },
    ],
  },
  {
    id: "ai",
    label: "AI",
    color: "#facc15", // yellow
    techs: [{ icon: SiGooglegemini, name: "Gemini API" }],
  },
];

function TechPill({ icon: Icon, name, color }) {
  return (
    <div
      className="tech-pill group flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-line bg-ink-soft
                 hover:border-opacity-60 transition-colors duration-300 cursor-default"
      style={{ "--pill-color": color }}
    >
      <Icon
        className="text-base shrink-0 transition-colors duration-300"
        style={{ color: color }}
      />
      <span className="font-mono text-xs text-paper-dim group-hover:text-paper transition-colors duration-300 whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

// Multer has no react-icon, render a text badge instead
function MulterPill({ color }) {
  return (
    <div
      className="tech-pill group flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-line bg-ink-soft
                 hover:border-opacity-60 transition-colors duration-300 cursor-default"
    >
      <span className="font-mono text-xs font-bold shrink-0" style={{ color }}>
        M/
      </span>
      <span className="font-mono text-xs text-paper-dim group-hover:text-paper transition-colors duration-300">
        Multer
      </span>
    </div>
  );
}

export default function TechArsenal() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);

  useGSAP(
    () => {
      // heading split animation
      const split = SplitText.create(headingRef.current, { type: "lines" });
      gsap.from(split.lines, {
        yPercent: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
        },
      });

      // category label lines slide in from left
      gsap.utils.toArray(".category-label").forEach((el, i) => {
        gsap.from(el, {
          x: -30,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
          },
          delay: i * 0.04,
        });
      });

      // pills stagger in per row
      gsap.utils.toArray(".tech-pill").forEach((pill, i) => {
        gsap.from(pill, {
          opacity: 0,
          y: 18,
          scale: 0.9,
          duration: 0.5,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: pill,
            start: "top 90%",
          },
          delay: (i % 4) * 0.07,
        });
      });

      return () => split.revert();
    },
    { scope: containerRef },
  );

  return (
    <section
      id="tech"
      ref={containerRef}
      className="px-6 md:px-16 py-28 md:py-36"
    >
      <div className="max-w-7xl mx-auto">
        {/* section eyebrow */}
        <p className="font-mono text-xs tracking-widest text-signal mb-4">
          TECH ARSENAL
        </p>

        {/* heading */}
        <div className="overflow-hidden mb-16">
          <h2
            ref={headingRef}
            className="font-display font-semibold text-3xl md:text-5xl text-paper leading-[1.1] max-w-2xl"
          >
            Tools I reach for when building real things.
          </h2>
        </div>

        {/* category rows */}
        <div className="space-y-10">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="grid md:grid-cols-[180px_1fr] gap-4 md:gap-8 items-start"
            >
              {/* category label */}
              <div className="category-label flex items-center gap-3 md:pt-2.5">
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: cat.color }}
                />
                <span
                  className="font-mono text-[11px] tracking-widest"
                  style={{ color: cat.color }}
                >
                  {cat.label.toUpperCase()}
                </span>
              </div>

              {/* pills */}
              <div className="flex flex-wrap gap-3">
                {cat.techs.map(({ icon, name }) => (
                  <TechPill
                    key={name}
                    icon={icon}
                    name={name}
                    color={cat.color}
                  />
                ))}
                {/* Multer lives in backend category */}
                {cat.id === "backend" && <MulterPill color={cat.color} />}
              </div>
            </div>
          ))}
        </div>

        {/* bottom divider line — decorative */}
        <div className="mt-20 h-px bg-line" />
      </div>
    </section>
  );
}
