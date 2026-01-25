"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useThemeDetection } from "../../hooks/useThemeDetection";

export default function ThemeToggle() {
  const { currentTheme, isDark, setTheme } = useThemeDetection();
  
  // Detectar si estamos en el cliente sin causar hydration mismatch
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  // Detectar si es de día o de noche según la hora
  const getTimeBasedTheme = () => {
    const hour = new Date().getHours();
    // De 6am a 6pm es día (light mode), resto es noche (dark mode)
    return hour >= 6 && hour < 18 ? "light" : "dark";
  };

  useEffect(() => {
    // Establecer tema automático cada vez que se monta el componente (incluyendo recargas)
    if (mounted) {
      const autoTheme = getTimeBasedTheme();
      // Solo cambiar si el tema actual no coincide con el tema basado en la hora
      if (currentTheme !== autoTheme) {
        setTheme(autoTheme);
      }
    }
  }, [mounted]); // Solo depende de mounted para ejecutarse una vez al montar

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  if (!mounted) {
    return null;
  }

  return (
    <label
      className="relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 cursor-pointer ring-2 ring-blue-pastel dark:ring-dark-blue-pastel backdrop-blur-sm"
      style={{
        backgroundColor: isDark ? "rgba(58, 74, 88, 0.4)" : "rgba(167, 199, 231, 0.3)", // dark-blue-gray/40 : blue-pastel/30
      }}
    >
      <input
        type="checkbox"
        checked={isDark}
        onChange={handleToggle}
        className="sr-only"
        aria-label="Toggle theme"
      />
      <span
        className={`inline-flex h-6 w-6 transform items-center justify-center rounded-full bg-transparent transition-transform duration-300 ${
          isDark ? "translate-x-9" : "translate-x-1"
        }`}
      >
        <span className="text-base">
          {isDark ? "🌙" : "☀️"}
        </span>
      </span>
    </label>
  );
}
