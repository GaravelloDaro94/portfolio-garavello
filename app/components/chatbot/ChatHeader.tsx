import { ChatHeaderProps } from "../../models";

export function ChatHeader({ onClose, headerStyle }: Readonly<ChatHeaderProps>) {
  return (
    <div 
      className="flex-shrink-0 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b-2"
      style={headerStyle}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <span className="text-xl sm:text-2xl">🤖</span>
        <div>
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100">
            Asistente Virtual
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Pregunta sobre mi experiencia
          </p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-xl sm:text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        aria-label="Cerrar chat"
      >
        ✕
      </button>
    </div>
  );
}