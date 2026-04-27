export type Language = "es" | "en";

export interface TranslationSchema {
  nav: {
    about: string;
    projects: string;
    skills: string;
    contact: string;
    blog: string;
  };
  languageToggle: {
    ariaLabel: string;
  };
  main: {
    phrases: string[];
    scrollToAboutAria: string;
  };
  about: {
    title: string;
    paragraphs: string[];
    chatPrompt: string;
  };
  projects: {
    title: string;
    labels: {
      demoProject: string;
      downloadApk: string;
      projectImage: string;
      comingSoon: string;
      apkSoon: string;
    };
    items: {
      "ecommerce-platform": {
        title: string;
        description: string;
      };
      "task-management-app": {
        title: string;
        description: string;
      };
      "eventra-platform": {
        title: string;
        description: string;
      };
      "movie-theater": {
        title: string;
        description: string;
      };
    };
  };
  skills: {
    title: string;
    categories: {
      tools: string;
      other: string;
    };
    items: {
      teamwork: string;
      problemSolving: string;
      communication: string;
      continuousLearning: string;
      timeManagement: string;
    };
  };
  contact: {
    title: string;
    intro: string;
  };
  form: {
    placeholders: {
      name: string;
      email: string;
      message: string;
    };
    submit: string;
    submitting: string;
    validation: {
      nameRequired: string;
      emailRequired: string;
      emailInvalid: string;
      messageRequired: string;
      messageMinLength: string;
    };
    errors: {
      invalidData: string;
      server: string;
      rateLimit: string;
      send: string;
      connection: string;
    };
    success: string;
  };
  chatbot: {
    toggleLabel: string;
    headerTitle: string;
    headerSubtitle: string;
    closeAria: string;
    suggestedLabel: string;
    inputPlaceholder: string;
    send: string;
    initialMessage: string;
    suggestedQuestions: string[];
    mobileUnavailable: string;
    noReply: string;
    unknownError: string;
    chatErrorPrefix: string;
    connectionError: string;
    assistantErrorPrefix: string;
    assistantErrorSuffix: string;
  };
  blog: {
    list: {
      backHome: string;
      title: string;
      subtitle: string;
      empty: string;
    };
    post: {
      backBlog: string;
    };
  };
}

