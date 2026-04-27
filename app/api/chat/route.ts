import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatRequest, ChatResponse, ChatError } from "../../models";

type SupportedLanguage = "es" | "en";

type ExperienceEntry = {
  period: Record<SupportedLanguage, string>;
  role: string;
  company: Record<SupportedLanguage, string>;
  highlights: Record<SupportedLanguage, string[]>;
};

const PORTFOLIO_INFO = {
  nombre: "Darío Garavello",
  rol: "Developer",
  headline: {
    es: "Software Engineer fullstack/mobile con experiencia en productos web, mobile y backend para operaciones críticas y negocios digitales.",
    en: "Fullstack/mobile Software Engineer with experience shipping web, mobile, and backend products for critical operations and digital businesses.",
  },
  experiencia: "Desarrollador especializado en React, Node.js y tecnologías modernas web",
  empresa: "Grupo Logístico Andreani",
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
  differentiators: {
    es: [
      "Experiencia real en mobile, frontend y backend dentro del mismo ciclo de producto",
      "Participación en sistemas logísticos críticos con foco en calidad, estabilidad y escalabilidad",
      "Capacidad de liderazgo técnico, code review y acompañamiento de equipos",
      "Visión orientada a negocio desde proyectos freelance, e-commerce y MVPs",
    ],
    en: [
      "Hands-on experience across mobile, frontend, and backend in the same product lifecycle",
      "Work on mission-critical logistics systems with focus on quality, stability, and scalability",
      "Technical leadership, code review, and team mentoring experience",
      "Business-oriented mindset from freelance work, ecommerce, and MVP delivery",
    ],
  },
  experiences: [
    {
      period: {
        es: "Dic 2021 - Actualidad",
        en: "Dec 2021 - Present",
      },
      role: "Software Engineer - Fullstack / Mobile Developer",
      company: {
        es: "Grupo Logístico Andreani",
        en: "Andreani Logistics Group",
      },
      highlights: {
        es: [
          "Desarrollo y mantenimiento de aplicaciones mobile, web y backend para operaciones logísticas críticas.",
          "Stack principal: React Native + TypeScript + Redux Toolkit, React + Material UI, APIs REST con .NET Core y Node.js.",
          "Trabajo con SQL Server, Oracle y MongoDB; despliegues en Azure y OpenShift/Rancher.",
          "Testing con Jest, Vitest, Supertest y Playwright; CI/CD con GitHub Actions y GitLab CI.",
        ],
        en: [
          "Development and maintenance of mobile, web, and backend apps for mission-critical logistics operations.",
          "Main stack: React Native + TypeScript + Redux Toolkit, React + Material UI, REST APIs in .NET Core and Node.js.",
          "Worked with SQL Server, Oracle, and MongoDB; deployments on Azure and OpenShift/Rancher.",
          "Testing with Jest, Vitest, Supertest, and Playwright; CI/CD with GitHub Actions and GitLab CI.",
        ],
      },
    },
    {
      period: {
        es: "Oct 2020 - Nov 2021",
        en: "Oct 2020 - Nov 2021",
      },
      role: "Fullstack Engineer & Technical Lead",
      company: {
        es: "Konzortia Capital",
        en: "Konzortia Capital",
      },
      highlights: {
        es: [
          "Desarrollo end-to-end de productos web, mobile y backend para distintos clientes.",
          "Implementación de interfaces con React, Vue y WordPress; apps híbridas con Cordova.",
          "Construcción de APIs REST con Node.js y despliegues en AWS EC2.",
          "Liderazgo técnico: lineamientos de arquitectura, revisión de código y acompañamiento del equipo.",
        ],
        en: [
          "End-to-end delivery of web, mobile, and backend products for multiple clients.",
          "UI implementation with React, Vue, and WordPress; hybrid apps with Cordova.",
          "REST API development with Node.js and deployments on AWS EC2.",
          "Technical leadership: architecture guidelines, code review, and team mentoring.",
        ],
      },
    },
    {
      period: {
        es: "Mar 2017 - Actualidad",
        en: "Mar 2017 - Present",
      },
      role: "Freelance Fullstack Developer",
      company: {
        es: "Livia Accesorios y proyectos independientes",
        en: "Livia Accesorios and independent projects",
      },
      highlights: {
        es: [
          "Creación de soluciones para e-commerce, gestión y MVPs con foco en resultados de negocio.",
          "Desarrollo fullstack con Next.js, React, TypeScript, Node.js, Express, GraphQL y PostgreSQL/Supabase.",
          "Integración de pagos con Stripe y Mercado Pago, autenticación por roles y APIs seguras.",
          "Automatizaciones e integraciones con Zapier y APIs externas, fácilmente transferibles a n8n.",
        ],
        en: [
          "Built ecommerce, management systems, and MVP products focused on business outcomes.",
          "Fullstack development with Next.js, React, TypeScript, Node.js, Express, GraphQL, and PostgreSQL/Supabase.",
          "Payment integrations with Stripe and Mercado Pago, role-based auth, and secure APIs.",
          "Automation and integrations with Zapier and external APIs, easily transferable to n8n.",
        ],
      },
    },
  ] satisfies ExperienceEntry[],
};

