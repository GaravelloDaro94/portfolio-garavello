import { NextResponse } from "next/server";

export async function GET() {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const apiUrl = process.env.NEXT_PUBLIC_UMAMI_API_URL;
  const token = process.env.UMAMI_TOKEN; // Sin NEXT_PUBLIC_ = más seguro

  if (!websiteId || !token || !apiUrl) {
    return NextResponse.json({ error: "Configuración de Umami incompleta" }, { status: 500 });
  }

  const startAt = Date.now() - 30 * 24 * 60 * 60 * 1000; // 30 días atrás
  const endAt = Date.now();

  try {
    const response = await fetch(
      `${apiUrl}/api/websites/${websiteId}/stats?startAt=${startAt}&endAt=${endAt}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Umami API error: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching Umami stats:", error);
    return NextResponse.json({ error: "Error al obtener estadísticas" }, { status: 500 });
  }
}
