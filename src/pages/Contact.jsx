import ContactMe from '../components/ContactMe.jsx'
import { home } from '../data/content.js'

function Contact () {
  const { focus, writeups } = home

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-6 py-16">
      <header className="flex flex-col gap-3">
        <h1 className="text-4xl font-bold text-text-primary">Contacto</h1>
        <p className="max-w-2xl leading-relaxed">
          ¿Querés colaborar en un proyecto, tenés una consulta sobre algún writeup o querés
          resolver una máquina juntos? Dejame un mensaje y te respondo.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-[1fr_260px] items-start">
        <ContactMe />

        <aside className="flex flex-col gap-4 rounded-lg border border-detail-jade/40 p-6">
          <h2 className="text-lg font-semibold text-detail-jade">También podés encontrarme en</h2>
          <ul className="flex flex-col gap-2">
            <li>
              <a
                href={writeups.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-detail-gold underline-offset-4 transition hover:underline"
              >
                {writeups.label}
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  )
}

export default Contact;
