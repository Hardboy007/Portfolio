import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// WHY THIS HOOK EXISTS:
// Lenis takes over the scroll and makes it "smooth" (eased, not native jump-scroll).
// GSAP's ScrollTrigger, by default, listens to the browser's native scroll position
// to decide when to fire animations. If we don't connect the two, ScrollTrigger keeps
// checking native scroll while Lenis is doing its own thing underneath - so scroll
// animations glitch or fire at the wrong position.
export default function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1, // how long the "coasting" ease takes, in seconds
      easing: (t) => 1 - Math.pow(1 - t, 3), // ease-out cubic
      smoothWheel: true,
    });

    // Every time Lenis moves the scroll, ask ScrollTrigger to recalc positions
    lenis.on("scroll", ScrollTrigger.update);

    // Single shared clock: let GSAP's ticker drive Lenis's frame updates,
    // instead of running our own requestAnimationFrame loop alongside it.
    // (Running both would tick Lenis twice per frame - a subtle bug.)
    const update = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(update);

    // GSAP's ticker uses its own internal smoothing by default (lagSmoothing),
    // which fights with Lenis's easing. Turn it off so scroll stays 1:1.
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);
}
