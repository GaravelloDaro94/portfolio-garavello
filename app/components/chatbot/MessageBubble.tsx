import { MessageBubbleProps } from "../../models";

export function MessageBubble({ 
  role, 
  content, 
  userStyle, 
  assistantStyle 
}: Readonly<MessageBubbleProps>) {
  const isUser = role === "user";
  
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className="max-w-[80%] rounded-2xl px-4 py-3"
        style={isUser ? userStyle : assistantStyle}
      >
        <p className="text-sm whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
}