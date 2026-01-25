// Chatbot Theme Types
export interface ChatbotColors {
  chatWindow: {
    backgroundColor: string;
    boxShadow: string;
  };
  header: {
    backgroundColor: string;
    borderColor: string;
  };
  messages: {
    backgroundColor: string;
  };
  userMessage: {
    backgroundColor: string;
    color: string;
  };
  assistantMessage: {
    backgroundColor: string;
    color: string;
  };
  loading: {
    backgroundColor: string;
    dotColor: string;
  };
  suggestedQuestions: {
    header: {
      borderColor: string;
    };
    button: {
      backgroundColor: string;
      borderColor: string;
      color: string;
    };
  };
  input: {
    header: {
      borderColor: string;
    };
    field: {
      backgroundColor: string;
      borderColor: string;
      color: string;
      boxShadow: string;
    };
    submitButton: {
      backgroundColor: string;
    };
  };
}
