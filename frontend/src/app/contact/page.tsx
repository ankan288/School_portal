"use client";

import { useState } from "react";
import Image from "next/image";
import contactImg from "./contact.jpeg";

const contactData = [
  {
    title: "Regd. Office",
    address: 'C/O Subrata Sarkar, "Jeebanananda," 25, Nibedita Park, Brahmapur, Kolkata- 700096',
    phones: ["9831051722", "7059554010"],
    emails: ["info@schoolportal.edu"]
  },
  {
    title: "School 1",
    address: "Ramnagar, Ilambazar, Birbhum",
    phones: ["9831051722", "7059554010"],
    emails: ["info@schoolportal.edu"]
  },
  {
    title: "School 2",
    address: "Daronda, Ilambazar, Birbhum",
    phones: ["9831051722", "7059554010"],
    emails: ["info@schoolportal.edu"]
  }
];

export default function ContactPage() {
  const [isImageOpen, setIsImageOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF9F5] pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Contact Us
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Have any questions? We&apos;d love to hear from you. Reach out to our registered office or directly to the schools.
          </p>
        </div>

        {/* Masonry-style Grid Layout for Contacts */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 mb-16">
          {contactData.map((contact, idx) => (
            <div 
              key={idx} 
              className="break-inside-avoid bg-white rounded-xl p-6 shadow-sm border border-emerald-100 transition-transform hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="text-emerald-800 text-xl font-bold mb-5 pb-2 border-b-2 border-emerald-200/60 inline-block">
                {contact.title}:
              </h3>

              <div className="space-y-4">
                {/* Physical Address */}
                {contact.address && (
                  <div className="flex items-start gap-4 pb-4 border-b border-slate-100">
                    <svg className="w-5 h-5 text-teal-600 mt-1 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor">
                      <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
                    </svg>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                      {contact.address}
                    </p>
                  </div>
                )}

                {/* Phones */}
                {contact.phones && contact.phones.length > 0 && (
                  <div className="flex items-start gap-4 pb-4 border-b border-slate-100">
                    <svg className="w-5 h-5 text-teal-600 mt-0.5 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor">
                      <path d="M16 64C16 28.7 44.7 0 80 0H304c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H80c-35.3 0-64-28.7-64-64V64zM224 448a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM304 64H80V384H304V64z"/>
                    </svg>
                    <div className="flex flex-col gap-1">
                      {contact.phones.map((phone, i) => (
                        <p key={i} className="text-slate-600 text-sm md:text-base font-medium">
                          +91 {phone}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Emails */}
                {contact.emails && contact.emails.length > 0 && (
                  <div className="flex items-start gap-4">
                    <svg className="w-5 h-5 text-teal-600 mt-0.5 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
                      <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
                    </svg>
                    <div className="flex flex-col gap-1">
                      {contact.emails.map((email, i) => (
                        <a key={i} href={`mailto:${email}`} className="text-slate-600 text-sm md:text-base hover:text-emerald-600 transition-colors">
                          {email}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Keeping the Document Image */}
        <div className="w-full flex justify-center mt-12 bg-white p-8 rounded-2xl shadow-sm border border-slate-100 max-w-4xl mx-auto">
          <div className="w-full text-center">
            <h2 className="text-xl font-semibold text-slate-800 mb-6">Additional Contact Information</h2>
            <div 
              className="cursor-pointer transition-transform hover:scale-[1.02] shadow-md rounded-xl overflow-hidden inline-block"
              onClick={() => setIsImageOpen(true)}
            >
              <Image 
                src={contactImg} 
                alt="Contact Us Information Card" 
                className="w-full max-w-2xl h-auto object-contain mx-auto"
                placeholder="blur"
              />
            </div>
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