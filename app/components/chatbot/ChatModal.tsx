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
  colors,
}: Readonly<ChatModalProps>) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        className="w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200"
        style={colors.chatWindow}
      >
        <ChatHeader onClose={onClose} headerStyle={colors.header} />

        <ChatMessages
          messages={messages}
          isLoading={isLoading}
          messagesEndRef={messagesEndRef}
          messagesStyle={colors.messages}
          userMessageStyle={colors.userMessage}
          assistantMessageStyle={colors.assistantMessage}
          loadingBackgroundColor={colors.loading.backgroundColor}
          loadingDotColor={colors.loading.dotColor}
        />

        <SuggestedQuestions
          questions={suggestedQuestions}
          onQuestionClick={handleSuggestedQuestion}
          headerStyle={colors.suggestedQuestions.header}
          buttonStyle={colors.suggestedQuestions.button}
        />

        <ChatInput
          value={input}
          onChange={setInput}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          headerStyle={colors.input.header}
          inputStyle={colors.input.field}
          submitButtonStyle={colors.input.submitButton}
        />
      </div>
    </div>
  );
}
