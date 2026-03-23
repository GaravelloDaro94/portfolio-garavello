import { ChatToggleButtonProps } from "../../models";

export function ChatToggleButton({ onClick }: Readonly<ChatToggleButtonProps>) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-full bg-blue-pastel px-6 py-3 font-medium text-[var(--foreground)] transition-colors hover:bg-yellow hover:text-[var(--foreground)] dark:bg-dark-blue-gray dark:hover:bg-dark-blue-pastel dark:hover:text-white"
    >
      <span>💬</span> Chatea conmigo
    </button>
  );
}