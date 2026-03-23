export type GameLaunchMode = "none" | "wad" | "freedoom";

export interface RuntimeState {
  calledRun: boolean;
  runtimeReady: boolean;
  exitStatus: number | null;
  phase: "idle" | "booting" | "running";
  canvas: string;
  err: string;
}

export interface WadPayload {
  name: string;
  bytes: Uint8Array;
}

export interface RunnerMessage {
  source: "doom-runner";
  type: "log" | "ready" | "error" | "exit";
  message?: string;
  error?: string;
  status?: number;
}

export interface DoomEasterEggModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export interface DoomRuntimeCanvasProps {
  readonly onClose: () => void;
  readonly onGamePromptChange?: (active: boolean, mode: GameLaunchMode) => void;
}
