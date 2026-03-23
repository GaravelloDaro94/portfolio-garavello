import { useCallback, useEffect, useState } from "react";
import type { GameLaunchMode } from "../models";

export function useDoomModal(isOpen: boolean) {
  const [clock, setClock] = useState("--:-- --");
  const [gameActive, setGameActive] = useState(false);
  const [gameMode, setGameMode] = useState<GameLaunchMode>("none");

  const handleGamePromptChange = useCallback((active: boolean, mode: GameLaunchMode) => {
    setGameActive(active);
    setGameMode(mode);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const updateClock = () => {
      setClock(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    };

    updateClock();
    const timer = globalThis.setInterval(updateClock, 30_000);
    return () => {
      globalThis.clearInterval(timer);
    };
  }, [isOpen]);

  return { clock, gameActive, gameMode, handleGamePromptChange };
}
