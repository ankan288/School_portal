"use client";

import { useState, useEffect } from "react";

const carouselImages = [
  "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=2670&auto=format&fit=crop", // People/Education oriented
  "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524397057410-1e776510fce9?q=80&w=2832&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2664&auto=format&fit=crop", // Children learning
  "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2673&auto=format&fit=crop", // Books & studying
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2720&auto=format&fit=crop", // Play/Activity
];

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      // Manual right arrow click behaves normally (wrapping)
      return prev === carouselImages.length - 1 ? 0 : prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      return prev === 0 ? carouselImages.length - 1 : prev - 1;
    });
  };

  // Auto-play the carousel (ping-pong: first to last, then last to first)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (direction === "forward") {
          if (prevIndex === carouselImages.length - 1) {
            setDirection("backward");
            return prevIndex - 1;
          }
          return prevIndex + 1;
        } else {
          if (prevIndex === 0) {
            setDirection("forward");
            return prevIndex + 1;
          }
          return prevIndex - 1;
        }
      });
    }, 5000);
    return () => clearInterval(timer);
  }, [direction]);

  return (
    <div className="min-h-[calc(100vh-4rem)] pt-4 flex flex-col items-center w-full overflow-x-hidden">
      
      {/* Image Carousel Panel */}
      <div className="relative w-[98%] max-w-[1920px] h-[180px] sm:h-[220px] md:h-[280px] lg:h-[320px] rounded-[1.5rem] overflow-hidden shadow-xl group mt-0">
        
        {/* Images */}
        {carouselImages.map((img, index) => (
          <div 
            key={index} 
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={img} 
              alt={`Slide ${index + 1}`} 
              className="w-full h-full object-cover"
            />
            {/* Shadow overlay for better contrast if needed */}
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
        ))}

        {/* Left Arrow */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
          aria-label="Previous Slide"
        >
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Right Arrow */}
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
          aria-label="Next Slide"
        >
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        {/* Dots indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentIndex ? "bg-white w-6" : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Title & Call to Action text section just like the reference photo */}
      <div className="mt-16 sm:mt-24 text-center max-w-3xl px-4 pb-20">
        <h3 className="text-[#d82c3c] font-bold text-sm sm:text-base tracking-wide mb-3">
          Give Hope For Everyone
        </h3>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black text-slate-900 leading-[1.15] mb-6">
          Helping Each Other <br /> Can Make The World Better
        </h1>
        <p className="text-slate-500 font-medium text-lg leading-relaxed mb-8 max-w-xl mx-auto">
          Join us in creating a brighter future for the most vulnerable communities around you.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button className="w-full sm:w-auto bg-[#d82c3c] hover:bg-red-700 text-white px-8 py-3.5 text-sm font-semibold transition shadow-md">
            Donate Now
          </button>
          <button className="w-full sm:w-auto bg-transparent hover:bg-slate-50 text-slate-800 border-2 border-slate-200 px-8 py-3 text-sm font-semibold transition">
            Know About Us
          </button>
        </div>
      </div>

      {/* Impact Story Section Dummy Outline */}
      <div className="w-full text-center mt-6 pb-20">
        <h3 className="text-[#d82c3c] font-bold text-sm tracking-wide mb-3">Our</h3>
        <h2 className="text-4xl sm:text-5xl font-serif font-black text-slate-900">
          Impact Story
        </h2>
        <p className="text-slate-500 font-medium text-base mt-4 max-w-lg mx-auto">
          Because of your support, thousands now have access to free healthcare and education.
        </p>
      </div>

    </div>
  );
}
