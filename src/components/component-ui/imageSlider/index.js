"use client"

import React, { useEffect, useState } from 'react'

const desktopImages = [
  "/image/image1.jpg",
  "/image/image2.jpg",
  "/image/image3.jpg"
  
];
const mobileImages =[
  "/image/img1.jpg",
  "/image/img2.jpg",
  "/image/img3.jpg" ,
]
 
function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    // Check screen size on mount & resize
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);
  const images = isMobile ? mobileImages : desktopImages;
  return (
    <div className="relative  max-w-screen-2xl mx-auto overflow-hidden">
      {/* Slides */}
      <div className="flex transition-transform duration-700 ease-in-out" 
           style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((img, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <img src={img} alt={`Banner ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
      {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? "bg-gray-900 scale-110" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  
  )
}

export default ImageSlider
