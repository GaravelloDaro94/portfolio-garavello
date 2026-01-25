#!/bin/bash

# 🚀 Script de Deploy a GitHub y Vercel
# =====================================

echo "🚀 Preparando deploy del portfolio..."
echo ""

# Colores para mensajes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar que estamos en la rama correcta
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 Rama actual: $CURRENT_BRANCH"

# Cambiar a main si estamos en master
if [ "$CURRENT_BRANCH" = "master" ]; then
    echo "${YELLOW}⚠️  Renombrando rama 'master' a 'main'...${NC}"
    git branch -M main
    CURRENT_BRANCH="main"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  📋 PASOS PARA COMPLETAR EL DEPLOY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "${BLUE}1. Crear repositorio en GitHub:${NC}"
echo "   👉 Ve a: https://github.com/new"
echo "   📝 Nombre sugerido: portfolio-garavello"
echo "   🔓 Visibility: Public o Private"
echo "   ❌ NO marques 'Initialize with README'"
echo ""

echo "${YELLOW}2. Copia el comando correcto según tu elección:${NC}"
echo ""
echo "   ${GREEN}Opción A - HTTPS (recomendado):${NC}"
echo "   git remote add origin https://github.com/TU-USUARIO/portfolio-garavello.git"
echo "   git push -u origin main"
echo ""
echo "   ${GREEN}Opción B - SSH (si tienes SSH key):${NC}"
echo "   git remote add origin git@github.com:TU-USUARIO/portfolio-garavello.git"
echo "   git push -u origin main"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

read -p "${YELLOW}¿Ya creaste el repositorio en GitHub? (s/n) ${NC}" -n 1 -r
echo ""

if [[ $REPLY =~ ^[Ss]$ ]]; then
    echo ""
    read -p "Ingresa la URL del repositorio (https://github.com/...): " REPO_URL
    
    if [ -z "$REPO_URL" ]; then
        echo "${RED}❌ URL vacía. Abortando.${NC}"
        exit 1
    fi
    
    echo ""
    echo "${BLUE}🔗 Conectando con GitHub...${NC}"
    git remote add origin "$REPO_URL" 2>/dev/null || {
        echo "${YELLOW}⚠️  Remote 'origin' ya existe. Actualizando URL...${NC}"
        git remote set-url origin "$REPO_URL"
    }
    
    echo "${BLUE}📤 Subiendo código a GitHub...${NC}"
    git push -u origin main
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "${GREEN}✅ ¡Código subido exitosamente a GitHub!${NC}"
        echo ""
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo "  🎉 SIGUIENTE PASO: DEPLOY EN VERCEL"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
        echo "${BLUE}1. Ve a Vercel:${NC}"
        echo "   👉 https://vercel.com/new"
        echo ""
        echo "${BLUE}2. Conecta con GitHub:${NC}"
        echo "   🔐 Login con: garavello.manuel@gmail.com"
        echo ""
        echo "${BLUE}3. Importa tu repositorio:${NC}"
        echo "   📦 Busca: portfolio-garavello"
        echo ""
        echo "${BLUE}4. Configura Variables de Entorno:${NC}"
        echo "   ⚙️  Antes de hacer deploy, agrega estas variables:"
        echo ""
        echo "   ${YELLOW}Variables REQUERIDAS:${NC}"
        echo "   • OPENAI_API_KEY"
        echo "   • RESEND_API_KEY"
        echo ""
        echo "   ${YELLOW}Variables OPCIONALES (Umami):${NC}"
        echo "   • UMAMI_TOKEN"
        echo "   • NEXT_PUBLIC_UMAMI_WEBSITE_ID"
        echo "   • NEXT_PUBLIC_UMAMI_URL"
        echo "   • NEXT_PUBLIC_UMAMI_API_URL"
        echo ""
        echo "${BLUE}5. Deploy:${NC}"
        echo "   🚀 Haz clic en 'Deploy'"
        echo "   ⏱️  Espera ~2-3 minutos"
        echo ""
        echo "${GREEN}📖 Guía completa: Ver DEPLOYMENT.md${NC}"
        echo ""
    else
        echo ""
        echo "${RED}❌ Error al subir a GitHub${NC}"
        echo "${YELLOW}💡 Verifica:${NC}"
        echo "   • Tu usuario y contraseña de GitHub"
        echo "   • La URL del repositorio"
        echo "   • Que tienes permisos en el repositorio"
        echo ""
        echo "${YELLOW}Si usas 2FA en GitHub:${NC}"
        echo "   Necesitas crear un Personal Access Token:"
        echo "   👉 https://github.com/settings/tokens"
        echo "   Usa el token como contraseña al hacer push"
    fi
else
    echo ""
    echo "${BLUE}📋 Cuando crees el repositorio, ejecuta:${NC}"
    echo ""
    echo "git remote add origin https://github.com/TU-USUARIO/portfolio-garavello.git"
    echo "git push -u origin main"
    echo ""
    echo "O ejecuta este script nuevamente."
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
