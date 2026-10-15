import { readFile, writeFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const OUTPUT = resolve(ROOT, "src/data/cves.json")
const API_URL = "https://app.opencve.io/api/v2/cves?page_size=10"

// Local .env (CI already provides OPENCVE_TOKEN through the environment).
// Deliberately NOT a VITE_ variable: VITE_* values are inlined into the
// public browser bundle, and this token must never reach the client.
try {
  const envFile = await readFile(resolve(ROOT, ".env"), "utf8")
  for (const line of envFile.split("\n")) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/)
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].replace(/^["']|["']$/g, "")
    }
  }
} catch {
}

const token = process.env.OPENCVE_TOKEN

if (!token) {
  console.warn("[fetch-cves] OPENCVE_TOKEN not set: keeping src/data/cves.json as is.")
  process.exit(0)
}

const response = await fetch(API_URL, {
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  },
})

if (!response.ok) {
  console.error(`[fetch-cves] OpenCVE responded with ${response.status} ${response.statusText}`)
  process.exit(1)
}

const data = await response.json()
const results = (data.results ?? []).map((cve) => ({
  cve_id: cve.cve_id,
  title: cve.title,
  description: cve.description,
  created_at: cve.created_at,
  updated_at: cve.updated_at,
}))

await writeFile(OUTPUT, `${JSON.stringify({ fetchedAt: new Date().toISOString(), results }, null, 2)}\n`)
console.log(`[fetch-cves] Saved ${results.length} CVEs to src/data/cves.json`)
