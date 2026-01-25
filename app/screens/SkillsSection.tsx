import TypewriterTitle from "../components/animations/TypewriterTitle";
import FadeInCard from "../components/animations/FadeInCard";
import { TEXT_PRIMARY, GLASSMORPHISM_BASE, SHADOW_BASE, TEXT_ACCENT } from "../utils/styles";

export default function SkillsSection() {
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
      title: "Herramientas",
      skills: ["Git & GitHub", "VS Code", "Figma", "Postman", "Vercel & Netlify"]
    },
    {
      title: "Otras Competencias",
      skills: ["Trabajo en equipo", "Resolución de problemas", "Comunicación efectiva", "Aprendizaje continuo", "Gestión del tiempo"]
    }
  ];

  return (
    <section id="skills" className="min-h-screen flex items-center justify-center px-4 sm:px-6 pl-12 sm:pl-16 py-12 sm:py-20">
      <div className="w-4/5 max-w-6xl">
        <TypewriterTitle 
          text="Habilidades" 
          className={`text-2xl sm:text-3xl md:text-4xl font-bold ${TEXT_PRIMARY} mb-6 sm:mb-8`}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {skillCategories.map((category, index) => (
            <FadeInCard key={category.title} delay={index * 100}>
              <div>
              <h3 className={`text-lg sm:text-xl font-semibold ${TEXT_PRIMARY} mb-2 sm:mb-3`}>
                {category.title}
              </h3>
              <div className={`rounded-2xl p-4 sm:p-5 ${GLASSMORPHISM_BASE} transition-all ${SHADOW_BASE} hover:shadow-xl hover:shadow-yellow/30 dark:hover:shadow-dark-blue-pastel/30`}>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 sm:gap-y-2">
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
    </section>
  );
}
