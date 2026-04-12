import React from "react";
import Image from "next/image";

export default function TeachersAndSupportStaffPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl font-serif mb-6">
            Teachers and Support Staff
          </h1>
          <p className="text-lg text-slate-600">
            Meet the dedicated educators and support staff who make our mission possible. Their tireless efforts shape the future of our children and empower the community.
          </p>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12 mb-16">
          <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
            <h2 className="text-3xl font-bold text-slate-800 font-serif mb-4">
              Our Pillars of Strength
            </h2>
            <p>
              The backbone of Sobuj Path Mukto Bidyalay and our educational initiatives is our highly committed teaching staff. Currently, we have dedicated teachers taking care of the students, ensuring they receive not just academic instruction, but also a nurturing and supportive environment to grow.
            </p>
            <p>
              Behind the scenes, our support staff ensures the daily operations run smoothly, from coordinating daily tiffins to maintaining a clean and safe learning space for everyone.
            </p>
            <div className="mt-8 bg-emerald-50 rounded-xl p-6 border-l-4 border-emerald-500">
              <p className="text-emerald-800 font-medium italic">
                “A good teacher can inspire hope, ignite the imagination, and instill a love of learning.”
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}