// Tipos relacionados con el chatbot
export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface ChatbotState {
  messages: Message[];
  input: string;
  isLoading: boolean;
  isOpen: boolean;
}
