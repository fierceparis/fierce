"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.target);

    const res = await fetch("https://formspree.io/f/xnjwjbeg", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (res.ok) {
      setStatus("success");
      e.target.reset();
    } else {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/10 bg-white/5 p-6"
    >
      <h2 className="mb-6 text-3xl font-bold">Contact</h2>

      <input
        type="text"
        name="name"
        required
        placeholder="Nom"
        className="mb-3 w-full rounded bg-white p-3 text-black"
      />

      <input
        type="email"
        name="email"
        required
        placeholder="Email"
        className="mb-3 w-full rounded bg-white p-3 text-black"
      />

      <textarea
        name="message"
        required
        rows="4"
        placeholder="Message"
        className="mb-3 w-full rounded bg-white p-3 text-black"
      />

      <button
        type="submit"
        className="rounded-full bg-white px-6 py-3 font-bold text-black"
      >
        {status === "loading" ? "Envoi..." : "Envoyer"}
      </button>

      {/* FEEDBACK */}
      {status === "success" && (
        <p className="mt-4 text-green-400">
          Message envoyé 💋
        </p>
      )}

      {status === "error" && (
        <p className="mt-4 text-red-400">
          Une erreur est survenue, réessaie.
        </p>
      )}
    </form>
  );
}