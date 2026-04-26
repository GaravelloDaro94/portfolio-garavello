import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatRequest, ChatResponse, ChatError } from "../../models";

// Información predeterminada sobre Darío Garavello
const PORTFOLIO_INFO = {
  nombre: "Darío Garavello",
  rol: "Developer",
  experiencia: "Desarrollador especializado en React, Node.js y tecnologías modernas web",
  empresa: "Andreani Logística SA",
  tecnologias: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Express",
    "PostgreSQL",
    "MongoDB",
    "Tailwind CSS",
    "SASS",
    "Laravel(PHP)",
  ],
  proyectos: [
    "E-commerce Livia Accesorios: Plataforma de comercio electrónico completa con carrito de compras, procesamiento de pagos y panel de administración.",
    "Todo Togetter app: App mobile con Expo y React Native para gestión colaborativa de tareas. Incluye autenticación, contactos, asignación en tiempo real, recordatorios y sincronización con backend propio.",
    "Eventra: Plataforma de gestión de eventos construida con Laravel y arquitectura modular, con APIs documentadas y flujo end-to-end para operación y seguimiento.",
    "Movie Theater: Un proyecto de streaming de películas con autenticación, sistema de filtros, acceso premium por pagos por stripe o mercado pago.",
  ],
  fortalezas: [
    "Código limpio y mantenible",
    "Trabajo en equipo",
    "Resolución de problemas",
    "Comunicación efectiva",
    "Aprendizaje continuo",
  ],
};

type SupportedLanguage = "es" | "en";

function includesAny(message: string, keywords: readonly string[]): boolean {
  return keywords.some((keyword) => message.includes(keyword));
}

function getProjectsList(): string {
  return PORTFOLIO_INFO.proyectos.map((p, i) => `${i + 1}. ${p}`).join("\n\n");
}

function getStrengthsList(): string {
  return PORTFOLIO_INFO.fortalezas.map((f) => `• ${f}`).join("\n");
}

function generateEnglishLocalResponse(msg: string): string | null {
  if (includesAny(msg, ["technolog", "stack", "tools", "framework"])) {
    return `I work with several modern technologies:\n\n• Frontend: ${PORTFOLIO_INFO.tecnologias.slice(0, 3).join(", ")}\n• Backend: ${PORTFOLIO_INFO.tecnologias.slice(3, 6).join(", ")}\n• Styling: ${PORTFOLIO_INFO.tecnologias[7]}, ${PORTFOLIO_INFO.tecnologias[8]}\n\nI keep up with web development trends and continuously improve my skills.`;
  }

  if (includesAny(msg, ["experience", "work", "company"])) {
    return `I currently work at ${PORTFOLIO_INFO.empresa} as a ${PORTFOLIO_INFO.rol}. I have experience building scalable and modern applications using industry best practices and teamwork to deliver efficient solutions.`;
  }

  if (includesAny(msg, ["project", "portfolio", "develop"])) {
    return `I have built several interesting projects:\n\n${getProjectsList()}\n\nEach project helped me improve my skills and tackle new challenges.`;
  }

  if (includesAny(msg, ["strength", "skill", "soft skill", "quality"])) {
    return `My main strengths are:\n\n${getStrengthsList()}\n\nI believe these strengths, together with my technical knowledge, let me contribute effectively to any team.`;
  }

  if (includesAny(msg, ["contact", "email", "reach"])) {
    return "You can contact me through the contact form on this page, or directly by email. I will be happy to answer your questions or discuss collaboration opportunities.";
  }

  if (includesAny(msg, ["hello", "hi", "hey"])) {
    return `Hi! I am ${PORTFOLIO_INFO.nombre}'s virtual assistant. How can I help you? I can tell you about his experience, technologies, projects, or strengths.`;
  }

  return null;
}

function generateSpanishLocalResponse(msg: string): string | null {
  if (includesAny(msg, ["tecnolog", "domina", "stack", "herramienta"])) {
    return `Domino varias tecnologías modernas:\n\n• Frontend: ${PORTFOLIO_INFO.tecnologias.slice(0, 3).join(", ")}\n• Backend: ${PORTFOLIO_INFO.tecnologias.slice(3, 7).join(", ")}\n• Styling: ${PORTFOLIO_INFO.tecnologias[7]}, ${PORTFOLIO_INFO.tecnologias[8]}\n\nMe mantengo actualizado con las últimas tendencias en desarrollo web y siempre busco mejorar mis habilidades.`;
  }

  if (includesAny(msg, ["experiencia", "trabaja", "empresa"])) {
    return `Actualmente trabajo en ${PORTFOLIO_INFO.empresa} como ${PORTFOLIO_INFO.rol}. Tengo experiencia desarrollando aplicaciones escalables y modernas, utilizando las mejores prácticas de la industria y trabajando en equipo para crear soluciones eficientes.`;
  }

  if (includesAny(msg, ["proyecto", "portafolio", "desarrollo"])) {
    return `He desarrollado varios proyectos interesantes:\n\n${getProjectsList()}\n\nCada proyecto me ha permitido mejorar mis habilidades y enfrentar nuevos desafíos.`;
  }

  if (includesAny(msg, ["fortaleza", "cualidad", "habilidad", "soft skill"])) {
    return `Mis principales fortalezas son:\n\n${getStrengthsList()}\n\nCreo que estas habilidades, combinadas con mi conocimiento técnico, me permiten contribuir efectivamente a cualquier equipo.`;
  }

  if (includesAny(msg, ["contacto", "email", "comunicar"])) {
    return "Puedes contactarme a través del formulario de contacto en esta página, o directamente por email. Estaré encantado de responder tus preguntas o discutir oportunidades de colaboración.";
  }

  if (includesAny(msg, ["hola", "buenos", "saludos"])) {
    return `¡Hola! 👋 Soy el asistente virtual de ${PORTFOLIO_INFO.nombre}. ¿En qué puedo ayudarte? Puedo contarte sobre su experiencia, tecnologías, proyectos o fortalezas.`;
  }

  return null;
}

