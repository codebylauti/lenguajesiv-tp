import { services } from "../data/content.js";

function Services () {
  const { intro, items, writeups } = services

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
