"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";

export function Providers({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark">
      {children}
    </NextThemesProvider>
  );
}
