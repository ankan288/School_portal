export default function DonatePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#FAF9F5] pt-16 sm:pt-24 pb-12 w-full flex flex-col items-center overflow-x-hidden">
      {/* Moved Title & Call to Action text section */}
      <div className="mt-8 sm:mt-12 text-center max-w-3xl px-4 pb-16">
        <h3 className="text-[#d82c3c] font-bold text-sm sm:text-base tracking-wide mb-3 uppercase">
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
          <button className="w-full sm:w-auto bg-transparent border border-slate-200 hover:bg-slate-50 text-slate-800 px-8 py-3 text-sm font-semibold transition">
            Know About Us
          </button>
        </div>
      </div>

      {/* Existing Donate Box */}
      <div className="max-w-4xl w-full mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center mt-12 mx-4">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">Support Our School</h1>
        <p className="text-slate-600 leading-relaxed text-lg mb-8">
          Your donations help us provide better resources, facilities, and opportunities for our students.
        </p>
        <button className="bg-[#65992b] hover:bg-[#568225] text-white font-bold py-3 px-8 rounded-full shadow-md transition transform hover:-translate-y-1">
          Contribute Today
        </button>
      </div>
    </div>
  );
}