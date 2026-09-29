import { home } from "../data/content.js";

function Home () {
  const { hero, focus, writeups } = home

  return (
    <section className="max-w-4xl mx-auto px-6 py-16 flex flex-col gap-12">
      <header className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-text-primary">{hero.name}</h1>
        <p className="text-detail-gold uppercase tracking-widest text-sm">{hero.role}</p>
        <p className="text-lg leading-relaxed">{hero.tagline}</p>
        <a
          href={writeups.url}
          target="_blank"
          rel="noopener noreferrer"
          className="self-start rounded-md bg-detail-jade px-5 py-2 font-semibold text-green-primary hover:opacity-90"
        >
          {writeups.label} →
        </a>
      </header>

      <div className="rounded-lg bg-green-cards p-8 flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-detail-jade">{focus.title}</h2>
        <p className="leading-relaxed">{focus.text}</p>
        <ul className="flex flex-wrap gap-3">
          {focus.platforms.map((platform) => (
            <li key={platform.name}>
              <a
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-full border border-detail-jade px-4 py-1 text-sm hover:bg-detail-jade hover:text-green-primary"
              >
                {platform.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Home;
