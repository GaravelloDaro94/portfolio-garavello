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
  ],
  proyectos: [
    "E-commerce Platform: Plataforma completa con carrito de compras y procesamiento de pagos",
    "Task Management App: Aplicación colaborativa con funcionalidades en tiempo real",
    "Analytics Dashboard: Dashboard interactivo de análisis de datos",
    "Social Network API: API RESTful con autenticación JWT",
  ],
  fortalezas: [
    "Código limpio y mantenible",
    "Trabajo en equipo",
    "Resolución de problemas",
    "Comunicación efectiva",
    "Aprendizaje continuo",
  ],
};

// Función para generar respuestas basadas en keywords
function generateLocalResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase();

  if (
    msg.includes("tecnolog") ||
    msg.includes("domina") ||
    msg.includes("stack") ||
    msg.includes("herramienta")
  ) {
    return `Domino varias tecnologías modernas:\n\n• Frontend: ${PORTFOLIO_INFO.tecnologias.slice(0, 3).join(", ")}\n• Backend: ${PORTFOLIO_INFO.tecnologias.slice(3, 6).join(", ")}\n• Styling: ${PORTFOLIO_INFO.tecnologias[6]}\n\nMe mantengo actualizado con las últimas tendencias en desarrollo web y siempre busco mejorar mis habilidades.`;
  }

  if (msg.includes("experiencia") || msg.includes("trabaja") || msg.includes("empresa")) {
    return `Actualmente trabajo en ${PORTFOLIO_INFO.empresa} como ${PORTFOLIO_INFO.rol}. Tengo experiencia desarrollando aplicaciones escalables y modernas, utilizando las mejores prácticas de la industria y trabajando en equipo para crear soluciones eficientes.`;
  }

  if (msg.includes("proyecto") || msg.includes("portafolio") || msg.includes("desarrollo")) {
    const proyectosList = PORTFOLIO_INFO.proyectos.map((p, i) => `${i + 1}. ${p}`).join("\n\n");
    return `He desarrollado varios proyectos interesantes:\n\n${proyectosList}\n\nCada proyecto me ha permitido mejorar mis habilidades y enfrentar nuevos desafíos.`;
  }

  if (
    msg.includes("fortaleza") ||
    msg.includes("cualidad") ||
    msg.includes("habilidad") ||
    msg.includes("soft skill")
  ) {
    const fortalezasList = PORTFOLIO_INFO.fortalezas.map((f) => `• ${f}`).join("\n");
    return `Mis principales fortalezas son:\n\n${fortalezasList}\n\nCreo que estas habilidades, combinadas con mi conocimiento técnico, me permiten contribuir efectivamente a cualquier equipo.`;
  }

  if (msg.includes("contacto") || msg.includes("email") || msg.includes("comunicar")) {
    return `Puedes contactarme a través del formulario de contacto en esta página, o directamente por email. Estaré encantado de responder tus preguntas o discutir oportunidades de colaboración.`;
  }

  if (msg.includes("hola") || msg.includes("buenos") || msg.includes("saludos")) {
    return `¡Hola! 👋 Soy el asistente virtual de ${PORTFOLIO_INFO.nombre}. ¿En qué puedo ayudarte? Puedo contarte sobre su experiencia, tecnologías, proyectos o fortalezas.`;
  }

  // Respuesta por defecto
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
1. E-commerce Platform: Plataforma completa con carrito de compras y procesamiento de pagos
2. Task Management App: Aplicación colaborativa con funcionalidades en tiempo real
3. Analytics Dashboard: Dashboard interactivo de análisis de datos
4. Social Network API: API RESTful con autenticación JWT

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

    const { messages }: ChatRequest = body;

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
      const reply = generateLocalResponse(lastMessage.content);
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
        const localReply = generateLocalResponse(lastMessage.content);
        return NextResponse.json<ChatResponse>({ reply: localReply });
      }

      return NextResponse.json<ChatResponse>({ reply });
    } catch (openaiError) {
      // Si falla OpenAI (por cuota excedida u otro error), usar respuestas locales
      console.warn("OpenAI error, using local responses:", openaiError);
      const reply = generateLocalResponse(lastMessage.content);
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
