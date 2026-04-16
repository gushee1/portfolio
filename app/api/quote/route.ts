import { NextResponse } from "next/server";

type QuoteRequest = {
  quote?: string;
  author?: string;
  email?: string;
};

const resendApiUrl = "https://api.resend.com/emails";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.QUOTE_RECIPIENT_EMAIL;
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

  if (!resendApiKey || !toEmail) {
    return NextResponse.json(
      { error: "Quote email is not configured yet." },
      { status: 500 }
    );
  }

  const body = (await request.json()) as QuoteRequest;
  const quote = body.quote?.trim() ?? "";
  const author = body.author?.trim() ?? "";
  const email = body.email?.trim() ?? "";

  if (!quote || !author || !email) {
    return NextResponse.json({ error: "Quote, author, and email are required." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const response = await fetch(resendApiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: "Portfolio quote submission",
      text: `Quote:\n${quote}\n\nAuthor:\n${author}\n\nSubmitted by:\n${email}`,
      html: `
        <h1>Portfolio quote submission</h1>
        <p><strong>Quote:</strong><br>${escapeHtml(quote)}</p>
        <p><strong>Author:</strong><br>${escapeHtml(author)}</p>
        <p><strong>Submitted by:</strong><br>${escapeHtml(email)}</p>
      `
    })
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Could not send the quote right now." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
