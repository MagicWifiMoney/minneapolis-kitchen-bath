import { NextRequest, NextResponse } from "next/server";

// Lead notifications go two places: an email to Jake and a Discord ping.
// Both are best-effort; as long as one lands, the lead is captured.
const TO_EMAIL = process.env.LEAD_TO_EMAIL || "jake.giebel@gmail.com";
const FROM_INBOX = process.env.LEAD_FROM_INBOX || "botti@agentmail.to";

export const dynamic = "force-dynamic";

async function sendEmail(text: string, subject: string, replyTo: string) {
  const apiKey = process.env.AGENTMAIL_API_KEY;
  if (!apiKey) return false;
  const res = await fetch(
    `https://api.agentmail.to/v0/inboxes/${encodeURIComponent(FROM_INBOX)}/messages/send`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ to: TO_EMAIL, subject, text, reply_to: replyTo }),
    },
  );
  return res.ok;
}

async function pingDiscord(fields: { name: string; projectType: string; email: string; phone?: string; message: string }) {
  const url = process.env.DISCORD_WEBHOOK_URL;
  if (!url) return false;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [
        {
          title: "🏠 New MN Kitchen & Bath Lead",
          color: 10066329,
          fields: [
            { name: "Name", value: fields.name, inline: true },
            { name: "Project", value: fields.projectType, inline: true },
            { name: "Email", value: fields.email, inline: false },
            { name: "Phone", value: fields.phone || "—", inline: true },
            { name: "Message", value: (fields.message || "").slice(0, 500), inline: false },
          ],
          footer: {
            text:
              new Date().toLocaleString("en-US", { timeZone: "America/Chicago" }) +
              " CT",
          },
        },
      ],
    }),
  });
  return res.ok;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, projectType, message } = body;

    if (!name || !email || !projectType || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "Not provided"}`,
      `Project Type: ${projectType}`,
      `Message:\n${message}`,
    ].join("\n");

    // Fire both notifications; don't let one failure block the other.
    const [emailed, pinged] = await Promise.all([
      sendEmail(text, `New quote request: ${projectType} — ${name}`, email).catch(() => false),
      pingDiscord({ name, email, phone, projectType, message }).catch(() => false),
    ]);

    if (!emailed && !pinged) {
      console.error("Contact form: both email and Discord delivery failed");
      return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
