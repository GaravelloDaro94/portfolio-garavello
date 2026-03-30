# Darío Garavello - Portfolio

Portfolio personal desarrollado con Next.js, TypeScript y una experiencia interactiva que combina presentación profesional, chatbot y sección técnica de blog.

## Demo

- Sitio: https://dariogaravello.dev

## Qué incluye

- Home interactiva con navegación por secciones y animaciones.
- Modo claro/oscuro + selector de idioma (es/en).
- Proyectos destacados con enlaces de demo/repositorio.
- Sección de habilidades y contacto con envío por API.
- Chatbot de asistencia y easter egg DOOM.
- Blog técnico con render de Markdown.

## Stack principal

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS + SCSS
- Playwright + Jest
- OpenAI + Resend

## SEO y analítica

- Metadata, OpenGraph y Twitter cards.
- `robots.txt` y `sitemap.xml` generados desde App Router.
- JSON-LD (`Person`).
- Umami Analytics (opcional por variables de entorno).

## Desarrollo local

Para setup técnico completo, revisar [QUICK-START.md](QUICK-START.md).

Resumen rápido:

```bash
pnpm install
pnpm dev
```

## Deploy

Deploy recomendado en Vercel conectando el repositorio de GitHub.

Variables importantes en producción:

- `NEXT_PUBLIC_SITE_URL=https://dariogaravello.dev`
- `OPENAI_API_KEY`
- `RESEND_API_KEY`

Guía operativa: [QUICK-START.md](QUICK-START.md).
