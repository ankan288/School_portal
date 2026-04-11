export default function AwardsPage() {
  const awards = [
    {
      id: 1,
      title: "NGO of the Year",
      year: "2025",
      organization: "National Community Service Board",
      description: "Awarded for outstanding contribution to free child education and community empowerment in rural areas.",
      icon: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      id: 2,
      title: "Excellence in Healthcare",
      year: "2024",
      organization: "Global Health Initiative",
      description: "Recognized for our expansive mother and child wellness programs, ensuring basic medical support reaches isolated sectors.",
      icon: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      id: 3,
      title: "Community Impact Prize",
      year: "2023",
      organization: "Regional Development Fund",
      description: "Honored for creating sustainable rural development and building resilient education infrastructure that lasts.",
      icon: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      id: 4,
      title: "Innovators in Education",
      year: "2022",
      organization: "EdTech Global",
      description: "Acclaimed for bridging the digital divide by distributing laptops to over 5,000 households.",
      icon: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      id: 5,
      title: "Champion of Equality",
      year: "2021",
      organization: "Human Rights Watch",
      description: "Celebrated for tireless advocacy towards equal educational access for all genders and minorities.",
      icon: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      color: "text-pink-600",
      bgColor: "bg-pink-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 font-serif">
            Awards & Recognition
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our commitment to transforming communities has been honored by various organizations across the globe. 
            Here runs the history of our milestones and recognitions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {awards.map((award) => (
            <div 
              key={award.id} 
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:-translate-y-2 transition-transform duration-300 flex flex-col"
            >
              <div className={`h-40 ${award.bgColor} flex flex-col items-center justify-center relative`}>
                <div className={`absolute top-4 right-4 ${award.color} font-bold text-lg bg-white/80 px-3 py-1 rounded-full shadow-sm`}>
                  {award.year}
                </div>
                <div className={`${award.color}`}>
                  {award.icon}
                </div>
              </div>
              <div className="p-8 flex-grow text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{award.title}</h3>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-6">
                  {award.organization}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {award.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}