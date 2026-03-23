import { DOOM_SECRET_TRIGGERS } from "../constants/doom";

function normalizeMessage(message: string): string {
  return message
    .normalize("NFD")
    .replaceAll(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replaceAll(/\s+/g, " ");
}

export function isDoomEasterEggTrigger(message: string): boolean {
  const normalized = normalizeMessage(message);
  return DOOM_SECRET_TRIGGERS.includes(normalized as (typeof DOOM_SECRET_TRIGGERS)[number]);
}
