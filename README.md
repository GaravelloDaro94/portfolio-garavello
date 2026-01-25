This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🚀 Deploy Rápido

### Opción 1: Script Automático (Recomendado)

**Windows (PowerShell):**
```powershell
.\deploy.ps1
```

**Mac/Linux (Bash):**
```bash
chmod +x deploy.sh
./deploy.sh
```

### Opción 2: Manual

1. **Crear repo en GitHub**: https://github.com/new
2. **Conectar y subir**:
```bash
git remote add origin https://github.com/TU-USUARIO/portfolio-garavello.git
git push -u origin main
```
3. **Deploy en Vercel**: https://vercel.com/new
   - Conecta con GitHub
   - Importa tu repositorio
   - Configura variables de entorno (ver `.env.example`)
   - Deploy

📖 **Guía completa**: Ver [DEPLOYMENT.md](DEPLOYMENT.md)

---

## Getting Started

### 1. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto copiando el archivo de ejemplo:

```bash
cp .env.example .env.local
```

Luego edita `.env.local` y reemplaza los valores con tus credenciales reales:

- **OPENAI_API_KEY**: Obtén tu API key en [OpenAI Platform](https://platform.openai.com/api-keys)
- **RESEND_API_KEY**: Obtén tu API key en [Resend](https://resend.com/api-keys)
- **UMAMI\_\***: (Opcional) Variables para Umami Analytics desde [Umami Cloud](https://cloud.umami.is)

**⚠️ IMPORTANTE**: Nunca compartas o subas tu archivo `.env.local` a Git. Este archivo ya está incluido en `.gitignore`.

### 2. Instalar Dependencias

```bash
npm install
# o
pnpm install
```

### 3. Ejecutar el Servidor de Desarrollo

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
