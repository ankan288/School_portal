"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, profile, loading, refreshProfile } = useAuth();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (profile) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEditName(profile.name || "");
    }
  }, [profile]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-500">
        <svg className="animate-spin h-8 w-8 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="font-medium animate-pulse">Loading Profile...</p>
      </div>
    );
  }

  if (!user || !profile) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) {
      setMessage({ text: "Name cannot be empty", type: "error" });
      return;
    }

    setSaveLoading(true);
    setMessage(null);

    const { error } = await supabase
      .from("profiles")
      .update({ name: editName.trim() })
      .eq("id", user.id);

    if (error) {
      setMessage({ text: "Failed to update profile", type: "error" });
    } else {
      await refreshProfile();
      setMessage({ text: "Profile updated successfully!", type: "success" });
      setIsEditing(false);
    }
    
    setSaveLoading(false);
  };

  return (
    <div className="py-12 max-w-3xl mx-auto w-full px-4 sm:px-6">
      {/* Header section */}
      <div className="mb-8 flex items-center gap-4">
        <button 
          onClick={() => router.back()}
          className="p-2.5 bg-white border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition shadow-sm"
          title="Go Back"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
        </button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Account Profile
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Manage your personal settings and profile information.
          </p>
        </div>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white shadow-sm ring-1 ring-slate-200 rounded-2xl overflow-hidden p-8 sm:p-10">
        <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center border-b border-slate-100 pb-8 mb-8">
          <div className="w-24 h-24 bg-gradient-to-tr from-blue-100 to-indigo-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-4xl shadow-sm ring-4 ring-white shrink-0">
            {(profile.name || user.email || "U")[0].toUpperCase()}
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            <h2 className="text-2xl font-bold text-slate-900">
              {profile.name || "Set your name"}
            </h2>
            <p className="text-slate-500 font-medium">
              {user.email}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold ring-1 ring-inset uppercase tracking-wider ${
                profile.role === "admin" 
                  ? "bg-rose-50 text-rose-700 ring-rose-600/20" 
                  : "bg-blue-50 text-blue-700 ring-blue-600/20"
              }`}>
                {profile.role.toUpperCase()}
              </span>
            </div>
          </div>
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="mt-4 sm:mt-0 px-5 py-2.5 bg-white border border-slate-200 shadow-sm text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition flex items-center gap-2 text-sm"
            >
              <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              Edit Profile
            </button>
          )}
        </div>

        {/* Message Banner */}
        {message && (
          <div className={`p-4 rounded-xl mb-6 flex items-center gap-3 ${
            message.type === "success" 
            ? "bg-green-50 text-green-800 border border-green-200" 
            : "bg-red-50 text-red-800 border border-red-200"
          }`}>
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {message.type === "success" 
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              }
            </svg>
            <p className="font-medium text-sm">{message.text}</p>
          </div>
        )}

        {/* Form Container */}
        {isEditing ? (
          <form onSubmit={handleSave} className="flex flex-col gap-6 w-full max-w-md animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-semibold text-slate-700">Display Name / Username</label>
              <input 
                id="name"
                type="text" 
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                autoFocus
                className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-900 bg-slate-50 hover:bg-white focus:bg-white"
                placeholder="Enter your name"
              />
            </div>
            
            <div className="flex flex-col gap-2 opacity-60">
              <label className="text-sm font-semibold text-slate-700">Email Address (Read-only)</label>
              <input 
                type="email" 
                value={user.email || ""}
                disabled
                className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-100 text-slate-500 cursor-not-allowed"
              />
              <p className="text-xs text-slate-500 mt-1">Contact an administrator to change your email address.</p>
            </div>

            <div className="flex gap-3 mt-4">
              <button 
                type="submit"
                disabled={saveLoading}
                className="flex-1 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 shadow-sm transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {saveLoading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h-8z"></path>
                    </svg>
                    Saving...
                  </>
                ) : "Save Changes"}
              </button>
              <button 
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setEditName(profile.name || "");
                  setMessage(null);
                }}
                className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-medium hover:bg-slate-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col gap-6 max-w-md">
             <div className="flex flex-col gap-2 pb-5 border-b border-slate-100">
               <span className="text-sm font-semibold text-slate-500">Display Name / Username</span>
               <span className="text-lg font-medium text-slate-900">{profile.name || "Not set"}</span>
             </div>
             
             <div className="flex flex-col gap-2 pb-5 border-b border-slate-100">
               <span className="text-sm font-semibold text-slate-500">Email Address</span>
               <span className="text-lg font-medium text-slate-900">{user.email || "Not set"}</span>
             </div>

             <div className="flex flex-col gap-2">
               <span className="text-sm font-semibold text-slate-500">Account Role</span>
               <span className="text-lg font-medium text-slate-900 capitalize flex items-center gap-2">
                 {profile.role}
                 {profile.role === 'admin' && (
                    <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                 )}
               </span>
               <p className="text-xs text-slate-500 mt-1">
                 {profile.role === 'admin' ? "You have elevated privileges to moderate and manage portal content." : "Standard user account with standard permissions."}
               </p>
             </div>
             
             <div className="pt-6 border-t border-slate-100 mt-2 flex justify-start">
               <button 
                 onClick={async () => {
                   router.push("/");
                   await refreshProfile(); // Just to ensure clean state
                 }}
                 className="hidden px-5 py-2.5 rounded-xl font-medium transition flex items-center gap-2"
               ></button>
               <button 
                 onClick={async () => {
                    // Placeholder for future profile-specific logic
                 }}
                 className="hidden"
               ></button> 
             </div>
          </div>
        )}
      </div>
    </div>
  );
}