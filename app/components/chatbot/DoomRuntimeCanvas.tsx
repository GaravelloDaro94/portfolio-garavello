"use client";

import Image from "next/image";
import { useDoomRuntime, COMMAND_TO_TYPE } from "../../hooks/useDoomRuntime";
import type { DoomRuntimeCanvasProps } from "../../models";
import styles from "./doom-ui.module.scss";

export function DoomRuntimeCanvas(props: Readonly<DoomRuntimeCanvasProps>) {
  const {
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
    iframeRef,
    onRunnerFrameLoad,
    onClose,
  } = useDoomRuntime(props);

  return (
    <div className={`${styles.doomUiRoot} relative h-full w-full overflow-hidden p-3`}>
      {showPrimaryPrompt ? (
        <section
          className={`absolute z-20 border-2 border-[#0a0a0a] bg-[#c0c0c0] p-[2px] shadow-[inset_-1px_-1px_0_#0a0a0a,inset_1px_1px_0_#fff] ${
            showSecondaryPrompt
              ? "left-[128px] top-[200px] h-[300px] w-[470px] [animation:winOpen_190ms_ease-out]"
              : "left-[100px] top-6 w-[468px] [animation:winOpen_180ms_ease-out]"
          }`}
        >
          {!showSecondaryPrompt ? (
            <>
              <div className="flex items-center justify-between bg-[#0000a8] px-1 py-[1px] text-[12px] font-bold text-white">
                <span className="flex items-center gap-1">
                  <Image src="https://win98icons.alexmeub.com/icons/png/ms_dos-1.png" alt="" aria-hidden width={16} height={16} className={styles.pixelated} />
                  MS-DOS Prompt
                </span>
                <span className="flex items-center gap-[2px]">
                  <span className="grid h-4 w-4 place-items-center border border-black bg-[#c0c0c0] text-[10px] leading-none text-black">_</span>
                  <span className="grid h-4 w-4 place-items-center border border-black bg-[#c0c0c0] text-[8px] leading-none text-black">▢</span>
                  <span className="grid h-4 w-4 place-items-center border border-black bg-[#c0c0c0] text-[10px] leading-none text-black">X</span>
                </span>
              </div>
              <div className="flex items-center gap-2 border-b border-[#87888f] bg-[#c0c0c0] px-2 py-1 text-[11px] text-black shadow-[inset_0_1px_0_#fff]">
                <select className="h-5 min-w-[56px] border border-black bg-white px-1 text-[11px] leading-4" defaultValue="Auto">
                  <option value="Auto">Auto</option>
                </select>
                <span className="grid h-5 w-5 place-items-center border border-[#808080] bg-[#d7d7d7] text-[10px]">...</span>
                <span className="grid h-5 w-5 place-items-center border border-[#808080] bg-[#d7d7d7] text-[10px]">TXT</span>
                <span className="grid h-5 w-5 place-items-center border border-[#808080] bg-[#d7d7d7] text-[10px]">PRN</span>
                <span className="grid h-5 w-5 place-items-center border border-[#808080] bg-[#d7d7d7] text-[10px]">CFG</span>
                <span className="grid h-5 w-5 place-items-center border border-[#808080] bg-[#d7d7d7] text-[10px]">DIR</span>
                <span className="grid h-5 w-5 place-items-center border border-[#808080] bg-[#d7d7d7] text-[11px] font-bold">A</span>
              </div>
              <div className="bg-black px-2 py-1 font-mono text-[11px] leading-[1.25] text-[#d9d9d9] text-bold">
                <div>Microsoft(R) Windows 95</div>
                <div>   (C)Copyright Microsoft Corp 1981-1996.</div>
                <div>C:\WINDOWS&gt;command.com /?</div>
                <div className="mt-1">Starts a new copy of the Windows Command Interpreter.</div>
                <div>COMMAND [[drive:]path] [device] [/E:nnnn] [/L:nnnn] [/U:nnnn] [/P] [/MSG] [/Y] [/C command] [/K command]</div>
                <div className="mt-1">  [drive:]path    Specifies the directory containing COMMAND.COM.</div>
                <div>  device         Specifies the device to use for command input and output.</div>
                <div>  /E:nnnn        Sets the initial environment size to nnnn bytes.</div>
                <div>  /L:nnnn        Specifies the size of internal command buffers in /P as well.</div>
                <div>  /U:nnnn        NumLock buffer size between 128 and 1024.</div>
                <div>  /P             Makes the new copy permanent (can't exit).</div>
                <div>  /MSG           Stores all error messages in memory.</div>
                <div>  /Y             Steps through the batch file line by line.</div>
                <div>  /C command     Executes the specified command and returns.</div>
                <div>  /K command     Executes the specified command and continues running.</div>
                <div className="mt-1">C:\WINDOWS&gt;{typedCommand}{typedCommand.length < COMMAND_TO_TYPE.length ? "_" : ""}</div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1 bg-[#000080] px-2 py-[2px] text-[12px] font-bold text-white">
                <Image src="https://win98icons.alexmeub.com/icons/png/ms_dos-1.png" alt="" aria-hidden width={16} height={16} className={styles.pixelated} />
                C:\DOOM\BOOT.LOG
              </div>
              <div className="h-[calc(100%-22px)] min-h-0 overflow-auto bg-black p-2 font-mono text-[13px] leading-5 text-[#bfbfbf]">
                <div className="pb-2 text-[#9eb3cc]">{runtimeSummary}</div>
                {showGamePrompt ? null : (
                  <div className="pb-2 text-[#d6ffd6] text-bold">
                    C:\DOOM&gt; Ejecutando DOOM1.WAD automaticamente...
                    <br /><span className={styles.commandHintYellow}>[R] Reiniciar (cuando el juego ya este abierto)</span>
                  </div>
                )}
                <pre className="whitespace-pre-wrap break-words pb-2 text-[#8dd6ff] text-bold">{bootLines.slice(0, visibleBootLines).join("\n")}</pre>
                <pre className="whitespace-pre-wrap break-words text-bold">{log.length === 0 ? "Sin logs aun" : log.join("\n")}</pre>
              </div>
            </>
          )}
        </section>
      ) : null}

      {showGamePrompt ? (
        <section className="absolute left-[60%] top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 border-2 border-[#0a0a0a] bg-[#c0c0c0] p-[2px] shadow-[inset_-1px_-1px_0_#0a0a0a,inset_1px_1px_0_#fff] [animation:winOpen_210ms_ease-out]">
          <div className="flex items-center justify-between bg-[#000080] px-2 py-[2px] text-[12px] font-bold text-white">
            <span className="flex items-center gap-2">
              <Image src="https://win98icons.alexmeub.com/icons/png/ms_dos-1.png" alt="" aria-hidden width={16} height={16} className={styles.pixelated} />
              DOOM.EXE - MS-DOS Prompt
            </span>
            <span className="flex items-center gap-1">
              <span className="grid h-4 w-4 place-items-center border border-black bg-[#c0c0c0] text-[10px] text-black">_</span>
              <span className="grid h-4 w-4 place-items-center border border-black bg-[#c0c0c0] text-[10px] text-black">[]</span>
              <button
                type="button"
                onClick={onClose}
                className="grid h-4 w-4 place-items-center border border-black bg-[#c0c0c0] text-[10px] text-black"
                aria-label="Cerrar DOOM"
                title="Cerrar"
              >
                X
              </button>
            </span>
          </div>
          <div className="flex h-6 items-center gap-1 border-b border-[#7f7f7f] bg-[#c0c0c0] px-2 text-[11px] text-black">
            <span className="font-bold">Archivo</span>
            <span className="ml-2 text-[10px] text-[#505050]">
              Modo: {launchMode === "wad" ? "DOOM1.WAD" : "inicializando"}
            </span>
            <span className="ml-2 grid h-4 w-4 place-items-center border border-[#808080] bg-[#d7d7d7] text-[10px]">&lt;</span>
            <span className="grid h-4 w-4 place-items-center border border-[#808080] bg-[#d7d7d7] text-[10px]">&gt;</span>
            <span className="grid h-4 w-4 place-items-center border border-[#808080] bg-[#d7d7d7] text-[10px]">^</span>
            <span className="grid h-4 w-4 place-items-center border border-[#808080] bg-[#d7d7d7] text-[10px]">A</span>
          </div>
          <div className="h-[400px] w-[640px] bg-black">
            <iframe
              key={iframeSessionKey}
              ref={iframeRef}
              onLoad={onRunnerFrameLoad}
              src={`/doom/runner.html?session=${iframeSessionKey}`}
              title="DOOM Runtime"
              className="h-full w-full border-0 bg-black"
            />
          </div>
        </section>
      ) : null}

      {isStarting ? (
        <div className="pointer-events-none absolute bottom-4 right-4 z-40 border border-black bg-[#c0c0c0] px-2 py-1 text-xs text-black shadow-[inset_-1px_-1px_0_#0a0a0a,inset_1px_1px_0_#fff]">
          Iniciando DOOM...
        </div>
      ) : null}
    </div>
  );
}
