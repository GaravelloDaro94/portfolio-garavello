import { ChatbotColors } from "../models";

const darkColors: ChatbotColors = {
  chatWindow: {
    backgroundColor: "#1f2937",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
  },
  header: {
    backgroundColor: "#111827",
    borderColor: "#374151",
  },
  messages: {
    backgroundColor: "#1f2937",
  },
  userMessage: {
    backgroundColor: "#2563eb",
    color: "#ffffff",
  },
  assistantMessage: {
    backgroundColor: "#374151",
    color: "#f3f4f6",
  },
  loading: {
    backgroundColor: "#374151",
    dotColor: "#60a5fa",
  },
  suggestedQuestions: {
    header: {
      borderColor: "#374151",
    },
    button: {
      backgroundColor: "#1e3a8a",
      borderColor: "#1e40af",
      color: "#d1d5db",
    },
  },
  input: {
    header: {
      borderColor: "#374151",
    },
    field: {
      backgroundColor: "#374151",
      borderColor: "#4b5563",
      color: "#f3f4f6",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.5)",
    },
    submitButton: {
      backgroundColor: "#2563eb",
    },
  },
};

const lightColors: ChatbotColors = {
  chatWindow: {
    backgroundColor: "#ffffff",
    boxShadow: "0 25px 50px -12px rgba(156, 163, 175, 0.5)",
  },
  header: {
    backgroundColor: "#f9fafb",
    borderColor: "#e5e7eb",
  },
  messages: {
    backgroundColor: "#ffffff",
  },
  userMessage: {
    backgroundColor: "#3b82f6",
    color: "#ffffff",
  },
  assistantMessage: {
    backgroundColor: "#f3f4f6",
    color: "#111827",
  },
  loading: {
    backgroundColor: "#f3f4f6",
    dotColor: "#3b82f6",
  },
  suggestedQuestions: {
    header: {
      borderColor: "#e5e7eb",
    },
    button: {
      backgroundColor: "#dbeafe",
      borderColor: "#bfdbfe",
      color: "#111827",
    },
  },
  input: {
    header: {
      borderColor: "#e5e7eb",
    },
    field: {
      backgroundColor: "#ffffff",
      borderColor: "#d1d5db",
      color: "#111827",
      boxShadow: "0 4px 6px -1px rgba(156, 163, 175, 0.5)",
    },
    submitButton: {
      backgroundColor: "#3b82f6",
    },
  },
};

export function getChatbotColors(theme: string | undefined): ChatbotColors {
  return theme === "dark" ? darkColors : lightColors;
}
