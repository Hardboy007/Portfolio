import useSmoothScroll from "./lib/useSmoothScroll";
import StatusBar from "./components/StatusBar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import TechArsenal from "./components/TechArsenal";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Loader from "./components/Loader";
import Cursor from "./components/Cursor";

export default function App() {
  // Initializes Lenis smooth scroll for the whole app, synced with GSAP's
  // ScrollTrigger. Called once here at the top level so it applies globally.
  useSmoothScroll();

  return (
    <>
    <Cursor />
    <Loader />
      <StatusBar />
      <Navbar />
      <main>
        <Hero />
        <About />
        <TechArsenal />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
