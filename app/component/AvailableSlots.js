"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AvailableSlots() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataSource, setDataSource] = useState('unknown');
  const [eventInfo, setEventInfo] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const slotsPerPage = 6;

  useEffect(() => {
    // Fetch available slots from API
    fetch('/api/bookings')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch available slots');
        return res.json();
      })
      .then(data => {
        setSlots(data.availableSlots || []);
        setDataSource(data.source || 'unknown');
        setEventInfo(data.eventInfo || null);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching slots:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(slots.length / slotsPerPage);
  const startIndex = currentPage * slotsPerPage;
  const endIndex = startIndex + slotsPerPage;
  const currentSlots = slots.slice(startIndex, endIndex);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-kez-blue border-t-transparent"></div>
        <p className="mt-4 text-xl text-kez-dark dark:text-kez-light">Loading available slots...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-kez-light dark:from-kez-dark dark:to-slate-900">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-kez-blue dark:text-kez-yellow">
            📅 {slots.length > 0 && slots[0].day === new Date().toLocaleDateString('en-US', { weekday: 'long' }) 
                ? "Today's Available Slots" 
                : `Available Slots for ${slots[0]?.day || 'This Week'}`}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {slots.length > 0 && slots[0].day === new Date().toLocaleDateString('en-US', { weekday: 'long' })
              ? "Check out our open slots and book your class today!"
              : `Our next available day is ${slots[0]?.day || 'coming soon'}. Book your trial class now!`}
          </p>
          {dataSource === 'calendly-event-type' && eventInfo && (
            <p className="text-sm text-green-600 dark:text-green-400 mt-2">
              ✓ Using real Calendly event data - Duration: {eventInfo.duration} minutes
            </p>
          )}
        </motion.div>

        {/* Slots Count & Page Info */}
        <div className="text-center mb-8">
          <p className="text-lg font-semibold text-kez-blue dark:text-kez-yellow">
            {slots.length} total slot{slots.length !== 1 ? 's' : ''} available
          </p>
          {totalPages > 1 && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Showing {startIndex + 1}-{Math.min(endIndex, slots.length)} of {slots.length} slots
            </p>           
          )}
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 p-4 rounded-r-lg mt-4 max-w-3xl mx-auto">
            <p className="text-sm text-blue-800 dark:text-blue-200 text-center">
              💡 <strong>Note:</strong> These are potential available times based on our schedule. Click <strong>"Book This Slot"</strong> to see real-time availability and confirm your booking instantly through our calendar system.
            </p>
          </div>
        </div>

        {/* Slots Grid with Carousel */}
        {slots.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
              No trial class slots available at the moment.
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              Please check back later or contact us directly!
            </p>
          </div>
        ) : (
          <div className="relative">
            {/* Previous Button */}
            {currentPage > 0 && (
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-kez-blue dark:bg-kez-yellow text-white dark:text-kez-dark rounded-full p-3 shadow-lg hover:scale-110 transition-transform -ml-4 md:-ml-6"
                aria-label="Previous slots"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Slots Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {currentSlots.map((slot, idx) => (
                  <motion.div
                    key={slot.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-white dark:bg-kez-dark rounded-2xl p-6 shadow-lg border-2 border-green-300 dark:border-green-600 hover:shadow-2xl transition-all"
                  >
                    {/* Status Badge */}
                    <div className="flex justify-between items-start mb-4">
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-bold uppercase">
                        ✓ Available
                      </span>
                      <span className="text-2xl">🎈</span>
                    </div>

                    {/* Date & Day */}
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-kez-blue dark:text-kez-yellow mb-1">
                        {slot.day}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 font-medium">
                        {slot.date}
                      </p>
                    </div>

                    {/* Time */}
                    <div className="flex items-center gap-2 mb-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
                      <span>⏰</span>
                      <span>{slot.time}</span>
                    </div>

                    {/* Class Type */}
                    <div className="mb-4">
                      <span className="inline-block px-4 py-2 bg-kez-yellow/20 dark:bg-kez-yellow/30 text-kez-dark dark:text-kez-yellow rounded-full text-sm font-semibold">
                        {slot.type}
                      </span>
                    </div>

                    {/* Book Now Button */}
                    <motion.a
                      href="#booking"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="block w-full text-center bg-kez-blue dark:bg-kez-yellow text-white dark:text-kez-dark font-bold py-3 rounded-full shadow-md hover:shadow-xl transition-all"
                    >
                      Book This Slot
                    </motion.a>                  
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Next Button */}
            {currentPage < totalPages - 1 && (
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-kez-blue dark:bg-kez-yellow text-white dark:text-kez-dark rounded-full p-3 shadow-lg hover:scale-110 transition-transform -mr-4 md:-mr-6"
                aria-label="Next slots"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Page Indicators (Dots) */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentPage
                    ? "bg-kez-blue dark:bg-kez-yellow w-8"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
                }`}
                aria-label={`Go to page ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Don't see a time that works? Contact us for custom scheduling!
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-kez-yellow dark:bg-kez-blue text-kez-dark dark:text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all"
          >
            Request Custom Time
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}