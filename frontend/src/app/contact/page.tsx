"use client";

import { useState } from "react";
import Image from "next/image";
import contactImg from "./contact.jpeg";

export default function ContactPage() {
  const [isImageOpen, setIsImageOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF9F5] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 p-8 sm:p-12 flex flex-col md:flex-row gap-12 items-center">
        
        {/* Left side text info */}
        <div className="flex-1 w-full pl-2">
          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Contact Us
            </h1>
          </div>
          <p className="text-[#4b5563] text-lg mb-8">
            Have any questions? We&apos;d love to hear from you.
          </p>
          <div className="space-y-6 pt-2">
            <p className="text-[#374151] text-base"><strong className="text-slate-900 font-bold">Email:</strong> info@schoolportal.edu</p>
            <p className="text-[#374151] text-base"><strong className="text-slate-900 font-bold">Phone:</strong> 9831051722 / 7059554010</p>
            <div className="text-[#374151] text-base leading-relaxed space-y-3">
              <p><strong className="text-slate-900 font-bold">Regd. Office:</strong> C/O Subrata Sarkar, &quot;Jeebanananda,&quot; 25, Nibedita Park, Brahmapur, Kolkata- 700096</p>
              <p><strong className="text-slate-900 font-bold">School 1:</strong> Ramnagar, Ilambazar, Birbhum</p>
              <p><strong className="text-slate-900 font-bold">School 2:</strong> Daronda, Ilambazar, Birbhum</p>
            </div>
          </div>
        </div>

        {/* Right side Image */}
        <div className="flex-1 w-full flex justify-center">
           <div 
             className="cursor-pointer transition-transform hover:scale-[1.02] shadow-md rounded-xl overflow-hidden"
             onClick={() => setIsImageOpen(true)}
           >
             <Image 
               src={contactImg} 
               alt="Contact Us Information Card" 
               className="w-full h-auto object-contain"
               placeholder="blur"
             />
           </div>
        </div>

      </div>

      {/* Fullscreen Image Modal */}
      {isImageOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm"
          onClick={() => setIsImageOpen(false)}
        >
          <div 
            className="relative w-full max-w-5xl flex justify-center"
            onClick={(e) => e.stopPropagation()} // Prevent clicking the image to close
          >
            <button 
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition p-2 cursor-pointer z-[60]"
              onClick={() => setIsImageOpen(false)}
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Image 
              src={contactImg} 
              alt="Contact Us Information Card Fullscreen" 
              className="w-full max-h-[90vh] h-auto object-contain rounded-lg shadow-2xl"
              placeholder="blur"
            />
          </div>
        </div>
      )}
    </div>
  );
}