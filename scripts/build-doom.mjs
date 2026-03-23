import { mkdir, access, copyFile, writeFile, readFile, unlink } from "node:fs/promises";
import { constants as fsConstants, existsSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const rootDir = process.cwd();
const cacheDir = path.join(rootDir, ".cache", "doomgeneric");
const sourceDir = path.join(cacheDir, "doomgeneric");
const outputDir = path.join(rootDir, "public", "doom");

const runtimePairCandidates = [
  { js: "doom.js", wasm: "doom.wasm" },
  { js: "doomgeneric.js", wasm: "doomgeneric.wasm" },
];

const GENERATED_JS_BANNER = [
  "// @ts-nocheck",
  "// Generated file by Emscripten. Do not edit manually.",
  "",
].join("\n");

function run(command, args, cwd, envOverrides = {}, shellOverride = process.platform === "win32") {
  const result = spawnSync(command, args, {
    cwd,
    stdio: "inherit",
    shell: shellOverride,
    env: {
      ...process.env,
      ...envOverrides,
    },
  });

  if (result.status !== 0) {
    throw new Error(`Command failed: ${command} ${args.join(" ")}`);
  }
}

function getEmscriptenEnvironment(emmakeCommand) {
  if (process.platform !== "win32") {
    return {};
  }

  const emmakeDir = path.dirname(emmakeCommand);
  let emsdkRoot = emmakeDir;
  let emscriptenDir = emmakeDir;

  if (emmakeDir.toLowerCase().endsWith(path.join("upstream", "emscripten").toLowerCase())) {
    emsdkRoot = path.dirname(path.dirname(emmakeDir));
  } else {
    const candidateEmscriptenDir = path.join(emsdkRoot, "upstream", "emscripten");
    if (existsSync(candidateEmscriptenDir)) {
      emscriptenDir = candidateEmscriptenDir;
    }
  }

  const pathParts = [emsdkRoot, emscriptenDir, process.env.PATH ?? ""].filter(Boolean);

  return {
    EMSDK: process.env.EMSDK || emsdkRoot,
    PATH: pathParts.join(path.delimiter),
    SHELL: "cmd.exe",
    MAKESHELL: "cmd.exe",
  };
}

function getWindowsEmccAssignment(emmakeCommand) {
  if (process.platform !== "win32") {
    return null;
  }

  const emmakeDir = path.dirname(emmakeCommand);
  let emccPath = path.join(emmakeDir, "emcc.bat");

  if (!existsSync(emccPath)) {
    const emsdkRoot = path.dirname(path.dirname(emmakeDir));
    const candidate = path.join(emsdkRoot, "upstream", "emscripten", "emcc.bat");
    if (existsSync(candidate)) {
      emccPath = candidate;
    }
  }

  if (!existsSync(emccPath)) {
    return null;
  }

  const shellFriendlyPath = emccPath.split(path.win32.sep).join("/");
  return `CC="${shellFriendlyPath}"`;
}

function findCommandInPath(commandName) {
  const probeCommand = process.platform === "win32" ? "where" : "which";
  const result = spawnSync(probeCommand, [commandName], {
    stdio: ["ignore", "pipe", "ignore"],
    shell: process.platform === "win32",
    encoding: "utf8",
  });

  if (result.status !== 0 || !result.stdout) {
    return null;
  }

  const firstLine = result.stdout.split(/\r?\n/).find((line) => line.trim().length > 0);
  return firstLine?.trim() ?? null;
}

function firstResolvedCommand(commandCandidates) {
  for (const candidate of commandCandidates) {
    const resolved = findCommandInPath(candidate);
    if (resolved) {
      return resolved;
    }
  }

  return null;
}

function existingPathOrNull(pathCandidates) {
  for (const candidate of pathCandidates) {
    if (candidate && existsSync(candidate)) {
      return candidate;
    }
  }

  return null;
}

function getWindowsEmmakeCandidates() {
  return [
    process.env.EMSDK ? path.join(process.env.EMSDK, "emmake.bat") : null,
    process.env.EMSDK ? path.join(process.env.EMSDK, "upstream", "emscripten", "emmake.bat") : null,
    process.env.USERPROFILE ? path.join(process.env.USERPROFILE, "emsdk", "emmake.bat") : null,
    process.env.USERPROFILE
      ? path.join(process.env.USERPROFILE, "emsdk", "upstream", "emscripten", "emmake.bat")
      : null,
    process.env.HOME ? path.join(process.env.HOME, "emsdk", "emmake.bat") : null,
    process.env.HOME
      ? path.join(process.env.HOME, "emsdk", "upstream", "emscripten", "emmake.bat")
      : null,
  ];
}

function getWindowsMakeCandidates() {
  return [
    process.env.USERPROFILE
      ? path.join(
          process.env.USERPROFILE,
          "scoop",
          "apps",
          "mingw",
          "current",
          "bin",
          "mingw32-make.exe"
        )
      : null,
    process.env.ProgramFiles
      ? path.join(process.env.ProgramFiles, "Git", "usr", "bin", "make.exe")
      : null,
    process.env["ProgramFiles(x86)"]
      ? path.join(process.env["ProgramFiles(x86)"], "GnuWin32", "bin", "make.exe")
      : null,
    String.raw`C:\msys64\usr\bin\make.exe`,
    String.raw`C:\msys64\mingw64\bin\mingw32-make.exe`,
  ];
}

function resolveMakeCommand() {
  if (process.platform === "win32") {
    const windowsResolved = existingPathOrNull(getWindowsMakeCandidates());
    if (windowsResolved) {
      return windowsResolved;
    }
  }

  const commandCandidates =
    process.platform === "win32" ? ["mingw32-make", "make", "gmake"] : ["make", "gmake"];
  const fromPath = firstResolvedCommand(commandCandidates);

  if (fromPath) {
    return fromPath;
  }

  throw new Error(
    [
      "No se encontró make.",
      "Instalá una implementación de make para Windows (recomendado: Git for Windows o MSYS2).",
      "Luego ejecutá de nuevo: pnpm build:doom",
    ].join("\n")
  );
}

function resolveEmmakeCommand() {
  const commandCandidates = process.platform === "win32" ? ["emmake", "emmake.bat"] : ["emmake"];
  const fromPath = firstResolvedCommand(commandCandidates);
  if (fromPath) {
    return fromPath;
  }

  if (process.platform === "win32") {
    const windowsResolved = existingPathOrNull(getWindowsEmmakeCandidates());
    if (windowsResolved) {
      return windowsResolved;
    }
  }

  throw new Error(
    [
      "No se encontró emmake.",
      "Instalá y activá Emscripten (emsdk) antes de compilar:",
      "1) git clone https://github.com/emscripten-core/emsdk.git",
      "2) emsdk install latest",
      "3) emsdk activate latest",
      "4) emsdk_env.bat (Windows) o source ./emsdk_env.sh (Linux/macOS)",
      "Luego ejecutá de nuevo: pnpm build:doom",
    ].join("\n")
  );
}

async function exists(filePath) {
  try {
    await access(filePath, fsConstants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function ensureDoomgenericSource() {
  await mkdir(cacheDir, { recursive: true });

  if (!(await exists(sourceDir))) {
    run(
      "git",
      ["clone", "--depth", "1", "https://github.com/ozkl/doomgeneric", "doomgeneric"],
      cacheDir
    );

    await patchEmscriptenMakefileForWebRuntime();
    return;
  }

  run("git", ["fetch", "--all", "--prune"], sourceDir);
  run("git", ["reset", "--hard", "origin/master"], sourceDir);

  await patchEmscriptenMakefileForWebRuntime();
}

async function patchEmscriptenMakefileForWebRuntime() {
  const makefilePath = path.join(sourceDir, "doomgeneric", "Makefile.emscripten");
  const original = await readFile(makefilePath, "utf8");

  let patched = original
    // Build sin WAD embebido para evitar descargar ~28 MB al abrir el modal.
    // El IWAD se inyecta en runtime (carga local o Freedoom bajo demanda).
    .replaceAll(
      "--preload-file doom1.wad",
      '-sEXPORTED_RUNTIME_METHODS=\'["FS","FS_createDataFile","FS_writeFile","FS_unlink"]\''
    )
    .replaceAll("--preload-file freedoom1.wad", "")
    .replaceAll(
      '-sEXPORTED_RUNTIME_METHODS=\'["FS","FS_createDataFile","FS_writeFile","FS_unlink"]\' -sEXPORTED_RUNTIME_METHODS=\'["FS","FS_createDataFile","FS_writeFile","FS_unlink"]\'',
      '-sEXPORTED_RUNTIME_METHODS=\'["FS","FS_createDataFile","FS_writeFile","FS_unlink"]\''
    )
    // En Emscripten, SDL_mixer debe habilitarse como port; -lSDL2_mixer no alcanza.
    .replaceAll("-lSDL2_mixer", "-sUSE_SDL_MIXER=2")
    .replaceAll(
      "-DFEATURE_SOUND -s SDL2_MIXER_FORMATS='[\"mid\"]'",
      "-DFEATURE_SOUND -sUSE_SDL_MIXER=2 -s SDL2_MIXER_FORMATS='[\"mid\"]'"
    );

  if (patched !== original) {
    await writeFile(makefilePath, patched, "utf8");
  }

  const frontendPath = path.join(sourceDir, "doomgeneric", "doomgeneric_emscripten.c");
  const frontendOriginal = await readFile(frontendPath, "utf8");

  const rendererBlock = [
    "  // Setup renderer",
    "  renderer = SDL_CreateRenderer(window, -1, SDL_RENDERER_ACCELERATED);",
    "  if (renderer == NULL)",
    "  {",
    '    puts("SDL_RENDERER_ACCELERATED no disponible, probando SDL_RENDERER_SOFTWARE");',
    "    renderer = SDL_CreateRenderer(window, -1, SDL_RENDERER_SOFTWARE);",
    "  }",
    "  if (renderer == NULL)",
    "  {",
    "    puts(SDL_GetError());",
    "    emscripten_force_exit(1);",
    "    return;",
    "  }",
    "",
    "  // Clear window",
    "  SDL_RenderClear(renderer);",
    "  // Render the rect to the screen",
    "  SDL_RenderPresent(renderer);",
    "",
    "  texture = SDL_CreateTexture(renderer, SDL_PIXELFORMAT_RGB888, SDL_TEXTUREACCESS_TARGET, DOOMGENERIC_RESX, DOOMGENERIC_RESY);",
    "  if (texture == NULL)",
    "  {",
    "    puts(SDL_GetError());",
    "    emscripten_force_exit(1);",
    "    return;",
    "  }",
  ].join("\n");

  const rendererNeedle =
    "  // Setup renderer\n" +
    "  renderer =  SDL_CreateRenderer(window, -1, SDL_RENDERER_ACCELERATED);\n" +
    "  // Clear winow\n" +
    "  SDL_RenderClear( renderer );\n" +
    "  // Render the rect to the screen\n" +
    "  SDL_RenderPresent(renderer);\n\n" +
    "  texture = SDL_CreateTexture(renderer, SDL_PIXELFORMAT_RGB888, SDL_TEXTUREACCESS_TARGET, DOOMGENERIC_RESX, DOOMGENERIC_RESY);";

  const frontendPatched = frontendOriginal.replace(rendererNeedle, rendererBlock);

  if (frontendPatched !== frontendOriginal) {
    await writeFile(frontendPath, frontendPatched, "utf8");
  }
}

function buildDoomgeneric() {
  const buildDir = path.join(sourceDir, "doomgeneric");
  const emmakeCommand = resolveEmmakeCommand();
  const makeCommand = resolveMakeCommand();

  const emscriptenEnv = getEmscriptenEnvironment(emmakeCommand);
  const emccAssignment = getWindowsEmccAssignment(emmakeCommand);
  const baseArgs = [makeCommand, "-f", "Makefile.emscripten"];

  if (emccAssignment) {
    baseArgs.push(emccAssignment);
  }

  run(emmakeCommand, [...baseArgs, "clean"], buildDir, emscriptenEnv);
  run(emmakeCommand, baseArgs, buildDir, emscriptenEnv);
}

async function findRuntimePair() {
  const buildDir = path.join(sourceDir, "doomgeneric");

  for (const pair of runtimePairCandidates) {
    const jsPath = path.join(buildDir, pair.js);
    const wasmPath = path.join(buildDir, pair.wasm);

    if ((await exists(jsPath)) && (await exists(wasmPath))) {
      return {
        buildDir,
        jsPath,
        wasmPath,
        stem: pair.js.replace(/\.js$/i, ""),
      };
    }
  }

  throw new Error("No se encontraron artefactos JS/WASM de doomgeneric luego del build.");
}

async function copyRuntimeArtifacts() {
  await mkdir(outputDir, { recursive: true });

  const runtime = await findRuntimePair();
  const canonicalJsPath = path.join(outputDir, "doom.js");
  const canonicalWasmPath = path.join(outputDir, "doom.wasm");
  const originalWasmPath = path.join(outputDir, path.basename(runtime.wasmPath));
  const emscriptenExpectedWasmPath = path.join(outputDir, "doomgeneric.wasm");

  await copyFile(runtime.jsPath, canonicalJsPath);
  await copyFile(runtime.wasmPath, canonicalWasmPath);
  if (canonicalWasmPath !== originalWasmPath) {
    await copyFile(runtime.wasmPath, originalWasmPath);
  }

  // Emscripten output often hardcodes doomgeneric.wasm even if we rename doom.js.
  await copyFile(runtime.wasmPath, emscriptenExpectedWasmPath);

  await ensureGeneratedJsBanner(canonicalJsPath);

  const optionalFiles = [
    { source: `${runtime.stem}.data`, target: "doomgeneric.data" },
    { source: `${runtime.stem}.worker.js`, target: "doom.worker.js" },
  ];

  for (const optionalFile of optionalFiles) {
    const sourcePath = path.join(runtime.buildDir, optionalFile.source);
    if (await exists(sourcePath)) {
      const canonicalOptionalPath = path.join(outputDir, optionalFile.target);
      const originalOptionalPath = path.join(outputDir, optionalFile.source);

      await copyFile(sourcePath, canonicalOptionalPath);
      if (canonicalOptionalPath !== originalOptionalPath) {
        await copyFile(sourcePath, originalOptionalPath);
      }
    }
  }

  // Eliminar data files viejos si quedaron de builds con --preload-file.
  const staleDoomData = path.join(outputDir, "doom.data");
  const staleDoomgenericData = path.join(outputDir, "doomgeneric.data");
  await unlink(staleDoomData).catch(() => {});
  await unlink(staleDoomgenericData).catch(() => {});
}

async function ensureGeneratedJsBanner(filePath) {
  const content = await readFile(filePath, "utf8");
  if (content.startsWith(GENERATED_JS_BANNER)) {
    return;
  }

  await writeFile(filePath, GENERATED_JS_BANNER + content, "utf8");
}

async function isLikelyWad(bytes) {
  if (bytes.length < 12) {
    return false;
  }

  const header = Buffer.from(bytes.slice(0, 4)).toString("ascii");
  return header === "IWAD" || header === "PWAD";
}

async function ensurePrimaryDoom1Wad() {
  await mkdir(outputDir, { recursive: true });

  const canonicalPath = path.join(outputDir, "doom1.wad");
  const upperCasePath = path.join(outputDir, "DOOM1.WAD");

  const candidatePaths = [canonicalPath, upperCasePath];
  let selectedPath = null;

  for (const candidate of candidatePaths) {
    if (await exists(candidate)) {
      selectedPath = candidate;
      break;
    }
  }

  if (!selectedPath) {
    throw new Error(
      "No se encontró DOOM1.WAD. Copiá tu IWAD a public/doom/DOOM1.WAD o public/doom/doom1.wad antes de ejecutar el build."
    );
  }

  const bytes = await readFile(selectedPath);
  if (!(await isLikelyWad(bytes))) {
    throw new Error(`El archivo ${path.basename(selectedPath)} no parece ser un WAD válido.`);
  }

  // Normaliza el nombre para evitar fallos por case-sensitive en Linux/CI.
  if (selectedPath !== canonicalPath) {
    await copyFile(selectedPath, canonicalPath);
  }

  return canonicalPath;
}

async function main() {
  console.log("[doom] Preparando fuentes...");
  await ensureDoomgenericSource();

  console.log("[doom] Compilando doomgeneric con Emscripten...");
  buildDoomgeneric();

  console.log("[doom] Copiando artefactos web...");
  await copyRuntimeArtifacts();

  console.log("[doom] Verificando DOOM1.WAD...");
  await ensurePrimaryDoom1Wad();

  console.log("[doom] Listo. Artefactos generados en public/doom");
}

try {
  await main();
} catch (error) {
  console.error("[doom] Error:", error instanceof Error ? error.message : error);
  process.exit(1);
}
