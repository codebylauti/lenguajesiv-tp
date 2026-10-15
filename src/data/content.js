const writeups = {
  label: "Ver todos mis writeups",
  url: "https://github.com/codebylauti/ejptv2-journey"
}

const home = {
  hero: {
    name: "Lautaro Jándula",
    role: "Estudiante de Ciberseguridad e Ingeniería Informática",
    tagline:
      "Portfolio donde reúno mis resúmenes de laboratorios, máquinas y proyectos. Todo lo que rompo, lo documento.",
  },
  focus: {
    title: "Qué estoy haciendo ahora",
    text:
      "Estoy practicando de forma constante con máquinas y labs en plataformas de seguridad ofensiva, resolviendo retos, levantando entornos con Docker y escribiendo el proceso paso a paso.",
    platforms: [
      { name: "DockerLabs", url: "https://dockerlabs.es" },
      { name: "TryHackMe", url: "https://tryhackme.com" },
      { name: "HackTheBox", url: "https://www.hackthebox.com" },
    ],
  },
  writeups,
}

// Tech stack: logos propios en public/logos/ (ver CREDITS.md ahi al lado).
// Las rutas son relativas: Services.jsx les antepone import.meta.env.BASE_URL
// para que funcionen tambien en el deploy de GitHub Pages.
const techStack = [
  { id: "kali", name: "Kali / Linux", image: "logos/kali.svg", alt: "Logotipo de Kali Linux" },
  { id: "docker", name: "Docker", image: "logos/docker.svg", alt: "Logotipo de Docker" },
  { id: "python", name: "Python", image: "logos/python.svg", alt: "Logotipo de Python" },
  { id: "bash", name: "Bash", image: "logos/bash.svg", alt: "Logotipo de GNU Bash" },
  { id: "git", name: "Git", image: "logos/git.svg", alt: "Logotipo de Git" },
  { id: "nmap", name: "Nmap", image: "logos/nmap.svg", alt: "Logotipo de Nmap" },
]

// Si un writeup todavia no tiene imagen, deja `image: null` y la tarjeta
// muestra el placeholder "Sin imagen". Para reemplazarla, subi el archivo
// a `public/` y usa su ruta relativa (ej: "writeups/gitea.png").
const recentWriteups = [
  {
    id: "gitea",
    title: "Gitea",
    platform: "DockerLabs · Intermedio",
    description:
      "Servicio Gitea en el puerto 3000 con repositorios expuestos: path traversal, fuerza bruta SSH y escalada de privilegios con UDFs en MySQL hasta llegar a root.",
    url: "https://github.com/codebylauti/ejptv2-journey/blob/main/writeups/dockerlabs/intermediate/gitea.md",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&q=80&fm=jpg",
    imageAlt: "Estatuilla de un gato frente a una pantalla con una interfaz de repositorio",
  },
  {
    id: "nexus",
    title: "Nexus",
    platform: "Hack The Box · Easy",
    description:
      "RCE ilimitada de archivos PHP en el CRM Krayin (CVE-2026-38526), subdominio Git expuesto y escalada de jones a root mediante un timer de systemd.",
    url: "https://github.com/codebylauti/ejptv2-journey/blob/main/writeups/hack-the-box/easy/nexus.md",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80&fm=jpg",
    imageAlt: "Candado rojo sobre un teclado retroiluminado",
  },
  {
    id: "baluhome",
    title: "BaluHome",
    platform: "DockerLabs · Hard",
    description:
      "Bypass de login, reverse shell y pivoting entre contenedores para escalar privilegios hasta root en un entorno DockerLabs dificil.",
    url: "https://github.com/codebylauti/ejptv2-journey/blob/main/writeups/dockerlabs/hard/balu-home.md",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80&fm=jpg",
    imageAlt: "Buque de carga cargado de contenedores en un puerto",
  },
]

const services = {
  intro:
    "Lo que ofrezco mientras sigo formándome: trabajo práctico, documentado y con foco en aprender haciendo.",
  writeups,
  items: [
    {
      id: "machines",
      title: "Resolución de máquinas y labs",
      description:
        "Enumeración, explotación y escalada de privilegios en entornos controlados de DockerLabs, TryHackMe y HackTheBox, con notas públicas de cada paso.",
      tags: ["Linux", "Privilege escalation", "CTF"],
    },
    {
      id: "writeups",
      title: "Writeups y documentación",
      description:
        "Guías claras de cada máquina o reto: contexto, comandos usados, errores y aprendizajes, para que puedas replicar o revisar el proceso.",
      tags: ["Documentación", "Análisis"],
    },
    {
      id: "docker",
      title: "Entornos con Docker",
      description:
        "Armado y revisión de servicios en contenedores: despliegue, configuración y análisis de imágenes para reproducir laboratorios locales.",
      tags: ["Docker", "Infraestructura"],
    },
    {
      id: "web",
      title: "Revisión básica de seguridad web",
      description:
        "Evaluación de aplicaciones con foco en los OWASP Top 10: inyecciones, XSS, autenticación débil y malas configuraciones, con reporte de hallazgos.",
      tags: ["OWASP", "Web", "Reportes"],
    },
  ],
  techStack,
  recentWriteups,
}

export { home, services }
