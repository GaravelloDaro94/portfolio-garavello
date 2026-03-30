const DEFAULT_SITE_URL = "https://dariogaravello.dev";

function normalizeUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

export function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL;

  if (!raw) {
    return DEFAULT_SITE_URL;
  }

  const prefixed = raw.startsWith("http") ? raw : `https://${raw}`;
  return normalizeUrl(prefixed);
}
