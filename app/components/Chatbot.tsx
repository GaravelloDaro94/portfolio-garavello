"use client";

import { useTheme } from "next-themes";
import { useChatbot } from "../hooks/useChatbot";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";
import { getChatbotColors } from "../utils/chatbotTheme";
import { SUGGESTED_QUESTIONS } from "../constants/chatbot";
import { ChatToggleButton } from "./chatbot/ChatToggleButton";
import { ChatModal } from "./chatbot/ChatModal";

export default function Chatbot() {
  const { theme } = useTheme();
  const {
    messages,
    input,
    setInput,
    isLoading,
    isOpen,
    messagesEndRef,
    handleSubmit,
    handleSuggestedQuestion,
    toggleChat,
  } = useChatbot();

  useBodyScrollLock(isOpen);
  const colors = getChatbotColors(theme);

  return (
    <>
      <ChatToggleButton onClick={toggleChat} />
      
      {isOpen && (
        <ChatModal
          messages={messages}
          input={input}
          setInput={setInput}
          isLoading={isLoading}
          messagesEndRef={messagesEndRef as React.RefObject<HTMLDivElement>}
          handleSubmit={handleSubmit}
          handleSuggestedQuestion={handleSuggestedQuestion}
          toggleChat={toggleChat}
          suggestedQuestions={SUGGESTED_QUESTIONS}
          colors={colors}
          isOpen={isOpen}
          onClose={toggleChat}
        />
      )}
    </>
  );
}