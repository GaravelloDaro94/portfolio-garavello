"use client";

import { UmamiWindow } from "../models";

/**
 * Hook personalizado para trackear eventos con Umami Analytics
 */
export function useUmamiTracking() {
  const trackEvent = (eventName: string, eventData?: Record<string, unknown>) => {
    if (typeof globalThis !== "undefined" && (globalThis as unknown as UmamiWindow).umami) {
      (globalThis as unknown as UmamiWindow).umami?.track(eventName, eventData);
    }
  };

  return { trackEvent };
}
