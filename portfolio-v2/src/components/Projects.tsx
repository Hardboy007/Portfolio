"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { FiExternalLink, FiGithub, FiX } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, SplitText);

const PROJECTS = [
  {
    id: "placerise",
    number: "01",
    name: "PlaceRise",
    tag: "Full-stack · Team Lead",
    tagColor: "#38bdf8",
    year: "2024",
    description:
      "College placement management platform with student and coordinator modules — JWT-based role auth, bulk CSV student import, QR-based live attendance with PDF export, and a digital NOC/LOR request system with e-signatures.",
    highlights: [
      "JWT role-based auth (student / coordinator)",
      "Bulk CSV import for student onboarding",
      "QR-based live attendance + PDF export",
      "Digital NOC/LOR with e-signatures",
      "Placement analytics dashboard via Recharts",
      "In-app notifications with Brevo email fallback",
    ],
    stack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Cloudinary",
      "JWT",
      "Recharts",
      "Brevo API",
    ],
    live: null,
    github: null,
    preview: "/images/placerise-preview.png",
  },
  {
    id: "campusbite",
    number: "02",
    name: "CampusBite",
    tag: "Full-stack · Team Lead",
    tagColor: "#fb923c",
    year: "2024",
    description:
      "A full-stack PWA for college students to order food from campus canteens — and for canteen staff to manage everything from a single dashboard. Supports multi-canteen, real-time orders, and smart analytics.",
    highlights: [
      "PWA — installable, works offline",
      "Dual role: Student & Canteen Staff",
      "Real-time order management dashboard",
      "Multi-canteen support across campuses",
      "Firebase Auth + Firestore backend",
      "Unsplash API for dynamic food imagery",
    ],
    stack: [
      "Node.js",
      "Express",
      "EJS",
      "Tailwind CSS",
      "Firebase Auth",
      "Firestore",
      "Unsplash API",
      "Render",
    ],
    live: "https://campusbite-1eqe.onrender.com/",
    github: "https://github.com/Hardboy007/CampusBite",
    preview: "/images/campusbite-preview.png",
  },
];

type Project = (typeof PROJECTS)[0];

function CaseStudyModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-ink/90 backdrop-blur-md" />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.96 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-3xl max-h-[85vh] overflow-y-scroll rounded-2xl border border-line bg-ink-soft shadow-2xl overscroll-contain"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
      >
        {/* close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full border border-line bg-ink flex items-center justify-center text-paper-dim hover:text-paper transition-colors"
        >
          <FiX />
        </button>

        {/* preview image */}
        <div className="relative w-full aspect-video overflow-hidden rounded-t-2xl">
          <Image
            src={project.preview}
            alt={project.name}
            fill
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-soft via-transparent to-transparent" />
        </div>

        {/* content */}
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <span
                className="font-mono text-[11px]"
                style={{ color: project.tagColor }}
              >
                {project.tag}
              </span>
              <h3 className="font-display font-semibold text-2xl md:text-3xl text-paper mt-1">
                {project.name}
              </h3>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-mono text-xs text-paper-dim hover:text-paper transition-colors"
                >
                  <FiGithub /> GitHub
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-mono text-xs px-4 py-2 rounded-full border border-signal text-signal hover:bg-signal hover:text-ink transition-all"
                >
                  <FiExternalLink /> Live Site
                </a>
              )}
            </div>
          </div>

          <p className="text-paper-dim leading-relaxed mb-6">
            {project.description}
          </p>

          {/* highlights */}
          <div className="mb-6">
            <p className="font-mono text-xs tracking-widest text-signal mb-3">
              KEY FEATURES
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {project.highlights.map((h) => (
                <div key={h} className="flex items-start gap-2">
                  <span
                    className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                    style={{ backgroundColor: project.tagColor }}
                  />
                  <span className="text-sm text-paper-dim">{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* stack */}
          <div>
            <p className="font-mono text-xs tracking-widest text-signal mb-3">
              TECH STACK
            </p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="font-mono text-[11px] px-3 py-1 rounded-full border border-line text-paper-dim"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useGSAP(
    () => {
      const split = SplitText.create(headingRef.current!, { type: "lines" });

      gsap.from(split.lines, {
        yPercent: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
      });

      gsap.utils.toArray<HTMLElement>(".project-block").forEach((block, i) => {
        gsap.from(block, {
          opacity: 0,
          y: 60,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: block, start: "top 78%" },
          delay: i * 0.1,
        });
      });

      gsap.utils.toArray<HTMLElement>(".highlight-item").forEach((item, i) => {
        gsap.from(item, {
          opacity: 0,
          x: -20,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: { trigger: item, start: "top 90%" },
          delay: (i % 6) * 0.06,
        });
      });

      cardRefs.current.forEach((card) => {
        if (!card) return;
        const img = card.querySelector(".tilt-image");

        card.addEventListener("mousemove", (e: Event) => {
          const mouseEvent = e as MouseEvent;
          const rect = card.getBoundingClientRect();
          const x = (mouseEvent.clientX - rect.left) / rect.width - 0.5;
          const y = (mouseEvent.clientY - rect.top) / rect.height - 0.5;
          gsap.to(img, {
            rotateY: x * 15,
            rotateX: -y * 15,
            scale: 1.04,
            duration: 0.4,
            ease: "power2.out",
            transformPerspective: 800,
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(img, {
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
          });
        });
      });

      // Horizontal scroll
      ScrollTrigger.refresh();
      const container = horizontalRef.current;
      if (container) {
        const totalScroll = container.scrollWidth - window.innerWidth;

        gsap.to(container, {
          x: () => -totalScroll,
          ease: "none",
          scrollTrigger: {
            trigger: container.parentElement,
            start: "top top",
            end: () => `+=${totalScroll + window.innerHeight}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            snap: {
              snapTo: 1 / (PROJECTS.length - 1),
              duration: { min: 0.2, max: 0.5 },
              ease: "power1.inOut",
            },
            onUpdate: (self) => {
              const index = Math.round(self.progress * (PROJECTS.length - 1));
              document.querySelectorAll(".progress-dot").forEach((dot, i) => {
                dot.classList.toggle("bg-signal", i === index);
                dot.classList.toggle("bg-line", i !== index);
              });
            },
          },
        });
      }

      return () => split.revert();
    },
    { scope: containerRef },
  );

  return (
    <>
      <section
        id="projects"
        ref={containerRef}
        className="px-6 md:px-16 py-28 md:py-36 border-t border-line"
      >
        <div className="w-full overflow-hidden">
          <p className="font-mono text-xs tracking-widest text-signal mb-4">
            PROJECTS
          </p>

          <div className="overflow-hidden mb-15">
            <h2
              ref={headingRef}
              className="font-display font-semibold text-3xl md:text-5xl text-paper leading-[1.1]"
            >
              What I've actually shipped.
            </h2>
          </div>

          <div
            ref={horizontalRef}
            className="flex gap-8 w-max pl-[10vw] pr-[20vw]"
            style={{
              touchAction: "pan-x",
              overflowX: "auto",
              overflowY: "hidden",
            }}
            onWheel={(e) => {
              e.preventDefault();
              horizontalRef.current!.scrollLeft += e.deltaY;
            }}
          >
            {PROJECTS.map((p, index) => (
              <div
                key={p.id}
                className="project-block w-[60vw] max-w-4xl shrink-0"
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
              >
                {/* top row */}
                <div className="flex flex-wrap items-end justify-between gap-4 mb-8 pb-5 border-b border-line">
                  <div className="flex flex-wrap items-end gap-2 md:gap-5">
                    <span className="font-mono text-[11px] text-paper-dim">
                      {p.number}
                    </span>
                    <h3 className="font-display font-semibold text-3xl md:text-4xl text-paper leading-none">
                      {p.name}
                    </h3>
                    <span
                      className="font-mono text-[11px] mb-1"
                      style={{ color: p.tagColor }}
                    >
                      {p.tag}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[11px] text-paper-dim">
                      {p.year}
                    </span>
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-mono text-xs text-paper-dim hover:text-paper transition-colors"
                      >
                        <FiGithub className="text-base" /> GitHub
                      </a>
                    )}
                    {p.live ? (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-mono text-xs px-4 py-2 rounded-full border border-line text-paper-dim hover:text-paper hover:border-signal/50 transition-colors"
                      >
                        <FiExternalLink className="text-base" /> Live Site
                      </a>
                    ) : (
                      <span className="font-mono text-[11px] px-4 py-2 rounded-full border border-line text-paper-dim opacity-40">
                        Private Repo
                      </span>
                    )}
                    {/* case study button */}
                    <button
                      onClick={() => setActiveProject(p)}
                      className="font-mono text-xs px-4 py-2 rounded-full bg-signal text-ink font-medium hover:opacity-90 transition-opacity"
                    >
                      Case Study →
                    </button>
                  </div>
                </div>

                {/* main content */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
                  <div>
                    <p className="text-paper-dim leading-relaxed mb-8">
                      {p.description}
                    </p>
                    <div className="space-y-3">
                      {p.highlights.map((h) => (
                        <div
                          key={h}
                          className="highlight-item flex items-start gap-3"
                        >
                          <span
                            className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                            style={{ backgroundColor: p.tagColor }}
                          />
                          <span className="text-sm text-paper-dim">{h}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-8">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="font-mono text-[11px] px-3 py-1 rounded-full border border-line text-paper-dim"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* preview image */}
                  <div
                    className="rounded-xl border border-line overflow-hidden bg-ink-soft aspect-video relative cursor-pointer group"
                    onClick={() => setActiveProject(p)}
                  >
                    <Image
                      src={p.preview}
                      alt={`${p.name} preview`}
                      fill
                      className="object-cover object-top tilt-image transition-transform duration-300"
                      style={{ transformStyle: "preserve-3d" }}
                    />
                    <div className="absolute inset-0 bg-ink/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="font-mono text-sm text-signal">
                        View Case Study →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* progress dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {PROJECTS.map((_, i) => (
              <div
                key={i}
                className={`progress-dot w-2 h-2 rounded-full transition-all duration-300 ${i === 0 ? "bg-signal" : "bg-line"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
      <AnimatePresence>
        {activeProject && (
          <CaseStudyModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
