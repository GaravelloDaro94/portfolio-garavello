import { Message } from "./chatbot.types";
import { ChatbotColors } from "./theme.types";

export interface SuggestedQuestionsProps {
  readonly questions: string[];
  readonly onQuestionClick: (question: string) => void;
  readonly headerStyle: React.CSSProperties;
  readonly buttonStyle: React.CSSProperties;
}

export interface LoadingIndicatorProps {
  readonly backgroundColor: string;
  readonly dotColor: string;
}

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
  toggleChat: () => void;
  suggestedQuestions: string[];
  colors: ChatbotColors;
  isOpen: boolean;
  onClose: () => void;
}

export interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  messagesStyle: React.CSSProperties;
  userMessageStyle: React.CSSProperties;
  assistantMessageStyle: React.CSSProperties;
  loadingBackgroundColor: string;
  loadingDotColor: string;
}

export interface ChatHeaderProps {
  readonly onClose: () => void;
  readonly headerStyle: React.CSSProperties;
}

export interface ChatInputProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly onSubmit: (e: React.FormEvent) => void;
  readonly isLoading: boolean;
  readonly headerStyle: React.CSSProperties;
  readonly inputStyle: React.CSSProperties;
  readonly submitButtonStyle: React.CSSProperties;
}

export interface MessageBubbleProps {
  readonly role: string;
  readonly content: string;
  readonly userStyle: React.CSSProperties;
  readonly assistantStyle: React.CSSProperties;
}
