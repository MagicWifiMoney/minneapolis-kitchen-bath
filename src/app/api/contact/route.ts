import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "hello@minneapoliskitchenandbath.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, projectType, message } = body;

    if (!name || !email || !projectType || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New quote request: ${projectType} — ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "Not provided"}`,
        `Project Type: ${projectType}`,
        `Message:\n${message}`,
      ].join("\n"),
    });


    // Discord notification (fire-and-forget) — lead capture alert
    const _dw = process.env.DISCORD_WEBHOOK_URL;
    if (_dw) {
      fetch(_dw, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [{
            title: '🏠 New MN Kitchen & Bath Lead',
            color: 10066329,
            fields: [
              { name: 'Name', value: name, inline: true },
              { name: 'Project', value: projectType, inline: true },
              { name: 'Email', value: email.replace(/(.{2}).*(@.*)/, '***$2'), inline: false },
              { name: 'Phone', value: phone || '—', inline: true },
              { name: 'Message', value: (message || '').slice(0, 500), inline: false },
            ],
            footer: { text: new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' }) + ' CT' }
          }]
        }),
      }).catch(() => {});
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
