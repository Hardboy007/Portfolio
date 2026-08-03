import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// HOW THIS WORKS:
// We track the mouse position relative to the button's own center.
// The further the mouse is from center, the more we'd normally move -
// but we clamp/scale it down (STRENGTH) so it's a subtle pull, not a jump.
const STRENGTH = 0.35;

export default function MagneticButton({ children, className = "", ...props }) {
  const btnRef = useRef(null);

  // useGSAP is a drop-in replacement for useEffect made for GSAP:
  // - it auto-cleans up animations/listeners when the component unmounts
  // - it protects against React 18 StrictMode's double-invoke in dev,
  //   which would otherwise register duplicate mousemove listeners
  useGSAP(() => {
    const el = btnRef.current;
    if (!el) return;

    function handleMove(e) {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);

      gsap.to(el, {
        x: relX * STRENGTH,
        y: relY * STRENGTH,
        duration: 0.4,
        ease: "power2.out",
      });
    }

    function handleLeave() {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
    }

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <button ref={btnRef} className={className} {...props}>
      {children}
    </button>
  );
}
