"use client";

import { useChatbot } from "../hooks/useChatbot";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";
import { SUGGESTED_QUESTIONS } from "../constants/chatbot";
import { ChatToggleButton } from "./chatbot/ChatToggleButton";
import { ChatModal } from "./chatbot/ChatModal";
import { DoomEasterEggModal } from "./chatbot/DoomEasterEggModal";

export default function Chatbot() {
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
    isDoomOpen,
    closeDoom,
  } = useChatbot();

  useBodyScrollLock(isOpen || isDoomOpen);

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
          suggestedQuestions={SUGGESTED_QUESTIONS}
          onClose={toggleChat}
        />
      )}

      {isDoomOpen ? <DoomEasterEggModal isOpen={isDoomOpen} onClose={closeDoom} /> : null}
    </>
  );
}