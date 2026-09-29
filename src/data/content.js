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
}

export { home, services }
