/**
 * Utility file for reusable CSS class strings
 * Centralizes common styling patterns used across the application
 */

// Base glassmorphism effect used across cards and components
export const GLASSMORPHISM_BASE = "bg-white/30 dark:bg-dark-medium/40 backdrop-blur-sm";

// Shadow styles
export const SHADOW_BASE = "shadow-md shadow-gray-300/50 dark:shadow-black/50";
export const SHADOW_HOVER =
  "hover:shadow-lg hover:shadow-yellow/40 dark:hover:shadow-dark-blue-pastel/40";
export const SHADOW_HOVER_XL =
  "hover:shadow-xl hover:shadow-yellow/30 dark:hover:shadow-dark-blue-pastel/30";

// Hover background effects
export const HOVER_BG = "hover:bg-yellow/10 dark:hover:bg-dark-blue-pastel/10";
export const HOVER_BG_SOLID = "hover:bg-yellow dark:hover:bg-dark-blue-pastel";

// Text colors
export const TEXT_PRIMARY = "text-light-text dark:text-dark-smoke";
export const TEXT_SECONDARY = "text-gray-600 dark:text-gray-300";
export const TEXT_MUTED = "text-gray-500 dark:text-gray-400";
export const TEXT_ACCENT = "text-pink dark:text-dark-blue-pastel";
export const TEXT_HOVER_ACCENT = "hover:text-pink dark:hover:text-dark-blue-pastel";

// Input/Form styles
export const INPUT_BASE = `w-full rounded-lg ${GLASSMORPHISM_BASE} ${TEXT_PRIMARY} focus:outline-none focus:ring-2 focus:ring-blue-pastel dark:focus:ring-dark-blue-pastel disabled:opacity-50 ${SHADOW_BASE} focus:shadow-lg`;
export const INPUT_PLACEHOLDER = "placeholder:text-gray-600 dark:placeholder:text-gray-300";

// Card styles - Reusable card patterns
export const CARD_BASE = `rounded-2xl ${GLASSMORPHISM_BASE} ${SHADOW_BASE}`;
export const CARD_INTERACTIVE = `${CARD_BASE} ${HOVER_BG} transition-all ${SHADOW_HOVER_XL}`;
export const CARD_STATIC = `${CARD_BASE}`;

// Button styles
export const BUTTON_ICON_BASE = `p-3 rounded-full ${HOVER_BG} transition-all ${GLASSMORPHISM_BASE} ${SHADOW_BASE} ${SHADOW_HOVER}`;
export const BUTTON_PRIMARY = `px-6 py-3 rounded-full ${HOVER_BG_SOLID} transition-all ${GLASSMORPHISM_BASE} ${SHADOW_BASE} ${SHADOW_HOVER} ${TEXT_PRIMARY} font-medium`;

// Border colors
export const BORDER_BASE = "border-light-border dark:border-dark-medium";
export const BORDER_ACCENT = "border-blue-pastel dark:border-dark-blue-pastel";

// Transition effects
export const TRANSITION_ALL = "transition-all duration-300";
export const TRANSITION_COLORS = "transition-colors duration-300";
