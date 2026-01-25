import { renderHook, act } from "@testing-library/react";
import { useHeader } from "../useHeader";

// Mock de window.scrollTo
globalThis.scrollTo = jest.fn();

// Mock de scrollIntoView
Element.prototype.scrollIntoView = jest.fn();

describe("useHeader", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("inicializa con scrolled en false", () => {
    const { result } = renderHook(() => useHeader());

    expect(result.current.scrolled).toBe(false);
  });

  it("detecta el scroll y actualiza el estado", () => {
    const { result } = renderHook(() => useHeader());

    // Simular scroll
    act(() => {
      globalThis.scrollY = 100;
      globalThis.dispatchEvent(new Event("scroll"));
    });

    expect(result.current.scrolled).toBe(true);
  });

  it("scrollToSection llama a scrollIntoView", () => {
    const { result } = renderHook(() => useHeader());

    // Mock del elemento DOM
    const mockElement = document.createElement("div");
    jest.spyOn(document, "getElementById").mockReturnValue(mockElement);

    act(() => {
      result.current.scrollToSection("about");
    });

    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
  });
});