function includesAny(message: string, keywords: readonly string[]): boolean {
  return keywords.some((keyword) => message.includes(keyword));
}

function getProjectsList(): string {
  return PORTFOLIO_INFO.proyectos.map((p, i) => `${i + 1}. ${p}`).join("\n\n");
}

function getStrengthsList(): string {
  return PORTFOLIO_INFO.fortalezas.map((f) => `• ${f}`).join("\n");
}

function getExperienceSummary(language: SupportedLanguage): string {
  return PORTFOLIO_INFO.experiences
    .map((experience) => {
      const company = experience.company[language];
      const period = experience.period[language];
      const highlights = experience.highlights[language].map((item) => `  • ${item}`).join("\n");

      return `${experience.role} | ${company} | ${period}\n${highlights}`;
    })
    .join("\n\n");
}

function getDifferentiators(language: SupportedLanguage): string {
  return PORTFOLIO_INFO.differentiators[language].map((item) => `• ${item}`).join("\n");
}

function generateEnglishLocalResponse(msg: string): string | null {
  if (includesAny(msg, ["resume", "cv", "curriculum"])) {
    return `You can review the full resume directly from the portfolio. In short, Dario combines ongoing experience at ${PORTFOLIO_INFO.empresa}, previous technical leadership at Konzortia Capital, and long-term freelance delivery for ecommerce and MVP products.\n\n${getExperienceSummary("en")}`;
  }

  if (includesAny(msg, ["andreani", "logistics", "mobile", "backend", "fullstack"])) {
    return `At ${PORTFOLIO_INFO.empresa}, Dario works as a Software Engineer focused on fullstack and mobile development for mission-critical logistics operations.\n\n${PORTFOLIO_INFO.experiences[0].highlights.en.map((item) => `• ${item}`).join("\n")}`;
  }

  if (includesAny(msg, ["lead", "leadership", "mentor", "architecture"])) {
    return `Dario also has technical leadership experience. At Konzortia Capital he worked as Fullstack Engineer & Technical Lead, defining architecture guidelines, reviewing code, and mentoring the team while delivering web, mobile, and backend solutions.`;
  }

  if (includesAny(msg, ["freelance", "ecommerce", "mvp", "stripe", "mercado pago"])) {
    return `Beyond corporate roles, Dario has extensive freelance experience building ecommerce and MVP products. He has worked with Next.js, React, TypeScript, Node.js, Express, GraphQL, and PostgreSQL/Supabase, including payment integrations with Stripe and Mercado Pago.`;
  }

  if (includesAny(msg, ["technolog", "stack", "tools", "framework"])) {
    return `Dario works across a broad modern stack:\n\n• Frontend: React, Next.js, TypeScript, Material UI\n• Mobile: React Native, Redux Toolkit, Expo/Cordova\n• Backend: Node.js, Express, .NET Core, GraphQL\n• Data and infra: PostgreSQL, SQL Server, Oracle, MongoDB, Azure, OpenShift/Rancher, AWS EC2\n• Testing and delivery: Jest, Vitest, Supertest, Playwright, GitHub Actions, GitLab CI\n\nThis lets him contribute end-to-end, from UI to APIs, testing, and deployment.`;
  }

  if (includesAny(msg, ["experience", "work", "company"])) {
    return `Dario's experience combines product delivery, technical depth, and business context. ${PORTFOLIO_INFO.headline.en}\n\n${getExperienceSummary("en")}`;
  }

  if (includesAny(msg, ["project", "portfolio", "develop"])) {
    return `I have built several interesting projects:\n\n${getProjectsList()}\n\nEach project helped me improve my skills and tackle new challenges.`;
  }

  if (includesAny(msg, ["strength", "skill", "soft skill", "quality"])) {
    return `Dario's main strengths are:\n\n${getStrengthsList()}\n\nWhat makes his profile especially strong is:\n${getDifferentiators("en")}`;
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
  if (includesAny(msg, ["cv", "curriculum", "currículum", "resume"])) {
    return `Puedes revisar el CV completo desde el portfolio. Como resumen, Darío combina experiencia vigente en ${PORTFOLIO_INFO.empresa}, liderazgo técnico previo en Konzortia Capital y varios años de trabajo freelance en e-commerce y MVPs.\n\n${getExperienceSummary("es")}`;
  }

  if (
    includesAny(msg, [
      "andreani",
      "logistica",
      "logística",
      "mobile",
      "movil",
      "móvil",
      "backend",
      "fullstack",
    ])
  ) {
    return `En ${PORTFOLIO_INFO.empresa}, Darío se desempeña como Software Engineer orientado a desarrollo fullstack y mobile para operaciones logísticas críticas.\n\n${PORTFOLIO_INFO.experiences[0].highlights.es.map((item) => `• ${item}`).join("\n")}`;
  }

  if (
    includesAny(msg, ["lider", "líder", "liderazgo", "mentor", "arquitectura", "technical lead"])
  ) {
    return `Darío también cuenta con experiencia de liderazgo técnico. En Konzortia Capital trabajó como Fullstack Engineer & Technical Lead, definiendo lineamientos de arquitectura, revisando código y acompañando al equipo mientras entregaba soluciones web, mobile y backend.`;
  }

  if (includesAny(msg, ["freelance", "ecommerce", "mvp", "stripe", "mercado pago"])) {
    return `Además de su experiencia corporativa, Darío tiene una trayectoria freelance fuerte en e-commerce y MVPs. Trabajó con Next.js, React, TypeScript, Node.js, Express, GraphQL y PostgreSQL/Supabase, incluyendo autenticación por roles, APIs seguras e integraciones de pago con Stripe y Mercado Pago.`;
  }

  if (includesAny(msg, ["tecnolog", "domina", "stack", "herramienta"])) {
    return `Darío trabaja con un stack amplio y actual:\n\n• Frontend: React, Next.js, TypeScript, Material UI\n• Mobile: React Native, Redux Toolkit, Expo/Cordova\n• Backend: Node.js, Express, .NET Core, GraphQL\n• Datos e infraestructura: PostgreSQL, SQL Server, Oracle, MongoDB, Azure, OpenShift/Rancher, AWS EC2\n• Testing y entrega: Jest, Vitest, Supertest, Playwright, GitHub Actions y GitLab CI\n\nEso le permite moverse de punta a punta, desde interfaz y mobile hasta APIs, testing y despliegue.`;
  }

  if (includesAny(msg, ["experiencia", "trabaja", "empresa"])) {
    return `La experiencia de Darío combina entrega de producto, profundidad técnica y contexto de negocio. ${PORTFOLIO_INFO.headline.es}\n\n${getExperienceSummary("es")}`;
  }

  if (includesAny(msg, ["proyecto", "portafolio", "desarrollo"])) {
    return `He desarrollado varios proyectos interesantes:\n\n${getProjectsList()}\n\nCada proyecto me ha permitido mejorar mis habilidades y enfrentar nuevos desafíos.`;
  }

  if (includesAny(msg, ["fortaleza", "cualidad", "habilidad", "soft skill"])) {
    return `Las principales fortalezas de Darío son:\n\n${getStrengthsList()}\n\nAdemás, su perfil se diferencia por:\n${getDifferentiators("es")}`;
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
    return `Thanks for your question. I can help with Dario's professional experience, current role at ${PORTFOLIO_INFO.empresa}, freelance work, technical stack, highlighted projects, or strengths. If you need a more specific detail, you can also check the full resume or use the contact form.`;
  }

  return `Gracias por tu pregunta. Puedo ayudarte con la experiencia profesional de Darío, su rol actual en ${PORTFOLIO_INFO.empresa}, su trayectoria freelance, stack técnico, proyectos destacados y fortalezas. Si necesitas un dato más puntual, también puedes revisar el CV completo o usar el formulario de contacto.`;
}

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  : null;

const SYSTEM_PROMPT = `Eres un asistente virtual que representa a Darío Garavello.
Tu objetivo es responder preguntas sobre su perfil profesional de forma clara, concreta, profesional y natural.

Reglas:
- Responde en el mismo idioma del usuario.
- No inventes información ni adornes con datos no confirmados.
- Prioriza respuestas útiles y específicas sobre experiencia laboral, stack, proyectos, fortalezas, CV y contexto profesional.
- Si una pregunta pide un dato no disponible, dilo con honestidad y deriva al CV o al formulario de contacto.

Perfil de Darío Garavello:
- Rol general: Software Engineer / Fullstack / Mobile Developer.
- Especialidad: desarrollo web moderno, mobile y backend.
- Enfoque: código limpio, mantenible y escalable; buenas prácticas; trabajo en equipo; aprendizaje continuo.

Experiencia laboral:
1. Grupo Logístico Andreani | Software Engineer - Fullstack / Mobile Developer | Dic 2021 - Actualidad
  - Desarrollo y mantenimiento de aplicaciones mobile, web y backend para operaciones logísticas críticas.
  - Stack principal: React Native, TypeScript, Redux Toolkit, React, Material UI, APIs REST con .NET Core y Node.js.
  - Bases de datos e infraestructura: SQL Server, Oracle, MongoDB, Azure, OpenShift/Rancher.
  - Testing y entrega: Jest, Vitest, Supertest, Playwright, GitHub Actions y GitLab CI.

2. Konzortia Capital | Fullstack Engineer & Technical Lead | Oct 2020 - Nov 2021
  - Desarrollo end-to-end de productos web, mobile y backend para distintos clientes.
  - Frontend con React, Vue y WordPress; apps híbridas con Cordova.
  - APIs REST con Node.js y despliegues en AWS EC2.
  - Liderazgo técnico: arquitectura, code review y acompañamiento del equipo.

3. Freelance | Fullstack Developer | Mar 2017 - Actualidad
  - Soluciones para e-commerce, gestión y MVPs orientados a negocio.
  - Stack: Next.js, React, TypeScript, Node.js, Express, GraphQL, PostgreSQL/Supabase.
  - Integraciones con Stripe, Mercado Pago, autenticación por roles y APIs seguras.
  - Automatizaciones e integraciones con Zapier y APIs externas.

Tecnologías frecuentes:
- Frontend: React, Next.js, TypeScript, Material UI.
- Mobile: React Native, Redux Toolkit, Expo, Cordova.
- Backend: Node.js, Express, .NET Core, GraphQL.
- Datos/infra: PostgreSQL, SQL Server, Oracle, MongoDB, Azure, OpenShift/Rancher, AWS EC2.
- Testing/CI: Jest, Vitest, Supertest, Playwright, GitHub Actions, GitLab CI.

Proyectos destacados:
1. E-commerce Livia Accesorios: ecommerce completo con carrito, pagos y panel de administración.
2. Todo Togetter app: app mobile colaborativa con autenticación, contactos, asignación en tiempo real y backend propio.
3. Eventra: plataforma de gestión de eventos con Laravel, arquitectura modular y APIs documentadas.
4. Movie Theater: streaming con autenticación, filtros y pagos con Stripe o Mercado Pago.

Fortalezas:
- Código limpio y mantenible.
- Trabajo en equipo.
- Resolución de problemas.
- Comunicación efectiva.
- Aprendizaje continuo.`;

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
