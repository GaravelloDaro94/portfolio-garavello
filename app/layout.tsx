import type { Metadata } from "next";
import { Inter, Space_Grotesk, Nunito_Sans, Raleway } from "next/font/google";
import "./globals.scss";
import { Providers } from "./providers";
import UmamiAnalytics from "./components/UmamiAnalytics";
import { Toaster } from "sonner";

// Dark mode fonts
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

// Light mode fonts
const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Darío Garavello",
    template: "%s | Darío Garavello"
  },
  description: "Portfolio de Darío Garavello especializado en React, Next.js, TypeScript, Node.js y tecnologías modernas web. Experiencia en Andreani Logística SA desarrollando aplicaciones escalables.",
  keywords: [
    "Darío Garavello",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Node.js",
    "JavaScript",
    "Desarrollador Web",
    "Frontend Developer",
    "Backend Developer",
    "Portfolio",
    "Andreani Logística",
    "Argentina",
    "MongoDB",
    "PostgreSQL",
    "Tailwind CSS"
  ],
  authors: [{ name: "Darío Garavello", url: "https://portfolio-garavello.vercel.app" }],
  creator: "Darío Garavello",
  publisher: "Darío Garavello",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://portfolio-garavello.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Darío Garavello",
    description: "Portfolio de Darío Garavello especializado en React, Next.js, TypeScript, Node.js y tecnologías modernas web.",
    url: "https://portfolio-garavello.vercel.app",
    siteName: "Darío Garavello Portfolio",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Darío Garavello",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Darío Garavello",
    description: "Portfolio de Darío Garavello especializado en React, Next.js, TypeScript y Node.js",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon.png', sizes: '32x32', type: 'image/png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark.png', sizes: '32x32', type: 'image/png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.png', sizes: '16x16', type: 'image/png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark.png', sizes: '16x16', type: 'image/png', media: '(prefers-color-scheme: dark)' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: [
      { url: '/icon.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark.png', media: '(prefers-color-scheme: dark)' },
    ],
  },
  verification: {
    // Agregar cuando estén disponibles
    // google: "codigo-de-verificacion",
    // yandex: "codigo-de-verificacion",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className="overflow-x-hidden">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/favicon-dark.svg" type="image/svg+xml" media="(prefers-color-scheme: dark)" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${nunitoSans.variable} ${raleway.variable} antialiased overflow-x-hidden`}
      >
        <UmamiAnalytics />
        <Providers>
          {children}
          <Toaster position="top-right" richColors />
        </Providers>
      </body>
    </html>
  );
}
