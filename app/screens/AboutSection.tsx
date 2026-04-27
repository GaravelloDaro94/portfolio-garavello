"use client";

import Chatbot from "../components/Chatbot";
import TypewriterTitle from "../components/animations/TypewriterTitle";
import FadeInCard from "../components/animations/FadeInCard";
import { useI18n } from "../hooks/useI18n";
import { TEXT_PRIMARY, GLASSMORPHISM_BASE, BORDER_BASE } from "../utils/styles";

export default function AboutSection() {
  const { t } = useI18n();

  return (
    <section
      id="about"
      className="min-h-screen px-1 py-8 sm:px-2 sm:py-10 lg:py-14"
    >
      <div className="w-full">
        <TypewriterTitle
          text={t.about.title}
          className={`text-2xl sm:text-3xl md:text-4xl font-bold ${TEXT_PRIMARY} mb-3 sm:mb-4`}
        />

        <FadeInCard>
          <div className={`rounded-2xl p-4 sm:p-6 transition-all ${GLASSMORPHISM_BASE} bg-white/70 dark:bg-dark-medium/60 shadow-lg shadow-gray-300/50 dark:shadow-black/50`}>
            <div className="space-y-3 text-sm leading-relaxed text-gray-700 dark:text-gray-200 sm:space-y-4 sm:text-[0.95rem] mb-4 sm:mb-6">
              {t.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {/* Chatbot */}
            <div className={`mt-4 sm:mt-6 pt-4 sm:pt-6 ${BORDER_BASE} border-t`}>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-3 sm:mb-4">
                {t.about.chatPrompt}
              </p>
              <Chatbot />
            </div>
          </div>
        </FadeInCard>
      </div>
    </section>
  );
}
