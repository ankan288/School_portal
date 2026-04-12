import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F5] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto relative">
        {/* Decorative background blur */}
        <div className="absolute top-[-50px] left-1/2 transform -translate-x-1/2 w-[600px] h-[300px] bg-[#65992b] opacity-5 blur-[100px] rounded-full point-events-none"></div>
        
        {/* Header Section */}
        <div className="text-center mb-12 relative z-10">
          <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight font-serif mb-4">
            The Story of Onyo Bhuban
          </h1>
          <p className="text-xl text-[#65992b] italic font-serif opacity-90">
            ‘The Other World’
          </p>
          <div className="w-16 h-1 mt-6 mx-auto bg-amber-500 rounded-full"></div>
        </div>

        <div className="bg-white rounded-3xl shadow-md border border-slate-100 overflow-hidden relative z-10">
          
          {/* Core Text Section */}
          <div className="p-8 md:p-14 text-slate-700 leading-relaxed text-lg space-y-6">
            <p className="first-letter:text-6xl first-letter:font-bold first-letter:text-[#65992b] first-letter:mr-3 first-letter:float-left first-letter:font-serif first-letter:leading-none">
              Close to Shantiniketan, Bolpur, in a little village called Ramnagar that comes on the way towards Ilambajar, I have built my <strong className="text-slate-900 font-semibold">Onyo Bhuban</strong> (‘the other world’). On 23rd January 2018, in Onyo Bhuban’s front yard, took place the inaugural ceremony of <strong className="text-slate-900 font-semibold">Sobuj Path Mukto Bidyalay</strong> — a free and non-formal centre of studies for the village children.
            </p>
            
            <p>
              The initiative has been taken to impart free primary education to the needy, underprivileged and disadvantaged tribal children of the society, including children from other familial backgrounds between classes 1 to 5. At present, we have <strong className="text-[#65992b] font-bold">45 children</strong> in this educational institute who are being taken care of by three teachers. The goal is to make sure that these children receive a good upbringing and a proper elementary education. 
            </p>

            <p>
              I earnestly request all my friends, family and well-wishers to kindly extend all the help that you can towards this endeavour of mine.
            </p>

            {/* Highlighted Sponsorship Box */}
            <div className="my-10 bg-amber-50 border-l-4 border-amber-500 rounded-r-2xl p-8 md:p-10 shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]">
              <h3 className="text-2xl font-bold text-amber-900 mb-4 font-serif text-center sm:text-left flex items-center gap-3">
                 🤝 Extend a Helping Hand
              </h3>
              <p className="text-amber-800 mb-6 leading-relaxed">
                The annual expense of education and daily tiffin of a child is minimum <strong className="text-xl bg-amber-200/50 px-2 py-0.5 rounded">Rs. 1000/- (approx.)</strong>. <br className="hidden sm:block" />
                If you are interested and willing to take the annual responsibility of one or more students, it will greatly aid the children in need of this free and non-formal educational institute.
              </p>
              
              <blockquote className="border-l-2 border-amber-300 pl-4 py-1 italic text-amber-700 mb-8 border-opacity-70">
                “I have a dream but that dream can be transformed into reality if you and other sensitive souls like you tender your blessings, good wishes and assistance.”
              </blockquote>

              <div className="flex justify-center sm:justify-start">
                <Link 
                  href="/donate" 
                  className="inline-flex items-center px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-md shadow-amber-600/20"
                >
                  Sponsor a Student
                </Link>
              </div>
            </div>
          </div>
          
          {/* PDF Footer Section */}
          <div className="bg-[#FAF9F5] p-8 md:p-12 border-t border-slate-100 sm:flex sm:items-center sm:justify-between gap-6">
            <div className="mb-6 sm:mb-0">
              <h2 className="text-2xl font-bold text-slate-800 mb-2 font-serif">Original Vision Document</h2>
              <p className="text-slate-600 text-base">
                Read our detailed founder's manifesto in its original PDF format.
              </p>
            </div>
            
            <a 
              href="/documents/onyo_bhuban.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group shrink-0 inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-[#65992b] hover:bg-[#568224] text-white font-bold tracking-wide rounded-xl transition-all shadow-md shadow-[#65992b]/30"
            >
              <svg className="w-5 h-5 mr-3 transition-transform group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Read Manifesto PDF
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}