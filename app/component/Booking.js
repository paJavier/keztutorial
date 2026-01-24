"use client";

import { InlineWidget } from "react-calendly";
import { motion } from "framer-motion";

export default function Booking() {
  return (
    <section className="flex flex-col items-center justify-center space-y-8 py-16 px-4 sm:px-6 md:px-8 lg:px-12 bg-white dark:bg-kez-dark text-kez-dark dark:text-kez-light font-poppins">
      
      {/* Animated Title */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-kez-blue dark:text-kez-yellow flex items-center justify-center space-x-4 text-center"
      >
        <motion.span
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          ⏰
        </motion.span>
        <span>Book Your Trial Class</span>
        <motion.span
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.3 }}
        >
          ⏰
        </motion.span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-lg sm:text-xl md:text-2xl text-center max-w-2xl text-kez-dark dark:text-kez-light"
      >
        Choose your preferred schedule and start a fun learning journey today!
      </motion.p>

      {/* Calendly Widget */}
      <div className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-xl">
        <InlineWidget url="https://calendly.com/kez-tutorial-service" styles={{ height: '700px' }} />
      </div>

      {/* Book Again Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-kez-yellow text-kez-dark font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all"
        onClick={() => window.location.reload()}
      >
        Book Again
      </motion.button>
    </section>
  );
}
