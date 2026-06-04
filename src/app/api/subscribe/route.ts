import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const RESEND_KEY = process.env.RESEND_API_KEY || 're_PyJDywxG_8vdiwBGP4g5dcUHGLxqkRu4D';
const AUDIENCE_ID = 'c10cd6d9-97c6-4db0-a118-f41eff990706'; // MPLS Kitchen & Bath Leads

export async function POST(req: NextRequest) {
  const resend = new Resend(RESEND_KEY);

  try {
    const { email, source } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // 1. Add to Resend Audience
    await resend.contacts.create({
      email,
      audienceId: AUDIENCE_ID,
      unsubscribed: false,
    });

    // 2. Send confirmation with PDF link
    await resend.emails.send({
      from: "Minneapolis Kitchen & Bath <jake@dogbathroomart.com>",
      to: email,
      subject: "Your 2026 Minneapolis Remodel Cost Guide is here!",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>🍳 Planning a remodel?</h2>
          <p>Thanks for requesting our 2026 Cost Guide. Knowing the local rates is the first step to a successful project.</p>
          <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>📊 What's inside:</h3>
            <ul>
              <li>Kitchen remodel price tiers (5K - 0K+)</li>
              <li>Bathroom oasis cost breakdowns</li>
              <li>2026 material lead time estimates</li>
            </ul>
            <p><a href="https://minneapoliskitchenandbath.com/guides/mpls-remodel-cost-guide-2026.pdf" style="color: #2563eb; font-weight: bold;">Download the PDF Guide →</a></p>
          </div>
          <p>If you're ready for an in-home consultation, just reply to this email or visit our site to book a time.</p>
          <p>Best,<br>The Minneapolis Kitchen & Bath Team</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Subscription error:", err);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
