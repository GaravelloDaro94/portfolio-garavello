"use client";

import Link from "next/link";
import { useState } from "react";
import { useHeader } from "../../hooks/useHeader";
import { useThemeDetection } from "../../hooks/useThemeDetection";
import { SectionId } from "../../models";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
  const { scrolled, scrollToSection } = useHeader();
  const { isDark } = useThemeDetection();

  const navItems: SectionId[] = ["about", "projects", "skills", "contact"];
  
  const getHeaderBackground = () => {
    if (!scrolled) return undefined;
    return isDark ? 'rgba(58, 74, 88, 0.95)' : 'rgba(167, 199, 231, 0.95)';
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md shadow-md border-b-2 border-light-border dark:border-dark-medium"
          : "bg-transparent"
      }`}
      style={{ backgroundColor: getHeaderBackground() }}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        <button
          onClick={() => {
            scrollToSection("home");
            setMobileMenuOpen(false);
          }}
          className="text-lg sm:text-xl font-bold text-light-text dark:text-dark-smoke hover:text-pink dark:hover:text-dark-blue-pastel transition-colors border-2 border-blue-pastel dark:border-dark-blue-pastel rounded-lg px-2 py-1 sm:px-3 sm:py-1"
        >
          DG
        </button>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 relative">
          {/* Navigation Items - appear as chevron passes */}
          <ul className="flex gap-6 items-center">
            {navItems.map((item, index) => (
              <li 
                key={item}
                className={`transition-all duration-300 ${
                  desktopMenuOpen 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-4'
                }`}
                style={{
                  transitionDelay: desktopMenuOpen ? `${index * 100}ms` : '0ms'
                }}
              >
                <button
                  onClick={() => scrollToSection(item)}
                  className="text-sm font-medium text-light-text dark:text-gray-300 hover:text-pink dark:hover:text-dark-blue-pastel transition-colors capitalize whitespace-nowrap"
                >
                  {item}
                </button>
              </li>
            ))}
            <li
              className={`transition-all duration-300 ${
                desktopMenuOpen 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-4'
              }`}
              style={{
                transitionDelay: desktopMenuOpen ? `${navItems.length * 100}ms` : '0ms'
              }}
            >
              <Link
                href="/blog"
                className="text-sm font-medium text-light-text dark:text-gray-300 hover:text-pink dark:hover:text-dark-blue-pastel transition-colors whitespace-nowrap"
              >
                Blog
              </Link>
            </li>
          </ul>

          {/* Chevron Button - slides to the left on click */}
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes bounceHorizontal {
              0%, 100% {
                transform: translateX(0);
              }
              50% {
                transform: translateX(-5px);
              }
            }
            .chevron-btn:hover:not(.menu-open) .chevron-icon {
              animation: bounceHorizontal 1s ease-in-out infinite;
            }
          `}} />
          <button
            onClick={() => setDesktopMenuOpen(!desktopMenuOpen)}
            className={`chevron-btn px-3 py-2 rounded-full text-light-text dark:text-dark-smoke hover:text-pink dark:hover:text-dark-blue-pastel transition-all duration-500 hover:bg-white/30 dark:hover:bg-dark-medium/40 hover:backdrop-blur-sm hover:shadow-lg hover:shadow-yellow/40 dark:hover:shadow-dark-blue-pastel/40 ${
              desktopMenuOpen ? '-translate-x-[420px] menu-open' : 'translate-x-0'
            }`}
            aria-label="Toggle navigation menu"
          >
            <svg
              className={`chevron-icon w-6 h-6 transition-transform duration-300 ${desktopMenuOpen ? 'rotate-180' : ''}`}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-light-text dark:text-dark-smoke hover:text-pink dark:hover:text-dark-blue-pastel transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white/30 dark:bg-dark-medium/40 backdrop-blur-sm shadow-lg shadow-gray-300/50 dark:shadow-black/50 border-b-2 border-light-border dark:border-dark-medium md:hidden">
            <ul className="flex flex-col py-4">
              {navItems.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => {
                      scrollToSection(item);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-6 py-3 text-base font-medium text-light-text dark:text-gray-300 hover:bg-yellow/10 dark:hover:bg-dark-blue-pastel/10 hover:text-pink dark:hover:text-dark-blue-pastel transition-colors capitalize"
                  >
                    {item}
                  </button>
                </li>
              ))}
              <li>
                <Link
                  href="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-left px-6 py-3 text-base font-medium text-light-text dark:text-gray-300 hover:bg-yellow/10 dark:hover:bg-dark-blue-pastel/10 hover:text-pink dark:hover:text-dark-blue-pastel transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
