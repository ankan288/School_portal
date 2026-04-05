import Feed from "@/components/ui/Feed";

export default function AnnouncementsPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#FAF9F5]">
      <div className="flex flex-col gap-10 py-10 max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* We can keep this header or refactor if needed. Let's keep it for now. */}
        <header className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 px-8 py-16 shadow-2xl sm:px-14 border border-slate-800 hidden">
           {/* Hiding header based on the screenshot, it shows a very clean top area, but maybe let's keep it inside the app for now or remove? Since the screenshot doesn't have it, let's remove it to match the UI better. */}
        </header>

        <div className="flex items-center justify-between border-b-2 border-slate-200/60 pb-5 px-2 hidden">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-serif">
            Student Feed
          </h2>
        </div>
        
        <Feed />
      </div>
    </div>
  );
}
