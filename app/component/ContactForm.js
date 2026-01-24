"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactForm({ darkMode }) {
  const [loading, setLoading] = useState(false);
  const [mascotTip, setMascotTip] = useState("Hey there! Fill in your details 📩");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

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
        setShowSuccessModal(true);
        form.reset();
        setMascotTip("Thanks! We'll get back to you soon ✨");
        
        // Auto-close after 3 seconds
        setTimeout(() => {
          setShowSuccessModal(false);
        }, 3000);
      } else {
        setShowErrorModal(true);
        setTimeout(() => {
          setShowErrorModal(false);
        }, 3000);
      }
    } catch (err) {
      console.error(err);
      setShowErrorModal(true);
      setTimeout(() => {
        setShowErrorModal(false);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setShowSuccessModal(false)}
            />
            
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="fixed inset-0 m-auto z-50 h-fit
                         bg-white dark:bg-kez-dark rounded-3xl shadow-2xl p-8 max-w-sm w-[90%]"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="text-6xl mb-4"
                >
                  🎉
                </motion.div>
                <h3 className="text-2xl font-bold text-kez-blue dark:text-kez-yellow mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Thank you for contacting us! We'll get back to you soon.
                </p>
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="bg-kez-blue dark:bg-kez-yellow text-white dark:text-kez-dark px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Error Modal */}
      <AnimatePresence>
        {showErrorModal && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setShowErrorModal(false)}
            />
            
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 100 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50
                         bg-white dark:bg-kez-dark rounded-3xl shadow-2xl p-8 max-w-sm w-[90%] mx-auto"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="text-6xl mb-4"
                >
                  😔
                </motion.div>
                <h3 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
                  Oops!
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Something went wrong. Please try again later.
                </p>
                <button
                  onClick={() => setShowErrorModal(false)}
                  className="bg-red-600 dark:bg-red-500 text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}