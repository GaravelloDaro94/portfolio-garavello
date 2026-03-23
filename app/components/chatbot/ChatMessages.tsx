import { ChatMessagesProps } from "../../models";
import { MessageBubble } from "./MessageBubble";
import { LoadingIndicator } from "./LoadingIndicator";

export function ChatMessages({
  messages,
  isLoading,
  messagesEndRef,
}: Readonly<ChatMessagesProps>) {
  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4 min-h-0 bg-white dark:bg-gray-800">
      {messages.map((message, index) => (
        <MessageBubble
          key={`${message.role}-${index}`}
          role={message.role}
          content={message.content}
        />
      ))}
      {isLoading && <LoadingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
}