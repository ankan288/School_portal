"use client";

import Link from 'next/link';
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { setAuthModalOpen } = useAuth();

  return (
    <div className="relative bg-[#FAF9F5] w-full min-h-[calc(100vh-4rem)] overflow-hidden font-sans flex flex-col justify-between">
      
      {/* Background World Map Vector (light gray silhouette) -> Using a placeholder blob shape for visual similarity */}
      <div className="absolute inset-0 pointer-events-none opacity-20 flex justify-end items-start mt-10">
        <svg viewBox="0 0 800 600" className="w-[800px] h-[600px] fill-current text-slate-400 opacity-50" xmlns="http://www.w3.org/2000/svg">
           <path d="M547.4,196Q640,142,674,233.5Q708,325,658.5,416.5Q609,508,512.5,528Q416,548,300,539.5Q184,531,140,432Q96,333,141,232.5Q186,132,298.5,108.5Q411,85,454.8,250Z" transform="translate(-50 -50) scale(1.2)" />
        </svg>
      </div>

      {/* Main Content Area */}
      <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12 w-full pt-8 relative z-10 flex-1 flex flex-col justify-center">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* Left Text Column */}
          <div className="flex-1 max-w-xl z-20">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight relative font-serif">
              A school where every <br />
              <span className="relative inline-block mt-2">
                child&apos;s potential
                {/* Yellow Brush Underline */}
                <svg className="absolute w-[105%] h-8 sm:h-12 -bottom-2 sm:-bottom-4 -left-2 text-[#f6ca15] -z-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 40" preserveAspectRatio="none">
                  <path d="M5,25 Q50,15 150,22 T340,20 Q350,20 345,15 Q300,5 150,10 T10,15 Q0,15 5,25 Z" fill="currentColor" opacity="0.9" />
                </svg>
              </span> <br />
              is unlocked today.
            </h1>
            
            <p className="mt-8 text-slate-600 font-medium text-lg leading-relaxed max-w-sm">
              Every day we provide world-class education, healthy environments, and modern facilities to cultivate tomorrow&apos;s scholars, and you can join us!
            </p>

            <div className="mt-10 flex items-center gap-6">
              <button 
                onClick={() => setAuthModalOpen(true)} 
                className="bg-black text-white px-8 py-3.5 text-sm font-semibold hover:bg-slate-800 transition tracking-wide shadow-xl cursor-pointer"
              >
                Get Started
              </button>
              <Link href="#" className="group flex items-center gap-2 text-slate-900 text-sm font-semibold hover:opacity-75 transition">
                Discover
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
              </Link>
            </div>
          </div>

          {/* Right Image/Graphic Column */}
          <div className="flex-1 relative w-full max-w-md lg:max-w-lg min-h-[350px] lg:min-h-[400px]">
            {/* Green Paint Splash Top Left */}
            <div className="absolute -left-12 top-10 w-32 h-10 bg-[#65992b] transform -rotate-6 z-0 rounded-sm skew-x-12 opacity-90 blur-[1px]"></div>
            <div className="absolute -left-14 top-16 w-20 h-6 bg-[#65992b] transform rotate-3 z-0 rounded-sm skew-x-[-10deg] opacity-80 blur-[2px]"></div>

            {/* The Masque container for the image */}
            <div className="absolute inset-0 z-10 drop-shadow-2xl">
              {/* Using a clipping path approach */}
              <div 
                className="w-full h-full bg-cover bg-center bg-no-repeat shadow-2xl"
                style={{ 
                  backgroundImage: "url('https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2670&auto=format&fit=crop')",
                  clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 75% 100%, 25% 100%, 0% 80%, 0% 20%)',
                  borderRadius: '3rem', // Soften the polygon a bit
                }}
              ></div>
            </div>

            {/* Yellow / Green Paint Splash Bottom Center */}
            <div className="absolute -bottom-6 left-10 w-44 h-12 bg-[#f6ca15] transform rotate-2 z-20 rounded ring-white skew-x-[15deg]"></div>
            <div className="absolute -bottom-10 left-16 w-28 h-8 bg-[#65992b] transform -rotate-3 z-30 rounded-sm skew-x-12 opacity-90"></div>

            {/* Floating Stat Widget */}
            <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 z-30 flex flex-col items-center">
              <div className="relative">
                {/* Yellow circle behind */}
                <div className="absolute -inset-4 bg-[#f6ca15] rounded-full z-0 transform -translate-x-2 translate-y-1"></div>
                <h3 className="text-5xl font-serif font-black text-slate-900 relative z-10 drop-shadow-sm">1,200</h3>
              </div>
              <p className="text-xs font-medium text-slate-600 text-center mt-3 max-w-[100px] leading-tight">
                students learning every day on campus
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Icons Section */}
      <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12 w-full pb-4 sm:pb-8 mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {/* Faded horizontal line behind the items */}
          <div className="hidden lg:block absolute top-[25px] left-0 w-full h-[1px] bg-slate-200 z-0"></div>

          {/* Item 1 */}
          <div className="relative z-10 bg-[#FAF9F5] pt-2">
            <div className="w-10 h-10 mb-4 text-slate-800 border-2 border-slate-900 rounded-lg flex items-center justify-center p-1.5 bg-white">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <h4 className="font-bold text-slate-900 mb-2">Healthy Food</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Nutritious meals prepared daily to fuel focused minds and strong bodies across our campus cafeterias.
            </p>
          </div>

          {/* Item 2 - Highlighted */}
          <div className="relative z-10 pt-2 lg:-mt-6">
            <div className="absolute inset-0 bg-white shadow-xl rounded-xl -m-3 lg:-m-5 z-0"></div>
            <div className="relative z-10 p-2">
              <div className="w-10 h-10 mb-4 text-slate-800 border-2 border-slate-900 bg-[#f6ca15]/10 rounded-lg flex items-center justify-center p-1.5">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              </div>
              <h4 className="font-bold text-slate-900 mb-2 border-b-2 border-slate-900 pb-1 w-max relative">
                Education
                {/* Pointer Hand Icon overlay */}
                <svg className="absolute -bottom-5 -right-6 w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium mt-3">
                Modern curriculum led by dedicated professionals, ensuring every single student thrives academically.
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="relative z-10 bg-[#FAF9F5] pt-2">
            <div className="w-10 h-10 mb-4 text-slate-800 border-2 border-slate-900 rounded-lg flex items-center justify-center p-1.5 bg-white">
               <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <h4 className="font-bold text-slate-900 mb-2">Safe Campus</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Around-the-clock security and purely secure environments to ensure total peace of mind for parents.
            </p>
          </div>

          {/* Item 4 */}
          <div className="relative z-10 bg-[#FAF9F5] pt-2">
            <div className="w-10 h-10 mb-4 text-slate-800 border-2 border-slate-900 rounded-lg flex items-center justify-center p-1.5 bg-white">
               <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            </div>
            <h4 className="font-bold text-slate-900 mb-2">Medical Care</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Fully equipped on-site medical professional facilities to attend to any and all immediate student needs.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
