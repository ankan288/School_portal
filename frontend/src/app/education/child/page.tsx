import Image from "next/image";

export default function ChildEducationPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl font-serif mb-6">
            Child Education Program
          </h1>
          <p className="text-lg text-slate-600">
            Nurturing young minds in a vibrant and open environment. We provide children with the foundational learning they need to build a bright and successful future.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-800 font-serif">
              Focused Learning in Nature
            </h2>
            <p className="text-slate-600 leading-relaxed md:text-lg">
              Our open-air classrooms provide a refreshing and tranquil space for students to focus on their studies. Whether sitting at traditional wooden desks or gathering on mats, every child is given the attention and resources they need to thrive.
            </p>
            <p className="text-slate-600 leading-relaxed md:text-lg">
              We focus on holistic education, encouraging discipline, creativity, and a love for learning. By providing these essential educational opportunities, we are empowering the next generation to break barriers and achieve their dreams.
            </p>
          </div>
          <div className="grid gap-6">
            <div className="rounded-xl overflow-hidden shadow-lg h-[300px] relative">
              <Image 
                src="/education/child/img1.jpeg" 
                alt="Children studying attentively at wooden desks"
                fill
                className="object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg h-[300px] relative">
              <Image 
                src="/education/child/img2.jpeg" 
                alt="Children studying together on mats in an open pavilion"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}