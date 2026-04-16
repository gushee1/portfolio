export default function ResumePage() {
  return (
    <main className="py-10 sm:py-14">
      <section className="border-b border-[var(--line)] pb-10">
        <p className="mb-4 text-sm font-medium text-[var(--muted)] uppercase">Resume</p>
        <h1 className="font-[family-name:var(--font-serif)] text-6xl leading-none sm:text-8xl">
          W.G.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
          Replace this page with your real experience, education, selected work, and a PDF download
          link when you are ready.
        </p>
      </section>

      <section className="grid gap-10 border-b border-[var(--line)] py-10 lg:grid-cols-[12rem_1fr]">
        <h2 className="text-sm font-medium text-[var(--muted)] uppercase">Experience</h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-xl">Product Engineer</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">Studio / 2024 - Present</p>
            <p className="mt-4 max-w-2xl leading-7 text-[var(--muted)]">
              Built focused web tools, design systems, and production interfaces for small teams.
            </p>
          </div>
          <div>
            <h3 className="text-xl">Frontend Developer</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">Company / 2022 - 2024</p>
            <p className="mt-4 max-w-2xl leading-7 text-[var(--muted)]">
              Shipped accessible React applications with a strong emphasis on performance and clear
              product language.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-10 py-10 lg:grid-cols-[12rem_1fr]">
        <h2 className="text-sm font-medium text-[var(--muted)] uppercase">Skills</h2>
        <p className="max-w-2xl leading-7 text-[var(--muted)]">
          TypeScript / React / Next.js / Tailwind / Node.js / Design Systems / Product Thinking
        </p>
      </section>
    </main>
  );
}
