"use client";
import { useState } from "react";
import Image from "next/image";
import Modal from "react-modal";

export default function ImageModal({ images }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);

  const openModal = (idx) => {
    setSelectedIdx(idx);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const prevImage = () =>
    setSelectedIdx((selectedIdx - 1 + images.length) % images.length);
  const nextImage = () => setSelectedIdx((selectedIdx + 1) % images.length);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Grid of thumbnails */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="overflow-hidden rounded-2xl shadow-md cursor-pointer"
            onClick={() => openModal(idx)}
          >
            <Image
              src={img} 
              alt={`Image ${idx + 1}`}
              width={300}
              height={200}
              className="object-cover w-full h-48 sm:h-56 md:h-64 hover:scale-105 transition-transform"
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center outline-none z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-70 z-40"
        ariaHideApp={false}
      >
        <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white text-4xl font-bold z-50 hover:text-red-500 transition-colors"
          >
            &times;
          </button>

          {/* Prev Arrow */}
          <button
            onClick={prevImage}
            className="absolute left-5 sm:left-10 text-white text-4xl font-bold z-50 bg-black bg-opacity-30 rounded-full p-2 hover:bg-opacity-50 transition"
          >
            &#8249;
          </button>

          {/* Next Arrow */}
          <button
            onClick={nextImage}
            className="absolute right-5 sm:right-10 text-white text-4xl font-bold z-50 bg-black bg-opacity-30 rounded-full p-2 hover:bg-opacity-50 transition"
          >
            &#8250;
          </button>

          {/* Display Selected Image */}
          <Image
            src={images[selectedIdx]}
            alt={`Image ${selectedIdx + 1}`}
            width={800}
            height={600}
            className="rounded-2xl shadow-xl object-contain max-h-[90vh]"
          />
        </div>
      </Modal>
    </div>
  );
}
