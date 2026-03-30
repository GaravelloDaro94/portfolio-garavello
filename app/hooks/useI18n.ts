"use client";

import { useContext } from "react";
import { I18nContext } from "@/app/components/i18n/LanguageProvider";

export function useI18n() {
  return useContext(I18nContext);
}
