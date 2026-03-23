$ErrorActionPreference = "Stop"

$emsdkDir = Join-Path $env:USERPROFILE "emsdk"

Write-Host "[emsdk] Preparando Emscripten SDK en $emsdkDir" -ForegroundColor Cyan

function Get-CommandPath([string]$name) {
    $cmd = Get-Command $name -ErrorAction SilentlyContinue
    if ($cmd) {
        return $cmd.Source
    }
    return $null
}

function Ensure-MakeInstalled {
    if (Get-Command mingw32-make -ErrorAction SilentlyContinue) {
        return
    }

    Write-Host "[emsdk] mingw32-make no está instalado. Instalando dependencia..." -ForegroundColor Yellow

    $scoopPath = Get-CommandPath "scoop"
    if (-not $scoopPath -and $env:USERPROFILE) {
        $scoopFallback = Join-Path (Join-Path $env:USERPROFILE "scoop") "shims\scoop.cmd"
        if (Test-Path $scoopFallback) {
            $scoopPath = $scoopFallback
        }
    }

    if ($scoopPath) {
        & $scoopPath install mingw
        if ($LASTEXITCODE -ne 0) {
            throw "Falló instalación de mingw con scoop"
        }
        if (Get-Command mingw32-make -ErrorAction SilentlyContinue) {
            return
        }
    }

    $chocoPath = Get-CommandPath "choco"
    if (-not $chocoPath -and $env:ProgramData) {
        $chocoFallback = Join-Path $env:ProgramData "chocolatey\bin\choco.exe"
        if (Test-Path $chocoFallback) {
            $chocoPath = $chocoFallback
        }
    }

    if ($chocoPath) {
        & $chocoPath install mingw -y
        if ($LASTEXITCODE -ne 0) {
            throw "Falló instalación de mingw con choco"
        }
        if (Get-Command mingw32-make -ErrorAction SilentlyContinue) {
            return
        }
    }

    throw "No se pudo instalar mingw32-make automáticamente. Instalá mingw y reintentá."
}

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    throw "git no está disponible en PATH."
}

if (-not (Test-Path $emsdkDir)) {
    Write-Host "[emsdk] Clonando repositorio..." -ForegroundColor Yellow
    git clone https://github.com/emscripten-core/emsdk.git $emsdkDir
    if ($LASTEXITCODE -ne 0) {
        throw "Falló git clone de emsdk"
    }
} else {
    Write-Host "[emsdk] Repositorio existente. Actualizando..." -ForegroundColor Yellow
    Push-Location $emsdkDir
    git pull
    if ($LASTEXITCODE -ne 0) {
        Pop-Location
        throw "Falló git pull de emsdk"
    }
    Pop-Location
}

Push-Location $emsdkDir

Ensure-MakeInstalled

Write-Host "[emsdk] Instalando versión latest..." -ForegroundColor Yellow
cmd /c "emsdk.bat install latest"
if ($LASTEXITCODE -ne 0) {
    Pop-Location
    throw "Falló emsdk install latest"
}

Write-Host "[emsdk] Activando versión latest..." -ForegroundColor Yellow
cmd /c "emsdk.bat activate latest"
if ($LASTEXITCODE -ne 0) {
    Pop-Location
    throw "Falló emsdk activate latest"
}

Pop-Location

Write-Host "[emsdk] Listo. Para sesión actual de PowerShell ejecutá:" -ForegroundColor Green
$emsdkEnvPath = Join-Path $emsdkDir "emsdk_env.bat"
$sessionCmd = 'cmd /c "' + $emsdkEnvPath + ' && set"'
Write-Host $sessionCmd -ForegroundColor DarkGray
Write-Host "o directamente corré: npm run build:doom:ps" -ForegroundColor DarkGray
