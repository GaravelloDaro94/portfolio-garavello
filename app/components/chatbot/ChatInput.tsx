"use client";

import { ChatInputProps } from "../../models";
import { useI18n } from "@/app/hooks/useI18n";

export function ChatInput({
  value,
  onChange,
  onSubmit,
  isLoading,
}: Readonly<ChatInputProps>) {
  const { t } = useI18n();

  return (
    <form
      onSubmit={onSubmit}
      className="flex-shrink-0 flex gap-2 px-4 sm:px-6 py-3 sm:py-4 border-t-2 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t.chatbot.inputPlaceholder}
        disabled={isLoading}
        className="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base border-2 rounded-full focus:outline-none focus:ring-2 disabled:opacity-50 shadow-md focus:shadow-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
      />
      <button
        type="submit"
        disabled={isLoading || !value.trim()}
        className="px-4 sm:px-6 py-2 text-sm sm:text-base text-white rounded-full font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700"
      >
        {t.chatbot.send}
      </button>
    </form>
  );
}