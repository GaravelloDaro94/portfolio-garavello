import { Message } from "./chatbot.types";

export interface SuggestedQuestionsProps {
  readonly questions: string[];
  readonly onQuestionClick: (question: string) => void;
}

export interface LoadingIndicatorProps {}

export interface ChatToggleButtonProps {
  readonly onClick: () => void;
}

export interface ChatModalProps {
  messages: Message[];
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  handleSubmit: (e: React.FormEvent) => void;
  handleSuggestedQuestion: (question: string) => void;
  suggestedQuestions: string[];
  onClose: () => void;
}

export interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export interface ChatHeaderProps {
  readonly onClose: () => void;
}

export interface ChatInputProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly onSubmit: (e: React.FormEvent) => void;
  readonly isLoading: boolean;
}

export interface MessageBubbleProps {
  readonly role: string;
  readonly content: string;
}
