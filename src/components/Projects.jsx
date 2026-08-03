import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { FiExternalLink, FiGithub } from "react-icons/fi";

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
    // replace with your actual screenshot path
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

export default function Projects() {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const headingRef = useRef(null);

  useGSAP(
    () => {
      const split = SplitText.create(headingRef.current, { type: "lines" });
      gsap.from(split.lines, {
        yPercent: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
      });

      gsap.utils.toArray(".project-block").forEach((block, i) => {
        gsap.from(block, {
          opacity: 0,
          y: 60,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: block, start: "top 78%" },
          delay: i * 0.1,
        });
      });

      gsap.utils.toArray(".highlight-item").forEach((item, i) => {
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

        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;

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

      return () => split.revert();
    },
    { scope: containerRef },
  );

  return (
    <section
      id="projects"
      ref={containerRef}
      className="px-6 md:px-16 py-28 md:py-36 border-t border-line"
    >
      <div className="max-w-7xl mx-auto">
        {/* heading */}
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

        {/* project blocks */}
        <div className="space-y-14 md:space-y-20">
          {PROJECTS.map((p, index) => (
            <div
              key={p.id}
              className="project-block"
              ref={(el) => (cardRefs.current[index] = el)}
            >
              {/* top row: number + name + year + links */}
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

                {/* links */}
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
                      <FiGithub className="text-base" />
                      GitHub
                    </a>
                  )}
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 font-mono text-xs px-4 py-2 rounded-full border border-line text-paper-dim hover:text-paper hover:border-signal/50 transition-colors"
                    >
                      <FiExternalLink className="text-base" />
                      Live Site
                    </a>
                  )}
                  {!p.live && (
                    <span className="font-mono text-[11px] px-4 py-2 rounded-full border border-line text-paper-dim opacity-40">
                      Private Repo
                    </span>
                  )}
                </div>
              </div>

              {/* main content: 2 col */}
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
                {/* left: description + highlights */}
                <div>
                  <p className="text-paper-dim leading-relaxed mb-8">
                    {p.description}
                  </p>

                  {/* highlight list */}
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

                  {/* stack pills */}
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

                {/* right: preview image or placeholder */}
                <div className="rounded-xl border border-line overflow-hidden bg-ink-soft aspect-video flex items-center justify-center">
                  <img
                    src={p.preview}
                    alt={`${p.name} preview`}
                    className="w-full h-full object-cover object-top tilt-image"
                    style={{ transformStyle: "preserve-3d" }}
                    onError={(e) => {
                      // if image not found, show a placeholder
                      e.target.style.display = "none";
                      e.target.parentNode.classList.add("placeholder-active");
                    }}
                  />
                  {/* fallback shown via CSS if image fails */}
                  <div className="placeholder-content hidden font-mono text-xs text-paper-dim text-center p-8">
                    <p className="text-2xl mb-2">🖼️</p>
                    <p>Add screenshot to</p>
                    <p className="text-signal">
                      /public/images/{p.id}-preview.png
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
