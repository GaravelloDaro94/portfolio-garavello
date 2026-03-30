"use client";

import { ChatToggleButtonProps } from "../../models";
import { useI18n } from "@/app/hooks/useI18n";

export function ChatToggleButton({ onClick }: Readonly<ChatToggleButtonProps>) {
  const { t } = useI18n();

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-full bg-blue-pastel px-6 py-3 font-medium text-[var(--foreground)] transition-colors hover:bg-yellow hover:text-[var(--foreground)] dark:bg-dark-blue-gray dark:hover:bg-dark-blue-pastel dark:hover:text-white"
    >
      <span>💬</span> {t.chatbot.toggleLabel}
    </button>
  );
}