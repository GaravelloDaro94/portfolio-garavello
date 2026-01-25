"use client";

import TypewriterEffect from "../components/animations/TypewriterEffect";
import { useHeader } from "../hooks/useHeader";
import { TEXT_PRIMARY, GLASSMORPHISM_BASE, SHADOW_BASE, SHADOW_HOVER } from "../utils/styles";

export default function MainSection() {
  const { scrollToSection } = useHeader();
  
  const phrases = [
    "Fullstack Developer",
    "Software Engineer",
    "Programador",
    "Solucionador de problemas"
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 pl-12 sm:pl-16">
      <div className="max-w-4xl w-full">
        <div className="space-y-4 sm:space-y-6">
          <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold ${TEXT_PRIMARY} leading-tight`}>
            Darío
            <br />
            <span className="ml-8 sm:ml-12 md:ml-18">Garavello</span>
          </h1>
          <p className="ml-12 sm:ml-24 md:ml-36 text-xl sm:text-2xl md:text-3xl text-light-text dark:text-dark-blue-pastel font-light">
            <TypewriterEffect phrases={phrases} />
          </p>
          <div className="pt-8 flex justify-center">
            <button 
              onClick={() => scrollToSection("about")}
              className={`p-3 rounded-xl transition-all cursor-pointer ${GLASSMORPHISM_BASE} ${SHADOW_BASE} ${SHADOW_HOVER}`}
              aria-label="Scroll to about section"
            >
              <svg 
                className={`w-8 h-8 ${TEXT_PRIMARY} animate-bounce`}
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
