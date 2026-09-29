import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const inputStyle =
  "w-full rounded-md border border-detail-jade/40 bg-green-primary px-4 py-2.5 text-text-primary placeholder:text-text-primary/40 outline-none transition focus:border-detail-jade focus:ring-1 focus:ring-detail-jade";

function ContactMe () {
  const form = useRef();
  const [status, setStatus] = useState("idle");

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs
      .sendForm(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, form.current, {
        publicKey: import.meta.env.VITE_PUBLIC_KEY,
      })
      .then(
        () => {
          setStatus("sent");
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
      className="flex w-full flex-col gap-5 rounded-lg bg-green-cards p-6 sm:p-8"
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="user_name" className="text-sm font-semibold uppercase tracking-wide text-detail-jade">
          Nombre completo
        </label>
        <input id="user_name" type="text" name="user_name" required placeholder="Tu nombre" className={inputStyle} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="user_email" className="text-sm font-semibold uppercase tracking-wide text-detail-jade">
          Email
        </label>
        <input
          id="user_email"
          type="email"
          name="user_email"
          required
          placeholder="tu@email.com"
          className={inputStyle}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-semibold uppercase tracking-wide text-detail-jade">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows="5"
          placeholder="Contame en qué te puedo ayudar"
          className={`${inputStyle} resize-y`}
        />
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
