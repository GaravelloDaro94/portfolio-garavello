import { ChatMessagesProps } from "../../models";
import { MessageBubble } from "./MessageBubble";
import { LoadingIndicator } from "./LoadingIndicator";

export function ChatMessages({
  messages,
  isLoading,
  messagesEndRef,
  messagesStyle,
  userMessageStyle,
  assistantMessageStyle,
  loadingBackgroundColor,
  loadingDotColor,
}: Readonly<ChatMessagesProps>) {
  return (
    <div 
      className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4 min-h-0"
      style={messagesStyle}
    >
      {messages.map((message, index) => (
        <MessageBubble
          key={`${message.role}-${index}`}
          role={message.role}
          content={message.content}
          userStyle={userMessageStyle}
          assistantStyle={assistantMessageStyle}
        />
      ))}
      {isLoading && (
        <LoadingIndicator
          backgroundColor={loadingBackgroundColor}
          dotColor={loadingDotColor}
        />
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}