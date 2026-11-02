"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Tech", href: "#tech" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -60,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 1.8,
    });
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-6 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-16 py-4 transition-all duration-300 ${
        scrolled
          ? "bg-ink/80 backdrop-blur-md border-b border-line"
          : "bg-transparent"
      }`}
    >
      {/* logo */}
      <button
        onClick={() => scrollTo("#hero")}
        className="font-mono text-sm text-signal font-medium tracking-wider"
      >
        HS<span className="text-paper-dim">.</span>dev
      </button>

      {/* desktop links */}
      <div className="hidden md:flex items-center gap-8">
        {LINKS.map(({ label, href }) => (
          <button
            key={href}
            onClick={() => scrollTo(href)}
            className="font-mono text-xs text-paper-dim hover:text-paper transition-colors duration-200"
          >
            {label}
          </button>
        ))}
        <button
          onClick={() => window.open("https://drive.google.com/file/d/1cnMchFarxvXxXSopvSlNlnfznB8lBmW9/view?usp=drive_link", "_blank")}
          className="font-mono text-xs px-4 py-2 rounded-full border border-signal text-signal hover:bg-signal hover:text-ink transition-all duration-200"
        >
          Resume ↗
        </button>
      </div>

      {/* mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className={`block w-5 h-px bg-paper transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block w-5 h-px bg-paper transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
        <span className={`block w-5 h-px bg-paper transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-ink/95 backdrop-blur-md border-b border-line p-6 flex flex-col gap-4 md:hidden">
          {LINKS.map(({ label, href }) => (
            <button
              key={href}
              onClick={() => scrollTo(href)}
              className="font-mono text-sm text-paper-dim hover:text-paper transition-colors text-left"
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => window.open("https://drive.google.com/file/d/1cnMchFarxvXxXSopvSlNlnfznB8lBmW9/view?usp=drive_link", "_blank")}
            className="font-mono text-xs px-4 py-2 rounded-full border border-signal text-signal w-fit"
          >
            Resume ↗
          </button>
        </div>
      )}
    </nav>
  );
}