import type { Metadata } from "next";
import { FooterQuotes } from "./components/footer-quotes";
import { Sidebar } from "./components/sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Will Gushée · Portfolio",
  description: "A minimal, project-forward portfolio shell.",
  icons: {
    icon: "/images/site_logo.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        <div className="flex min-h-screen flex-col px-5 sm:px-8 lg:px-12">
          <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col">
            {children}
            <footer className="mt-auto flex flex-col gap-3 border-t border-[var(--line)] py-8 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
              <FooterQuotes />
              <p>© 2026 Will Gushée.</p>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
