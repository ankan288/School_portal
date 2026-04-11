"use client";

import { useState, useEffect } from "react";
import { HeroHighlight, Highlight } from "@/components/ui/HeroHighlight";

interface CarouselItem {
  image: string;
  quote?: string;
}

const carouselData: CarouselItem[] = [
  {
    image: "/carousel/5c89428a-71ca-4a80-8767-7ba52bc24773.jpg",
    quote: "Empowering next generations\nthrough quality education\nand modern facilities",
  },
  {
    image: "/carousel/c482bda9-1f21-4027-a851-da12b07cfbe1.jpg",
    quote: "Providing a vibrant and\nwelcoming environment\nfor every child to thrive",
  },
  {
    image: "/carousel/fa4a69b5-48b2-4009-b1db-fd4d308e0ae5.jpg",
    quote: "Building a brighter future\none student at a time\nwith care and compassion",
  },
  { 
    image: "/carousel/97ae25fe-d2c9-4dc8-9943-455b680d289f.jpg" 
  },
  { 
    image: "/carousel/e619076e-6012-4edc-bcff-c0ed083f6d0e.jpg" 
  },
];

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      // Manual right arrow click behaves normally (wrapping)
      return prev === carouselData.length - 1 ? 0 : prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      return prev === 0 ? carouselData.length - 1 : prev - 1;
    });
  };

  // Auto-play the carousel (ping-pong: first to last, then last to first)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (direction === "forward") {
          if (prevIndex === carouselData.length - 1) {
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
    <div className="flex flex-col items-center w-full overflow-x-hidden">

      {/* =============================================
           INTRO PANEL — Compact split layout
           ============================================= */}
      <section className="relative w-full bg-[#FAF9F5] text-slate-900 px-6 md:px-12 lg:px-16 py-6">
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 z-30" />

        <div className="flex flex-col md:flex-row w-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">

          {/* LEFT — Branding column */}
          <div className="flex flex-col items-center justify-center md:items-start md:w-[35%] px-8 md:px-10 lg:px-14 py-8 border-b md:border-b-0 md:border-r border-slate-200 bg-white">
            <h1 className="text-3xl md:text-4xl font-black font-serif text-slate-900 tracking-tight leading-tight mb-1 text-center md:text-left">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">ONYO</span>{" "}
              BHUBAN
            </h1>
            <p className="text-xs md:text-sm font-bold tracking-[0.15em] uppercase text-emerald-600 mt-1 text-center md:text-left">
              Sobuj Path Mukto Bidyalay
            </p>
          </div>

          {/* RIGHT — Text column */}
          <HeroHighlight containerClassName="flex-1 px-8 md:px-10 lg:px-14 py-8 relative">
            <div className="relative z-20">
              <p className="text-sm md:text-base leading-relaxed text-slate-600 font-serif mb-3">
                Close to Shantiniketan, Bolpur, in a little village called Ramnagar that comes on the way towards Ilambajar, I have built my{" "}
                <Highlight className="text-slate-900 font-bold px-1.5">Onyo Bhuban</Highlight>{" "}
                <span className="italic text-slate-500">(&apos;the other world&apos;)</span>.
              </p>
              <p className="text-sm md:text-base leading-relaxed text-slate-600 font-serif">
                On 23rd January 2018, in{" "}
                <strong className="text-slate-900">Onyo Bhuban&apos;s</strong> front yard took place the inaugural ceremony of{" "}
                <Highlight className="text-emerald-900 font-bold px-1.5">Sobuj Path Mukto Bidyalay</Highlight>—a{" "}
                <strong className="text-slate-900">free and non-formal centre of studies</strong> for the{" "}
                <strong className="text-slate-900 border-b-2 border-emerald-200 pb-0.5">village children</strong>.
              </p>
            </div>
          </HeroHighlight>
        </div>
      </section>

      {/* Image Carousel Panel */}
      <div className="w-full px-6 md:px-12 lg:px-16 pb-6 bg-[#FAF9F5]">
      <div className="relative w-full overflow-hidden shadow-sm group rounded-xl bg-white" style={{aspectRatio: '16/9', minHeight: '350px', maxHeight: '650px'}}>
        
        {/* Images */}
        {carouselData.map((item, index) => (
          <div 
            key={index} 
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Main Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={item.image} 
              alt={`Slide ${index + 1}`} 
              className="w-full h-full object-cover object-center"
            />
            
            {/* Conditional Quote Overlay Box */}
            {item.quote && (
              <div className="absolute top-[5%] left-[2%] md:top-[8%] md:left-[4%] max-w-[85%] md:max-w-xl bg-[#c28424]/30 backdrop-blur-md border border-white/20 text-white p-4 md:p-6 rounded-xl whitespace-pre-line shadow-2xl">
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-snug tracking-tight drop-shadow-lg">
                  {item.quote}
                </p>
              </div>
            )}
            
            {/* Shadow overlay for better contrast if needed */}
            <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
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
          {carouselData.map((_, index) => (
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
      </div>

      {/* =========================================
           IMPACT METRICS SECTION 
           ========================================= */}
      <section className="py-24 bg-blue-900 text-white w-full mt-16 md:mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center md:flex md:items-center md:justify-between mb-16">
            <div className="md:w-1/2 text-left">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
                Our Global Impact
              </h2>
              <p className="text-xl text-blue-200">
                We believe in the power of education to transform lives. Here is a snapshot of what we have achieved together over the past decade.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-blue-800 rounded-xl p-8 text-center border border-blue-700 shadow-lg transform transition hover:-translate-y-2">
              <p className="text-5xl font-black text-white mb-2">15k+</p>
              <p className="text-blue-200 font-medium uppercase tracking-wide">Students Reached</p>
            </div>
            <div className="bg-blue-800 rounded-xl p-8 text-center border border-blue-700 shadow-lg transform transition hover:-translate-y-2">
              <p className="text-5xl font-black text-white mb-2">45</p>
              <p className="text-blue-200 font-medium uppercase tracking-wide">Schools Built</p>
            </div>
            <div className="bg-blue-800 rounded-xl p-8 text-center border border-blue-700 shadow-lg transform transition hover:-translate-y-2">
              <p className="text-5xl font-black text-white mb-2">250+</p>
              <p className="text-blue-200 font-medium uppercase tracking-wide">Active Volunteers</p>
            </div>
            <div className="bg-blue-800 rounded-xl p-8 text-center border border-blue-700 shadow-lg transform transition hover:-translate-y-2">
              <p className="text-5xl font-black text-white mb-2">$5M</p>
              <p className="text-blue-200 font-medium uppercase tracking-wide">Funds Raised</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
           SUCCESS STORIES SECTION 
           ========================================= */}
      <section className="py-24 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Stories of Success</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col md:flex-row bg-gray-50 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <div className="md:w-2/5 bg-gray-300 min-h-[200px]">
                {/* Replace with actual image */}
                <div className="w-full h-full flex items-center justify-center bg-blue-200">
                   <span className="text-blue-500 font-semibold px-4 text-center">Student Portrait</span>
                </div>
              </div>
              <div className="p-8 md:w-3/5 flex flex-col justify-center">
                <svg className="w-8 h-8 text-blue-400 mb-4" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.896 3.456-8.352 9.12-8.352 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="text-gray-700 italic mb-6">&quot;Before this scholarship, I couldn&apos;t afford college. Now, I am the first in my family to graduate and am pursuing a career in engineering.&quot;</p>
                <div>
                  <p className="font-bold text-gray-900">Sarah Jenkins</p>
                  <p className="text-sm text-gray-500">Class of 2025</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row bg-gray-50 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <div className="md:w-2/5 bg-gray-300 min-h-[200px]">
                {/* Replace with actual image */}
                <div className="w-full h-full flex items-center justify-center bg-green-200">
                   <span className="text-green-600 font-semibold px-4 text-center">Teacher Portrait</span>
                </div>
              </div>
              <div className="p-8 md:w-3/5 flex flex-col justify-center">
                <svg className="w-8 h-8 text-green-400 mb-4" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                   <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.896 3.456-8.352 9.12-8.352 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="text-gray-700 italic mb-6">&quot;The new facility built by the foundation completely changed our ability to teach science. The kids are finally engaged with hands-on labs.&quot;</p>
                <div>
                  <p className="font-bold text-gray-900">David Martinez</p>
                  <p className="text-sm text-gray-500">High School Science Teacher</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
           AWARDS & RECOGNITION SECTION 
           ========================================= */}
      <section className="py-24 bg-gray-50 border-t border-gray-200 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12 border-b border-gray-200 pb-6">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">Awards & Recognition</h2>
              <p className="text-gray-600 mt-2">Honoring our commitment to community and education.</p>
            </div>
            <a href="/awards" className="hidden sm:inline-flex text-[#c28424] font-semibold hover:text-[#a06b1c] transition">
              View All Awards &rarr;
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Award 1 */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">NGO of the Year</h3>
              <p className="text-sm text-gray-500 mb-4">2025 • National Community Service Board</p>
              <p className="text-gray-600 text-sm">Awarded for outstanding contribution to free child education and community empowerment.</p>
            </div>

            {/* Award 2 */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Excellence in Healthcare</h3>
              <p className="text-sm text-gray-500 mb-4">2024 • Global Health Initiative</p>
              <p className="text-gray-600 text-sm">Recognized for our expansive mother and child wellness programs in rural sectors.</p>
            </div>

            {/* Award 3 */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Community Impact Prize</h3>
              <p className="text-sm text-gray-500 mb-4">2023 • Regional Development Fund</p>
              <p className="text-gray-600 text-sm">Honored for creating sustainable rural development and education infrastructure.</p>
            </div>
          </div>
          
          <div className="mt-10 text-center sm:hidden">
            <a href="/awards" className="inline-block bg-white text-[#c28424] font-semibold px-6 py-3 border border-[#c28424] rounded-lg hover:bg-[#fff9f0] transition">
              View All Awards
            </a>
          </div>
        </div>
      </section>

      {/* =========================================
           LATEST NEWS SECTION 
           ========================================= */}
      <section className="py-24 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12 border-b border-gray-200 pb-6">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">Latest News & Updates</h2>
              <p className="text-gray-600 mt-2">See what we&apos;ve been up to recently.</p>
            </div>
            <a href="/news" className="hidden sm:inline-flex text-blue-600 font-semibold hover:text-blue-800 transition">
              View All News &rarr;
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Article 1 */}
            <article className="flex flex-col group cursor-pointer">
              <div className="rounded-xl overflow-hidden mb-4 bg-gray-200 h-60">
                 {/* Placeholder for Image */}
                 <div className="w-full h-full bg-indigo-100 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                    <span className="text-indigo-400 font-medium">News Image 1</span>
                 </div>
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-2 space-x-4">
                <span>April 10, 2026</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">Events</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition mb-2">
                Annual Fundraising Gala Breaks Previous Records
              </h3>
              <p className="text-gray-600 line-clamp-3">
                Thanks to our generous donors and sponsors, this year&apos;s gala raised over $1.2 million to directly fund STEM programs in underprivileged districts across the country.
              </p>
            </article>

            {/* Article 2 */}
            <article className="flex flex-col group cursor-pointer">
              <div className="rounded-xl overflow-hidden mb-4 bg-gray-200 h-60">
                 {/* Placeholder for Image */}
                 <div className="w-full h-full bg-green-100 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                    <span className="text-green-500 font-medium">News Image 2</span>
                 </div>
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-2 space-x-4">
                <span>March 28, 2026</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Announcements</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition mb-2">
                New Partnership with Tech Innovators Inc.
              </h3>
              <p className="text-gray-600 line-clamp-3">
                We are thrilled to announce a strategic partnership that will deliver 5,000 new laptops to high school juniors preparing for college applications this fall.
              </p>
            </article>

            {/* Article 3 */}
            <article className="flex flex-col group cursor-pointer">
              <div className="rounded-xl overflow-hidden mb-4 bg-gray-200 h-60">
                 {/* Placeholder for Image */}
                 <div className="w-full h-full bg-pink-100 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                    <span className="text-pink-400 font-medium">News Image 3</span>
                 </div>
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-2 space-x-4">
                <span>March 15, 2026</span>
                <span className="px-2 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-semibold">Community</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition mb-2">
                Volunteers Complete Renovation of Riverdale Library
              </h3>
              <p className="text-gray-600 line-clamp-3">
                Over 50 community members gave their weekend to paint, clean, and organize the newly restored learning center at Riverdale Elementary.
              </p>
            </article>
          </div>
          
          <div className="mt-10 text-center sm:hidden">
             <a href="/news" className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 border border-blue-600 rounded-lg hover:bg-blue-50 transition">
              View All News
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
