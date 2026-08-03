import { useEffect, useState } from "react";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#tech", label: "Tech Arsenal", shortLabel: "Tech" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-40% 0px -55% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-4 md:top-8 left-0 right-0 z-40 flex justify-center pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-3 md:gap-8 mt-3 px-4 md:px-5 py-2 md:py-2.5 rounded-full border border-line bg-ink-soft/80 backdrop-blur-sm">
        <span className="font-mono text-xs text-signal">HS</span>
        {LINKS.map((l) => {
          const sectionId = l.href.replace("#", "");
          const isActive = active === sectionId;
          return (
            <a
              key={l.href}
              href={l.href}
              className={`font-mono text-xs transition-colors whitespace-nowrap ${
                isActive ? "text-signal" : "text-paper-dim hover:text-paper"
              }`}
            >
              <span className="hidden sm:inline">{l.label}</span>
              <span className="sm:hidden">{l.shortLabel || l.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
