import { NextResponse } from "next/server";

// Resend will be configured in Phase 4 when we wire everything up.
// For now, this validates the form data and returns a success response.
// Set RESEND_API_KEY in .env.local to enable real email delivery.

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // If RESEND_API_KEY is set, send via Resend
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      const { Resend } = await import("resend");
      const resend = new Resend(resendApiKey);

      await resend.emails.send({
        from: `"${name}" <${email}>`,
        to: process.env.CONTACT_EMAIL || "Shajidulhoquefardeen@gmail.com",
        subject: `New Portfolio Message from ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
            <h2 style="color: #333;">New Contact Form Submission</h2>
            <p><strong>From:</strong> ${name} (${email})</p>
            <p><strong>Message:</strong></p>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
        `,
      });
    }

    // Send to Discord if webhook URL is provided
    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (discordWebhookUrl) {
      await fetch(discordWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [
            {
              title: "🚀 New Contact Form Submission",
              color: 0xf59e0b, // Terminal Yellow color
              fields: [
                {
                  name: "👤 Name",
                  value: name,
                  inline: true,
                },
                {
                  name: "📧 Email",
                  value: email,
                  inline: true,
                },
                {
                  name: "💬 Message",
                  value: message,
                },
              ],
              footer: {
                text: "Portfolio Contact Form",
              },
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      });
    }

    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
