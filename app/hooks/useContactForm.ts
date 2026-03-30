"use client";

import { useState, FormEvent } from "react";
import { toast } from "sonner";
import { ContactFormData, ContactFormStatus } from "../models";
import { useI18n } from "./useI18n";

export function useContactForm() {
  const { t } = useI18n();
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
      toast.error(t.form.validation.nameRequired);
      return false;
    }

    if (!formData.email.trim()) {
      toast.error(t.form.validation.emailRequired);
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error(t.form.validation.emailInvalid);
      return false;
    }

    if (!formData.message.trim()) {
      toast.error(t.form.validation.messageRequired);
      return false;
    }

    if (formData.message.length < 10) {
      toast.error(t.form.validation.messageMinLength);
      return false;
    }

    return true;
  };

  const getErrorMessage = (response: Response, data: { error?: string }): string => {
    const errorMessages: Record<number, string> = {
      400: data.error || t.form.errors.invalidData,
      500: t.form.errors.server,
      429: t.form.errors.rateLimit,
    };
    return errorMessages[response.status] || data.error || t.form.errors.send;
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

      toast.success(t.form.success, {
        duration: 5000,
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error enviando formulario:", error);

      let errorMsg = t.form.errors.send;
      if (error instanceof TypeError && error.message.includes("fetch")) {
        errorMsg = t.form.errors.connection;
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
