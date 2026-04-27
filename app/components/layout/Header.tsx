"use client";

import Link from "next/link";
import { useState } from "react";
import { useHeader } from "../../hooks/useHeader";
import { useI18n } from "../../hooks/useI18n";
import { useNavItems } from "../../hooks/useNavItems";
import { SectionId } from "../../models";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";

interface HeaderProps {
  variant?: "initial" | "compact";
}

const NAV_BUTTON_ACTIVE = "bg-white/60 text-dark-charcoal dark:bg-dark-blue-gray/65 dark:text-dark-smoke";
const NAV_BUTTON_INACTIVE = "text-light-text dark:text-gray-200 hover:bg-white/30 dark:hover:bg-dark-medium/50";

interface MobileNavProps {
  activeSection: SectionId;
  scrollToSection: (id: SectionId) => void;
  blogLabel: string;
  navItems: ReturnType<typeof useNavItems>;
}

function MobileNav({ activeSection, scrollToSection, blogLabel, navItems }: Readonly<MobileNavProps>) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="lg:hidden sticky top-0 z-40 rounded-2xl border border-light-border/40 bg-white/40 px-4 py-3 backdrop-blur-md dark:border-dark-medium/70 dark:bg-dark-medium/35">
      <div className="flex items-center justify-between">
        <button
          onClick={() => { scrollToSection("home"); setOpen(false); }}
          className="rounded-lg border border-blue-pastel/60 px-3 py-1 text-sm font-bold text-light-text dark:border-dark-blue-pastel/60 dark:text-dark-smoke"
        >
          DG
        </button>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="rounded-lg p-2 text-light-text transition-colors hover:bg-white/30 dark:text-dark-smoke dark:hover:bg-dark-medium/50"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              {open ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <ul className="mt-3 space-y-2 border-t border-light-border/40 pt-3 dark:border-dark-medium/70">
          {navItems.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => { scrollToSection(id); setOpen(false); }}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm capitalize transition-colors ${
                  activeSection === id ? NAV_BUTTON_ACTIVE : NAV_BUTTON_INACTIVE
                }`}
                aria-current={activeSection === id ? "page" : undefined}
              >
                {label}
              </button>
            </li>
          ))}
          <li>
            <Link
              href="/blog"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-light-text transition-colors hover:bg-white/30 dark:text-gray-200 dark:hover:bg-dark-medium/50"
            >
              {blogLabel}
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default function Header({ variant = "compact" }: Readonly<HeaderProps>) {
  const { activeSection, scrollToSection } = useHeader();
  const { t } = useI18n();
  const navItems = useNavItems();

  if (variant === "initial") {
    return (
      <header className="w-full">
        <nav className="hidden lg:flex items-center justify-between gap-6 rounded-2xl border border-light-border/40 bg-white/40 px-5 py-3 backdrop-blur-md dark:border-dark-medium/70 dark:bg-dark-medium/35">
          <button
            onClick={() => scrollToSection("home")}
            className="rounded-lg border border-blue-pastel/60 px-3 py-1 text-sm font-bold text-light-text dark:border-dark-blue-pastel/60 dark:text-dark-smoke ml-2"
          >
            DG
          </button>

          <ul className="flex items-center gap-3">
            {navItems.map(({ id, label }) => (
              <li key={id}>
                <button
                  onClick={() => scrollToSection(id)}
                  className={`rounded-lg px-3 py-2 text-xs font-semibold capitalize transition-colors ${
                    activeSection === id ? NAV_BUTTON_ACTIVE : NAV_BUTTON_INACTIVE
                  }`}
                  aria-current={activeSection === id ? "page" : undefined}
                >
                  {label}
                </button>
              </li>
            ))}
            <li>
              <Link
                href="/blog"
                className="rounded-lg px-3 py-2 text-xs font-semibold text-light-text transition-colors hover:bg-white/30 dark:text-gray-200 dark:hover:bg-dark-medium/50"
              >
                {t.nav.blog}
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-4">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </nav>

        <MobileNav
          activeSection={activeSection}
          scrollToSection={scrollToSection}
          blogLabel={t.nav.blog}
          navItems={navItems}
        />
      </header>
    );
  }

  return (
    <header className="w-full">
      <nav className="hidden lg:flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <ThemeToggle />
        </div>

        <ul className="space-y-2">
          {navItems.map(({ id, label }, index) => (
            <li
              key={id}
              className="opacity-0 animate-[slideInCascade_0.45s_ease_forwards]"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <button
                onClick={() => scrollToSection(id)}
                className={`w-full rounded-xl px-4 py-2 text-left text-sm font-semibold capitalize transition-all duration-300 ${
                  activeSection === id
                    ? "bg-white/55 dark:bg-dark-blue-gray/60 text-dark-charcoal dark:text-dark-smoke shadow-md shadow-gray-300/50 dark:shadow-black/40"
                    : "text-light-text/80 dark:text-gray-300 hover:bg-white/35 dark:hover:bg-dark-medium/45"
                }`}
                aria-current={activeSection === id ? "page" : undefined}
              >
                <span className="inline-flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full transition-colors ${
                      activeSection === id ? "bg-teal-500 dark:bg-cyan-300" : "bg-light-text/30 dark:bg-gray-500"
                    }`}
                  />
                  {label}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <Link
          href="/blog"
          className="mt-1 rounded-xl px-4 py-2 text-sm font-semibold text-light-text dark:text-gray-200 transition-colors hover:bg-white/35 dark:hover:bg-dark-medium/45"
        >
          {t.nav.blog}
        </Link>
      </nav>

      <MobileNav
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        blogLabel={t.nav.blog}
        navItems={navItems}
      />
    </header>
  );
}
