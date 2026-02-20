"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ContactForm from "./component/ContactForm";
import VideoCarousel from "./component/VideoCarousel";
import Booking from "./component/Booking";
import ImageModal from "./component/ImageModal";
import Modal from "react-modal";  
import AvailableSlots from "./component/AvailableSlots";




export default function Home() {
  
const [darkMode, setDarkMode] = useState(false); // Theme state

const [certModalOpen, setCertModalOpen] = useState(false);
const [currentCertIdx, setCurrentCertIdx] = useState(0);

  // Certificates for teacher
  const certificates = [
    "/images/cert1.png",
    "/images/cert2.png",
    "/images/cert3.png",
    "/images/cert4.png",
    "/images/cert5.png",
    "/images/cert6.png",
    "/images/cert7.png",
    "/images/cert8.png",
    "/images/cert9.png",
    "/images/cert10.png",
    "/images/cert11.png",
    "/images/cert12.png",

  ];

  const images = [
    "/images/ads1.png",
    "/images/ads2.png",
    "/images/ads3.png",
    "/images/ads4.png"
  ];

const modalRef = useRef(null);
useEffect(() => {
  const handleClickOutside = (event) => {
    if (certModalOpen && modalRef.current && !modalRef.current.contains(event.target)) {
      setCertModalOpen(false);
    }
  };

  if (certModalOpen) {
    document.addEventListener("mousedown", handleClickOutside);
  } else {
    document.removeEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [certModalOpen]);


const [menuOpen, setMenuOpen] = useState(false);
const menuRef = useRef(null); 

useEffect(() => {
const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  if (menuOpen) {
    document.addEventListener("mousedown", handleClickOutside);
  } else {
    document.removeEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [menuOpen]);

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

  const Stars = () => {
  const starCount = 80;

    return (
      <div className="absolute inset-0 pointer-events-none z-10">
        {[...Array(starCount)].map((_, i) => {
          const size = 2 + Math.random() * 4; // size between 1-3px
          const top = Math.random() * 100;
          const left = Math.random() * 100;
          const duration = 1.5 + Math.random() * 2; // twinkle speed
          const delay = Math.random() * 2;

          return (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${top}%`,
                left: `${left}%`,
                opacity: 0.6 + Math.random() * 0.4, // random opacity
              }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
              }}
            />
          );
        })}
      </div>
    );
  };


  const [currency, setCurrency] = useState("TWD");

  // Pricing data in PH Peso
  const pricing = [
    { title: "Free Trial", price: 1 },
    { title: "1 Class", price: 450.43, peer: 675.75 },
    { title: "10 Classes", price: 4822.03, peer: 7233.05 },
    { title: "15 Classes", price: 7325.78, peer: 10988.65 },
    { title: "25 Classes", price: 12240.55, peer: 18360.825 },
    { title: "50 Classes", price: 24110.17, peer: 36165.25 },
    { title: "100 Classes", price: 47014.83, peer: 70522.245 },
    { title: "150 Classes", price: 70000.00, peer: 105000.00 },
  ];

  const conversionRates = {
    TWD:0.54,
    JPY: 2.67,
    CNY: 0.12,
  };

  // Function to format numbers with currency
  const formatPrice = (amount) => {
    let symbol = "";
    if (currency === "TWD") symbol = "TWD";
    if (currency === "JPY") symbol = "¥";
    if (currency === "CNY") symbol = "¥";
    return `${symbol} ${Math.round(amount * conversionRates[currency]).toLocaleString()}`;
  };


  return (
  <main className="bg-kez-light dark:bg-kez-dark text-kez-dark dark:text-kez-light relative overflow-hidden font-poppins">
    {darkMode && <Stars />}

    {/* NAVBAR */}
    <nav className="fixed top-0 w-full h-16 bg-kez-blue dark:bg-kez-dark text-white z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 h-full">
        {/* Logo + Title */}
        <div className="flex items-center h-full">
          <div className="h-full flex items-center">
            <Image
              src="/images/logo.png"
              alt="Kez Logo"
              width={90}
              height={90}
              className="h-full w-auto object-contain scale-125"
              priority
            />
          </div>

          <h1 className="ml-3 font-extrabold text-xl whitespace-nowrap">
            Kez Tutorial Services
          </h1>
        </div>

        {/* Desktop Links + Toggle */}
        <div className="hidden md:flex items-center space-x-6 font-semibold">
          <a href="#home" className="hover:text-kez-yellow dark:hover:text-kez-yellow transition-colors">Home</a>
          <a href="#about" className="hover:text-kez-yellow dark:hover:text-kez-yellow transition-colors">About</a>
          <a href="#programs" className="hover:text-kez-yellow dark:hover:text-kez-yellow transition-colors">Programs</a>
          <a href="#pricing" className="hover:text-kez-yellow dark:hover:text-kez-yellow transition-colors">Packages</a>
          <a href="#booking" className="hover:text-kez-yellow dark:hover:text-kez-yellow transition-colors">Booking</a>
          <a href="#contact" className="hover:text-kez-yellow dark:hover:text-kez-yellow transition-colors">Contact</a>

          {/* Dark/Light Toggle */}
          <button
            onClick={toggleTheme}
            className="bg-kez-light dark:bg-kez-blue text-kez-dark dark:text-kez-light p-2 rounded-full shadow-md hover:scale-105 transition-transform"
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
          ref={menuRef}   
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden bg-kez-blue dark:bg-kez-dark/95 text-white font-semibold flex flex-col items-center space-y-4 py-4"
        >
          <a href="#home" onClick={() => setMenuOpen(false)} className="hover:text-kez-yellow dark:hover:text-kez-yellow transition-colors">Home</a>
          <a href="#about" onClick={() => setMenuOpen(false)} className="hover:text-kez-yellow dark:hover:text-kez-yellow transition-colors">About</a>
          <a href="#programs" onClick={() => setMenuOpen(false)} className="hover:text-kez-yellow dark:hover:text-kez-yellow transition-colors">Programs</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)} className="hover:text-kez-yellow dark:hover:text-kez-yellow transition-colors">Pricing</a>
          <a href="#booking" onClick={() => setMenuOpen(false)} className="hover:text-kez-yellow dark:hover:text-kez-yellow transition-colors">Booking</a>          
          <a href="#contact" onClick={() => setMenuOpen(false)} className="hover:text-kez-yellow dark:hover:text-kez-yellow transition-colors">Contact</a>
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
            href="#booking"
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
          className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12
                    bg-white dark:bg-kez-dark text-kez-dark dark:text-kez-light overflow-hidden"
      >
          {/* Heading & Description */}
          <div className="max-w-3xl text-center space-y-4 ">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-kez-blue mt-20">
              Why Parents Choose Kez Tutorial Sevices 💙
            </h2>
          </div>

          <VideoCarousel />
          <ImageModal images={images} />
          {/* Cloud bridging About → Programs */}
          <Cloud delay={2} />
      </section>

      {/* ABOUT TEACHER */}

      <section
        id="about-teacher"
        className="relative min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 py-12 bg-white dark:bg-kez-dark flex items-center justify-center overflow-hidden"
      >
        {/* Main Grid */}
        <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full">
          {/* Left: Certificates */}
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-3xl font-extrabold mb-6 text-kez-blue dark:text-kez-yellow text-center">
              Certificates 🎓
            </h2>

            <div className="relative w-full sm:w-4/5 max-w-md">
              <button
                onClick={() =>
                  setCurrentCertIdx((currentCertIdx - 1 + certificates.length) % certificates.length)
                }
                className="absolute left-0 top-1/2 transform -translate-y-1/2 text-4xl font-bold bg-black bg-opacity-30 text-white rounded-full p-3 hover:bg-opacity-50 z-10"
              >
                &#8249;
              </button>

              <div
                className="cursor-pointer rounded-2xl overflow-hidden shadow-xl"
                onClick={() => setCertModalOpen(true)}
              >
                <Image
                  src={certificates[currentCertIdx]}
                  alt={`Certificate ${currentCertIdx + 1}`}
                  width={800}
                  height={600}
                  className="object-contain w-full h-[500px] sm:h-[600px] md:h-[700px] bg-white"
                />
              </div>

              <button
                onClick={() =>
                  setCurrentCertIdx((currentCertIdx + 1) % certificates.length)
                }
                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-4xl font-bold bg-black bg-opacity-30 text-white rounded-full p-3 hover:bg-opacity-50 z-10"
              >
                &#8250;
              </button>
            </div>

            <div className="flex justify-center mt-4 space-x-2">
              {certificates.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-4 h-4 rounded-full ${
                    idx === currentCertIdx ? "bg-kez-blue" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right: Teacher Info */}
          <div className="flex flex-col justify-center items-center gap-6 h-full">
            {/* Profile Picture */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="mb-4"
            >
              <Image
                src="/images/prof.jpg"
                alt="Laurens Pieter Jakobus G. Nobels"
                width={250}
                height={250}
                className="rounded-full shadow-2xl border-4 border-kez-blue dark:border-kez-yellow object-cover"
              />
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-2 max-w-md"
            >
              <h3 className="text-3xl font-extrabold text-kez-blue dark:text-kez-yellow">
                Laurens Pieter Jakobus G. Nobels
              </h3>
              <p className="text-lg font-semibold text-kez-dark dark:text-kez-light">
                Bachelor of Education, Major in English
              </p>
              <p className="text-lg text-kez-dark dark:text-kez-light">
                Ateneo de Davao University
              </p>
              <p className="text-lg text-kez-dark dark:text-kez-light">
                6 years of teaching experience
              </p>
            </motion.div>
          </div>
        </div>

        {/* Certificate Modal */}
        <Modal
          isOpen={certModalOpen}
          onRequestClose={() => setCertModalOpen(false)}
          className="fixed inset-0 flex items-start md:items-center justify-center outline-none z-50 pt-16 md:pt-0"
          overlayClassName="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-40"
          ariaHideApp={false}
        >
          <div
          ref={modalRef} 
          className="relative w-full max-w-5xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl flex flex-col items-center p-6
                          max-h-[95vh] md:max-h-[95vh] overflow-auto">
            
            {/* Header */}
            <div className="w-full flex justify-between items-center mb-4 flex-shrink-0">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">
                Certificate {currentCertIdx + 1} of {certificates.length}
              </h2>
              <button
                onClick={() => setCertModalOpen(false)}
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white text-3xl font-bold transition"
              >
                &times;
              </button>
            </div>

            {/* Image + Arrows */}
            <div className="relative w-full flex-1 flex items-center justify-center">

              {/* Left Arrow */}
              <button
                onClick={() =>
                  setCurrentCertIdx((currentCertIdx - 1 + certificates.length) % certificates.length)
                }
                className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 hover:bg-opacity-70 text-white text-4xl md:text-5xl rounded-full p-3 md:p-4 transition z-50"
              >
                &#8249;
              </button>

              {/* Certificate Image Wrapper */}
              <div className="relative w-auto max-w-[90%] flex items-center justify-center rounded-2xl shadow-xl ring-4 ring-blue-400/70 hover:ring-blue-500/90">
                <Image
                  src={certificates[currentCertIdx]}
                  alt={`Certificate ${currentCertIdx + 1}`}
                  width={1200}
                  height={1600}
                  className="object-contain max-h-[85vh] md:max-h-[90vh]"
                />
              </div>

              {/* Right Arrow */}
              <button
                onClick={() =>
                  setCurrentCertIdx((currentCertIdx + 1) % certificates.length)
                }
                className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 hover:bg-opacity-70 text-white text-4xl md:text-5xl rounded-full p-3 md:p-4 transition z-50"
              >
                &#8250;
              </button>

            </div>
          </div>
        </Modal>
      </section>


      <section
        id="programs"
        className="relative min-h-screen
                  bg-gradient-to-b from-kez-light to-white
                  dark:from-kez-dark dark:to-slate-900
                  text-kez-dark dark:text-kez-light
                  flex flex-col items-center justify-center ..."
              >
        <div className="max-w-6xl w-full text-center">

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-extrabold mb-14 text-kez-blue mt-4"
          >
            Our Programs 🧸
          </motion.h2>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

            {/* Individual Classes */}
            <motion.div
              whileHover={{ y: -12, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 250 }}
              className="bg-white rounded-[2rem] shadow-lg hover:shadow-2xl overflow-hidden transition-all"
            >
              <div className="relative h-64">
                <Image
                  src="/images/individual.jpg"
                  alt="Individual Class"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-8 text-left">
                <h3 className="font-bold text-2xl mb-3 text-kez-blue">
                  Individual Classes
                </h3>

                <p className="text-kez-dark mb-5 leading-relaxed">
                  One-on-one sessions designed to match your child’s learning pace,
                  building confidence through personalized guidance.
                </p>

                <div className="space-y-2 text-sm text-kez-dark">
                  <p>👶 <span className="font-medium">Ages:</span> 4–12</p>
                  <p>⏱ <span className="font-medium">Duration:</span> 25–30 mins</p>
                  <p>🎯 <span className="font-medium">Focus:</span> Customized lessons & games</p>
                </div>
              </div>
            </motion.div>

            {/* Group Classes */}
            <motion.div
              whileHover={{ y: -12, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 250 }}
              className="bg-white rounded-[2rem] shadow-lg hover:shadow-2xl overflow-hidden transition-all"
            >
              <div className="relative h-64">
                <Image
                  src="/images/group.jpg"
                  alt="Group Class"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-8 text-left">
                <h3 className="font-bold text-2xl mb-3 text-kez-blue">
                  Group Classes
                </h3>

                <p className="text-kez-dark mb-5 leading-relaxed">
                  Small-group peer learning that encourages speaking, collaboration,
                  and confidence in a fun social environment.
                </p>

                <div className="space-y-2 text-sm text-kez-dark">
                  <p>👶 <span className="font-medium">Ages:</span> 4–12</p>
                  <p>👥 <span className="font-medium">Class size:</span> 4–6 students</p>
                  <p>🎲 <span className="font-medium">Activities:</span> Games, stories & interaction</p>
                </div>
              </div>
            </motion.div>

          </div>
          {/* Kahoot Games Card */}
          <div className="w-full max-w-6xl bg-white dark:bg-kez-dark rounded-3xl shadow-xl p-6 mt-8 flex flex-col md:flex-row items-center gap-6">
            {/* Left: Image / Screenshot */}
            <div className="w-full md:w-1/2">
              <Image
                src="/images/kahoot.png"
                alt="Kahoot Games"
                width={600}
                height={400}
                className="w-full h-auto rounded-2xl shadow-md"
              />
            </div>

            {/* Right: Text Content */}
            <div className="w-full md:w-1/2 flex flex-col justify-center gap-4">
              <h3 className="text-2xl font-extrabold text-kez-blue dark:text-kez-yellow">
                Fun & Interactive Kahoot Games 🎮
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Engage your child in educational games using Kahoot! Reinforce lessons, practice concepts, and compete with classmates in a fun, interactive way.
              </p>
              <a
                href="https://create.kahoot.it/profiles/9c87ce5c-1693-4016-964f-80c104a6cf71"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block px-6 py-3 bg-kez-blue text-white rounded-full hover:bg-kez-dark transition"
              >
                Play Now
              </a>
            </div>
          </div>

          {/* Cloud bridging Programs → Pricing */}
          <Cloud delay={4} />
        </div>
      </section>


      {/* PRICING */}
      <section
        id="pricing"
        className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-12
                  bg-white dark:bg-kez-dark text-kez-dark dark:text-kez-light overflow-hidden"
      >
        <div className="max-w-6xl w-full text-center">

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl font-extrabold mb-10
                      text-kez-blue dark:text-kez-yellow"
          >
            Pricing & Packages 💰
          </motion.h2>

          {/* Platform info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-10 p-6 rounded-3xl shadow-lg max-w-3xl mx-auto text-lg sm:text-xl
                      bg-kez-blue/20 dark:bg-kez-yellow/20"
          >
            <p>
              <span className="font-bold">Platform:</span> ClassIn App |{" "}
              <span className="font-bold">Duration:</span> 25–30 mins |{" "}
              <span className="font-bold">Type:</span> One-on-One / Peer Learning |{" "}
              <span className="font-bold">Payment:</span> Line
            </p>
          </motion.div>

        {/* Currency Buttons */}
        <div className="flex justify-center gap-4 mb-10">
          {["TWD", "JPY", "CNY"].map((cur) => (
            <button
              key={cur}
              onClick={() => setCurrency(cur)}
              className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                currency === cur
                  ? "bg-kez-blue dark:bg-kez-yellow text-white dark:text-kez-dark"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-kez-blue hover:text-white dark:hover:bg-kez-yellow dark:hover:text-kez-dark"
              }`}
            >
              {cur}
            </button>
          ))}
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {pricing.map((pkg, idx) => (
            <motion.div
              key={pkg.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 * idx }}
              className={`border-4 rounded-3xl p-6 shadow-md hover:shadow-2xl transition-shadow ${
                idx % 2 === 0
                  ? "border-kez-yellow bg-kez-yellow/20 dark:bg-kez-yellow/10"
                  : "border-kez-blue bg-kez-blue/10 dark:bg-blue-500/10"
              }`}
            >
              <h3 className="font-bold text-xl mb-2 text-kez-blue dark:text-kez-yellow">
                {pkg.title}
              </h3>
              <p className="text-2xl font-extrabold mb-2 text-kez-blue dark:text-blue-200">
                {pkg.title === "Free Trial" ? "0" : formatPrice(pkg.price)}
              </p>
              {pkg.peer && (
                <p className="mb-2 text-kez-blue dark:text-blue-300">
                  Peer: {pkg.title === "Free Trial" ? "0" : formatPrice(pkg.peer)}
                </p>
              )}
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


         
          <Cloud delay={6} />
        </div>
      </section>

      {/* REFERRAL PRIVILEGE PROGRAM */}
      <section
        id="referral"
        className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-12 bg-kez-light dark:bg-kez-dark text-kez-dark dark:text-kez-light overflow-hidden"
      >
        <div className="max-w-5xl w-full text-center">
          {/* Section Title */}
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl font-extrabold mb-8 text-kez-blue dark:text-kez-yellow"
          >
            Referral Privilege Program 🎁
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl mb-12 max-w-3xl mx-auto"
          >
            Referral Guide: Invite families who are new to Kez Tutorial Service and unlock exclusive class privileges. Complimentary classes will be added to your accumulated lessons as a reward for your trust and support.
          </motion.p>

          {/* Tiers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { tier: "Tier I – Silver Access", description: "Refer 1 student (any 6-month plan) - 8 complimentary fixed classes", color: "bg-kez-yellow/20 dark:bg-kez-yellow/10 border-kez-yellow" },
              { tier: "Tier II – Gold Access", description: "Refer 1 student (any 12-month plan) - 16 complimentary fixed classes", color: "bg-kez-blue/10 dark:bg-kez-blue/20 border-kez-blue" },
              { tier: "Tier III – Platinum Access", description: "Refer 2 students (any 12-month plan) - 32 complimentary fixed classes", color: "bg-kez-yellow/20 dark:bg-kez-yellow/10 border-kez-yellow" },
              { tier: "Tier IV – Diamond Access", description: "Refer 3–4 students (any 12-month plan) - 40 complimentary fixed classes", color: "bg-kez-blue/10 dark:bg-kez-blue/20 border-kez-blue" },
              { tier: "Tier V – Royal Ambassador", description: "Refer 5 students (any 12-month plan) - 48 complimentary fixed classes", color: "bg-kez-yellow/20 dark:bg-kez-yellow/10 border-kez-yellow" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 * idx }}
                className={`border-4 rounded-3xl p-6 shadow-md hover:shadow-2xl transition-shadow ${item.color}`}
              >
                <h3 className="font-bold text-xl mb-2 text-kez-blue dark:text-kez-yellow">
                  {item.tier}
                </h3>
                <p className="text-kez-dark dark:text-kez-light">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Long-Term Reward */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 text-lg sm:text-xl max-w-3xl mx-auto font-semibold text-kez-blue dark:text-kez-yellow"
          >
          </motion.p>
        </div>
       {/* Optional Clouds or Mascot */}
        <Cloud delay={1} scale={0.6} />
      </section>

      {/* REWARD TIERS & PRIVILEGES */}
      <section
        id="reward-tiers"
        className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-12 bg-kez-light dark:bg-kez-dark text-kez-dark dark:text-kez-light overflow-hidden"
      >
        <div className="max-w-5xl w-full text-center">
          {/* Section Title */}
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl font-extrabold mb-8 text-kez-blue dark:text-kez-yellow"
          >
            Reward Tiers & Privileges 🏆
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl mb-12 max-w-3xl mx-auto"
          >
            This program is our way of honoring families who grow with us and trust Kez Tutorial Service in their child’s long-term learning journey.
          </motion.p>

          {/* Tiers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { level: "Level I", requirement: "Accumulate 90 classes or more", benefit: "10% discount on your next purchase", color: "bg-kez-yellow/20 dark:bg-kez-yellow/10 border-kez-yellow" },
              { level: "Level II", requirement: "Accumulate 180 classes or more", benefit: "15% discount on your next purchase", color: "bg-kez-blue/10 dark:bg-kez-blue/20 border-kez-blue" },
              { level: "Level III", requirement: "Accumulate 280 classes or more", benefit: "20% discount on your next purchase", color: "bg-kez-yellow/20 dark:bg-kez-yellow/10 border-kez-yellow" },
              { level: "Level IV", requirement: "Accumulate 380 classes or more", benefit: "25% discount on your next purchase", color: "bg-kez-blue/10 dark:bg-kez-blue/20 border-kez-blue" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 * idx }}
                className={`border-4 rounded-3xl p-6 shadow-md hover:shadow-2xl transition-shadow ${item.color}`}
              >
                <h3 className="font-bold text-xl mb-2 text-kez-blue dark:text-kez-yellow">
                  {item.level}
                </h3>
                <p className="text-kez-dark dark:text-kez-light font-semibold">{item.requirement}</p>
                <p className="text-kez-dark dark:text-kez-light">{item.benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      <Cloud delay={1} scale={0.6} />
      </section>

     
     {/* BOOKING */}
        <section
          id="booking"
          className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-16
                    bg-white dark:bg-kez-dark text-kez-dark dark:text-kez-light overflow-hidden"
        >
          <div className="max-w-6xl w-full">
            <Booking />
          </div>

          {/* Cloud bridging Booking → Contact */}
          <Cloud delay={8} />
        </section>

      <AvailableSlots />
      
      {/* CONTACT */}
      <section
        id="contact"
        className="relative min-h-screen overflow-visible px-4 sm:px-6 md:px-8 lg:px-12 py-12 bg-kez-yellow dark:bg-kez-dark flex items-center justify-center"
      >
        {/* Top-right Mascot */}
        <motion.div
          className="absolute top-6 right-6 z-20 pointer-events-none"
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          <Image
            src="/images/mascot2.png"
            alt="Contact Mascot"
            width={220}
            height={220}
            className="w-32 sm:w-40 md:w-48 h-auto"
            priority
          />
        </motion.div>

        {/* Background playful shapes */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-kez-blue/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-kez-yellow/20 rounded-full animate-pulse"></div>
        </div>

        <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left: QR Codes + Info */}
          <div className="flex flex-col items-center md:items-start gap-8">
            <h2 className="text-3xl font-extrabold mb-4 text-kez-blue dark:text-kez-yellow text-center md:text-left">
              Scan & Connect 📲
            </h2>
            <p className="text-kez-dark dark:text-kez-light text-center md:text-left mb-4">
              Add us on Line or WeChat to book a trial class instantly!
            </p>

            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-8">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 250 }}
                className="flex flex-col items-center"
              >
                <Image
                  src="/images/lineqr.jpg"
                  alt="Line QR"
                  width={140}
                  height={140}
                  className="rounded-xl shadow-lg"
                />
                <span className="mt-2 font-medium">Line</span>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: "spring", stiffness: 250 }}
                className="flex flex-col items-center"
              >
                <Image
                  src="/images/wechatqr.jpg"
                  alt="WeChat QR"
                  width={140}
                  height={140}
                  className="rounded-xl shadow-lg"
                />
                <span className="mt-2 font-medium">WeChat</span>
              </motion.div>
            </div>
          </div>

          {/* Right: Interactive Form */}
          <div className="w-full -mt-12 md:-mt-16">
            {/* ContactForm Component */}
            <ContactForm darkMode={darkMode} />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-kez-blue dark:bg-kez-dark text-white dark:text-kez-light py-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 space-y-4 md:space-y-0">
          
          {/* Copyright */}
          <p className="text-sm md:text-base">&copy; 2026. All rights reserved.</p>
          
          {/* Social Links */}
          <div className="flex space-x-6">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/Kez.Tutorial.Service"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-kez-yellow transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.406.593 24 1.325 24H12.82v-9.294H9.692V11.05h3.128V8.413c0-3.1 1.893-4.788 4.658-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.31h3.59l-.467 3.656h-3.123V24h6.116C23.406 24 24 23.406 24 22.676V1.325C24 .593 23.406 0 22.675 0z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/kez.academy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-kez-yellow transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.31.975.975 1.249 2.242 1.31 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.336 2.633-1.31 3.608-.975.975-2.242 1.249-3.608 1.31-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.336-3.608-1.31-.975-.975-1.249-2.242-1.31-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.336-2.633 1.31-3.608.975-.975 2.242-1.249 3.608-1.31C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.012 7.052.072 5.775.132 4.622.398 3.68 1.34 2.738 2.282 2.472 3.435 2.412 4.712 2.352 5.992 2.34 6.401 2.34 12c0 5.599.012 6.008.072 7.288.06 1.277.326 2.43 1.268 3.372.942.942 2.095 1.208 3.372 1.268 1.28.06 1.689.072 7.288.072s6.008-.012 7.288-.072c1.277-.06 2.43-.326 3.372-1.268.942-.942 1.208-2.095 1.268-3.372.06-1.28.072-1.689.072-7.288s-.012-6.008-.072-7.288c-.06-1.277-.326-2.43-1.268-3.372-.942-.942-2.095-1.208-3.372-1.268C18.008.012 17.599 0 12 0zM12 5.838a6.162 6.162 0 1 0 0 12.324A6.162 6.162 0 0 0 12 5.838zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 1-2.879 0 1.44 1.44 0 0 1 2.879 0z"/>
              </svg>
            </a>

            {/* Email */}
            <a
              href="Kez.tutorial.service@gmail.com"
              className="hover:text-kez-yellow transition-colors"
              aria-label="Email"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 13.065L0 4.5V19.5H24V4.5L12 13.065ZM12 11.2L24 2.8H0L12 11.2Z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>

    </main>
  );
}
