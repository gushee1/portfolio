"use client";

import { useEffect, useState } from "react";

const quotes = [
  {
    text: "A smooth sea never made a skilled sailor.",
    credit: "Franklin D. Roosevelt"
  }
];

export function FooterQuotes() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");
  const quote = quotes[currentQuote];

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const quoteText = String(formData.get("quote") ?? "").trim();
    const author = String(formData.get("author") ?? "").trim();

    const response = await fetch("/api/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        quote: quoteText,
        author
      })
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      setStatus("error");
      setMessage(data?.error ?? "Could not send that quote right now.");
      return;
    }

    form.reset();
    setStatus("sent");
    setMessage("Sent. Thank you.");
  }

  useEffect(() => {
    if (quotes.length <= 1) {
      setCurrentQuote(0);
      return;
    }

    const timer = window.setInterval(() => {
      setCurrentQuote((index) => (index + 1) % quotes.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  if (!quote) {
    return null;
  }

  return (
    <div className="group relative min-h-5 pb-3 -mb-3">
      <p aria-live="polite">
        <span>&ldquo;{quote.text}&rdquo;</span>
        <span className="ml-2">{quote.credit}</span>
      </p>

      <div className="pointer-events-none absolute bottom-full left-0 z-30 w-[min(20rem,calc(100vw-7rem))] translate-y-2 border border-[var(--line)] bg-[var(--background)] p-4 opacity-0 shadow-sm transition duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
        <p className="mb-3 text-sm text-[var(--foreground)]">Send me your favorite quote, and I might feature it!</p>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-1 block text-xs uppercase">Quote</span>
            <textarea
              className="min-h-20 w-full resize-none rounded border border-[var(--line)] bg-transparent px-3 py-2 text-sm text-[var(--foreground)] outline-none focus:border-[var(--foreground)]"
              name="quote"
              required
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs uppercase">Author</span>
            <input
              className="w-full rounded border border-[var(--line)] bg-transparent px-3 py-2 text-sm text-[var(--foreground)] outline-none focus:border-[var(--foreground)]"
              name="author"
              required
              type="text"
            />
          </label>
          <button
            disabled={status === "sending"}
            className="rounded border border-[var(--foreground)] px-3 py-2 text-sm text-[var(--foreground)] transition hover:bg-[var(--foreground)] hover:text-[var(--background)]"
            type="submit"
          >
            {status === "sending" ? "Sending..." : "Send"}
          </button>
          {message && <p className="text-xs leading-5">{message}</p>}
        </form>
      </div>
    </div>
  );
}
