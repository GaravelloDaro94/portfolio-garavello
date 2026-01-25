import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  // Ruta al directorio de Next.js
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^@/app/(.*)$": "<rootDir>/app/$1",
    "^@/components/(.*)$": "<rootDir>/app/components/$1",
    "^@/hooks/(.*)$": "<rootDir>/app/hooks/$1",
    "^@/models/(.*)$": "<rootDir>/app/models/$1",
    "^@/utils/(.*)$": "<rootDir>/app/utils/$1",
  },
  testMatch: ["**/__tests__/**/*.test.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  collectCoverageFrom: [
    "app/**/*.{js,jsx,ts,tsx}",
    "!app/**/*.d.ts",
    "!app/**/*.stories.{js,jsx,ts,tsx}",
    "!app/**/index.{js,jsx,ts,tsx}",
    "!app/layout.tsx",
    "!app/api/**",
  ],
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/", "/e2e/"],
};

export default createJestConfig(config);
