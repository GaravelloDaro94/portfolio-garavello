import Chatbot from "../components/Chatbot";
import TypewriterTitle from "../components/animations/TypewriterTitle";
import FadeInCard from "../components/animations/FadeInCard";
import { TEXT_PRIMARY, GLASSMORPHISM_BASE, BORDER_BASE } from "../utils/styles";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 pl-12 sm:pl-16 py-16 sm:py-20"
    >
      <div className="max-w-6xl w-full">
        <TypewriterTitle
          text="Sobre Mí"
          className={`text-2xl sm:text-3xl md:text-4xl font-bold ${TEXT_PRIMARY} mb-3 sm:mb-4`}
        />

        <FadeInCard>
          <div className={`rounded-2xl p-4 sm:p-6 transition-all ${GLASSMORPHISM_BASE} bg-white/70 dark:bg-dark-medium/60 shadow-lg shadow-gray-300/50 dark:shadow-black/50`}>
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-700 dark:text-gray-200 mb-4 sm:mb-6">
              <p>
                Soy una persona apasionada por crear soluciones eficientes y elegantes. Para mí,
                programar es transformar ideas en proyectos útiles y bien diseñados.
              </p>
              <p>
                Uno de mis logros más importantes fue desarrollar mi propia ISO de Linux, lo que me
                permitió aprender en profundidad sobre sistemas operativos y reforzar mi curiosidad
                por la tecnología.
              </p>
              <p>
                Me gusta escribir código claro, limpio y escalable, que facilite el trabajo en
                equipo y el crecimiento de los proyectos.
              </p>
              <p>
                Siempre busco aprender cosas nuevas y mejorar mis habilidades. Creo que el
                aprendizaje constante es clave para aportar valor como profesional.
              </p>
              <p>
                Cuando no estoy programando, me mantengo al día con las últimas tendencias en
                desarrollo web y participo en la comunidad open source.
              </p>
            </div>

            {/* Chatbot */}
            <div className={`mt-4 sm:mt-6 pt-4 sm:pt-6 ${BORDER_BASE} border-t`}>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-3 sm:mb-4">
                ¿Tienes preguntas sobre mi experiencia? Chatea con mi asistente virtual:
              </p>
              <Chatbot />
            </div>
          </div>
        </FadeInCard>
      </div>
    </section>
  );
}
