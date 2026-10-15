import { services } from "../data/content.js";

function Services () {
  const { intro, items, techStack, recentWriteups, writeups } = services

  return (
    <section className="max-w-4xl mx-auto px-6 py-16 flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <h1 className="text-4xl font-bold text-text-primary">Servicios</h1>
        <p className="leading-relaxed">{intro}</p>
      </header>

      <ul className="grid gap-6 sm:grid-cols-2">
        {items.map((service) => (
          <li key={service.id} className="rounded-lg bg-green-cards p-6 flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-detail-jade">{service.title}</h2>
            <p className="leading-relaxed flex-1">{service.description}</p>
            <ul className="flex flex-wrap gap-2">
              {service.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-detail-gold px-3 py-1 text-xs text-detail-gold"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold text-detail-jade">Stack tecnológico</h2>
        <ul className="grid gap-4 sm:grid-cols-3">
          {techStack.map((tech) => (
            <li key={tech.id} className="rounded-lg bg-green-cards overflow-hidden">
              <div className="aspect-[16/10] w-full flex items-center justify-center bg-green-primary">
                <img
                  src={`${import.meta.env.BASE_URL}${tech.image}`}
                  alt={tech.alt}
                  loading="lazy"
                  className="h-14 w-auto object-contain"
                />
              </div>
              <p className="px-4 py-3 text-center font-medium text-detail-jade">{tech.name}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold text-detail-jade">Últimos writeups</h2>
        <ul className="grid gap-6 sm:grid-cols-3">
          {recentWriteups.map((entry) => (
            <li key={entry.id}>
              <article className="rounded-lg bg-green-cards overflow-hidden flex flex-col">
                {entry.image ? (
                  <img
                    src={
                      entry.image.startsWith("http")
                        ? entry.image
                        : `${import.meta.env.BASE_URL}${entry.image}`
                    }
                    alt={entry.imageAlt}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover"
                  />
                ) : (
                  <div className="aspect-[16/10] w-full flex flex-col items-center justify-center gap-1 border-b border-detail-gold/40 bg-green-primary text-detail-gold">
                    <span className="text-sm font-semibold">Sin imagen</span>
                    <span className="text-xs opacity-80">Podés subir una después</span>
                  </div>
                )}
                <div className="p-5 flex flex-col gap-2 flex-1">
                  <span className="self-start rounded-full border border-detail-gold px-3 py-1 text-xs text-detail-gold">
                    {entry.platform}
                  </span>
                  <h3 className="text-lg font-semibold text-text-primary">{entry.title}</h3>
                  <p className="text-sm leading-relaxed flex-1">{entry.description}</p>
                  <a
                    href={entry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 self-start text-sm font-semibold text-detail-jade hover:text-detail-gold"
                  >
                    Leer writeup →
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>

      <a
        href={writeups.url}
        target="_blank"
        rel="noopener noreferrer"
        className="self-start rounded-md bg-detail-jade px-5 py-2 font-semibold text-green-primary hover:opacity-90"
      >
        {writeups.label} →
      </a>
    </section>
  )
}

export default Services;