// Funcion para generar respuestas basadas en keywords
function generateLocalResponse(userMessage: string, language: SupportedLanguage): string {
  const msg = userMessage.toLowerCase();
  const response =
    language === "en" ? generateEnglishLocalResponse(msg) : generateSpanishLocalResponse(msg);

  if (response) {
    return response;
  }

  if (language === "en") {
    return `Thanks for your question. I am ${PORTFOLIO_INFO.nombre}, a ${PORTFOLIO_INFO.rol} specialized in modern web development. I do not have a specific answer for that yet, but feel free to ask me about experience, technologies, or projects. You can also use the contact form to reach out directly.`;
  }

  return `Gracias por tu pregunta. Soy ${PORTFOLIO_INFO.nombre}, ${PORTFOLIO_INFO.rol} especializado en desarrollo web moderno. Por ahora esa pregunta no tengo respuesta dentro de mi sistema, si quieres saber más sobre mí, no dudes en preguntarme. También puedes usar el formulario de contacto para comunicarte directamente conmigo. Muchas gracias.`;
}

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  : null;

const SYSTEM_PROMPT = `Eres un asistente virtual que representa a Darío Garavello, un Developer.
Tu objetivo es responder preguntas sobre su experiencia profesional, habilidades y proyectos de manera amigable y profesional.

Información sobre Darío Garavello:
- Es un desarrollador especializado en React, Node.js y tecnologías modernas web
- Tiene experiencia en desarrollo de aplicaciones escalables y modernas
- Trabaja con tecnologías como: React, Next.js, TypeScript, Node.js, Express, PostgreSQL, MongoDB
- Le apasiona escribir código limpio, mantenible y escalable
- Se mantiene actualizado con las últimas tendencias en desarrollo web
- Tiene experiencia en trabajo con Andreani Logística
- Es hábil en trabajo en equipo, resolución de problemas y comunicación efectiva

Proyectos destacados:
1. E-commerce Livia Accesorios: Plataforma de comercio electrónico completa con carrito de compras, procesamiento de pagos y panel de administración.
2. Todo Togetter app: App mobile con Expo y React Native para gestión colaborativa de tareas. Incluye autenticación, contactos, asignación en tiempo real, recordatorios y sincronización con backend propio.
3. Movie Theater: Un proyecto de streaming de películas con autenticación, sistema de filtros, acceso premium por pagos por stripe o mercado pago.

Responde de manera concisa, profesional pero amigable. Si te preguntan algo que no sabes, indica que pueden contactar directamente con Darío para más detalles específicos.
No inventes información que no esté aquí proporcionada.`;

export async function POST(request: NextRequest) {
  try {
    // Validar que la request tenga body
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error("Error parseando JSON:", parseError);
      return NextResponse.json<ChatError>({ error: "Formato de datos inválido" }, { status: 400 });
    }

    const { messages, language }: ChatRequest = body;
    const userLanguage: SupportedLanguage = language === "en" ? "en" : "es";

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json<ChatError>(
        { error: "Se requiere un array de mensajes" },
        { status: 400 }
      );
    }

    const lastMessage = messages.at(-1);

    if (!lastMessage?.content?.trim()) {
      return NextResponse.json<ChatError>(
        { error: "El mensaje no puede estar vacío" },
        { status: 400 }
      );
    }

    // Si no hay API key de OpenAI, usar respuestas locales
    if (!openai || !process.env.OPENAI_API_KEY) {
      const reply = generateLocalResponse(lastMessage.content, userLanguage);
      return NextResponse.json<ChatResponse>({ reply });
    }

    // Si hay API key, intentar usar OpenAI
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        temperature: 0.7,
        max_tokens: 500,
      });

      const reply = completion.choices[0]?.message?.content;

      if (!reply) {
        console.warn("OpenAI no devolvió respuesta, usando respuesta local");
        const localReply = generateLocalResponse(lastMessage.content, userLanguage);
        return NextResponse.json<ChatResponse>({ reply: localReply });
      }

      return NextResponse.json<ChatResponse>({ reply });
    } catch (openaiError) {
      // Si falla OpenAI (por cuota excedida u otro error), usar respuestas locales
      console.warn("OpenAI error, using local responses:", openaiError);
      const reply = generateLocalResponse(lastMessage.content, userLanguage);
      return NextResponse.json<ChatResponse>({ reply });
    }
  } catch (error) {
    console.error("Error en API de chat:", error);

    // Proporcionar mensajes de error más específicos
    let errorMessage = "Error al procesar la solicitud";

    if (error instanceof SyntaxError) {
      errorMessage = "Formato de datos inválido";
    } else if (error instanceof TypeError) {
      errorMessage = "Error de tipo de datos";
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json<ChatError>({ error: errorMessage }, { status: 500 });
  }
}
