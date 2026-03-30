"use client";

import { useContactForm } from "../hooks/useContactForm";
import { useI18n } from "../hooks/useI18n";

export default function ContactForm() {
  const { t } = useI18n();
  const {
    formData,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = useContactForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
      <div>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder={t.form.placeholders.name}
          required
          disabled={isSubmitting}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-white/30 dark:bg-dark-medium/40 backdrop-blur-sm text-light-text dark:text-dark-smoke placeholder:text-gray-600 dark:placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-pastel dark:focus:ring-dark-blue-pastel disabled:opacity-50 shadow-md shadow-gray-300/50 dark:shadow-black/50 focus:shadow-lg"
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={t.form.placeholders.email}
          required
          disabled={isSubmitting}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-white/30 dark:bg-dark-medium/40 backdrop-blur-sm text-light-text dark:text-dark-smoke placeholder:text-gray-600 dark:placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-pastel dark:focus:ring-dark-blue-pastel disabled:opacity-50 shadow-md shadow-gray-300/50 dark:shadow-black/50 focus:shadow-lg"
        />
      </div>
      <div>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder={t.form.placeholders.message}
          rows={5}
          required
          disabled={isSubmitting}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-white/30 dark:bg-dark-medium/40 backdrop-blur-sm text-light-text dark:text-dark-smoke placeholder:text-gray-600 dark:placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-pastel dark:focus:ring-dark-blue-pastel resize-none disabled:opacity-50 shadow-md shadow-gray-300/50 dark:shadow-black/50 focus:shadow-lg"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base bg-blue-pastel dark:bg-dark-blue-gray text-light-text dark:text-dark-smoke rounded-lg font-bold hover:bg-yellow hover:text-light-text dark:hover:bg-dark-blue-pastel transition-colors disabled:opacity-50 disabled:cursor-not-allowed border-2 border-light-text dark:border-dark-smoke"
      >
        {isSubmitting ? t.form.submitting : t.form.submit}
      </button>
    </form>
  );
}
