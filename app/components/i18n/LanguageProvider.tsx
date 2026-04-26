"use client";

import { createContext, useEffect, useMemo, useState } from "react";
import { Language, translations, TranslationSchema } from "@/app/i18n/translations";

const STORAGE_KEY = "portfolio-languageState";

export interface I18nContextValue {
  languageState: Language;
  setLanguage: (languageState: Language) => void;
  toggleLanguage: () => void;
  t: TranslationSchema;
}

const defaultValue: I18nContextValue = {
  languageState: "es",
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

  const region = parts.at(-1)?.toUpperCase();
  return region?.length === 2 ? region : null;
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

function getInitialLanguageState(): Language {
  if (globalThis.window === undefined) {
    return "es";
  }

  const stored = globalThis.localStorage.getItem(STORAGE_KEY);
  if (stored === "es" || stored === "en") {
    return stored;
  }

  return detectBrowserLanguage();
}

export function LanguageProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [languageState, setLanguageState] = useState<Language>(getInitialLanguageState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, languageState);
    document.documentElement.lang = languageState === "en" ? "en" : "es";
  }, [languageState]);

  const setLanguage = (value: Language) => {
    setLanguageState(value);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === "es" ? "en" : "es"));
  };

  const value = useMemo<I18nContextValue>(
    () => ({
      languageState,
      setLanguage,
      toggleLanguage,
      t: translations[languageState],
    }),
    [languageState]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
