"use client";

import { useEffect } from "react";
import { preventDefault } from "../utils/handler";

export default function ScrollToTopOnMount() {
  useEffect(() => {
        window.addEventListener("wheel", preventDefault, { passive: false }); // Rueda ratón
        window.addEventListener("touchmove", preventDefault, { passive: false }); // Móvil
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    const animationFrameId = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  return null;
}