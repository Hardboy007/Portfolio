"use client";

import Cursor from "@/components/Cursor";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import StatusBar from "@/components/StatusBar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TechArsenal from "@/components/TechArsenal";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import SmoothScroll from "@/components/SmoothScroll";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";

export default function Home() {
  return (
    <>
      <Cursor />
      <KeyboardShortcuts />
      <Loader />
      <SmoothScroll>
        <StatusBar />
        <Navbar />
        <main>
          <Hero />
          <About />
          <TechArsenal />
          <Projects />
          <Contact />
        </main>
      </SmoothScroll>
    </>
  );
}