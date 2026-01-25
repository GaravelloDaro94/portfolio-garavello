import ContactForm from "../components/ContactForm";
import TypewriterTitle from "../components/animations/TypewriterTitle";
import Link from "next/link";
import { BUTTON_ICON_BASE, BUTTON_PRIMARY, TEXT_PRIMARY } from "../utils/styles";

export default function ContactSection() {
  return (
    <section id="contact" className="min-h-screen flex items-center justify-center px-4 sm:px-6 pl-12 sm:pl-16 py-12 sm:py-20">
      <div className="max-w-4xl w-full">
        <TypewriterTitle 
          text="Contacto" 
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-light-text dark:text-dark-smoke mb-6 sm:mb-8"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Social Icons with Description */}
          <div className="space-y-6">
            <p className={`text-lg sm:text-xl ${TEXT_PRIMARY}`}>
              Si te interesó para ser tu candidato perfecto, puedes contactarme escribiendo en el siguiente formulario
            </p>
            <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/dariogaravello"
              target="_blank"
              rel="noopener noreferrer"
              className={BUTTON_ICON_BASE}
              aria-label="LinkedIn"
            >
              <svg className="w-6 h-6 text-light-text dark:text-dark-smoke" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/dariogaravello"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full hover:bg-yellow/10 dark:hover:bg-dark-blue-pastel/10 transition-all bg-white/30 dark:bg-dark-medium/40 backdrop-blur-sm shadow-md shadow-gray-300/50 dark:shadow-black/50 hover:shadow-lg hover:shadow-yellow/40 dark:hover:shadow-dark-blue-pastel/40"
              aria-label="Instagram"
            >
              <svg className="w-6 h-6 text-light-text dark:text-dark-smoke" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/share/17MMDUWLk4/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full hover:bg-yellow/10 dark:hover:bg-dark-blue-pastel/10 transition-all bg-white/30 dark:bg-dark-medium/40 backdrop-blur-sm shadow-md shadow-gray-300/50 dark:shadow-black/50 hover:shadow-lg hover:shadow-yellow/40 dark:hover:shadow-dark-blue-pastel/40"
              aria-label="Facebook"
            >
              <svg className="w-6 h-6 text-light-text dark:text-dark-smoke" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </a>
            <Link
              href="/blog"
              className={`${BUTTON_PRIMARY} hover:text-light-text dark:hover:text-white flex items-center gap-2`}
              aria-label="Blog"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              /blog
            </Link>
          </div>
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
