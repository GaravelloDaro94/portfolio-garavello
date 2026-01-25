import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Validación básica
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 });
    }

    // Validar que no estén vacíos después de trim
    if (!name.trim() || !email.trim() || !message.trim()) {
      return NextResponse.json({ error: "Los campos no pueden estar vacíos" }, { status: 400 });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    // Validar longitud del mensaje
    if (message.length < 10) {
      return NextResponse.json(
        { error: "El mensaje debe tener al menos 10 caracteres" },
        { status: 400 }
      );
    }

    // Verificar que Resend API key esté configurada
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY no configurada");
      return NextResponse.json(
        { error: "Servicio de email no configurado. Por favor, contacta al administrador." },
        { status: 500 }
      );
    }

    // Enviar email usando Resend
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "garavello.manuel@gmail.com",
      replyTo: email,
      subject: `Nuevo mensaje de ${name} desde tu portfolio`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333333;">Nuevo mensaje desde tu portfolio</h2>
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Nombre:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong>Mensaje:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
              ${message.replaceAll("\n", "<br>")}
            </div>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            Este mensaje fue enviado desde el formulario de contacto de tu portfolio.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Error enviando email con Resend:", error);
      return NextResponse.json(
        {
          error:
            "Error al enviar el mensaje. Por favor, intenta más tarde o contacta directamente por email.",
        },
        { status: 500 }
      );
    }

    if (!data) {
      console.error("No se recibió data de Resend");
      return NextResponse.json(
        { error: "Error al procesar el envío. Intenta de nuevo." },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Mensaje enviado exitosamente", data }, { status: 200 });
  } catch (error) {
    console.error("Error en contact API:", error);

    // Distinguir entre diferentes tipos de errores
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Datos inválidos. Verifica el formato de la información." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Error interno del servidor. Por favor, intenta más tarde." },
      { status: 500 }
    );
  }
}
