# 🚀 Guía de Deployment - Portfolio

## 📋 Pre-requisitos

- [x] Cuenta de GitHub: garavello.manuel@gmail.com
- [x] Cuenta de Vercel (usar la misma cuenta de GitHub)
- [x] Git configurado localmente
- [x] Variables de entorno configuradas en `.env.local`

## 🔧 Paso 1: Preparar el Repositorio Local

Ya completado ✅:

```bash
git config user.email "garavello.manuel@gmail.com"
git config user.name "Darío Garavello"
```

## 📤 Paso 2: Subir a GitHub

### Opción A: Crear repositorio desde GitHub (Recomendado)

1. Ve a https://github.com/new
2. Configura el repositorio:
   - **Repository name**: `portfolio-garavello` (o el nombre que prefieras)
   - **Description**: `Portfolio personal desarrollado con Next.js, TypeScript y Tailwind CSS`
   - **Visibility**: Public (o Private si lo prefieres)
   - **NO marques** "Initialize this repository with a README"

3. Copia la URL del repositorio (será algo como `https://github.com/tu-usuario/portfolio-garavello.git`)

4. Ejecuta estos comandos en tu terminal:

```bash
# Agregar todos los archivos (excepto los de .gitignore)
git add .

# Hacer el primer commit
git commit -m "🎉 Initial commit - Portfolio completo con blog, analytics y chatbot"

# Verificar la rama actual
git branch -M main

# Conectar con GitHub (reemplaza con tu URL real)
git remote add origin https://github.com/TU-USUARIO/portfolio-garavello.git

# Subir los cambios
git push -u origin main
```

### Opción B: Desde la línea de comandos (si ya creaste el repo en GitHub)

```bash
git add .
git commit -m "🎉 Initial commit - Portfolio completo"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/portfolio-garavello.git
git push -u origin main
```

## 🔐 Paso 3: Configurar Variables de Entorno en Vercel

### 3.1 Conectar Vercel con GitHub

1. Ve a https://vercel.com/signup
2. Haz clic en "Continue with GitHub"
3. Autoriza Vercel para acceder a tu cuenta de GitHub

### 3.2 Importar el Proyecto

1. En el Dashboard de Vercel, haz clic en "Add New..." → "Project"
2. Busca tu repositorio `portfolio-garavello`
3. Haz clic en "Import"

### 3.3 Configurar Variables de Entorno

**IMPORTANTE**: Antes de hacer deploy, configura estas variables:

En la sección "Environment Variables", agrega:

#### Variables Requeridas:

```bash
# OpenAI (para el chatbot)
OPENAI_API_KEY = tu-nueva-key-de-openai

# Resend (para formulario de contacto)
RESEND_API_KEY = re_7hAwQNxA_PPEZdgFi9Af219j4Hbw2PupN

# Umami Analytics (opcional)
UMAMI_TOKEN = tu-token-de-umami
NEXT_PUBLIC_UMAMI_WEBSITE_ID = tu-website-id
NEXT_PUBLIC_UMAMI_URL = https://cloud.umami.is/script.js
NEXT_PUBLIC_UMAMI_API_URL = https://cloud.umami.is
```

#### Configuración de cada variable:

Para cada variable:

- **Name**: El nombre de la variable (ej: `OPENAI_API_KEY`)
- **Value**: El valor de tu `.env.local`
- **Environment**: Marca las 3 opciones (Production, Preview, Development)

### 3.4 Deploy

1. Haz clic en "Deploy"
2. Vercel construirá y desplegará tu proyecto (toma ~2-3 minutos)
3. Una vez completado, obtendrás una URL como: `https://portfolio-garavello.vercel.app`

## ✅ Verificación Post-Deploy

Después del deploy, verifica:

- [ ] La página principal carga correctamente
- [ ] El theme toggle funciona (modo claro/oscuro)
- [ ] El menú de navegación funciona
- [ ] Las animaciones se ven bien
- [ ] El chatbot responde correctamente
- [ ] El formulario de contacto envía emails
- [ ] El blog carga y los posts se ven correctamente
- [ ] Las estadísticas de Umami funcionan (si configuraste Umami)

## 🔄 Actualizaciones Futuras

Para subir cambios después del primer deploy:

```bash
# 1. Hacer cambios en tu código

# 2. Agregar archivos modificados
git add .

# 3. Hacer commit
git commit -m "Descripción de los cambios"

# 4. Subir a GitHub
git push

# 5. Vercel detectará automáticamente el push y hará deploy
```

## 🌐 Dominio Personalizado (Opcional)

Si quieres usar un dominio personalizado (ej: `dariogaravello.com`):

1. En Vercel Dashboard, ve a tu proyecto
2. Settings → Domains
3. Agrega tu dominio
4. Sigue las instrucciones para configurar los DNS

## 🐛 Troubleshooting

### Error: "OPENAI_API_KEY is not defined"

- Verifica que agregaste la variable en Vercel
- Asegúrate de haber seleccionado "Production" environment
- Redeploy el proyecto

### Error: Build failed

- Revisa los logs en Vercel
- Asegúrate de que `npm run build` funciona localmente
- Verifica que todas las dependencias estén en `package.json`

### El chatbot no responde

- Verifica que `OPENAI_API_KEY` esté configurada en Vercel
- Revisa los logs de la función en Vercel Dashboard → Functions

### Emails no se envían

- Verifica que `RESEND_API_KEY` esté correcta
- Verifica el dominio en Resend Dashboard

## 📊 Monitoreo

### Ver logs en tiempo real:

```bash
vercel logs portfolio-garavello --follow
```

### Ver analytics de Vercel:

- Dashboard → Analytics
- Muestra visitas, países, dispositivos, etc.

## 🔒 Seguridad Post-Deploy

- [ ] Confirma que `.env.local` NO está en GitHub
- [ ] Revoca la API key de OpenAI expuesta anteriormente
- [ ] Configura CORS en Umami para permitir solo tu dominio
- [ ] Configura webhook signing secret en Resend (opcional)

## 🎯 Comandos Útiles de Vercel CLI (Opcional)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy desde terminal
vercel --prod

# Ver logs
vercel logs

# Ver lista de deployments
vercel ls
```

## 📱 Compartir tu Portfolio

Una vez desplegado, comparte tu URL:

- LinkedIn: Agrega en la sección de proyectos
- GitHub: Actualiza tu perfil con el link
- CV: Incluye la URL de tu portfolio

---

**¡Tu portfolio ya está listo para el mundo!** 🎉

URL de tu portfolio: `https://portfolio-garavello.vercel.app` (o tu dominio personalizado)
