# Quick Start

## 1) Configurar entorno local

1. Instala dependencias:

```bash
pnpm install
```

2. Crea variables de entorno:

```bash
cp .env.example .env.local
```

3. Completa `.env.local` con tus valores reales:

- `OPENAI_API_KEY`
- `RESEND_API_KEY`
- `NEXT_PUBLIC_UMAMI_WEBSITE_ID` (opcional)
- `NEXT_PUBLIC_UMAMI_URL` (opcional)
- `NEXT_PUBLIC_UMAMI_API_URL` (opcional)

4. Levanta el proyecto:

```bash
pnpm dev
```

## 2) Build y checks

```bash
pnpm build
pnpm test
pnpm test:e2e
```

Si usas build de DOOM en producción:

```bash
pnpm build:prod
```

Requisitos:

- `emmake` en `PATH`
- `make` en `PATH`
- IWAD válido en `public/doom/DOOM1.WAD` o `public/doom/doom1.wad`

## 3) Deploy manual

1. Crea el repositorio en GitHub: https://github.com/new
2. Conecta remoto y sube código:

```bash
git remote add origin https://github.com/TU-USUARIO/portfolio-garavello.git
git push -u origin main
```

3. Importa en Vercel: https://vercel.com/new
4. Configura variables de entorno en Vercel (las mismas de `.env.local`)
5. Define dominio de producción y URL base:

- Dominio objetivo: https://dariogaravello.dev
- Variable recomendada: `NEXT_PUBLIC_SITE_URL=https://dariogaravello.dev`

## 4) Verificación post-deploy

1. App online y navegación básica.
2. SEO básico:

- `/robots.txt`
- `/sitemap.xml`

3. API:

- Chat y contacto responden correctamente.

4. Analytics:

- Umami carga sin errores (si está configurado).

## 5) Actualizaciones

```bash
git add .
git commit -m "feat: ..."
git push
```

Vercel redeploya automáticamente con cada push a la rama configurada.
