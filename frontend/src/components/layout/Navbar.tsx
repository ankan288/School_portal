"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const { user, profile, setAuthModalOpen, signOut } = useAuth();
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getLinkClass = (path: string) => {
    const isActive = pathname === path;
    return `${
      isActive
        ? "border-slate-800 text-slate-900 font-bold"
        : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-800 font-medium"
    } inline-flex items-center px-1 pt-1 border-b-2 text-base transition`;
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm w-full">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 min-h-[100px]">
          <div className="flex items-center">
            {/* Hamburger Button for Mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 mr-2 rounded-md text-slate-800 hover:bg-slate-200 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              ) : (
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              )}
            </button>

            <Link href="/" className="flex-shrink-0 flex flex-col items-center gap-1 group">     
              <div className="w-14 h-14 bg-amber-600 rounded-sm flex items-center justify-center text-white font-black text-3xl shadow-sm">
                S
              </div>
              <span className="font-bold text-sm text-slate-900 tracking-tight cursor-pointer font-serif">
                SOBUJ <span className="text-[#65992b]">PATH</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:ml-6 md:flex md:space-x-8">
            <Link href="/" className={getLinkClass("/")}>
              Home
            </Link>
            <Link href="/about" className={getLinkClass("/about")}>
              About
            </Link>
            <div className="relative group flex items-center h-full pt-1 pb-1">
              <span className={`cursor-pointer inline-flex items-center px-1 border-b-2 text-base transition border-transparent text-slate-500 group-hover:border-slate-300 group-hover:text-slate-800 font-medium`}>
                Education
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </span>
              <div className="absolute left-0 top-[100%] mt-[-4px] pt-4 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white border border-slate-200 shadow-lg rounded-xl overflow-hidden py-2 flex flex-col">
                  <Link href="/education/child" className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900">Child Education</Link>
                  <Link href="/education/mother" className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900">Mother Education</Link>
                </div>
              </div>
            </div>
            <Link href="/contact" className={getLinkClass("/contact")}>
              Contact Us
            </Link>
            <Link href="/donate" className={getLinkClass("/donate")}>
              Donate
            </Link>
            <Link href="/news" className={getLinkClass("/news")}>
              News
            </Link>
            <Link href="/awards" className={getLinkClass("/awards")}>
              Awards
            </Link>
            <Link href="/announcements" className={getLinkClass("/announcements")}>
              Announcements
            </Link>
            <Link href="/galleries" className={getLinkClass("/galleries")}>
              Event Galleries
            </Link>
          </div>

          <div className="flex items-center px-2 lg:px-0">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="relative" ref={profileRef}>
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="group flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-200/50 transition border border-transparent hover:border-slate-300 cursor-pointer hidden sm:flex"
                  >
                    <div className="w-8 h-8 bg-[#1abc9c] text-white rounded-full flex items-center justify-center font-bold text-xs ring-2 ring-transparent group-hover:ring-[#f6ca15] transition shadow-sm">
                      {(profile?.name || user.email || "U")[0].toUpperCase()}
                    </div>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-[#2d2d2d] rounded-xl shadow-lg py-2 border border-slate-700 text-slate-200 z-50 text-sm font-sans flex flex-col">
                      <div className="px-4 py-3 flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#1abc9c] text-white rounded-full flex items-center justify-center font-semibold text-sm shrink-0">
                          {(profile?.name || user.email || "U")[0].toUpperCase()}
                        </div>
                        <div className="flex flex-col overflow-hidden">
                          <span className="font-semibold text-white truncate">
                            {profile?.name?.toUpperCase() || user.email?.split('@')[0].toUpperCase() || "USER"}
                          </span>
                        </div>
                      </div>
                      
                      <Link href="/profile" onClick={() => setIsProfileOpen(false)} className="w-full px-4 py-2 mt-2 flex items-center gap-3 hover:bg-slate-700/50 transition">
                        <svg className="w-5 h-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        <span>Profile</span>
                      </Link>

                      {profile?.role === "admin" && (
                        <>
                          <Link href="/admin/content" onClick={() => setIsProfileOpen(false)} className="w-full px-4 py-2 flex items-center gap-3 hover:bg-slate-700/50 transition">
                            <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.89 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.89l12.685-12.685z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 7.125L16.862 4.487" /></svg>
                            <span>Manage Content</span>
                          </Link>
                          
                          <Link href="/admin" onClick={() => setIsProfileOpen(false)} className="w-full px-4 py-2 flex items-center gap-3 hover:bg-slate-700/50 transition text-red-400 hover:text-red-300">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>Admin Panel</span>
                          </Link>
                        </>
                      )}

                      <button className="w-full px-4 py-2 mb-1 flex items-center gap-3 hover:bg-slate-700/50 transition border-b border-slate-700/50 pb-3">
                        <svg className="w-5 h-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                        <span>Settings</span>
                      </button>

                      <button onClick={() => { setIsProfileOpen(false); signOut(); }} className="w-full px-4 py-2 mt-1 flex items-center gap-3 hover:bg-slate-700/50 transition">
                        <svg className="w-5 h-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                        <span>Log out</span>
                      </button>
                    </div>
                  )}
                </div>
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

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#FAF9F5] border-t border-slate-200 shadow-lg absolute w-full left-0 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-4 py-4 flex flex-col space-y-4">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-800 font-bold hover:text-[#65992b]">Home</Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-800 font-bold hover:text-[#65992b]">About Us</Link>
            <div className="flex flex-col space-y-2">
              <span className="text-slate-800 font-bold">Education</span>
              <div className="pl-4 flex flex-col space-y-2">
                <Link href="/education/child" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 font-medium hover:text-[#65992b]">Child Education</Link>
                <Link href="/education/mother" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 font-medium hover:text-[#65992b]">Mother Education</Link>
              </div>
            </div>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-800 font-bold hover:text-[#65992b]">Contact Us</Link>
            <Link href="/donate" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-800 font-bold hover:text-[#65992b]">Donate</Link>
            <Link href="/news" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-800 font-bold hover:text-[#65992b]">News</Link>
            <Link href="/awards" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-800 font-bold hover:text-[#65992b]">Awards</Link>
            <Link href="/announcements" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-800 font-bold hover:text-[#65992b]">Announcements</Link>
            <Link href="/galleries" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-800 font-bold hover:text-[#65992b]">Event Galleries</Link>
            
            {user && (
              <div className="pt-4 border-t border-slate-200 flex flex-col space-y-4">
                <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 font-medium hover:text-slate-900">My Profile</Link>
                <button onClick={() => { setIsMobileMenuOpen(false); signOut(); }} className="text-left text-red-600 font-bold hover:text-red-800">
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
