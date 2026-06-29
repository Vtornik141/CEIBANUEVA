import { NextResponse } from "next/server";
import { Resend } from "resend";

// Cambia esta dirección por el correo donde quieres recibir las compraventas.
const DESTINATION_EMAIL = "heltonyahel890@gmail.com";
const FROM_EMAIL = "Ceiba Visual <onboarding@resend.dev>";

type AutoPayload = {
  nombreCompraventa: string;
  motor: string;
  marca: string;
  tipo: string;
  kilometraje: string;
  transmision: string;
  pasajeros: string;
  puertas: string;
  exteriorInterior: string;
  precio: string;
  fotos: string[];
};

function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding:8px 14px;border-bottom:1px solid #DAD6C8;font-size:13px;color:#52514C;white-space:nowrap;vertical-align:top;">${label}</td>
      <td style="padding:8px 14px;border-bottom:1px solid #DAD6C8;font-size:14px;color:#2D2D2D;">${value || "—"}</td>
    </tr>`;
}

function buildHtml(payload: AutoPayload) {
  const fotosHtml = payload.fotos
    .map(
      (url, i) =>
        `<a href="${url}" style="color:#7C8C70;display:block;margin-bottom:4px;">Foto ${i + 1}</a>`
    )
    .join("");

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;background:#F4F1EA;padding:24px;">
    <div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #DAD6C8;border-radius:12px;overflow:hidden;">
      <div style="background:#2D2D2D;color:#F4F1EA;padding:20px 24px;">
        <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#7C8C70;">Ceiba Visual</div>
        <div style="font-size:18px;font-weight:700;margin-top:4px;">COMPRAVENTA: ${payload.nombreCompraventa}</div>
      </div>
      <table style="width:100%;border-collapse:collapse;">
        ${row("Motor", payload.motor)}
        ${row("Marca", payload.marca)}
        ${row("Tipo", payload.tipo)}
        ${row("Km", payload.kilometraje)}
        ${row("Transmisión", payload.transmision)}
        ${row("Pasajeros", payload.pasajeros)}
        ${row("Puertas", payload.puertas)}
        ${row("Exterior/Interior", payload.exteriorInterior)}
        ${row("Precio", `Q${payload.precio}`)}
        <tr>
          <td style="padding:8px 14px;font-size:13px;color:#52514C;vertical-align:top;">Fotos</td>
          <td style="padding:8px 14px;font-size:14px;">${fotosHtml}</td>
        </tr>
      </table>
    </div>
  </div>`;
}

function buildText(payload: AutoPayload) {
  const lines = [
    `COMPRAVENTA: ${payload.nombreCompraventa}`,
    `Motor: ${payload.motor}`,
    `Marca: ${payload.marca}`,
    `Tipo: ${payload.tipo}`,
    `Km: ${payload.kilometraje}`,
    `Transmisión: ${payload.transmision}`,
    `Pasajeros: ${payload.pasajeros}`,
    `Puertas: ${payload.puertas}`,
    `Exterior/Interior: ${payload.exteriorInterior}`,
    `Precio: Q${payload.precio}`,
    "Fotos:",
    ...payload.fotos.map((url, i) => `  ${i + 1}. ${url}`),
  ];
  return lines.join("\n");
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "RESEND_API_KEY no está configurada en el servidor." },
      { status: 500 }
    );
  }

  let payload: AutoPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
  }

  if (!payload?.nombreCompraventa || !Array.isArray(payload.fotos) || payload.fotos.length !== 5) {
    return NextResponse.json(
      { error: "Faltan campos requeridos o las 5 fotos." },
      { status: 400 }
    );
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: DESTINATION_EMAIL,
    subject: `Compraventa — ${payload.nombreCompraventa}`,
    html: buildHtml(payload),
    text: buildText(payload),
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
