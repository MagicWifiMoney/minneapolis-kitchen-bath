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

async function saveToNotion(fields: { name: string; projectType: string; email: string; phone?: string; message: string }) {
  const token = process.env.NOTION_API_TOKEN;
  const db = process.env.NOTION_LEADS_DB_ID;
  if (!token || !db) return false;
  const res = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parent: { database_id: db },
      properties: {
        Name: { title: [{ text: { content: fields.name } }] },
        Email: { email: fields.email },
        Phone: fields.phone ? { phone_number: fields.phone } : { phone_number: null },
        "Project Type": { select: { name: fields.projectType } },
        Message: { rich_text: [{ text: { content: (fields.message || "").slice(0, 1900) } }] },
        Status: { select: { name: "New" } },
        Submitted: {
          date: { start: new Date().toISOString() },
        },
      },
    }),
  });
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

    const lead = { name, email, phone, projectType, message };

    // Fire all three sinks; don't let one failure block the others.
    const [emailed, pinged, saved] = await Promise.all([
      sendEmail(text, `New quote request: ${projectType} — ${name}`, email).catch(() => false),
      pingDiscord(lead).catch(() => false),
      saveToNotion(lead).catch(() => false),
    ]);

    if (!emailed && !pinged && !saved) {
      console.error("Contact form: email, Discord, and Notion delivery all failed");
      return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
