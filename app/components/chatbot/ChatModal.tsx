import { ChatModalProps } from "../../models";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { SuggestedQuestions } from "./SuggestedQuestions";
import { ChatInput } from "./ChatInput";

export function ChatModal({
  messages,
  input,
  setInput,
  isLoading,
  messagesEndRef,
  handleSubmit,
  handleSuggestedQuestion,
  onClose,
  suggestedQuestions,
}: Readonly<ChatModalProps>) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 bg-white dark:bg-gray-800 dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
        <ChatHeader onClose={onClose} />

        <ChatMessages
          messages={messages}
          isLoading={isLoading}
          messagesEndRef={messagesEndRef}
        />

        <SuggestedQuestions
          questions={suggestedQuestions}
          onQuestionClick={handleSuggestedQuestion}
        />

        <ChatInput
          value={input}
          onChange={setInput}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
