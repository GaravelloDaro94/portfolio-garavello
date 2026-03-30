"use client";

import TypewriterTitle from "../components/animations/TypewriterTitle";
import FadeInCard from "../components/animations/FadeInCard";
import { useI18n } from "../hooks/useI18n";
import { TEXT_PRIMARY, GLASSMORPHISM_BASE, SHADOW_BASE, TEXT_ACCENT } from "../utils/styles";

export default function SkillsSection() {
  const { t } = useI18n();

  const skillCategories = [
    {
      title: "Frontend",
      skills: ["React & Next.js", "TypeScript", "Tailwind CSS", "HTML5 & CSS3", "Redux & Zustand"]
    },
    {
      title: "Backend",
      skills: ["Node.js & Express", "REST APIs", "PostgreSQL & MongoDB", "Authentication & JWT", "Docker"]
    },
    {
      title: t.skills.categories.tools,
      skills: ["Git & GitHub", "VS Code", "Figma", "Postman", "Vercel & Netlify"]
    },
    {
      title: t.skills.categories.other,
      skills: [
        t.skills.items.teamwork,
        t.skills.items.problemSolving,
        t.skills.items.communication,
        t.skills.items.continuousLearning,
        t.skills.items.timeManagement,
      ]
    }
  ];

  return (
    <section id="skills" className="min-h-screen flex items-center justify-center px-4 sm:px-6 pl-12 sm:pl-16 py-12 sm:py-20">
      <div className="w-4/5 max-w-6xl">
        <TypewriterTitle 
          text={t.skills.title}
          className={`text-2xl sm:text-3xl md:text-4xl font-bold ${TEXT_PRIMARY} mb-6 sm:mb-8`}
        />
        {/* Scroll horizontal en móvil, grid en desktop */}
        <div className="overflow-x-auto overflow-y-hidden md:overflow-visible pb-4 md:pb-0 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 scrollbar-hide">
          <div className="flex md:grid md:grid-cols-2 gap-6 snap-x snap-mandatory md:snap-none md:w-full">
            {skillCategories.map((category, index) => (
              <FadeInCard
                key={category.title}
                delay={index * 100}
                className=" min-w-[280px] max-w-[360px] md:w-auto md:min-w-0 md:max-w-none snap-center flex-shrink-0"
              >
                <div>
                  <h3 className={`text-lg text-center md:text-left sm:text-xl font-semibold ${TEXT_PRIMARY} mb-2 sm:mb-3`}>
                    {category.title}
                  </h3>
                  <div className={`rounded-2xl p-4 sm:p-5 ${GLASSMORPHISM_BASE} transition-all ${SHADOW_BASE} hover:shadow-xl hover:shadow-yellow/30 dark:hover:shadow-dark-blue-pastel/30`}>
                    <ul className="grid md:grid-cols-2 gap-x-4 gap-y-1.5 sm:gap-y-2">
                      {category.skills.map((skill) => (
                        <li key={skill} className="flex items-center gap-2">
                          <span className={`${TEXT_ACCENT} text-base flex-shrink-0`}>✳</span>
                          <span className="text-xs sm:text-sm text-light-text dark:text-gray-400">{skill}</span>
                        </li>
                      ))}
                    </ul>
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
