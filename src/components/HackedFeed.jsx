import { useEffect, useState } from "react"

const API_URL = "https://randomuser.me/api/?results=6"
const NORMAL_MS = 2600
const HACKED_MS = 2400

async function fetchUsers () {
  const response = await fetch(API_URL)
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  const data = await response.json()
  return data.results ?? []
}

function HackedFeed () {
  const [users, setUsers] = useState([])
  const [index, setIndex] = useState(0)
  const [hacked, setHacked] = useState(false)
  const [status, setStatus] = useState("loading")

  useEffect(() => {
    let cancelled = false

    fetchUsers()
      .then((results) => {
        if (cancelled) return
        setUsers(results)
        setStatus("ready")
      })
      .catch(() => {
        if (!cancelled) setStatus("error")
      })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (status !== "ready" || users.length === 0) return

    const timer = setTimeout(() => {
      if (!hacked) {
        setHacked(true)
      } else if (index < users.length - 1) {
        setHacked(false)
        setIndex((current) => current + 1)
      } else {
        fetchUsers()
          .then((results) => {
            setUsers(results)
            setIndex(0)
            setHacked(false)
          })
          .catch(() => setStatus("error"))
      }
    }, hacked ? HACKED_MS : NORMAL_MS)

    return () => clearTimeout(timer)
  }, [status, users, index, hacked])

  const user = users[index]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-detail-jade">Simulacro de brecha</h2>
        <p className="leading-relaxed">
          El ciclo de vida de una cuenta comprometida, con datos de prueba de{" "}
          <a
            href="https://randomuser.me"
            target="_blank"
            rel="noopener noreferrer"
            className="text-detail-gold hover:underline"
          >
            randomuser.me
          </a>
          . Mirá lo que queda expuesto cuando todo sale mal.
        </p>
      </div>

      {status === "loading" && (
        <div className="flex h-64 flex-col items-center justify-center gap-4 rounded-lg bg-green-cards">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-detail-jade border-t-transparent" />
          <p className="text-sm text-detail-gold">Conectando con la red…</p>
        </div>
      )}

      {status === "error" && (
        <div className="rounded-lg border border-detail-gold/40 bg-green-cards p-6">
          <p className="text-sm text-detail-gold">
            No se pudieron cargar los usuarios de prueba. Intentá de nuevo más tarde.
          </p>
        </div>
      )}

      {status === "ready" && !user && (
        <div className="rounded-lg bg-green-cards p-6">
          <p className="text-sm">No hay usuarios para mostrar por ahora.</p>
        </div>
      )}

      {status === "ready" && user && (
        <div
          className={`relative overflow-hidden rounded-lg bg-green-cards p-8 ${
            hacked ? "animate-glitch-skew" : ""
          }`}
        >
          {hacked && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="animate-scanline absolute inset-x-0 h-16 bg-detail-jade/10" />
            </div>
          )}

          <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <div key={user.login?.uuid ?? index} className="animate-card-in relative shrink-0">
              <img
                src={user.picture?.large}
                alt={`Foto de ${user.name?.first ?? ""} ${user.name?.last ?? ""}`}
                className={`h-24 w-24 rounded-full border-2 transition-all duration-500 ${
                  hacked ? "border-red-400/80 grayscale contrast-125" : "border-detail-jade"
                }`}
              />
              {hacked && <div className="absolute inset-0 rounded-full bg-red-500/30 mix-blend-multiply" />}
            </div>

            <div className="flex flex-1 flex-col gap-3 text-center sm:text-left">
              <div key={`meta-${user.login?.uuid ?? index}`} className="animate-card-in flex flex-col gap-1">
                <div className="flex flex-col items-center gap-2 sm:flex-row">
                  <h3 className="text-xl font-semibold">
                    {user.name?.first} {user.name?.last}
                  </h3>
                  <span
                    className={`rounded-full border px-3 py-0.5 text-xs font-semibold ${
                      hacked
                        ? "border-red-400/80 bg-red-500/10 text-red-400"
                        : "border-detail-jade/60 text-detail-jade"
                    }`}
                  >
                    {hacked ? "COMPROMETIDO" : "en línea"}
                  </span>
                </div>
                <p className="text-sm">
                  {user.location?.city}, {user.location?.country}
                </p>
              </div>

              {hacked && (
                <div className="flex flex-col gap-1 rounded-md border border-red-400/40 bg-red-500/5 p-4 font-mono text-xs text-red-400">
                  <p className="mb-1 font-sans font-bold uppercase tracking-widest">Datos filtrados</p>
                  <p>usuario...: {user.login?.username}</p>
                  <p>correo....: {user.email}</p>
                  <p>password..: {user.login?.password}</p>
                  <p className="animate-glitch-clip font-sans font-bold">
                    sesión secuestrada — acceso total
                  </p>
                </div>
              )}
            </div>

            <p className="font-mono text-xs text-detail-gold sm:self-start">
              {index + 1} / {users.length}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default HackedFeed
