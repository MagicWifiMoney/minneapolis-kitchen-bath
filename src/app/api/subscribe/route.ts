import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const AUDIENCE_ID = "c10cd6d9-97c6-4db0-a118-f41eff990706"; // MPLS Kitchen & Bath Leads
const GUIDE_URL =
  "https://minneapoliskitchenandbath.com/guides/mpls-remodel-cost-guide-2026.pdf";

export const dynamic = "force-dynamic";

async function saveToNotion(email: string, source: string) {
  const token = process.env.NOTION_API_TOKEN;
  const db = process.env.NOTION_SUBSCRIBERS_DB_ID;
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
        Email: { title: [{ text: { content: email } }] },
        Source: { select: { name: source || "unknown" } },
        Status: { select: { name: "Subscribed" } },
        Subscribed: { date: { start: new Date().toISOString() } },
      },
    }),
  });
  return res.ok;
}

async function sendGuide(resend: Resend | null, email: string) {
  if (!resend) return false;
  try {
    await resend.contacts.create({ email, audienceId: AUDIENCE_ID, unsubscribed: false });
  } catch {
    // Already subscribed or audience error shouldn't block the email.
  }
  const { error } = await resend.emails.send({
    from: "Minneapolis Kitchen & Bath <jake@dogbathroomart.com>",
    to: email,
    subject: "Your 2026 Minneapolis Remodel Cost Guide is here!",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Planning a remodel?</h2>
        <p>Thanks for requesting our 2026 Twin Cities Remodel Cost Guide. Knowing the local rates is the first step to a successful project.</p>
        <div style="background: #f0fdfa; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #99f6e4;">
          <h3 style="margin-top:0;">What's inside:</h3>
          <ul>
            <li>Kitchen remodel price tiers and per-square-foot base rates</li>
            <li>Bathroom cost breakdowns from powder rooms to primary suites</li>
            <li>How your specific Twin Cities suburb changes the number</li>
          </ul>
          <p><a href="${GUIDE_URL}" style="color: #0f766e; font-weight: bold;">Download the PDF Guide &rarr;</a></p>
        </div>
        <p>If you're ready for an in-home consultation, just reply to this email or visit our site to book a time.</p>
        <p>Best,<br>The Minneapolis Kitchen &amp; Bath Team</p>
      </div>
    `,
  });
  return !error;
}

export async function POST(req: NextRequest) {
  try {
    const { email, source } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const key = process.env.RESEND_API_KEY;
    const resend = key ? new Resend(key) : null;

    const [emailed, saved] = await Promise.all([
      sendGuide(resend, email).catch(() => false),
      saveToNotion(email, source).catch(() => false),
    ]);

    if (!emailed && !saved) {
      console.error("Subscribe: both email and Notion delivery failed");
      return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Subscription error:", err);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
