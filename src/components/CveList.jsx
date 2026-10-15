import cvesData from "../data/cves.json"

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
  const vulnerabilities = cvesData.results ?? []

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-detail-jade">Vulnerabilidades recientes</h2>
        <p className="leading-relaxed">
          Lo último del catálogo CVE, actualizado en cada deploy desde OpenCVE.
        </p>
      </div>

      {vulnerabilities.length === 0 && (
        <div className="rounded-lg bg-green-cards p-6">
          <p className="text-sm">Todavía no hay CVEs para mostrar.</p>
        </div>
      )}

      {vulnerabilities.length > 0 && (
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
