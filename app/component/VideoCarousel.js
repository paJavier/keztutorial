"use client";

import { useState } from "react";

export default function VideoCarousel() {
  const videos = [
    "/videos/aboutvid.mp4",
    "/videos/aboutvid2.mp4",
    "/videos/aboutvid3.mp4",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? videos.length - 1 : prev - 1
    );
  };

  return (
    <div className="w-full max-w-4xl rounded-3xl overflow-hidden shadow-lg mt-6 flex flex-col items-center gap-4">
      <video
        key={videos[currentIndex]}
        src={videos[currentIndex]}
        controls
        autoPlay={false}
        className="w-full h-auto rounded-3xl"
      />

      {/* Navigation Buttons */}
      <div className="flex gap-4 mt-2">
        <button
          onClick={handlePrev}
          className="px-4 py-2 bg-kez-blue text-white rounded-full hover:bg-kez-dark transition"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-kez-blue text-white rounded-full hover:bg-kez-dark transition"
        >
          Next
        </button>
      </div>

      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
        Video {currentIndex + 1} of {videos.length}
      </p>
    </div>
  );
}
