"use client";

import { useState } from "react";

export default function ContactForm({ darkMode }) {
  const [loading, setLoading] = useState(false);
  const [mascotTip, setMascotTip] = useState("Hey there! Fill in your details 📩");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert("Message sent! 🎉");
        form.reset();
        setMascotTip("Thanks! We'll get back to you soon ✨");
      } else {
        alert("Failed to send message. Try again later.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`bg-white dark:bg-kez-dark p-8 rounded-3xl shadow-xl w-full`}>
      <h2 className="text-2xl font-extrabold mb-4 text-kez-blue dark:text-kez-yellow text-center">
        Contact Us 📩
      </h2>
      <p className="mb-6 text-center text-gray-500 dark:text-gray-400">{mascotTip}</p>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Parent's Name"
          className="border-2 border-gray-300 dark:border-gray-600 rounded-lg p-4 w-full
                     focus:border-kez-blue dark:focus:border-kez-yellow outline-none transition-all
                     text-black"
          required
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="border-2 border-gray-300 dark:border-gray-600 rounded-lg p-4 w-full
                     focus:border-kez-blue dark:focus:border-kez-yellow outline-none transition-all
                     text-black"
          required
        />

        {/* Message */}
        <textarea
          name="message"
          rows={4}
          placeholder="Child's Age & Message"
          className="border-2 border-gray-300 dark:border-gray-600 rounded-lg p-4 w-full
                     focus:border-kez-blue dark:focus:border-kez-yellow outline-none resize-none
                     text-black"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-kez-blue dark:bg-kez-yellow text-white dark:text-kez-dark py-3 rounded-full font-bold hover:scale-105 transition-transform disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}