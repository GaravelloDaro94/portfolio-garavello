"use client";

import { useState } from "react";
import TypewriterTitle from "../components/animations/TypewriterTitle";
import FadeInCard from "../components/animations/FadeInCard";
import UmamiStatsModal from "../components/UmamiStatsModal";
import { TEXT_PRIMARY, GLASSMORPHISM_BASE, SHADOW_BASE, TEXT_ACCENT } from "../utils/styles";

export default function ProjectsSection() {
  const [showStatsModal, setShowStatsModal] = useState(false);

  const projects = [
    {
      id: "portfolio",
      title: "Portfolio Personal",
      description: "Portfolio interactivo con Next.js, TypeScript y Tailwind. Incluye animaciones, modo oscuro/claro automático y analíticas en tiempo real.",
      tags: ["Next.js", "TypeScript", "Tailwind"],
      demoAction: () => setShowStatsModal(true),
      demoLabel: "Ver Estadísticas"
    },
    {
      id: "ecommerce-platform",
      title: "E-commerce Platform",
      description: "Plataforma de comercio electrónico completa con carrito de compras, procesamiento de pagos y panel de administración.",
      tags: ["React", "Node.js", "PostgreSQL"]
    },
    {
      id: "task-management-app",
      title: "Task Management App",
      description: "Aplicación de gestión de tareas colaborativa con funcionalidades en tiempo real y sistema de notificaciones.",
      tags: ["Next.js", "TypeScript", "MongoDB"]
    },
    {
      id: "analytics-dashboard",
      title: "Analytics Dashboard",
      description: "Dashboard interactivo de análisis de datos con gráficos en tiempo real y exportación de reportes.",
      tags: ["React", "Express", "Chart.js"]
    },
    {
      id: "social-network-api",
      title: "Social Network API",
      description: "API RESTful para red social con autenticación JWT, sistema de posts, comentarios y mensajería.",
      tags: ["Node.js", "Express", "MySQL"]
    }
  ];

  return (
    <section id="projects" className="min-h-screen flex items-center justify-center px-4 sm:px-6 pl-12 sm:pl-16 py-12 sm:py-20">
      <div className="max-w-6xl w-full">
        <TypewriterTitle 
          text="Proyectos Destacados" 
          className={`text-2xl sm:text-3xl md:text-4xl font-bold ${TEXT_PRIMARY} mb-8 sm:mb-12`}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {projects.map((project, index) => (
            <FadeInCard key={project.id} delay={index * 100}>
              <div 
                className={`group rounded-2xl p-4 sm:p-5 hover:bg-yellow/10 dark:hover:bg-dark-blue-pastel/10 transition-all ${GLASSMORPHISM_BASE} ${SHADOW_BASE} hover:shadow-xl hover:shadow-yellow/30 dark:hover:shadow-dark-blue-pastel/30`}
              >
              <div className="space-y-2 sm:space-y-3">
                <h3 className={`text-lg sm:text-xl font-semibold ${TEXT_PRIMARY}`}>
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-light-text dark:text-gray-400">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-mint dark:bg-dark-blue-gray text-light-text dark:text-gray-300 text-xs sm:text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 pt-2">
                  <button 
                    onClick={project.demoAction}
                    className={`text-xs sm:text-sm ${TEXT_ACCENT} hover:text-pink dark:hover:text-dark-smoke underline`}
                  >
                    {project.demoLabel || "Ver Demo"}
                  </button>
                  <button className={`text-xs sm:text-sm ${TEXT_ACCENT} hover:text-pink dark:hover:text-dark-smoke underline`}>
                    Ver Código
                  </button>
                </div>
              </div>
            </div>
            </FadeInCard>
          ))}
        </div>

        {/* Modal de estadísticas */}
        <UmamiStatsModal 
          isOpen={showStatsModal} 
          onClose={() => setShowStatsModal(false)} 
        />
      </div>
    </section>
  );
}
