import DynamicBackground from "./components/layout/DynamicBackground";
import LoadingAnimation from "./components/animations/LoadingAnimation";
import HeroOverlay from "./components/HeroOverlay";
import MainSection from "./screens/MainSection";
import AboutSection from "./screens/AboutSection";
import ProjectsSection from "./screens/ProjectsSection";
import SkillsSection from "./screens/SkillsSection";
import ContactSection from "./screens/ContactSection";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();

// JSON-LD Structured Data para SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Darío Garavello",
  "jobTitle": "Developer",
  "description": "Desarrollador especializado en React, Next.js, TypeScript, Node.js y tecnologías modernas web",
  "url": siteUrl,
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
      <HeroOverlay />
      <main className="relative z-10 pt-[100vh]">
        <div className="mx-auto max-w-[1800px] px-4 pb-12 pt-4 sm:px-6 lg:px-8 lg:pt-6">
          <div className="grid gap-8 lg:grid-cols-[minmax(290px,33vw)_1fr] lg:gap-10 xl:gap-14">
            <aside className="hidden lg:block">
              <MainSection />
            </aside>

            <div className="space-y-10 pb-10 sm:space-y-12 lg:space-y-16 lg:pt-6">
              <AboutSection />
              <SkillsSection />
              <ProjectsSection />
              <ContactSection />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
