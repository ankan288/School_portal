export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F5] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-6">Contact Us</h1>
        <p className="text-slate-600 leading-relaxed text-lg mb-8">
          Have any questions? We&apos;d love to hear from you.
        </p>
        <div className="space-y-4">
          <p className="text-slate-700"><strong>Email:</strong> info@schoolportal.edu</p>
          <p className="text-slate-700"><strong>Phone:</strong> (123) 456-7890</p>
          <p className="text-slate-700"><strong>Address:</strong> 123 Education Lane, Learning City, ED 12345</p>
        </div>
      </div>
    </div>
  );
}