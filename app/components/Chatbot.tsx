"use client";

import { useChatbot } from "../hooks/useChatbot";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";
import { useI18n } from "../hooks/useI18n";
import { ChatToggleButton } from "./chatbot/ChatToggleButton";
import { ChatModal } from "./chatbot/ChatModal";
import { DoomEasterEggModal } from "./chatbot/DoomEasterEggModal";

export default function Chatbot() {
  const { t } = useI18n();
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
          suggestedQuestions={[...t.chatbot.suggestedQuestions]}
          onClose={toggleChat}
        />
      )}

      {isDoomOpen ? <DoomEasterEggModal isOpen={isDoomOpen} onClose={closeDoom} /> : null}
    </>
  );
}