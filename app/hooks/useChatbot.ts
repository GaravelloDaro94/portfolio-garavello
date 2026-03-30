import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { Message } from "../models";
import { DOOM_EASTER_EGG_REPLY } from "../constants/doom";
import { isDoomEasterEggTrigger } from "../utils/doomEasterEgg";
import { useI18n } from "./useI18n";

export function useChatbot() {
  const { language, t } = useI18n();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: t.chatbot.initialMessage,
    },
  ]);
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

  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: t.chatbot.initialMessage,
      },
    ]);
    setInput("");
    setIsLoading(false);
  }, [language, t.chatbot.initialMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    if (isDoomEasterEggTrigger(userMessage.content)) {
      const isMobile = /android|iphone|ipad|ipod/i.test(navigator.userAgent);
      if (isMobile) {
        const mobileMessage: Message = {
          role: "assistant",
          content: t.chatbot.mobileUnavailable,
        };
        setMessages((prev) => [...prev, mobileMessage]);
        setIsLoading(false);
        return;
      }

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
        body: JSON.stringify({ messages: [...messages, userMessage], language }),
      });

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      if (!data.reply) {
        throw new Error(t.chatbot.noReply);
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: data.reply,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error en chatbot:", error);

      let errorMsg = t.chatbot.unknownError;
      if (error instanceof TypeError && error.message.includes("fetch")) {
        errorMsg = t.chatbot.connectionError;
      } else if (error instanceof Error) {
        errorMsg = error.message;
      }

      toast.error(`${t.chatbot.chatErrorPrefix} ${errorMsg}`);

      const errorMessage: Message = {
        role: "assistant",
        content: `${t.chatbot.assistantErrorPrefix} ${errorMsg}. ${t.chatbot.assistantErrorSuffix}`,
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
