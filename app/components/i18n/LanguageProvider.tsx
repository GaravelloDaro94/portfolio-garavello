"use client";

import { createContext, useEffect, useMemo, useState } from "react";
import { Language, translations, TranslationSchema } from "@/app/i18n/translations";

const STORAGE_KEY = "portfolio-language";

export interface I18nContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: TranslationSchema;
}

const defaultValue: I18nContextValue = {
  language: "es",
  setLanguage: () => undefined,
  toggleLanguage: () => undefined,
  t: translations.es,
};

export const I18nContext = createContext<I18nContextValue>(defaultValue);

const SPANISH_REGIONS = new Set([
  "AR",
  "BO",
  "BR",
  "CL",
  "CO",
  "CR",
  "CU",
  "DO",
  "EC",
  "SV",
  "GT",
  "HN",
  "MX",
  "NI",
  "PA",
  "PY",
  "PE",
  "PR",
  "UY",
  "VE",
  "ES",
]);

function getRegionFromLocale(locale: string): string | null {
  const normalized = locale.replace("_", "-").trim();
  const parts = normalized.split("-");
  if (parts.length < 2) {
    return null;
  }

  const region = parts[parts.length - 1]?.toUpperCase();
  return region && region.length === 2 ? region : null;
}

function detectBrowserLanguage(): Language {
  if (typeof navigator === "undefined") {
    return "es";
  }

  const locales = [
    ...(Array.isArray(navigator.languages) ? navigator.languages : []),
    navigator.language,
  ].filter(Boolean);

  for (const locale of locales) {
    const normalized = locale.toLowerCase();
    if (normalized.startsWith("es")) {
      return "es";
    }

    const region = getRegionFromLocale(locale);
    if (region && SPANISH_REGIONS.has(region)) {
      return "es";
    }
  }

  return "en";
}

export function LanguageProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [language, setLanguageState] = useState<Language>("es");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "es" || stored === "en") {
      setLanguageState(stored);
      return;
    }

    setLanguageState(detectBrowserLanguage());
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language === "en" ? "en" : "es";
  }, [language]);

  const setLanguage = (value: Language) => {
    setLanguageState(value);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === "es" ? "en" : "es"));
  };

  const value = useMemo<I18nContextValue>(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t: translations[language],
    }),
    [language]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
