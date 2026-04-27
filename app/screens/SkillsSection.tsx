"use client";

import Link from "next/link";
import TypewriterTitle from "../components/animations/TypewriterTitle";
import FadeInCard from "../components/animations/FadeInCard";
import { useI18n } from "../hooks/useI18n";
import { TEXT_PRIMARY, GLASSMORPHISM_BASE, SHADOW_BASE, TEXT_ACCENT } from "../utils/styles";

export default function SkillsSection() {
  const { languageState } = useI18n();

  const isSpanish = languageState === "es";

  const experiences = [
    {
      period: isSpanish ? "Dic 2021 - Actualidad" : "Dec 2021 - Present",
      role: "Software Engineer - Fullstack / Mobile Developer",
      company: "Grupo Logístico Andreani",
      highlights: isSpanish
        ? [
            "Desarrollo y mantenimiento de aplicaciones mobile, web y backend para operaciones logísticas críticas.",
            "Stack principal: React Native + TypeScript + Redux Toolkit, React + Material UI, APIs REST con .NET Core y Node.js.",
            "Trabajo con SQL Server, Oracle y MongoDB; despliegues en Azure y OpenShift/Rancher.",
            "Testing con Jest, Vitest, Supertest y Playwright; CI/CD con GitHub Actions y GitLab CI.",
          ]
        : [
            "Development and maintenance of mobile, web, and backend apps for mission-critical logistics operations.",
            "Main stack: React Native + TypeScript + Redux Toolkit, React + Material UI, REST APIs in .NET Core and Node.js.",
            "Worked with SQL Server, Oracle, and MongoDB; deployments on Azure and OpenShift/Rancher.",
            "Testing with Jest, Vitest, Supertest, and Playwright; CI/CD with GitHub Actions and GitLab CI.",
          ],
    },
    {
      period: isSpanish ? "Oct 2020 - Nov 2021" : "Oct 2020 - Nov 2021",
      role: "Fullstack Engineer & Technical Lead",
      company: "Konzortia Capital",
      highlights: isSpanish
        ? [
            "Desarrollo end-to-end de productos web, mobile y backend para distintos clientes.",
            "Implementación de interfaces con React, Vue y WordPress; apps híbridas con Cordova.",
            "Construcción de APIs REST con Node.js y despliegues en AWS EC2.",
            "Liderazgo técnico: lineamientos de arquitectura, revisión de código y acompañamiento del equipo.",
          ]
        : [
            "End-to-end delivery of web, mobile, and backend products for multiple clients.",
            "UI implementation with React, Vue, and WordPress; hybrid apps with Cordova.",
            "REST API development with Node.js and deployments on AWS EC2.",
            "Technical leadership: architecture guidelines, code review, and team mentoring.",
          ],
    },
    {
      period: isSpanish ? "Mar 2017 - Actualidad" : "Mar 2017 - Present",
      role: isSpanish ? "Freelance Fullstack Developer" : "Freelance Fullstack Developer",
      company: isSpanish
        ? "Livia Accesorios y proyectos independientes"
        : "Livia Accesorios and independent projects",
      highlights: isSpanish
        ? [
            "Creación de soluciones para e-commerce, gestión y MVPs con foco en resultados de negocio.",
            "Desarrollo fullstack con Next.js, React, TypeScript, Node.js, Express, GraphQL y PostgreSQL/Supabase.",
            "Integración de pagos con Stripe y Mercado Pago, autenticación por roles y APIs seguras.",
            "Automatizaciones e integraciones con Zapier y APIs externas, fácilmente transferibles a n8n.",
          ]
        : [
            "Built ecommerce, management systems, and MVP products focused on business outcomes.",
            "Fullstack development with Next.js, React, TypeScript, Node.js, Express, GraphQL, and PostgreSQL/Supabase.",
            "Payment integrations with Stripe and Mercado Pago, role-based auth, and secure APIs.",
            "Automation and integrations with Zapier and external APIs, easily transferable to n8n.",
          ],
    },
  ];

  return (
    <section id="skills" className="min-h-screen px-1 py-8 sm:px-2 sm:py-10 lg:py-14">
      <div className="w-full">
        <TypewriterTitle
          text={isSpanish ? "Experiencias laborales" : "Work Experience"}
          className={`text-2xl sm:text-3xl md:text-4xl font-bold ${TEXT_PRIMARY} mb-6 sm:mb-8`}
        />
        <div className="space-y-5">
          {experiences.map((experience, index) => (
            <FadeInCard key={experience.company} delay={index * 120}>
              <article
                className={`rounded-2xl p-5 sm:p-6 ${GLASSMORPHISM_BASE} transition-all ${SHADOW_BASE} hover:shadow-xl hover:shadow-yellow/30 dark:hover:shadow-dark-blue-pastel/30`}
              >
                <div className="mb-4 flex flex-col gap-2 border-b border-light-text/10 pb-4 dark:border-gray-700">
                  <p className="text-xs font-semibold uppercase tracking-wide text-light-text/70 dark:text-gray-400">
                    {experience.period}
                  </p>
                  <h3 className={`text-lg font-semibold sm:text-xl ${TEXT_PRIMARY}`}>
                    {experience.role}
                  </h3>
                  <p className="text-sm text-light-text dark:text-gray-300">{experience.company}</p>
                </div>

                <ul className="space-y-2.5">
                  {experience.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2.5">
                      <span className={`${TEXT_ACCENT} mt-1 text-sm`}>✳</span>
                      <span className="text-sm leading-relaxed text-light-text dark:text-gray-300">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            </FadeInCard>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href={isSpanish ? "/cv/es" : "/cv/en"}
            target="_blank"
            className="flex w-full items-center gap-2 rounded-lg border border-light-border/40  px-4 py-2 text-sm font-semibold text-light-text transition-colors hover:bg-white/65 dark:border-dark-medium/70 dark:bg-dark-medium/45 dark:text-gray-200 dark:hover:bg-dark-medium/70"
          >
            {isSpanish ? "Ver CV completo" : "View full resume"}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
