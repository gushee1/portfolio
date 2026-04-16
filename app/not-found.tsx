import Link from "next/link";

export default function NotFound() {
  return (
    <main className="py-20">
      <p className="mb-4 text-sm font-medium text-[var(--muted)] uppercase">404</p>
      <h1 className="font-[family-name:var(--font-serif)] text-6xl leading-none">Page not found.</h1>
      <Link className="mt-8 inline-block text-sm underline hover:text-[var(--accent)]" href="/">
        Return home
      </Link>
    </main>
  );
}
