import Image from "next/image";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <main>
      <section id="work" className="py-10 sm:py-14">
        <div className="divide-y divide-[var(--line)]">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="grid gap-5 py-8 sm:grid-cols-[8rem_1fr] sm:gap-8 lg:grid-cols-[14rem_1fr_17rem]"
            >
              <div className="relative aspect-[4/3] w-full max-w-44 overflow-hidden bg-transparent lg:max-w-56">
                <Image
                  src={project.image.src}
                  alt={project.image.alt}
                  fill
                  sizes="(min-width: 1024px) 160px, (min-width: 640px) 128px, 176px"
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-serif)] text-4xl leading-none sm:text-5xl">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  {project.stack.join(" / ")}
                </p>
                <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)]">
                  {project.summary}
                </p>
              </div>
              <div className="flex flex-wrap content-start gap-x-5 gap-y-2 text-sm lg:justify-end">
                {project.links.repo && (
                  <a className="underline hover:text-[var(--accent)]" href={project.links.repo}>
                    Repo
                  </a>
                )}
                {project.links.demo && (
                  <a className="underline hover:text-[var(--accent)]" href={project.links.demo}>
                    Demo
                  </a>
                )}
                {project.links.site && (
                  <a className="underline hover:text-[var(--accent)]" href={project.links.site}>
                    Site
                  </a>
                )}
                {project.links.video && (
                  <a className="underline hover:text-[var(--accent)]" href={project.links.video}>
                    Video
                  </a>
                )}
                {project.links.play && (
                  <a className="underline hover:text-[var(--accent)]" href={project.links.play}>
                    Play
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