export const translations: Record<Language, TranslationSchema> = {
  es: {
    nav: {
      about: "Sobre mí",
      projects: "proyectos",
      skills: "experiencias",
      contact: "contacto",
      blog: "Blog",
    },
    languageToggle: {
      ariaLabel: "Cambiar idioma",
    },
    main: {
      phrases: [
        "Desarrollador Fullstack",
        "Ingeniero de Software",
        "Programador",
        "Solucionador de problemas",
      ],
      scrollToAboutAria: "Ir a la seccion sobre mi",
    },
    about: {
      title: "Sobre Mi",
      paragraphs: [
        "Soy un desarrollador orientado a la calidad del software y a la construcción de soluciones robustas, con una fuerte curiosidad técnica y atención al detalle. Me interesa comprender tanto el “qué” como el “cómo” de los sistemas que desarrollo.",
        "El desarrollo de una ISO propia de Linux marcó un punto clave en mi formación, permitiéndome profundizar en sistemas operativos, automatización y arquitectura, y consolidando mi interés por el funcionamiento interno de la tecnología.",
        "Trabajo con un enfoque en código limpio, mantenible y escalable, promoviendo buenas prácticas que favorecen la colaboración y la evolución de los productos. Creo firmemente en el aprendizaje continuo y en mantenerse actualizado, tanto a través de la exploración técnica como de la participación en proyectos open source.",
        "Me motiva el aprendizaje constante y la mejora continua como parte del desarrollo profesional. En mi tiempo libre, sigo de cerca las nuevas tendencias en desarrollo web y participo activamente en la comunidad open source, buscando siempre aprender y aportar.",
      ],
      chatPrompt: "¿Tienes preguntas sobre mi experiencia? Chatea con mi asistente virtual:",
    },
    projects: {
      title: "Proyectos Destacados",
      labels: {
        demoProject: "Ver Proyecto",
        downloadApk: "Descargar APK",
        projectImage: "Imagen del proyecto",
        comingSoon: "Proximamente",
        apkSoon: "APK pronto",
      },
      items: {
        "ecommerce-platform": {
          title: "E-commerce Livia Accesorios",
          description:
            "Plataforma de comercio electronico completa con carrito de compras, procesamiento de pagos y panel de administracion.",
        },
        "task-management-app": {
          title: "Todo Togetter app",
          description:
            "App mobile con Expo y React Native para gestion colaborativa de tareas. Incluye autenticacion, contactos, asignacion en tiempo real, recordatorios y sincronizacion con backend propio.",
        },
        "eventra-platform": {
          title: "Eventra",
          description:
            "Plataforma de gestion de eventos desarrollada con arquitectura modular, APIs documentadas y flujo completo para organizacion, operacion y seguimiento.",
        },
        "movie-theater": {
          title: "Movie Theater",
          description:
            "Un proyecto de streaming de peliculas con autenticacion, sistema de filtros, acceso premium por pagos por stripe o mercado pago.",
        },
      },
    },
    skills: {
      title: "Experiencias laborales",
      categories: {
        tools: "Herramientas",
        other: "Otras Competencias",
      },
      items: {
        teamwork: "Trabajo en equipo",
        problemSolving: "Resolucion de problemas",
        communication: "Comunicacion efectiva",
        continuousLearning: "Aprendizaje continuo",
        timeManagement: "Gestion del tiempo",
      },
    },
    contact: {
      title: "Contacto",
      intro:
        "Si te interesa que sea tu candidato ideal, puedes contactarme escribiendo en el siguiente formulario.",
    },
    form: {
      placeholders: {
        name: "Nombre",
        email: "Email",
        message: "Mensaje",
      },
      submit: "Enviar Mensaje",
      submitting: "Enviando...",
      validation: {
        nameRequired: "Por favor, ingresa tu nombre",
        emailRequired: "Por favor, ingresa tu email",
        emailInvalid: "Por favor, ingresa un email valido",
        messageRequired: "Por favor, escribe un mensaje",
        messageMinLength: "El mensaje debe tener al menos 10 caracteres",
      },
      errors: {
        invalidData: "Datos invalidos. Verifica los campos",
        server: "Error del servidor. Intenta de nuevo mas tarde",
        rateLimit: "Demasiadas solicitudes. Espera un momento e intenta de nuevo",
        send: "Error al enviar el mensaje",
        connection: "Error de conexion. Verifica tu conexion a internet",
      },
      success: "Mensaje enviado exitosamente! Te respondere pronto.",
    },
    chatbot: {
      toggleLabel: "Chatea conmigo",
      headerTitle: "Asistente Virtual",
      headerSubtitle: "Pregunta sobre mi experiencia",
      closeAria: "Cerrar chat",
      suggestedLabel: "Preguntas sugeridas:",
      inputPlaceholder: "Escribe tu pregunta...",
      send: "Enviar",
      initialMessage:
        "¡Hola! Soy el asistente virtual de Dario. Puedes preguntarme sobre su experiencia, habilidades, proyectos o cualquier otra cosa relacionada con su trabajo. ¿En qué puedo ayudarte?.\n\nHay un easter egg escondido, una vez encontrado podrías estar CONDENADO.",
      suggestedQuestions: [
        "¿Qué tecnologías dominas?",
        "Cuéntame sobre tu experiencia",
        "¿Qué proyectos has desarrollado?",
        "¿Cuáles son tus fortalezas?",
      ],
      mobileUnavailable:
        "Este easter egg no está disponible en dispositivos móviles. Pruébalo desde una PC.",
      noReply: "No se recibió respuesta del asistente",
      unknownError: "Error desconocido",
      chatErrorPrefix: "Error en el chat:",
      connectionError: "Error de conexión. Verifica tu conexión a internet",
      assistantErrorPrefix: "Lo siento, hubo un error:",
      assistantErrorSuffix: "Por favor, intenta de nuevo.",
    },
    blog: {
      list: {
        backHome: "Volver al inicio",
        title: "Blog técnico",
        subtitle: "Artículos sobre desarrollo web, tecnologías y mejores prácticas",
        empty: "Próximamente publicaré artículos técnicos sobre desarrollo web.",
      },
      post: {
        backBlog: "Volver al blog",
      },
    },
  },
  en: {
    nav: {
      about: "about",
      projects: "projects",
      skills: "experience",
      contact: "contact",
      blog: "Blog",
    },
    languageToggle: {
      ariaLabel: "Switch language",
    },
    main: {
      phrases: ["Fullstack Developer", "Software Engineer", "Programmer", "Problem Solver"],
      scrollToAboutAria: "Scroll to about section",
    },
    about: {
      title: "About Me",
      paragraphs: [
        'I am a developer focused on software quality and building robust solutions, with strong technical curiosity and attention to detail. I am interested in understanding both the "what" and the "how" of the systems I build.',
        "Developing my own Linux ISO marked a key milestone in my growth, allowing me to dive deeper into operating systems, automation, and architecture, while strengthening my interest in the inner workings of technology.",
        "I work with a clean, maintainable, and scalable code mindset, promoting best practices that support collaboration and product evolution. I firmly believe in continuous learning and staying up to date through both technical exploration and participation in open source projects.",
        "I am motivated by continuous learning and ongoing improvement as part of professional growth. In my free time, I closely follow new web development trends and actively participate in the open source community, always looking to learn and contribute.",
      ],
      chatPrompt: "Have questions about my experience? Chat with my virtual assistant:",
    },
    projects: {
      title: "Featured Projects",
      labels: {
        demoProject: "View Project",
        downloadApk: "Download APK",
        projectImage: "Project image",
        comingSoon: "Coming soon",
        apkSoon: "APK soon",
      },
      items: {
        "ecommerce-platform": {
          title: "Livia Accesorios E-commerce",
          description:
            "A complete e-commerce platform with shopping cart, payment processing, and an admin panel.",
        },
        "task-management-app": {
          title: "Todo Togetter app",
          description:
            "A mobile app built with Expo and React Native for collaborative task management. Includes authentication, contacts, real-time assignment, reminders, and sync with a custom backend.",
        },
        "eventra-platform": {
          title: "Eventra",
          description:
            "An event management platform built with a modular architecture, documented APIs, and an end-to-end flow for planning, operations, and tracking.",
        },
        "movie-theater": {
          title: "Movie Theater",
          description:
            "A movie streaming project with authentication, filtering, and premium access through Stripe or Mercado Pago.",
        },
      },
    },
    skills: {
      title: "Work Experience",
      categories: {
        tools: "Tools",
        other: "Other Skills",
      },
      items: {
        teamwork: "Teamwork",
        problemSolving: "Problem solving",
        communication: "Effective communication",
        continuousLearning: "Continuous learning",
        timeManagement: "Time management",
      },
    },
    contact: {
      title: "Contact",
      intro:
        "If you think I could be the right candidate for your team, you can contact me using the following form.",
    },
    form: {
      placeholders: {
        name: "Name",
        email: "Email",
        message: "Message",
      },
      submit: "Send Message",
      submitting: "Sending...",
      validation: {
        nameRequired: "Please enter your name",
        emailRequired: "Please enter your email",
        emailInvalid: "Please enter a valid email",
        messageRequired: "Please write a message",
        messageMinLength: "The message must be at least 10 characters long",
      },
      errors: {
        invalidData: "Invalid data. Please check the fields",
        server: "Server error. Please try again later",
        rateLimit: "Too many requests. Please wait a moment and try again",
        send: "Error sending the message",
        connection: "Connection error. Please check your internet connection",
      },
      success: "Message sent successfully! I will get back to you soon.",
    },
    chatbot: {
      toggleLabel: "Chat with me",
      headerTitle: "Virtual Assistant",
      headerSubtitle: "Ask about my experience",
      closeAria: "Close chat",
      suggestedLabel: "Suggested questions:",
      inputPlaceholder: "Type your question...",
      send: "Send",
      initialMessage:
        "Hi! I am Dario's virtual assistant. You can ask me about his experience, skills, projects, or anything related to his work. How can I help you?\nThere is a hidden easter egg, once found you might be DOOMED.",
      suggestedQuestions: [
        "Which technologies do you master?",
        "Tell me about your experience",
        "Which projects have you built?",
        "What are your strengths?",
      ],
      mobileUnavailable:
        "This easter egg is not available on mobile devices. Try it from a desktop computer.",
      noReply: "No assistant reply was received",
      unknownError: "Unknown error",
      chatErrorPrefix: "Chat error:",
      connectionError: "Connection error. Please check your internet connection",
      assistantErrorPrefix: "Sorry, there was an error:",
      assistantErrorSuffix: "Please try again.",
    },
    blog: {
      list: {
        backHome: "Back to home",
        title: "Technical Blog",
        subtitle: "Articles about web development, technologies, and best practices",
        empty: "I will publish technical web development articles soon.",
      },
      post: {
        backBlog: "Back to blog",
      },
    },
  },
};
