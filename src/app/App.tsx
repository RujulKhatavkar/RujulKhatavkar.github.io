import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Education } from "./components/Education";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";
import { Footer } from "./components/Footer";
import { GlobalParallaxBackground } from "./components/bgParralax";
import { Projects } from "./components/Projects";

export default function App() {
  return (
    <div className="relative min-h-screen text-white">
      <GlobalParallaxBackground />
      <Navigation />
      <Hero />
      <Education />
      <Experience />
      <Skills />
      <Projects />
      <Footer />
    </div>
  );
}