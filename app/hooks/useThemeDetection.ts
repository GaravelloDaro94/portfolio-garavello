import { useTheme } from "next-themes";

/**
 * Custom hook to detect the current theme (light/dark)
 * Handles system theme detection when theme is set to "system"
 *
 * @returns {Object} Object containing:
 *  - currentTheme: The actual current theme (light/dark), resolving "system" to the actual system theme
 *  - isDark: Boolean indicating if current theme is dark
 *  - theme: Raw theme value from next-themes
 *  - systemTheme: System preference theme
 *  - setTheme: Function to change theme (if available)
 */
export function useThemeDetection() {
  const themeData = useTheme();
  const { theme, systemTheme, setTheme } = themeData;

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  return {
    currentTheme,
    isDark,
    theme,
    systemTheme,
    setTheme,
  };
}
