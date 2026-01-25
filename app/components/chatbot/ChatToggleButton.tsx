import { ChatToggleButtonProps } from "../../models";

export function ChatToggleButton({ onClick }: Readonly<ChatToggleButtonProps>) {
  return (
    <button
      onClick={onClick}
      className="px-6 py-3 bg-blue-pastel dark:bg-dark-blue-gray text-white dark:text-dark-smoke rounded-full font-medium hover:bg-yellow hover:text-light-text dark:hover:bg-dark-blue-pastel transition-colors flex items-center gap-2"
    >
      <span>💬</span> Chatea conmigo
    </button>
  );
}