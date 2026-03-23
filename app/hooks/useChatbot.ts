import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { Message } from "../models";
import { DOOM_EASTER_EGG_REPLY } from "../constants/doom";
import { isDoomEasterEggTrigger } from "../utils/doomEasterEgg";

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content:
    "¡Hola! Soy el asistente virtual de Darío. Puedes preguntarme sobre su experiencia, habilidades, proyectos o cualquier otra cosa relacionada con su trabajo. ¿En qué puedo ayudarte?",
};

export function useChatbot() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDoomOpen, setIsDoomOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const doomOpenTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages.length, isOpen]);

  useEffect(() => {
    return () => {
      if (doomOpenTimeoutRef.current) {
        clearTimeout(doomOpenTimeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    if (isDoomEasterEggTrigger(userMessage.content)) {
      const easterEggMessage: Message = {
        role: "assistant",
        content: DOOM_EASTER_EGG_REPLY,
      };
      setMessages((prev) => [...prev, easterEggMessage]);

      if (doomOpenTimeoutRef.current) {
        clearTimeout(doomOpenTimeoutRef.current);
      }

      doomOpenTimeoutRef.current = setTimeout(() => {
        setIsOpen(false);
        setIsDoomOpen(true);
      }, 1500);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      if (!data.reply) {
        throw new Error("No se recibió respuesta del asistente");
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: data.reply,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error en chatbot:", error);

      let errorMsg = "Error desconocido";
      if (error instanceof TypeError && error.message.includes("fetch")) {
        errorMsg = "Error de conexión. Verifica tu conexión a internet";
      } else if (error instanceof Error) {
        errorMsg = error.message;
      }

      toast.error(`Error en el chat: ${errorMsg}`);

      const errorMessage: Message = {
        role: "assistant",
        content: `Lo siento, hubo un error: ${errorMsg}. Por favor, intenta de nuevo.`,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDoom = () => {
    if (doomOpenTimeoutRef.current) {
      clearTimeout(doomOpenTimeoutRef.current);
      doomOpenTimeoutRef.current = null;
    }
    setIsDoomOpen(false);
  };

  return {
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
  };
}
