import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type QuoteRequest = {
  quote?: string;
  author?: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isQuoteRequest(value: unknown): value is QuoteRequest {
  return typeof value === "object" && value !== null;
}

export async function POST(request: Request) {
  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  const toEmail = process.env.QUOTE_RECIPIENT_EMAIL;

  if (!gmailUser || !gmailAppPassword || !toEmail) {
    return NextResponse.json(
      { error: "Quote email is not configured yet." },
      { status: 500 }
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Please submit a valid quote request." }, { status: 400 });
  }

  if (!isQuoteRequest(body)) {
    return NextResponse.json({ error: "Please submit a valid quote request." }, { status: 400 });
  }

  const quote = body.quote?.trim() ?? "";
  const author = body.author?.trim() ?? "";

  if (!quote || !author) {
    return NextResponse.json({ error: "Quote and author are required." }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailAppPassword
    }
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio Quotes" <${gmailUser}>`,
      to: toEmail,
      subject: "Portfolio quote submission",
      text: `Quote:\n${quote}\n\nAuthor:\n${author}`,
      html: `
        <h1>Portfolio quote submission</h1>
        <p><strong>Quote:</strong><br>${escapeHtml(quote)}</p>
        <p><strong>Author:</strong><br>${escapeHtml(author)}</p>
      `
    });
  } catch (error) {
    console.error("Gmail quote email failed", error);
    return NextResponse.json(
      { error: "Could not send the quote right now. Check your Gmail app password and account settings." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
