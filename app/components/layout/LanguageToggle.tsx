"use client";

import { useI18n } from "@/app/hooks/useI18n";

export default function LanguageToggle() {
  const { languageState, toggleLanguage, t } = useI18n();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="inline-flex items-center rounded-full border-2 border-blue-pastel/80 bg-blue-pastel/20 px-3 py-1 text-xs font-semibold text-light-text transition-colors hover:bg-blue-pastel/40 dark:border-dark-blue-pastel/80 dark:bg-dark-blue-gray/40 dark:text-dark-smoke dark:hover:bg-dark-blue-pastel/30"
      aria-label={t.languageToggle.ariaLabel}
      title={t.languageToggle.ariaLabel}
    >
      {languageState === "es" ? "ES | EN" : "EN | ES"}
    </button>
  );
}
