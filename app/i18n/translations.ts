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
      skills: "habilidades",
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
        "Soy una persona apasionada por crear soluciones eficientes y elegantes. Para mi, programar es transformar ideas en proyectos utiles y bien disenados.",
        "Uno de mis logros mas importantes fue desarrollar mi propia ISO de Linux, lo que me permitio aprender en profundidad sobre sistemas operativos y reforzar mi curiosidad por la tecnologia.",
        "Me gusta escribir codigo claro, limpio y escalable, que facilite el trabajo en equipo y el crecimiento de los proyectos.",
        "Siempre busco aprender cosas nuevas y mejorar mis habilidades. Creo que el aprendizaje constante es clave para aportar valor como profesional.",
        "Cuando no estoy programando, me mantengo al dia con las ultimas tendencias en desarrollo web y participo en la comunidad open source.",
      ],
      chatPrompt: "Tienes preguntas sobre mi experiencia? Chatea con mi asistente virtual:",
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
        "movie-theater": {
          title: "Movie Theater",
          description:
            "Un proyecto de streaming de peliculas con autenticacion, sistema de filtros, acceso premium por pagos por stripe o mercado pago.",
        },
      },
    },
    skills: {
      title: "Habilidades",
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
        "Hola! Soy el asistente virtual de Dario. Puedes preguntarme sobre su experiencia, habilidades, proyectos o cualquier otra cosa relacionada con su trabajo. En que puedo ayudarte?",
      suggestedQuestions: [
        "Que tecnologias dominas?",
        "Cuentame sobre tu experiencia",
        "Que proyectos has desarrollado?",
        "Cuales son tus fortalezas?",
      ],
      mobileUnavailable:
        "Este easter egg no esta disponible en dispositivos moviles. Pruebalo desde una PC.",
      noReply: "No se recibio respuesta del asistente",
      unknownError: "Error desconocido",
      chatErrorPrefix: "Error en el chat:",
      connectionError: "Error de conexion. Verifica tu conexion a internet",
      assistantErrorPrefix: "Lo siento, hubo un error:",
      assistantErrorSuffix: "Por favor, intenta de nuevo.",
    },
    blog: {
      list: {
        backHome: "Volver al inicio",
        title: "Blog Tecnico",
        subtitle: "Articulos sobre desarrollo web, tecnologias y mejores practicas",
        empty: "Proximamente publicare articulos tecnicos sobre desarrollo web.",
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
      skills: "skills",
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
        "I am passionate about building efficient and elegant solutions. For me, programming means turning ideas into useful and well-designed products.",
        "One of my most important achievements was building my own Linux ISO, which helped me deeply understand operating systems and strengthen my curiosity for technology.",
        "I like writing clean, scalable code that supports team collaboration and project growth.",
        "I am always looking to learn new things and improve my skills. I believe continuous learning is key to delivering value as a professional.",
        "When I am not coding, I stay up to date with the latest web development trends and contribute to the open source community.",
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
        "movie-theater": {
          title: "Movie Theater",
          description:
            "A movie streaming project with authentication, filtering, and premium access through Stripe or Mercado Pago.",
        },
      },
    },
    skills: {
      title: "Skills",
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
        "Hi! I am Dario's virtual assistant. You can ask me about his experience, skills, projects, or anything related to his work. How can I help you?",
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
