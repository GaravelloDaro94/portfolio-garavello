"use client";

import Image from "next/image";
import QRCode from "react-qr-code";
import TypewriterTitle from "../components/animations/TypewriterTitle";
import FadeInCard from "../components/animations/FadeInCard";
import { useI18n } from "../hooks/useI18n";
import { TEXT_PRIMARY, GLASSMORPHISM_BASE, SHADOW_BASE, TEXT_ACCENT } from "../utils/styles";
import movieTheaterImage from "../assets/movie-theater.png";
import liviaAccesoriosImage from "../assets/livia-accesorios.png";

export default function ProjectsSection() {
  const { t } = useI18n();

  const projects = [
    {
      id: "ecommerce-platform",
      title: t.projects.items["ecommerce-platform"].title,
      description: t.projects.items["ecommerce-platform"].description,
      tags: ["Nextjs", "Node.js", "Supabase", "PostgreSQL", "Tailwind CSS", "Monolito"],
      demoUrl: "https://www.liviaccesorios.com.ar/",
      repoUrls: [
        { label: "Repo", url: "https://gitlab.com/garavello.manuel/livia-accesorios" }
      ],
      imageUrl: liviaAccesoriosImage
    },
    {
      id: "task-management-app",
      title: t.projects.items["task-management-app"].title,
      description: t.projects.items["task-management-app"].description,
      tags: ["Expo", "React Native", "Zustand", "SQLite", "PostgreSQL", "Socket.IO", "Prisma", "Railway"],
      demoUrl: "",
      repoUrls: [],
      imageUrl: null,
      mobileLinks: {
        // URL del proyecto en expo.dev (página con QR oficial para Expo Go)
        expoGo: "https://expo.dev/@dario.garavello/to-do-getter",
        // Completar con la URL del build APK generado por EAS (pnpm build:apk)
        apk: "https://expo.dev/artifacts/eas/eTh47NcBEEApJtLZMasQdm.apk"
      }
    },
    {
      id: "movie-theater",
      title: t.projects.items["movie-theater"].title,
      description: t.projects.items["movie-theater"].description,
      tags: ["Stack MERN", "GraphQL", "PostgreSQL", "SASS", "APIs externas (TMDB)"],
      demoUrl: "https://movie-theater-react.vercel.app/",
      repoUrls: [
        { label: "Frontend", url: "https://gitlab.com/garavello.manuel/movie-theater-react" },
        { label: "Backend", url: "https://gitlab.com/garavello.manuel/movie-theater-backend" }
      ],
      imageUrl: movieTheaterImage
    }
  ];

  const renderProjectMedia = (project: (typeof projects)[number]) => {
    if (project.imageUrl) {
      return (
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1260px) 33vw, 400px"
        />
      );
    }
    if ("mobileLinks" in project && project.mobileLinks) {
      const { expoGo, apk } = project.mobileLinks;
      return (
        <div className="flex gap-5 items-center justify-center w-full px-4">
          {/* QR Expo Go */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="bg-white p-1.5 rounded-lg shadow-sm">
              <QRCode value={expoGo} size={72} />
            </div>
            <span className="text-[11px] font-medium text-light-text dark:text-gray-400 text-center leading-tight">
              Demo<br />Expo Go
            </span>
          </div>
          {/* Separador */}
          <div className="h-20 w-px bg-light-text/20 dark:bg-gray-600" />
          {/* QR APK o placeholder */}
          <div className="flex flex-col items-center gap-1.5">
            {apk ? (
              <>
                <div className="bg-white p-1.5 rounded-lg shadow-sm">
                  <QRCode value={apk} size={72} />
                </div>
                <span className="text-[11px] font-medium text-light-text dark:text-gray-400 text-center leading-tight">
                  {t.projects.labels.downloadApk}<br />
                  APK
                </span>
              </>
            ) : (
              <>
                <div className="w-[84px] h-[84px] bg-white/30 dark:bg-white/10 rounded-lg border-2 border-dashed border-light-text/30 dark:border-gray-500 flex flex-col items-center justify-center gap-1">
                  <svg className="w-6 h-6 text-light-text/40 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span className="text-[10px] text-light-text/40 dark:text-gray-500 text-center px-1">
                    APK<br />{t.projects.labels.apkSoon}
                  </span>
                </div>
                <span className="text-[11px] text-light-text/50 dark:text-gray-500 text-center leading-tight">
                  {t.projects.labels.comingSoon}
                </span>
              </>
            )}
          </div>
        </div>
      );
    }
    return <span className="text-light-text/50 dark:text-gray-500 text-sm">{t.projects.labels.projectImage}</span>;
  };

  return (
    <section id="projects" className="h-full flex items-center justify-center px-4 sm:px-6 pl-12 sm:pl-16 py-8 sm:py-10 md:py-20">
      <div className="max-w-6xl w-full">
        <TypewriterTitle 
          text={t.projects.title}
          className={`text-2xl sm:text-3xl md:text-4xl font-bold ${TEXT_PRIMARY} mb-8 sm:mb-8`}
        />
        {/* Scroll horizontal en móvil, grid en desktop */}
        <div className="overflow-x-auto overflow-y-hidden md:overflow-visible pb-4 md:pb-0 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 scrollbar-hide">
          <div className="flex md:grid md:grid-cols-3 gap-6 snap-x snap-mandatory md:snap-none md:w-full">
            {projects.map((project, index) => (
              <FadeInCard key={project.id} delay={index * 100}>
              <div 
                className={`group rounded-2xl overflow-hidden hover:bg-yellow/10 dark:hover:bg-dark-blue-pastel/10 transition-all ${GLASSMORPHISM_BASE} ${SHADOW_BASE} hover:shadow-xl hover:shadow-yellow/30 dark:hover:shadow-dark-blue-pastel/30 w-[84vw] min-w-[280px] max-w-[360px] md:w-auto md:min-w-0 md:max-w-none snap-center flex-shrink-0`}
              >
                {/* Imagen del proyecto */}
                <div className="w-full h-48 flex-shrink-0 bg-gradient-to-br from-mint/30 to-yellow/30 dark:from-dark-blue-gray/50 dark:to-dark-blue-pastel/50 flex items-center justify-center relative overflow-hidden">
                  {renderProjectMedia(project)}
                </div>
                
                {/* Contenido */}
                <div className="p-4 space-y-2 flex-shrink-0">
                  <h3 className={`text-lg font-semibold ${TEXT_PRIMARY} line-clamp-2`}>
                    {project.title}
                  </h3>
                  <p className="text-sm text-light-text dark:text-gray-400 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-3 py-1 bg-mint dark:bg-dark-blue-gray text-light-text dark:text-gray-300 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Links section */}
                  {(project.demoUrl || project.repoUrls.length > 0 || ("mobileLinks" in project && project.mobileLinks)) && (
                    <div className="flex flex-wrap gap-2 pt-3 border-t border-light-text/10 dark:border-gray-700 mt-3">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${TEXT_ACCENT} hover:bg-yellow/20 dark:hover:bg-dark-blue-pastel/20`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          {t.projects.labels.demoProject}
                        </a>
                      )}
                      {project.repoUrls.map((repo) => (
                        <a
                          key={repo.url}
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${TEXT_ACCENT} hover:bg-yellow/20 dark:hover:bg-dark-blue-pastel/20`}
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          {repo.label}
                        </a>
                      ))}
                      {"mobileLinks" in project && project.mobileLinks?.expoGo && (
                        <a
                          href={project.mobileLinks.expoGo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${TEXT_ACCENT} hover:bg-yellow/20 dark:hover:bg-dark-blue-pastel/20`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          Expo Go
                        </a>
                      )}
                      {"mobileLinks" in project && project.mobileLinks?.apk && (
                        <a
                          href={project.mobileLinks.apk}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${TEXT_ACCENT} hover:bg-yellow/20 dark:hover:bg-dark-blue-pastel/20`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          {t.projects.labels.downloadApk}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
              </FadeInCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
