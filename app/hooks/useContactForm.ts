"use client";

import { useState, FormEvent } from "react";
import { toast } from "sonner";
import { ContactFormData, ContactFormStatus } from "../models";

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<ContactFormStatus>({
    type: null,
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      toast.error("Por favor, ingresa tu nombre");
      return false;
    }

    if (!formData.email.trim()) {
      toast.error("Por favor, ingresa tu email");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Por favor, ingresa un email válido");
      return false;
    }

    if (!formData.message.trim()) {
      toast.error("Por favor, escribe un mensaje");
      return false;
    }

    if (formData.message.length < 10) {
      toast.error("El mensaje debe tener al menos 10 caracteres");
      return false;
    }

    return true;
  };

  const getErrorMessage = (response: Response, data: { error?: string }): string => {
    const errorMessages: Record<number, string> = {
      400: data.error || "Datos inválidos. Verifica los campos",
      500: "Error del servidor. Intenta de nuevo más tarde",
      429: "Demasiadas solicitudes. Espera un momento e intenta de nuevo",
    };
    return errorMessages[response.status] || data.error || "Error al enviar el mensaje";
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(getErrorMessage(response, data));
      }

      toast.success("¡Mensaje enviado exitosamente! Te responderé pronto.", {
        duration: 5000,
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error enviando formulario:", error);

      let errorMsg = "Error al enviar el mensaje";
      if (error instanceof TypeError && error.message.includes("fetch")) {
        errorMsg = "Error de conexión. Verifica tu conexión a internet";
      } else if (error instanceof Error) {
        errorMsg = error.message;
      }

      toast.error(errorMsg, {
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    submitStatus,
    handleChange,
    handleSubmit,
    setSubmitStatus,
  };
}
