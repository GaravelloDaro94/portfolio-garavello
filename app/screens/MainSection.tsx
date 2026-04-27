"use client";

import TypewriterEffect from "../components/animations/TypewriterEffect";
import Header from "../components/layout/Header";
import { useHeader } from "../hooks/useHeader";
import { useI18n } from "../hooks/useI18n";
import { TEXT_PRIMARY, GLASSMORPHISM_BASE, SHADOW_BASE, SHADOW_HOVER } from "../utils/styles";

export default function MainSection() {
  const { scrolled, scrollToSection } = useHeader();
  const { t } = useI18n();

  return (
    <section
      id="home"
      className={`flex flex-col justify-between gap-8 py-6 px-4 transition-all duration-300 ${
        scrolled
          ? "fixed top-0 left-0 z-20 h-screen w-[33vw] min-w-[290px] max-w-[33vw]"
          : "h-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="space-y-5">
        <h1
          className={`text-4xl font-bold leading-[0.95] sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl ${TEXT_PRIMARY}`}
        >
          Darío
          <br />
          <span className="ml-7 sm:ml-10">Garavello</span>
        </h1>

        <p
          className="font-light text-base sm:text-xl text-light-text dark:text-dark-blue-pastel"
        >
          <TypewriterEffect phrases={[...t.main.phrases]} />
        </p>
      </div>

      <div>
        <Header variant="compact" />
      </div>

      <div className="pt-2 hidden lg:block">
        <button
          onClick={() => scrollToSection("about")}
          className={`p-3 rounded-xl transition-all cursor-pointer lg:inline-flex ${GLASSMORPHISM_BASE} ${SHADOW_BASE} ${SHADOW_HOVER}`}
          aria-label={t.main.scrollToAboutAria}
        >
          <svg
            className={`h-6 w-6 ${TEXT_PRIMARY} animate-bounce`}
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
    </section>
  );
}
