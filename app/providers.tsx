"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";
import { LanguageProvider } from "./components/i18n/LanguageProvider";

export function Providers({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark">
      <LanguageProvider>{children}</LanguageProvider>
    </NextThemesProvider>
  );
}
