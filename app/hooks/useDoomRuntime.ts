"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
  DoomRuntimeCanvasProps,
  GameLaunchMode,
  RunnerMessage,
  RuntimeState,
  WadPayload,
} from "../models";

const INITIAL_RUNTIME_STATE: RuntimeState = {
  calledRun: false,
  runtimeReady: false,
  exitStatus: null,
  phase: "idle",
  canvas: "640x400",
  err: "none",
};

export const COMMAND_TO_TYPE = "DOOM.EXE";

export function useDoomRuntime({ onClose, onGamePromptChange }: DoomRuntimeCanvasProps) {
  const gamePromptTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const pendingWadRef = useRef<WadPayload | null>(null);
  const autoLaunchStartedRef = useRef(false);

  const [runtime, setRuntime] = useState<RuntimeState>(INITIAL_RUNTIME_STATE);
  const [log, setLog] = useState<string[]>([]);
  const [currentWad, setCurrentWad] = useState<WadPayload | null>(null);
  const [isStarting, setIsStarting] = useState(false);
  const [showPrimaryPrompt, setShowPrimaryPrompt] = useState(false);
  const [showSecondaryPrompt, setShowSecondaryPrompt] = useState(false);
  const [showGamePrompt, setShowGamePrompt] = useState(false);
  const [launchMode, setLaunchMode] = useState<GameLaunchMode>("none");
  const [visibleBootLines, setVisibleBootLines] = useState(0);
  const [iframeSessionKey, setIframeSessionKey] = useState(0);
  const [typedCommand, setTypedCommand] = useState("");

  const bootLines = useMemo(
    () => [
      "C:\\WINDOWS>cd \\DOOM",
      "C:\\DOOM>doom.exe",
      "DOOM SYSTEM STARTUP v1.9",
      "Initializing video subsystem... OK",
      "Detecting sound blaster... OK",
      "Reading IWAD directory... READY",
    ],
    []
  );

  const runtimeSummary = useMemo(() => {
    return (
      "[RUNTIME] calledRun=" +
      String(runtime.calledRun) +
      ", runtimeReady=" +
      String(runtime.runtimeReady) +
      ", phase=" +
      runtime.phase +
      ", exitStatus=" +
      String(runtime.exitStatus) +
      ", err=" +
      runtime.err +
      ", canvas=" +
      runtime.canvas
    );
  }, [runtime]);

  const appendLog = useCallback((line: string) => {
    const stamp = new Date().toLocaleTimeString("es-AR", { hour12: false });
    setLog((prev) => [...prev.slice(-200), `[${stamp}] ${line}`]);
  }, []);

  const postWadToRunner = useCallback(
    (wad: WadPayload) => {
      const frame = iframeRef.current?.contentWindow;
      if (!frame) {
        return false;
      }

      try {
        const bytesCopy = wad.bytes.slice();
        frame.postMessage(
          {
            source: "doom-host",
            type: "start",
            wadName: wad.name,
            wadBytes: bytesCopy.buffer,
          },
          window.location.origin,
          [bytesCopy.buffer]
        );

        appendLog(`IWAD enviado al sandbox: /${wad.name}`);
        setRuntime((prev) => ({ ...prev, calledRun: true, phase: "booting", canvas: "640x400" }));
        return true;
      } catch (error) {
        const detail = error instanceof Error ? error.message : String(error);
        appendLog(`Error al enviar IWAD al sandbox: ${detail}`);
        setRuntime((prev) => ({ ...prev, err: detail, phase: "idle" }));
        setIsStarting(false);
        return false;
      }
    },
    [appendLog]
  );

  useEffect(() => {
    return () => {
      if (gamePromptTimerRef.current !== null) {
        globalThis.clearTimeout(gamePromptTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    onGamePromptChange?.(showGamePrompt, launchMode);
  }, [launchMode, onGamePromptChange, showGamePrompt]);

  useEffect(() => {
    const onMessage = (event: MessageEvent<RunnerMessage>) => {
      if (event.origin !== window.location.origin) {
        return;
      }

      const data = event.data;
      if (!data || data.source !== "doom-runner") {
        return;
      }

      if (data.type === "log") {
        if (typeof data.message === "string" && data.message.trim()) {
          appendLog(data.message);
        }
        return;
      }

      if (data.type === "ready") {
        appendLog("Runtime inicializado");
        setRuntime((prev) => ({ ...prev, runtimeReady: true, phase: "running", err: "none" }));
        setIsStarting(false);
        return;
      }

      if (data.type === "error") {
        const detail = data.error ?? "Error desconocido en runtime";
        appendLog(`Runtime error: ${detail}`);
        setRuntime((prev) => ({ ...prev, err: detail, phase: "idle" }));
        setIsStarting(false);
        return;
      }

      if (data.type === "exit") {
        appendLog(`Runtime finalizado con codigo ${String(data.status ?? 0)}`);
        setRuntime((prev) => ({ ...prev, exitStatus: data.status ?? 0, phase: "idle" }));
      }
    };

    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("message", onMessage);
    };
  }, [appendLog]);

  useEffect(() => {
    const promptOneTimer = globalThis.setTimeout(() => {
      setShowPrimaryPrompt(true);
      appendLog("MS-DOS Prompt inicializado");
    }, 250);

    return () => {
      globalThis.clearTimeout(promptOneTimer);
    };
  }, [appendLog]);

  useEffect(() => {
    if (!showPrimaryPrompt || showSecondaryPrompt) {
      return;
    }

    let typeInterval: ReturnType<typeof setInterval> | null = null;
    let enterTimer: ReturnType<typeof setTimeout> | null = null;
    const startTypingTimer = globalThis.setTimeout(() => {
      let index = 0;
      typeInterval = globalThis.setInterval(() => {
        index += 1;
        setTypedCommand(COMMAND_TO_TYPE.slice(0, index));

        if (index >= COMMAND_TO_TYPE.length) {
          if (typeInterval) {
            globalThis.clearInterval(typeInterval);
          }

          enterTimer = globalThis.setTimeout(() => {
            setShowSecondaryPrompt(true);
            appendLog("Subsistema DOOM listo. Selecciona IWAD con Enter o F.");
          }, 220);
        }
      }, 95);
    }, 900);

    return () => {
      globalThis.clearTimeout(startTypingTimer);
      if (typeInterval) {
        globalThis.clearInterval(typeInterval);
      }
      if (enterTimer) {
        globalThis.clearTimeout(enterTimer);
      }
    };
  }, [appendLog, showPrimaryPrompt, showSecondaryPrompt]);

  useEffect(() => {
    if (!showSecondaryPrompt) {
      return;
    }

    setVisibleBootLines(0);
    let index = 0;
    const lineTimer = globalThis.setInterval(() => {
      index += 1;
      setVisibleBootLines(index);
      if (index >= bootLines.length) {
        globalThis.clearInterval(lineTimer);
      }
    }, 220);

    return () => {
      globalThis.clearInterval(lineTimer);
    };
  }, [bootLines.length, showSecondaryPrompt]);

  const scheduleGamePrompt = useCallback(
    (mode: "wad" | "freedoom") => {
      setLaunchMode(mode);
      setShowGamePrompt(false);

      if (gamePromptTimerRef.current !== null) {
        globalThis.clearTimeout(gamePromptTimerRef.current);
      }

      appendLog("Abriendo ventana DOOM.EXE...");
      gamePromptTimerRef.current = globalThis.setTimeout(() => {
        setShowGamePrompt(true);
      }, 420);
    },
    [appendLog]
  );

  const startRuntime = useCallback(
    async (wad: WadPayload) => {
      if (isStarting) {
        appendLog("El runtime ya se esta iniciando...");
        return;
      }

      setIsStarting(true);
      setRuntime({ ...INITIAL_RUNTIME_STATE, phase: "booting", canvas: "640x400" });
      setLog([]);
      appendLog(`Preparando sandbox para IWAD /${wad.name}`);

      pendingWadRef.current = wad;
      setIframeSessionKey((prev) => prev + 1);
    },
    [appendLog, isStarting]
  );

  const startDoom1Wad = useCallback(async () => {
    scheduleGamePrompt("wad");
    try {
      appendLog("Descargando /doom/doom1.wad");
      const response = await fetch("/doom/doom1.wad", { cache: "force-cache" });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} al descargar doom1.wad`);
      }

      const bytes = new Uint8Array(await response.arrayBuffer());
      const wad = { name: "doom1.wad", bytes };
      setCurrentWad(wad);
      await startRuntime(wad);
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error);
      appendLog(`Error al iniciar DOOM1.WAD: ${detail}`);
      setRuntime((prev) => ({ ...prev, err: detail, phase: "idle" }));
      setIsStarting(false);
    }
  }, [appendLog, scheduleGamePrompt, startRuntime]);

  const onRestart = useCallback(async () => {
    if (!currentWad) {
      appendLog("No hay sesion previa para reiniciar");
      return;
    }

    if (launchMode !== "none") {
      scheduleGamePrompt(launchMode);
    }

    await startRuntime(currentWad);
  }, [appendLog, currentWad, launchMode, scheduleGamePrompt, startRuntime]);

  useEffect(() => {
    if (!showSecondaryPrompt) {
      return;
    }

    if (visibleBootLines < bootLines.length) {
      return;
    }

    if (autoLaunchStartedRef.current) {
      return;
    }

    autoLaunchStartedRef.current = true;
    appendLog("Boot completado. Iniciando DOOM1.WAD...");
    void startDoom1Wad();
  }, [appendLog, bootLines.length, showSecondaryPrompt, startDoom1Wad, visibleBootLines]);

  useEffect(() => {
    const onCommandKey = async (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
        return;
      }

      if (event.repeat) {
        return;
      }

      if (event.key.toLowerCase() === "r") {
        if (!showGamePrompt) {
          return;
        }
        event.preventDefault();
        appendLog("CMD: R -> reiniciar sesion");
        await onRestart();
      }
    };

    globalThis.addEventListener("keydown", onCommandKey);
    return () => {
      globalThis.removeEventListener("keydown", onCommandKey);
    };
  }, [appendLog, onRestart, showGamePrompt]);

  const onRunnerFrameLoad = useCallback(() => {
    if (!pendingWadRef.current) {
      return;
    }

    const didPost = postWadToRunner(pendingWadRef.current);
    if (didPost) {
      pendingWadRef.current = null;
    }
    // Auto-focus del iframe para que el juego capture teclado sin click previo.
    globalThis.setTimeout(() => {
      iframeRef.current?.focus();
    }, 80);
  }, [postWadToRunner]);

  return {
    // State
    log,
    isStarting,
    showPrimaryPrompt,
    showSecondaryPrompt,
    showGamePrompt,
    launchMode,
    visibleBootLines,
    iframeSessionKey,
    typedCommand,
    bootLines,
    runtimeSummary,
    // Refs
    iframeRef,
    // Handlers
    onRunnerFrameLoad,
    onClose,
  };
}
