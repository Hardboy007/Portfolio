import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { FiGithub, FiMail, FiLinkedin } from "react-icons/fi";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger, SplitText);

const LINKS = [
  {
    icon: FiMail,
    label: "Email",
    value: "hardik77.aman@gmail.com",
    href: "mailto:hardik77.aman@gmail.com",
    cta: "Say hello →",
  },
  {
    icon: FiGithub,
    label: "GitHub",
    value: "github.com/Hardboy007",
    href: "https://github.com/Hardboy007",
    cta: "See code →",
  },
  {
    icon: FiLinkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/Hardik Srivastava",
    href: "https://www.linkedin.com/in/hardik-srivastava033/",
    cta: "Connect →",
  },
];

export default function Contact() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);

  useGSAP(
    () => {
      const split = SplitText.create(headingRef.current, { type: "lines" });

      gsap.from(split.lines, {
        yPercent: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
      });

      gsap.from(subRef.current, {
        opacity: 0,
        y: 16,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: subRef.current, start: "top 85%" },
      });

      gsap.utils.toArray(".contact-link-card").forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power2.out",
          delay: i * 0.1,
          scrollTrigger: { trigger: card, start: "top 88%" },
        });
      });

      gsap.from(".footer-line", {
        scaleX: 0,
        duration: 1.2,
        ease: "power3.out",
        transformOrigin: "left center",
        scrollTrigger: { trigger: ".footer-line", start: "top 95%" },
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      id="contact"
      ref={containerRef}
      className="px-6 md:px-16 pt-28 md:pt-36 border-t border-line"
    >
      <div className="max-w-7xl mx-auto">
        {/* eyebrow */}
        <p className="font-mono text-xs tracking-widest text-signal mb-6">
          CONTACT
        </p>

        {/* big heading */}
        <div className="overflow-hidden mb-6">
          <h2
            ref={headingRef}
            className="font-display font-semibold text-4xl sm:text-6xl md:text-8xl text-paper leading-[1.05]"
          >
            Let's build
            <br />
            something real.
          </h2>
        </div>

        {/* sub text */}
        <p
          ref={subRef}
          className="text-paper-dim text-base md:text-lg max-w-xl mb-10 md:mb-16 leading-relaxed"
        >
          Open to internships and full-stack roles. I read every message and
          reply fast — usually within a few hours.
        </p>

        {/* 3 link cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12 md:mb-24">
          {LINKS.map(({ icon: Icon, label, value, href, cta }) => (
            <a
              key={label}
              href={href}
              target={label !== "Email" ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="contact-link-card group rounded-2xl border border-line bg-ink-soft p-6
                         hover:border-signal/40 hover:bg-ink-soft/80 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-8">
                <Icon className="text-xl text-paper-dim group-hover:text-signal transition-colors duration-300" />
                <span className="font-mono text-[11px] tracking-widest text-paper-dim">
                  {label.toUpperCase()}
                </span>
              </div>
              <p className="font-mono text-xs md:text-sm text-paper mb-1 truncate">
                {value}
              </p>
              <p className="font-mono text-xs text-signal opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {cta}
              </p>
            </a>
          ))}
        </div>

        {/* footer */}
        <div className="footer-line h-px bg-line mb-8" />

        <div className="flex flex-wrap items-center justify-between gap-4 pb-10">
          <p className="font-mono text-[11px] text-paper-dim/50">
            © 2026 Hardik Srivastava — Designed &amp; built by me.
          </p>
        </div>
      </div>
    </section>
  );
}
