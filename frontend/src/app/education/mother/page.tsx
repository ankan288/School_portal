import Image from "next/image";

export default function MotherEducationPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl font-serif mb-6">
            Mother Education Program
          </h1>
          <p className="text-lg text-slate-600">
            Empowering women through literacy and foundational education. We believe that educating a mother means educating an entire family and uplifting the whole community.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-800 font-serif">
              Learning Together, Growing Together
            </h2>
            <p className="text-slate-600 leading-relaxed md:text-lg">
              Our evening classes provide a safe and supportive environment for mothers to learn basic reading, writing, and numeracy. Gathering after their daily chores, these women show incredible dedication to their personal growth.
            </p>
            <p className="text-slate-600 leading-relaxed md:text-lg">
              By learning to write their own names, manage household finances, and read basic text, they gain independence and confidence that ripples through their homes and children.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg w-full flex bg-black/5 items-center justify-center">
            <Image 
              src="/education/mother/img1.jpeg" 
              alt="Mothers studying together in an evening class"
              width={1000}
              height={750}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Image Gallery / Additional Context */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-start">
          <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
            <div className="w-full">
              <Image 
                src="/education/mother/img2.jpeg" 
                alt="Women seated with notebooks and pens"
                width={800}
                height={600}
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="p-6 flex-grow">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Community Support</h3>
              <p className="text-slate-600">
                The classroom becomes a space not just for academic learning, but for building community bonds, sharing experiences, and supporting one another alongside dedicated instructors.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
            <div className="w-full">
              <Image 
                src="/education/mother/img3.jpeg" 
                alt="Close-up of a mother writing in her notebook"
                width={800}
                height={600}
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="p-6 flex-grow">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Transformative Impact</h3>
              <p className="text-slate-600">
                The simple act of holding a pen and writing represents a profound shift in self-worth. Every correctly formed letter is a step towards a brighter, more informed future.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}