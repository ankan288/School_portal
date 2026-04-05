"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { user, profile, setAuthModalOpen } = useAuth();
  const pathname = usePathname();

  if (pathname === "/") return null;

  const getLinkClass = (path: string) => {
    const isActive = pathname === path;
    return `${
      isActive
        ? "border-slate-800 text-slate-900 font-bold"
        : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-800 font-medium"
    } inline-flex items-center px-1 pt-1 border-b-2 text-sm transition`;
  };

  return (
    <nav className="fixed w-full z-50 bg-[#FAF9F5] border-b border-slate-200 shadow-[0_4px_20px_-15px_rgba(0,0,0,0.1)] top-0 left-0">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex-shrink-0 flex items-center gap-2">     
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-[#f6ca15] font-black text-xl shadow-inner">
              S
            </div>
            <span className="font-extrabold text-xl text-slate-900 tracking-tight cursor-pointer font-serif">
              School<span className="text-[#65992b]">Portal</span>
            </span>
          </Link>

          <div className="hidden md:ml-6 md:flex md:space-x-8">
            <Link href="/announcements" className={getLinkClass("/announcements")}>
              Announcements
            </Link>
            <Link href="#" className={getLinkClass("#")}>
              Event Galleries
            </Link>
            {profile?.role === "admin" && (
              <>
                <Link href="/admin" className={getLinkClass("/admin")}>
                  Admin Panel
                </Link>
                <Link href="/admin/content" className={getLinkClass("/admin/content")}>
                  Manage Content
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center px-2 lg:px-0">
            {user ? (
              <div className="flex items-center gap-4">
                <Link 
                  href="/profile"
                  className="group flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-200/50 transition border border-transparent hover:border-slate-300 cursor-pointer hidden sm:flex"
                >
                  <div className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-xs ring-2 ring-transparent group-hover:ring-[#f6ca15] transition shadow-sm">
                    {(profile?.name || user.email || "U")[0].toUpperCase()}
                  </div>
                </Link>
              </div>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-slate-800 transition shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
