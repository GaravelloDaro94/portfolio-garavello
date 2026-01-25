import Header from "./components/layout/Header";
import DynamicBackground from "./components/layout/DynamicBackground";
import LoadingAnimation from "./components/animations/LoadingAnimation";
import HorizontalScroll from "./components/layout/HorizontalScroll";
import MainSection from "./screens/MainSection";
import AboutSection from "./screens/AboutSection";
import ProjectsSection from "./screens/ProjectsSection";
import SkillsSection from "./screens/SkillsSection";
import ContactSection from "./screens/ContactSection";
import Footer from "./screens/Footer";

// JSON-LD Structured Data para SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Darío Garavello",
  "jobTitle": "Developer",
  "description": "Desarrollador especializado en React, Next.js, TypeScript, Node.js y tecnologías modernas web",
  "url": "https://portfolio-garavello.vercel.app",
  "sameAs": [
    // Agregar links a redes sociales cuando estén disponibles
    // "https://github.com/tu-usuario",
    // "https://linkedin.com/in/tu-perfil",
  ],
  "knowsAbout": [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "JavaScript",
    "Express",
    "PostgreSQL",
    "MongoDB",
    "Tailwind CSS",
    "Web Development",
    "Frontend Development",
    "Backend Development"
  ],
  "alumniOf": {
    "@type": "Organization",
    "name": "Andreani Logística SA"
  },
  "worksFor": {
    "@type": "Organization",
    "name": "Andreani Logística SA"
  }
};

export default function Home() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <LoadingAnimation />
      <DynamicBackground />
      <Header />
      <Footer />
      <main className="snap-y snap-mandatory overflow-y-scroll h-screen relative z-10">
        {/* Main Section - Scroll vertical normal */}
        <section className="snap-start min-h-screen">
          <MainSection />
        </section>
        
        {/* Horizontal Scroll Container */}
        <section className="snap-start">
          <HorizontalScroll>
            <div className="w-full h-screen flex-shrink-0 snap-start">
              <AboutSection />
            </div>
            <div className="w-full h-screen flex-shrink-0 snap-start">
              <ProjectsSection />
            </div>
            <div className="w-full h-screen flex-shrink-0 snap-start">
              <SkillsSection />
            </div>
            <div className="w-full h-screen flex-shrink-0 snap-start">
              <ContactSection />
            </div>
          </HorizontalScroll>
        </section>
      </main>
    </>
  );
}
