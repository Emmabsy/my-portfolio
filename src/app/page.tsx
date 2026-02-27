import { Navbar }           from "@/components/sections/Navbar";
import { HeroSection }       from "@/components/sections/HeroSection";
import { DiagonalBand }      from "@/components/sections/DiagonalBand";
import { ProjectsSection }   from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { HomeCTA }           from "@/components/sections/HomeCTA";
import { Footer }            from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 grid-texture" />
      <Navbar />
      <HeroSection />
      <DiagonalBand />
      <ProjectsSection />
      <ExperienceSection />
      <HomeCTA />
      <Footer />
    </main>
  );
}
