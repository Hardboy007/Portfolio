import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches
  ) {
    return null;
  }
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;

    // hide default cursor
    document.body.style.cursor = "none";

    const moveCursor = (e) => {
      // dot follows instantly
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0,
      });
    };

    // hover pe ring badi ho jaye
    const onEnter = () => {
      gsap.to(ring, {
        scale: 2.5,
        opacity: 0.4,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(dot, {
        scale: 0,
        duration: 0.3,
      });
    };

    const onLeave = () => {
      gsap.to(ring, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(dot, {
        scale: 1,
        duration: 0.3,
      });
    };

    // click pe squish
    const onClick = () => {
      gsap.to(ring, {
        scale: 0.8,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
      });
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("click", onClick);

    // interactive elements pe hover effect
    const interactives = document.querySelectorAll("a, button, [data-cursor]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      el.style.cursor = "none";
    });

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("click", onClick);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);
  if (window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <>
      {/* small dot — follows instantly */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-999 pointer-events-none -translate-x-1/2 -translate-y-1/2"
      >
        <div className="w-3.5 h-3.5 rounded-full bg-white" />
      </div>
    </>
  );
}
