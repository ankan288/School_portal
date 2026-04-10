export default function DonatePage() {
  return (
    <div className="min-h-screen bg-[#FAF9F5] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-6">Support Our School</h1>
        <p className="text-slate-600 leading-relaxed text-lg mb-8">
          Your donations help us provide better resources, facilities, and opportunities for our students.
        </p>
        <button className="bg-[#65992b] hover:bg-[#568225] text-white font-bold py-3 px-8 rounded-full shadow-md transition transform hover:-translate-y-1">
          Donate Now
        </button>
      </div>
    </div>
  );
}