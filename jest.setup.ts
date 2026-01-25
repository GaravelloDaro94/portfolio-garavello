import "@testing-library/jest-dom";

// Mock next-themes
jest.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme: jest.fn(),
    systemTheme: "light",
  }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock IntersectionObserver
class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds = [];

  disconnect(): void {
    return;
  }

  observe(): void {
    return;
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  unobserve(): void {
    return;
  }
}

globalThis.IntersectionObserver =
  MockIntersectionObserver as unknown as typeof IntersectionObserver;

// Mock window.matchMedia
Object.defineProperty(globalThis, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
