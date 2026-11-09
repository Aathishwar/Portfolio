import { useEffect } from "react";
import { ClickSparks } from "@/components/ClickSparks";
import { Contact } from "@/components/Contact";
import { Credentials } from "@/components/Credentials";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { ScrollRail } from "@/components/ScrollRail";
import { Stack } from "@/components/Stack";
import { Work } from "@/components/Work";
import { sectionIds } from "@/data/sections";
import { useActiveSection } from "@/hooks/useActiveSection";

export default function App() {
  const active = useActiveSection(sectionIds);

  // The browser tries to jump to #hash before React has rendered the sections; redo it once they exist.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-accent px-4 py-2 font-medium text-accent-fg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Nav active={active} />
      <ScrollRail active={active} />
      <main id="main">
        <Hero />
        <Experience />
        <Work />
        <Stack />
        <Credentials />
        <Contact />
      </main>
      <Footer />
      <ClickSparks />
    </>
  );
}
