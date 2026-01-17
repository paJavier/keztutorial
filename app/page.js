"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  // Theme state
  const [darkMode, setDarkMode] = useState(false);

  // Mobile menu state
  const [menuOpen, setMenuOpen] = useState(false); 
  // Persist theme in localStorage
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };


  // Cloud Component
  const Cloud = ({ delay, scale = 0.5 }) => (
    <motion.div
      className="absolute w-[200%] -top-[20px] left-0 z-40 pointer-events-none"
      animate={{ x: ["-50%", "0%"] }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        duration: 20,
        ease: "linear",
        delay: delay || 0
      }}

      style = {{scale}}
    >
      <Image
        src="/images/cloud.png"
        alt="Cloud"
        width={1920}
        height={400}
        className="object-contain w-full h-full opacity-20"
        priority
      />
    </motion.div>
  );

  return (
    <main className="bg-kez-light dark:bg-kez-dark text-kez-dark dark:text-kez-light relative overflow-hidden font-poppins">

    {/* NAVBAR */}
    <nav className="fixed top-0 w-full bg-kez-blue dark:bg-kez-dark text-white z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo + Title */}
        <div className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Kez Logo"
            width={50}
            height={50}
            className="mr-3"
          />
          <h1 className="font-extrabold text-xl">Kez Tutorial Services</h1>
        </div>

        {/* Desktop Links + Toggle */}
        <div className="hidden md:flex items-center space-x-6 font-semibold">
          <a href="#home" className="hover:text-kez-yellow dark:hover:text-kez-yellow transition-colors">Home</a>
          <a href="#about" className="hover:text-kez-yellow dark:hover:text-kez-yellow transition-colors">About</a>
          <a href="#programs" className="hover:text-kez-yellow dark:hover:text-kez-yellow transition-colors">Programs</a>
          <a href="#pricing" className="hover:text-kez-yellow dark:hover:text-kez-yellow transition-colors">Pricing</a>
          <a href="#contact" className="hover:text-kez-yellow dark:hover:text-kez-yellow transition-colors">Contact</a>

          {/* Dark/Light Toggle */}
          <button
            onClick={toggleTheme}
            className="bg-kez-yellow dark:bg-kez-blue text-kez-dark dark:text-kez-light p-2 rounded-full shadow-md hover:scale-105 transition-transform"
          >
            {darkMode ? "🌞" : "🌙"}
          </button>
        </div>

        {/* Burger Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          {/* Dark/Light Toggle on mobile */}
          <button
            onClick={toggleTheme}
            className="bg-kez-yellow dark:bg-kez-blue text-kez-dark dark:text-kez-light p-2 rounded-full shadow-md hover:scale-105 transition-transform"
          >
            {darkMode ? "🌞" : "🌙"}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none p-2 rounded-md bg-kez-yellow dark:bg-kez-blue text-kez-dark dark:text-kez-light"
          >
            {menuOpen ? "✖️" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden bg-kez-blue dark:bg-kez-dark/95 text-white font-semibold flex flex-col items-center space-y-4 py-4"
        >
          <a href="#home" className="hover:text-kez-yellow dark:hover:text-kez-yellow transition-colors">Home</a>
          <a href="#about" className="hover:text-kez-yellow dark:hover:text-kez-yellow transition-colors">About</a>
          <a href="#programs" className="hover:text-kez-yellow dark:hover:text-kez-yellow transition-colors">Programs</a>
          <a href="#pricing" className="hover:text-kez-yellow dark:hover:text-kez-yellow transition-colors">Pricing</a>
          <a href="#contact" className="hover:text-kez-yellow dark:hover:text-kez-yellow transition-colors">Contact</a>
        </motion.div>
      )}
    </nav>

      {/* HERO */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col items-center justify-center pt-28 px-4 sm:px-6 md:px-8 lg:px-12 bg-kez-light dark:bg-kez-dark text-kez-dark dark:text-kez-light overflow-hidden"
      >
        {/* Mascot */}
        <motion.div
          animate={{ y: [0, -30, 0], rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="z-10 flex justify-center items-center"
        >
          <Image
            src="/images/mascot.png"
            alt="Kez Kids Mascot"
            width={600}
            height={600}
            priority
          />
        </motion.div>

        {/* Hero Text */}
        <div className="text-center max-w-3xl z-10">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-kez-blue dark:text-kez-yellow">
            Fun English Lessons for Kids 🎈
          </h2>
          <p className="text-lg sm:text-xl mb-8">
            Learning English through games, stories, and smiles! 🌟
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-kez-yellow dark:bg-kez-blue text-kez-dark dark:text-kez-light px-8 py-4 rounded-full font-bold inline-block shadow-lg hover:shadow-2xl transition-all"
          >
            Book a Free Trial Class
          </motion.a>
        </div>

        {/* Cloud bridging Hero → About */}
        <Cloud delay={0} />
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 bg-white overflow-hidden space-y-12"
      >
        {/* Heading & Description */}
        <div className="max-w-3xl text-center space-y-4 ">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-kez-blue mt-20">
            Why Parents Choose Kez Tutorial Sevices 💙
          </h2>
          <p className="text-lg sm:text-xl text-kez-dark">
            Fun, safe, and interactive English lessons designed especially for children. 🧸
          </p>
        </div>

        {/* Trial Class Video */}
        <div className="w-full max-w-4xl rounded-3xl overflow-hidden shadow-lg">
          <video
            src="/videos/aboutvid.mp4"
            controls
            autoPlay={false}
            className="w-full h-auto rounded-3xl"
          />
        </div>

        <p className="text-center max-w-3xl text-gray-700 text-base sm:text-lg mt-4">
        Kids have fun learning English with stories, games, and interactive lessons. 🌟
        </p>


        {/* Pictures Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-5xl">
          {["ads1.png", "ads2.png", "ads3.png"].map((img, idx) => (
            <div key={idx} className="overflow-hidden rounded-2xl shadow-md">
              <Image
                src={`/images/${img}`}
                alt={`Trial Class ${idx + 1}`}
                width={300}
                height={200}
                className="object-cover w-full h-48 sm:h-56 md:h-64 hover:scale-105 transition-transform"
              />
            </div>
          ))}
        </div>

      {/* Cloud bridging About → Programs */}
        <Cloud delay={2} />
      </section>

      {/* PROGRAMS */}
      <section
        id="programs"
        className="relative min-h-screen bg-kez-light flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-12 overflow-hidden"
      >
        <div className="max-w-5xl w-full text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-10 text-kez-blue">
            Our Kids Programs 🧸
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Individual Classes */}
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer"
            >
              <Image
                src="/images/individual.jpg"
                alt="Individual Class"
                width={600}
                height={400}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2 text-kez-blue">Individual Classes</h3>
                <p className="text-kez-dark mb-2">
                  One-on-one sessions tailored to your child’s pace. Perfect for focused learning and personal attention.
                </p>
                <ul className="list-disc list-inside text-kez-dark text-sm">
                  <li>Age 4–12</li>
                  <li>25–30 mins per session</li>
                  <li>Customized lessons & games</li>
                </ul>
              </div>
            </motion.div>

            {/* Group Classes */}
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer"
            >
              <Image
                src="/images/group.jpg"
                alt="Group Class"
                width={600}
                height={400}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2 text-kez-blue">Group Classes</h3>
                <p className="text-kez-dark mb-2">
                  Fun peer-learning environment with small groups. Encourages interaction, speaking, and teamwork.
                </p>
                <ul className="list-disc list-inside text-kez-dark text-sm">
                  <li>Age 4–12</li>
                  <li>4–6 students per class</li>
                  <li>Games, stories, and interactive activities</li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Cloud bridging Programs → Pricing */}
          <Cloud delay={4} />
        </div>
      </section>


      {/* PRICING */}
      <section
        id="pricing"
        className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-12 bg-white dark:bg-kez-dark text-kez-dark dark:text-kez-light overflow-hidden"
      >
        <div className="max-w-6xl w-full text-center">
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl font-extrabold mb-10 text-kez-blue dark:text-kez-yellow"
          >
            Pricing & Packages 💰
          </motion.h2>

          {/* Platform info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-10 p-6 bg-kez-blue/20 dark:bg-kez-yellow/20 rounded-3xl shadow-lg max-w-3xl mx-auto text-lg sm:text-xl"
          >
            <p>
              <span className="font-bold">Platform:</span> ClassIn App | 
              <span className="font-bold"> Duration:</span> 25-30 mins per class | 
              <span className="font-bold"> Type:</span> One-on-One / Peer Learning | 
              <span className="font-bold"> Payment:</span> Line
            </p>
          </motion.div>

          {/* Pricing grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: "Free Trial", price: "1 class", cost: "Free (~1.85 PHP)", peer: "" },
              { title: "1 Class", price: "243 TWD", peer: "Peer Learning: 364.50 TWD" },
              { title: "10 Classes", price: "2,600 TWD", peer: "Includes 2 free classes / Peer Learning: 3,900 TWD" },
              { title: "15 Classes", price: "4,000 TWD", peer: "Includes 4 free classes / Peer Learning: 6,000 TWD" },
              { title: "25 Classes", price: "6,765 TWD", peer: "Includes 8 free classes / Peer Learning: 10,147.5 TWD" },
              { title: "50 Classes", price: "13,000 TWD", peer: "Includes 15 free classes / Peer Learning: 19,500 TWD" },
              { title: "100 Classes", price: "25,350 TWD", peer: "Includes 30 free classes / Peer Learning: 38,025 TWD" },
              { title: "150 Classes", price: "37,750 TWD", peer: "Includes 50 free classes / Peer Learning: 56,625 TWD" },
            ].map((pkg, idx) => (
              <motion.div
                key={pkg.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 * (idx + 1) }}
                className={`border-4 rounded-3xl p-6 ${idx % 2 === 0 ? "bg-kez-yellow/20 border-kez-yellow" : "bg-kez-blue/10 border-kez-blue"} shadow-md hover:shadow-2xl transition-shadow`}
              >
                <h3 className="font-bold text-xl mb-2">{pkg.title}</h3>
                <p className="text-2xl font-extrabold mb-2">{pkg.price}</p>
                {pkg.cost && <p className="text-kez-blue mb-2">{pkg.cost}</p>}
                {pkg.peer && <p className="text-kez-blue mb-2">{pkg.peer}</p>}
              </motion.div>
            ))}
          </div>

          {/* Notes / Advantages */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-10 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 p-4"
          >
            {[
              { text: "Diagnostic test for first-time enrollees to determine level.", emoji: "📝" },
              { text: "Evaluation conducted after each class to track learning progress.", emoji: "📊" },
              { text: "Review conducted before new lessons.", emoji: "🔄" },
              { text: "No unit exam & assignments; learning is applied practically.", emoji: "🎯" },
              { text: "Study guides: free worksheets, flashcards, and materials if needed.", emoji: "📚" },
              { text: "Flexible topics, micro/macro skills, free rescheduling, feedback from parents encouraged.", emoji: "💡" },
            ].map((note, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                whileHover={{ scale: 1.05, backgroundColor: "#FACC15", color: "#0F172A" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * idx }}
                className="flex items-start gap-3 p-4 bg-kez-light/50 dark:bg-kez-dark/30 rounded-3xl shadow-md cursor-pointer hover:shadow-xl transition-all"
              >
                <span className="text-2xl">{note.emoji}</span>
                <p className="text-gray-700 dark:text-gray-200 font-medium">{note.text}</p>
              </motion.div>
            ))}
          </motion.div>


          {/* Cloud bridging Pricing → Contact */}
          <Cloud delay={6} />
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-12 bg-kez-yellow dark:bg-kez-blue text-kez-dark dark:text-kez-light overflow-hidden"
      >
        <div className="bg-white dark:bg-kez-dark p-8 rounded-3xl shadow-xl w-full max-w-md text-center">
          <h2 className="text-2xl font-extrabold mb-6 text-kez-blue dark:text-kez-yellow">
            Contact Us 📩
          </h2>

          {/* QR Codes */}
          <div className="flex justify-center gap-6 mb-6">
            <div className="flex flex-col items-center">
              <Image
                src="/images/lineqr.jpg"
                alt="Line QR"
                width={96}
                height={96}
                className="rounded-xl shadow-md"
              />
              <span className="mt-2 font-medium">Line</span>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/images/wechatqr.jpg"
                alt="WeChat QR"
                width={96}
                height={96}
                className="rounded-xl shadow-md"
              />
              <span className="mt-2 font-medium">WeChat</span>
            </div>
          </div>

          <form className="flex flex-col gap-4">
            <input className="border p-3 rounded-lg" placeholder="Parent's Name" />
            <input className="border p-3 rounded-lg" placeholder="Email Address" />
            <textarea className="border p-3 rounded-lg" rows={4} placeholder="Child's age & message" />
            <button className="bg-kez-blue dark:bg-kez-yellow text-white dark:text-kez-dark py-3 rounded-full font-bold hover:bg-kez-dark dark:hover:bg-kez-blue transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </section>

    </main>
  );
}
