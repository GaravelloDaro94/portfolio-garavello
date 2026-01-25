# 🚀 Script de Deploy a GitHub (PowerShell)
# ==========================================

Write-Host ""
Write-Host "🚀 Preparando deploy del portfolio..." -ForegroundColor Green
Write-Host ""

# Verificar rama actual
$currentBranch = git branch --show-current
Write-Host "📍 Rama actual: $currentBranch" -ForegroundColor Cyan

# Cambiar a main si estamos en master
if ($currentBranch -eq "master") {
    Write-Host "⚠️  Renombrando rama 'master' a 'main'..." -ForegroundColor Yellow
    git branch -M main
    $currentBranch = "main"
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor White
Write-Host "  📋 PASOS PARA COMPLETAR EL DEPLOY" -ForegroundColor White
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor White
Write-Host ""

Write-Host "1. Crear repositorio en GitHub:" -ForegroundColor Blue
Write-Host "   👉 Ve a: https://github.com/new"
Write-Host "   📝 Nombre sugerido: portfolio-garavello"
Write-Host "   🔓 Visibility: Public o Private"
Write-Host "   ❌ NO marques 'Initialize with README'"
Write-Host ""

Write-Host "2. Copia el comando correcto:" -ForegroundColor Yellow
Write-Host ""
Write-Host "   Opción A - HTTPS (recomendado):" -ForegroundColor Green
Write-Host "   git remote add origin https://github.com/TU-USUARIO/portfolio-garavello.git"
Write-Host "   git push -u origin main"
Write-Host ""
Write-Host "   Opción B - SSH:" -ForegroundColor Green
Write-Host "   git remote add origin git@github.com:TU-USUARIO/portfolio-garavello.git"
Write-Host "   git push -u origin main"
Write-Host ""

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor White
Write-Host ""

$response = Read-Host "¿Ya creaste el repositorio en GitHub? (s/n)"

if ($response -eq "s" -or $response -eq "S") {
    Write-Host ""
    $repoUrl = Read-Host "Ingresa la URL del repositorio (https://github.com/...)"
    
    if ([string]::IsNullOrWhiteSpace($repoUrl)) {
        Write-Host "❌ URL vacía. Abortando." -ForegroundColor Red
        exit 1
    }
    
    Write-Host ""
    Write-Host "🔗 Conectando con GitHub..." -ForegroundColor Blue
    
    # Intentar agregar el remote
    git remote add origin $repoUrl 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "⚠️  Remote 'origin' ya existe. Actualizando URL..." -ForegroundColor Yellow
        git remote set-url origin $repoUrl
    }
    
    Write-Host "📤 Subiendo código a GitHub..." -ForegroundColor Blue
    git push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ ¡Código subido exitosamente a GitHub!" -ForegroundColor Green
        Write-Host ""
        Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor White
        Write-Host "  🎉 SIGUIENTE PASO: DEPLOY EN VERCEL" -ForegroundColor White
        Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor White
        Write-Host ""
        Write-Host "1. Ve a Vercel:" -ForegroundColor Blue
        Write-Host "   👉 https://vercel.com/new"
        Write-Host ""
        Write-Host "2. Conecta con GitHub:" -ForegroundColor Blue
        Write-Host "   🔐 Login con: garavello.manuel@gmail.com"
        Write-Host ""
        Write-Host "3. Importa tu repositorio:" -ForegroundColor Blue
        Write-Host "   📦 Busca: portfolio-garavello"
        Write-Host ""
        Write-Host "4. Configura Variables de Entorno:" -ForegroundColor Blue
        Write-Host "   ⚙️  Antes de hacer deploy, agrega:"
        Write-Host ""
        Write-Host "   Variables REQUERIDAS:" -ForegroundColor Yellow
        Write-Host "   • OPENAI_API_KEY"
        Write-Host "   • RESEND_API_KEY"
        Write-Host ""
        Write-Host "   Variables OPCIONALES:" -ForegroundColor Yellow
        Write-Host "   • UMAMI_TOKEN"
        Write-Host "   • NEXT_PUBLIC_UMAMI_WEBSITE_ID"
        Write-Host "   • NEXT_PUBLIC_UMAMI_URL"
        Write-Host "   • NEXT_PUBLIC_UMAMI_API_URL"
        Write-Host ""
        Write-Host "5. Deploy:" -ForegroundColor Blue
        Write-Host "   🚀 Haz clic en 'Deploy'"
        Write-Host ""
        Write-Host "📖 Guía completa: Ver DEPLOYMENT.md" -ForegroundColor Green
        Write-Host ""
    } else {
        Write-Host ""
        Write-Host "❌ Error al subir a GitHub" -ForegroundColor Red
        Write-Host "💡 Verifica:" -ForegroundColor Yellow
        Write-Host "   • Tu usuario y contraseña de GitHub"
        Write-Host "   • La URL del repositorio"
        Write-Host "   • Que tienes permisos"
        Write-Host ""
        Write-Host "Si usas 2FA en GitHub:" -ForegroundColor Yellow
        Write-Host "   Crea un Personal Access Token:"
        Write-Host "   👉 https://github.com/settings/tokens"
        Write-Host "   Usa el token como contraseña"
    }
} else {
    Write-Host ""
    Write-Host "📋 Cuando crees el repositorio, ejecuta:" -ForegroundColor Blue
    Write-Host ""
    Write-Host "git remote add origin https://github.com/TU-USUARIO/portfolio-garavello.git"
    Write-Host "git push -u origin main"
    Write-Host ""
    Write-Host "O ejecuta este script nuevamente."
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor White
Write-Host ""
