import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const inputStyle =
  "w-full rounded-md border border-detail-jade/40 bg-green-primary px-4 py-2.5 text-text-primary placeholder:text-text-primary/40 outline-none transition focus:border-detail-jade focus:ring-1 focus:ring-detail-jade";

const errorStyle = "text-sm text-red-400";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const validate = ({ user_name, user_email, message }) => {
  const errors = {};
  const name = user_name.trim();
  const email = user_email.trim();
  const body = message.trim();

  if (name.length < 3) errors.user_name = "El nombre debe tener al menos 3 caracteres.";
  if (!email) errors.user_email = "Ingresá tu email.";
  else if (!EMAIL_REGEX.test(email)) errors.user_email = "Ingresá un email válido.";
  if (body.length < 3) errors.message = "El mensaje debe tener al menos 3 caracteres.";

  return errors;
};

function ContactMe () {
  const form = useRef();
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name } = e.target;
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form.current));
    const nextErrors = validate(data);
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setStatus("sending");

    emailjs
      .sendForm('service_7qce4rl', 'template_kpn1tod', form.current, {
        publicKey: import.meta.env.VITE_PUBLIC_KEY,
      })
      .then(
        () => {
          setStatus("sent");
          setErrors({});
          form.current.reset();
        },
        (error) => {
          console.error('FAILED...', error.text);
          setStatus("error");
        },
      );
  };

  return (
    <form
      ref={form}
      onSubmit={sendEmail}
      noValidate
      className="flex w-full flex-col gap-5 rounded-lg bg-green-cards p-6 sm:p-8"
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="user_name" className="text-sm font-semibold uppercase tracking-wide text-detail-jade">
          Nombre completo
        </label>
        <input
          id="user_name"
          type="text"
          name="user_name"
          aria-invalid={Boolean(errors.user_name)}
          onChange={handleChange}
          placeholder="Tu nombre"
          className={inputStyle}
        />
        {errors.user_name && <p className={errorStyle}>{errors.user_name}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="user_email" className="text-sm font-semibold uppercase tracking-wide text-detail-jade">
          Email
        </label>
        <input
          id="user_email"
          type="email"
          name="user_email"
          onChange={handleChange}
          placeholder="tu@email.com"
          className={inputStyle}
        />
        {errors.user_email && <p className={errorStyle}>{errors.user_email}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-semibold uppercase tracking-wide text-detail-jade">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          rows="5"
          aria-invalid={Boolean(errors.message)}
          onChange={handleChange}
          placeholder="Contame en qué te puedo ayudar"
          className={`${inputStyle} resize-y`}
        />
        {errors.message && <p className={errorStyle}>{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-md bg-detail-jade px-5 py-2.5 font-semibold text-green-primary transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Enviando..." : "Enviar mensaje"}
      </button>

      {status === "sent" && (
        <p className="text-sm text-detail-jade">Mensaje enviado. Te respondo a la brevedad.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-400">No se pudo enviar el mensaje. Probá de nuevo en unos minutos.</p>
      )}
    </form>
  );
};

export default ContactMe;
