"use client";

import Script from 'next/script';
import { UmamiAnalyticsProps } from "../models";

export default function UmamiAnalytics({ 
  websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
  src = process.env.NEXT_PUBLIC_UMAMI_URL || 'https://cloud.umami.is/script.js'
}: Readonly<UmamiAnalyticsProps>) {
  
  // Solo renderizar si hay websiteId configurado
  if (!websiteId) {
    return null;
  }

  return (
    <Script
      async
      src={src}
      data-website-id={websiteId}
      strategy="afterInteractive"
    />
  );
}
