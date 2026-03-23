$ErrorActionPreference = "Stop"

Write-Host "[doom] Iniciando build de Doom (Windows/PowerShell)..." -ForegroundColor Cyan

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    throw "git no está disponible en PATH."
}

node ./scripts/build-doom.mjs
if ($LASTEXITCODE -ne 0) {
    throw "Falló la ejecución de scripts/build-doom.mjs"
}

Write-Host "[doom] Build completado." -ForegroundColor Green
