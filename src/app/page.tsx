import {BootSequence}  from "@/components/BootSequence";
import { CursorGlow } from "@/components/CursorGlow";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Marquee } from "@/components/landing/Marquee";
import { ModuleRail } from "@/components/landing/ModuleRail";
import { StatsSection } from "@/components/landing/StatsSection";
import { CtaSection, Footer } from "@/components/landing/FooterCta";

export default function Home() {
  return (
    <main className="relative">
      <BootSequence />
      <CursorGlow />
      <Navbar />
      <Hero />
      <Marquee />
      <ModuleRail />
      <StatsSection />
      <CtaSection />
      <Footer />
    </main>
  );
}