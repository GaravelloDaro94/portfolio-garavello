"use client";

import TypewriterEffect from "./animations/TypewriterEffect";
import Header from "./layout/Header";
import { useHeader } from "../hooks/useHeader";
import { useI18n } from "../hooks/useI18n";
import { TEXT_PRIMARY, GLASSMORPHISM_BASE, SHADOW_BASE, SHADOW_HOVER } from "../utils/styles";

export default function HeroOverlay() {
  const { scrolled, scrollToSection } = useHeader();
  const { t } = useI18n();

  return (
    <div
      className={`fixed inset-0 z-30 flex flex-col px-6 pt-4 pb-10 sm:px-10 sm:pt-6 transition-all duration-500 ${
        scrolled ? "opacity-0 pointer-events-none -translate-y-4" : "opacity-100 pointer-events-auto translate-y-0"
      }`}
    >
      {/* Top nav bar */}
      <Header variant="initial" />

      {/* Hero content */}
      <div className="flex flex-1 flex-col justify-center">
        <h1
          className={`opacity-0 animate-[slideInCascade_0.45s_ease_forwards] text-6xl font-bold leading-[0.95] sm:text-7xl md:text-8xl lg:text-8xl xl:text-9xl ${TEXT_PRIMARY}`}
        >
          Darío
          <br />
          <span className="ml-10 sm:ml-16 md:ml-20">Garavello</span>
        </h1>

        <p
          className="opacity-0 animate-[slideInCascade_0.45s_ease_forwards] mt-6 ml-12 sm:ml-24 md:ml-36 font-light text-xl sm:text-2xl md:text-3xl text-light-text dark:text-dark-blue-pastel"
          style={{ animationDelay: "120ms" }}
        >
          <TypewriterEffect phrases={[...t.main.phrases]} />
        </p>
      </div>

      {/* Scroll down button */}
      <div className="flex justify-center opacity-0 animate-[slideInCascade_0.45s_ease_forwards]" style={{ animationDelay: "240ms" }}>
        <button
          onClick={() => scrollToSection("about")}
          className={`p-3 rounded-xl transition-all cursor-pointer ${GLASSMORPHISM_BASE} ${SHADOW_BASE} ${SHADOW_HOVER}`}
          aria-label={t.main.scrollToAboutAria}
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
  );
}
