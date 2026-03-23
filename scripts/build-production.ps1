$ErrorActionPreference = "Stop"

Write-Host "[prod] Build completo: Doom + Next.js" -ForegroundColor Cyan

powershell -ExecutionPolicy Bypass -File ./scripts/build-doom.ps1
if ($LASTEXITCODE -ne 0) {
    throw "Falló el build de Doom"
}

npm run build
if ($LASTEXITCODE -ne 0) {
    throw "Falló el build de Next.js"
}

Write-Host "[prod] Build de producción finalizado." -ForegroundColor Green
