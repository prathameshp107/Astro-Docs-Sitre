import { useReveal } from "@/hooks/use-reveal";
import { Nav } from "./Nav";
import { ScrollProgress } from "./ScrollProgress";
import { Hero } from "./Hero";
import { Problem } from "./Problem";
import { Ecosystem } from "./Ecosystem";
import { Documentation } from "./Documentation";
import { Labs } from "./Labs";
import { Dsa } from "./Dsa";
import { Visualizers } from "./Visualizers";
import { Interview } from "./Interview";
import { Mcq } from "./Mcq";
import { Roadmaps } from "./Roadmaps";
import { Companies } from "./Companies";
import { Showcase } from "./Showcase";
import { ProgressXp } from "./ProgressXp";
import { Community } from "./Community";
import { Faq } from "./Faq";
import { FinalCta } from "./FinalCta";
import { Footer } from "./Footer";

export default function LandingPage() {
  useReveal();

  return (
    <div className="landing-wrapper min-h-screen bg-background text-foreground antialiased selection:bg-accent selection:text-accent-foreground">
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Ecosystem />
        <Documentation />
        <Labs />
        <Dsa />
        <Visualizers />
        <Interview />
        <Mcq />
        <Roadmaps />
        <Companies />
        <Showcase />
        <ProgressXp />
        <Community />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
