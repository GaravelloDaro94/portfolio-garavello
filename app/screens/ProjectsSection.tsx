"use client";

import TypewriterTitle from "../components/animations/TypewriterTitle";
import FadeInCard from "../components/animations/FadeInCard";
import ProjectMedia from "../components/ProjectMedia";
import { useI18n } from "../hooks/useI18n";
import { useProjects, type Project } from "../hooks/useProjects";
import { TEXT_PRIMARY, GLASSMORPHISM_BASE, SHADOW_BASE, TEXT_ACCENT } from "../utils/styles";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t } = useI18n();

  return (
    <FadeInCard delay={index * 100}>
      <article
        className={`group overflow-hidden rounded-2xl transition-all hover:bg-yellow/10 dark:hover:bg-dark-blue-pastel/10 ${GLASSMORPHISM_BASE} ${SHADOW_BASE} hover:shadow-xl hover:shadow-yellow/30 dark:hover:shadow-dark-blue-pastel/30`}
      >
        <div className="flex flex-col md:min-h-[260px] md:flex-row">
          <div className="flex items-center justify-center relative h-48 w-full overflow-hidden bg-gradient-to-br from-mint/30 to-yellow/30 md:h-auto md:w-[38%] lg:w-[34%] dark:from-dark-blue-gray/50 dark:to-dark-blue-pastel/50">
            <ProjectMedia project={project} />
          </div>

          <div className="flex w-full flex-col gap-4 p-4 sm:p-5 md:w-[62%] lg:w-[66%]">
            <h3 className={`text-lg font-semibold leading-tight sm:text-xl ${TEXT_PRIMARY}`}>
              {project.title}
            </h3>

            <p className="text-sm leading-relaxed text-light-text dark:text-gray-300 sm:text-[0.95rem]">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-mint px-3 py-1 text-[11px] font-semibold text-light-text dark:bg-dark-blue-gray dark:text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            {(project.demoUrl || project.repoUrls.length > 0 || project.mobileLinks) && (
              <div className="mt-auto flex flex-wrap gap-2 border-t border-light-text/10 pt-3 dark:border-gray-700">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${TEXT_ACCENT} hover:bg-yellow/20 dark:hover:bg-dark-blue-pastel/20`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
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
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    {repo.label}
                  </a>
                ))}

                {project.mobileLinks?.expoGo && (
                  <a
                    href={project.mobileLinks.expoGo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${TEXT_ACCENT} hover:bg-yellow/20 dark:hover:bg-dark-blue-pastel/20`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                    Expo Go
                  </a>
                )}

                {project.mobileLinks?.apk && (
                  <a
                    href={project.mobileLinks.apk}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${TEXT_ACCENT} hover:bg-yellow/20 dark:hover:bg-dark-blue-pastel/20`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    {t.projects.labels.downloadApk}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </article>
    </FadeInCard>
  );
}

export default function ProjectsSection() {
  const { t } = useI18n();
  const projects = useProjects();

  const featured = projects.filter((p) => p.category === "featured");
  const mockup = projects.filter((p) => p.category === "mockup");

  return (
    <section id="projects" className="min-h-screen px-1 py-8 sm:px-2 sm:py-10 lg:py-14">
      <div className="w-full">
        <TypewriterTitle
          text={t.projects.title}
          className={`text-2xl sm:text-3xl md:text-4xl font-bold ${TEXT_PRIMARY} mb-7 sm:mb-8`}
        />

        <h2 className={`text-base font-semibold uppercase tracking-widest mb-4 ${TEXT_ACCENT} opacity-80`}>
          {t.projects.sections.featured}
        </h2>
        <div className="space-y-5 mb-10">
          {featured.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <h2 className={`text-base font-semibold uppercase tracking-widest mb-4 ${TEXT_ACCENT} opacity-80`}>
          {t.projects.sections.mockup}
        </h2>
        <div className="space-y-5">
          {mockup.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
