"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useDoomModal } from "../../hooks/useDoomModal";
import type { DoomEasterEggModalProps } from "../../models";
import { DoomRuntimeCanvas } from "./DoomRuntimeCanvas";
import { Win95Icon } from "./Win95Icon";
import styles from "./doom-ui.module.scss";
import { START_MENU_ITEMS } from "@/app/constants/win95";

export function DoomEasterEggModal({ isOpen, onClose }: Readonly<DoomEasterEggModalProps>) {
  const { clock, gameActive, gameMode, handleGamePromptChange } = useDoomModal(isOpen);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const startMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onMouseDown = (event: MouseEvent) => {
      if (!isStartOpen) {
        return;
      }
      const targetNode = event.target as Node | null;
      if (!targetNode || !startMenuRef.current?.contains(targetNode)) {
        setIsStartOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsStartOpen(false);
      }
    };

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, isStartOpen]);

  if (!isOpen || typeof document === "undefined") {
    return null;
  }

  const modalContent = (
    <div className={`${styles.doomUiRoot} fixed inset-0 z-[9999] bg-[#008080]`}>
      <div className="relative h-full w-full">
        <div className="pointer-events-none absolute left-2 top-2 z-[121] text-white">
          <div className="grid grid-cols-1 gap-y-3">
            <Win95Icon label="My Computer" iconSrc="https://win98icons.alexmeub.com/icons/png/computer-4.png" />
            <Win95Icon label="Network Neighborhood" iconSrc="https://win98icons.alexmeub.com/icons/png/network_normal_two_pcs-5.png" />
            <Win95Icon label="Inbox" iconSrc="https://win98icons.alexmeub.com/icons/png/mailbox_world-2.png" />
            <Win95Icon label="Recycle Bin" iconSrc="https://win98icons.alexmeub.com/icons/png/recycle_bin_empty-4.png" />
            <Win95Icon label="Internet Explorer" iconSrc="https://win98icons.alexmeub.com/icons/png/msie1-4.png" />
            <Win95Icon label="MS-DOS Prompt" iconSrc="https://win98icons.alexmeub.com/icons/png/ms_dos-1.png" />
          </div>
        </div>

        <div className="absolute inset-0 pb-8">
          <DoomRuntimeCanvas onClose={onClose} onGamePromptChange={handleGamePromptChange} />
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-[122] h-8 border-t border-[#dfdfdf] bg-[#c0c0c0] px-1 py-[2px] shadow-[inset_0_1px_0_#fff]">
          <div className="flex h-full items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <div ref={startMenuRef} className="relative">
                {isStartOpen ? (
                  <div className="absolute bottom-7 left-0 w-72 border border-black bg-[#c0c0c0] p-[3px] shadow-[inset_-1px_-1px_0_#0a0a0a,inset_1px_1px_0_#fff,3px_3px_0_rgba(0,0,0,0.35)]">
                    <div className="flex border border-[#808080] bg-[#d4d0c8]">
                      <div className="flex w-8 items-center justify-center bg-[#000080] px-[2px] text-[11px] font-bold tracking-[1px] text-white [writing-mode:vertical-rl] [text-orientation:mixed]">
                        Windows 95
                      </div>
                      <div className="flex-1 p-[3px]">
                        {START_MENU_ITEMS.map((item) => (
                          <button
                            key={item.label}
                            type="button"
                            className="flex w-full items-center gap-3 px-3 py-[5px] text-left text-[13px] font-medium leading-5 text-black hover:bg-[#000080] hover:text-white"
                          >
                            <Image
                              src={item.iconSrc}
                              alt=""
                              aria-hidden
                              width={22}
                              height={22}
                              className={styles.pixelated}
                            />
                            {item.label}
                          </button>
                        ))}

                        <div className="my-2 border-t border-[#808080] shadow-[0_1px_0_#fff]" />

                        <button
                          type="button"
                          onClick={() => {
                            setIsStartOpen(false);
                            onClose();
                          }}
                          className="flex w-full items-center gap-3 px-3 py-[5px] text-left text-[13px] font-medium leading-5 text-black hover:bg-[#000080] hover:text-white"
                        >
                          <Image
                            src="https://win98icons.alexmeub.com/icons/png/shut_down_cool-5.png"
                            alt=""
                            aria-hidden
                            width={22}
                            height={22}
                            className={styles.pixelated}
                          />
                          Shut Down
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}

                <button
                  type="button"
                  onClick={() => setIsStartOpen((prev) => !prev)}
                  className="flex h-6 items-center gap-1 border border-black bg-[#c0c0c0] px-2 text-[13px] font-bold text-black shadow-[inset_-1px_-1px_0_#0a0a0a,inset_1px_1px_0_#fff]"
                  aria-haspopup="menu"
                  aria-expanded={isStartOpen}
                  title="Abrir menu Inicio"
                >
                  <Image
                    src="https://win98icons.alexmeub.com/icons/png/windows_slanted-0.png"
                    alt=""
                    aria-hidden
                    width={16}
                    height={16}
                    className={styles.pixelated}
                  />
                  Start
                </button>
              </div>
              <div className="flex h-6 w-32 items-center gap-2 border border-black bg-[#b9b9b9] px-2 text-[11px] leading-6 text-black shadow-[inset_1px_1px_0_#fff]">
                <Image
                  src="https://win98icons.alexmeub.com/icons/png/ms_dos-1.png"
                  alt=""
                  aria-hidden
                  width={16}
                  height={16}
                  className={styles.pixelated}
                />
                MS-DOS Prompt
              </div>
              {gameActive ? (
                <div id="doom-task" className="flex h-6 w-32 items-center gap-2 border border-black bg-[#b9b9b9] px-2 text-[11px] leading-6 text-black shadow-[inset_1px_1px_0_#fff]">
                  <Image
                    src="https://win98icons.alexmeub.com/icons/png/ms_dos-1.png"
                    alt=""
                    aria-hidden
                    width={16}
                    height={16}
                    className={styles.pixelated}
                  />
                  {gameMode === "freedoom" ? "FREEDOOM.EXE" : "DOOM.EXE"}
                </div>
              ) : null}
            </div>
            <div className="h-6 min-w-[86px] border border-[#7f7f7f] bg-[#b9b9b9] px-2 text-right text-[11px] leading-6 text-black shadow-[inset_1px_1px_0_#fff]">
              {clock}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}