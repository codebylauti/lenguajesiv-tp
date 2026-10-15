import { useState, useEffect } from "react"
import opencveClient from "../api/opencveClient"

const NIST_URL = "https://nvd.nist.gov/vuln/detail/"

function formatDate (isoDate) {
  if (!isoDate) return ""
  return new Date(isoDate).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

function CveList () {
  const [vulnerabilities, setVulnerabilities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await opencveClient.get("/cves", {
          params: { page_size: 10 },
        })
        if (!cancelled) setVulnerabilities(response.data.results || [])
      } catch (err) {
        console.error("Error connecting to OpenCVE:", err)
        if (!cancelled) {
          setError(
            "No se pudieron cargar las CVE. Fijate el token de OpenCVE en el .env y la conexión e intenta de nuevo."
          )
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchData()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-detail-jade">Vulnerabilidades recientes</h2>
        <p className="leading-relaxed">
          Lo último del catálogo CVE, sincronizado en vivo desde OpenCVE.
        </p>
      </div>

      {loading && (
        <div className="flex h-40 flex-col items-center justify-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-detail-jade border-t-transparent" />
          <p className="text-sm text-detail-gold">Cargando CVEs…</p>
        </div>
      )}

      {!loading && error && (
        <div className="rounded-lg border border-detail-gold/40 bg-green-cards p-6">
          <p className="text-sm text-detail-gold">{error}</p>
        </div>
      )}

      {!loading && !error && vulnerabilities.length === 0 && (
        <div className="rounded-lg bg-green-cards p-6">
          <p className="text-sm">Todavía no hay CVEs para mostrar.</p>
        </div>
      )}

      {!loading && !error && vulnerabilities.length > 0 && (
        <ul className="flex flex-col gap-4">
          {vulnerabilities.map((cve) => (
            <li
              key={cve.cve_id}
              className="flex flex-col gap-3 rounded-lg bg-green-cards p-5 sm:flex-row sm:gap-6"
            >
              <div className="flex flex-row items-center justify-between gap-2 sm:w-44 sm:shrink-0 sm:flex-col sm:items-start sm:justify-start sm:gap-1">
                <span className="font-mono font-bold text-detail-jade">{cve.cve_id}</span>
                <span className="text-xs text-detail-gold">
                  {formatDate(cve.updated_at || cve.created_at)}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-2">
                <h3 className="font-semibold leading-snug">{cve.title || cve.cve_id}</h3>
                <p className="line-clamp-3 text-sm leading-relaxed">
                  {cve.description || "Sin descripción disponible."}
                </p>
                <a
                  href={`${NIST_URL}${cve.cve_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 self-start text-sm font-semibold text-detail-jade hover:text-detail-gold"
                >
                  Ver en NIST →
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CveList
