import {
  education,
  formatDateRange,
  formatLocation,
  formatWorkPositionLocation,
  skills,
  workExperience,
  type Education,
  type SkillGroup,
  type WorkExperience,
  type WorkPosition
} from "@/data/resume";

export function ResumePage() {
  const visibleExperience = workExperience.filter((experience) => !experience.omittedFromResume);

  return (
    <main className="py-10 sm:py-14 print:py-0">
      <header className="border-b border-[var(--line)] pb-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl leading-7 text-[var(--muted)]">
            
          </p>
          <a
            className="inline-flex w-fit shrink-0 items-center justify-center rounded border border-[var(--line)] px-4 py-2 text-sm text-[var(--foreground)] no-underline transition hover:border-[var(--foreground)] print:hidden"
            href="/resume.pdf"
          >
            Download Resume PDF
          </a>
        </div>
      </header>

      <ExperienceSection experience={visibleExperience} />
      <EducationSection education={education} />
      <SkillsSection skills={skills} />
    </main>
  );
}

export function ExperienceSection({ experience }: { experience: WorkExperience[] }) {
  if (experience.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="experience-heading" className="grid gap-8 border-b border-[var(--line)] py-10 lg:grid-cols-[12rem_1fr]">
      <h2 id="experience-heading" className="text-sm font-medium uppercase text-[var(--muted)]">
        Experience
      </h2>
      <div className="space-y-10">
        {experience.map((company) => (
          <ExperienceCompany key={company.company} experience={company} />
        ))}
      </div>
    </section>
  );
}

export function ExperienceCompany({ experience }: { experience: WorkExperience }) {
  const companyName = experience.companyUrl ? (
    <a className="no-underline hover:text-[var(--accent)]" href={experience.companyUrl}>
      {experience.company}
    </a>
  ) : (
    experience.company
  );

  return (
    <article className="break-inside-avoid">
      <header className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="text-2xl leading-snug">{companyName}</h3>
        <p className="text-sm text-[var(--muted)]">
          {formatLocation(experience.location, experience.remote)}
        </p>
      </header>

      <div className="mt-5 space-y-7">
        {experience.positions.map((position) => (
          <ExperiencePosition
            key={`${experience.company}-${position.title}-${position.startDate}`}
            experience={experience}
            position={position}
          />
        ))}
      </div>
    </article>
  );
}

export function ExperiencePosition({
  experience,
  position
}: {
  experience: WorkExperience;
  position: WorkPosition;
}) {
  const location = formatWorkPositionLocation(experience, position);
  const companyLocation = formatLocation(experience.location, experience.remote);
  const dateRange = formatDateRange(position.startDate, position.endDate, position.current);

  return (
    <section className="break-inside-avoid">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <div>
          <h4 className="font-medium leading-snug">{position.title}</h4>
          {location !== companyLocation && <p className="mt-1 text-sm text-[var(--muted)]">{location}</p>}
        </div>
        {dateRange && <p className="text-sm text-[var(--muted)]">{dateRange}</p>}
      </div>

      {position.summary && <p className="mt-3 max-w-3xl leading-7 text-[var(--muted)]">{position.summary}</p>}

      {position.highlights.length > 0 && (
        <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-[var(--muted)]">
          {position.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      )}

      {position.technologies && position.technologies.length > 0 && (
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
          {position.technologies.join(" / ")}
        </p>
      )}
    </section>
  );
}

export function EducationSection({ education }: { education: Education[] }) {
  if (education.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="education-heading" className="grid gap-8 border-b border-[var(--line)] py-10 lg:grid-cols-[12rem_1fr]">
      <h2 id="education-heading" className="text-sm font-medium uppercase text-[var(--muted)]">
        Education
      </h2>
      <div className="space-y-8">
        {education.map((entry) => {
          const dateRange = formatDateRange(entry.startDate, entry.endDate);
          const degree = [entry.degree, entry.field].filter(Boolean).join(", ");

          return (
            <article key={`${entry.school}-${entry.degree}`} className="break-inside-avoid">
              <header className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="text-xl leading-snug">
                    {entry.schoolUrl ? (
                      <a className="no-underline hover:text-[var(--accent)]" href={entry.schoolUrl}>
                        {entry.school}
                      </a>
                    ) : (
                      entry.school
                    )}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--muted)]">{formatLocation(entry.location)}</p>
                </div>
                {dateRange && <p className="text-sm text-[var(--muted)]">{dateRange}</p>}
              </header>

              <p className="mt-4 leading-7">{degree}</p>
              <div className="mt-3 space-y-1 text-sm leading-6 text-[var(--muted)]">
                {entry.gpa && <p>GPA: {entry.gpa}</p>}
                {entry.honors && entry.honors.length > 0 && <p>Honors: {entry.honors.join(" / ")}</p>}
                {entry.coursework && entry.coursework.length > 0 && (
                  <p>Coursework: {entry.coursework.join(" / ")}</p>
                )}
                {entry.activities && entry.activities.length > 0 && (
                  <p>Activities: {entry.activities.join(" / ")}</p>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function SkillsSection({ skills }: { skills: SkillGroup[] }) {
  if (skills.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="skills-heading" className="grid gap-8 py-10 lg:grid-cols-[12rem_1fr]">
      <h2 id="skills-heading" className="text-sm font-medium uppercase text-[var(--muted)]">
        Skills
      </h2>
      <div className="space-y-5">
        {skills.map((group) => (
          <section key={group.category} className="grid gap-2 sm:grid-cols-[10rem_1fr]">
            <h3 className="text-sm font-medium">{group.category}</h3>
            <p className="text-sm leading-6 text-[var(--muted)]">{group.skills.join(" / ")}</p>
          </section>
        ))}
      </div>
    </section>
  );
}
