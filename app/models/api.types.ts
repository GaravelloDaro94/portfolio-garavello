// Tipos relacionados con la API de chat
export interface ChatRequest {
  messages: Array<{
    role: "user" | "assistant" | "system";
    content: string;
  }>;
}

export interface ChatResponse {
  reply: string;
}

export interface ChatError {
  error: string;
}
