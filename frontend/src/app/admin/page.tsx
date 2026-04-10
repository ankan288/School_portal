"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const { user, profile } = useAuth();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState<"notice" | "image" | "video">("notice");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Security Gate (mock checking for role, usually validated via JWT / RLS)
  if (!user || profile?.role !== "admin") {
    return (
      <div className="flex flex-col items-center py-20 text-slate-500">
        <h2 className="text-xl font-bold mb-2 text-slate-900">Access Denied</h2>
        <p>You must be an authorized School Admin to view this page.</p>
        <button
          onClick={() => router.push("/")}
          className="mt-6 text-blue-600 font-medium hover:underline"
        >
          Return Home
        </button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent, submitStatus: "published" | "draft" | "scheduled") => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    setSuccess(false);

    const fileUrls: string[] = [];

    if (files.length > 0 && (type === "image" || type === "video")) {
      const bucket = type === "image" ? "images" : "videos";
      
      for (const f of files) {
        const fileExt = f.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(filePath, f);

        if (uploadError) {
          console.error("Upload error:", uploadError);
          alert(`Failed to upload ${type}: ${uploadError.message}`);
          setLoading(false);
          return;
        }

        if (uploadData) {
          const { data: publicUrlData } = supabase.storage
            .from(bucket)
            .getPublicUrl(filePath);
          fileUrls.push(publicUrlData.publicUrl);
        }
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload: any = {
      title,
      content,
      type,
      user_id: user.id,
      status: submitStatus,
      published_at: submitStatus === "published" ? new Date().toISOString() : null,
    };

    if (fileUrls.length > 0) payload.file_url = fileUrls.join(',');

    const { error } = await supabase.from("posts").insert([payload]);

    setLoading(false);

    if (error) {
      console.error(error);
      alert(`Failed to create post: ${error.message}`);
    } else {
      setSuccess(true);
      setTitle("");
      setContent("");
      setType("notice");
      setFiles([]);
    }
  };

  return (
    <div className="flex flex-col gap-8 py-8 max-w-3xl mx-auto w-full">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Admin Dashboard
        </h1>
        <p className="text-lg text-slate-500">
          Publish new school announcements, galleries, or videos to the feed.
        </p>
      </header>

      <form className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 flex flex-col gap-6">
        {success && (
          <div className="bg-green-50 text-green-700 p-4 rounded-md text-sm border border-green-100">
            Post published successfully! Students and parents can now view it on the feed.
          </div>
        )}

        <div className="flex gap-6 border-b border-slate-100 pb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              name="type" 
              value="notice" 
              checked={type === "notice"} 
              onChange={() => setType("notice")}
              className="text-blue-600 focus:ring-blue-500 w-4 h-4"
            />
            <span className="text-slate-700 font-medium">Text Notice</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              name="type" 
              value="image" 
              checked={type === "image"} 
              onChange={() => setType("image")}
              className="text-blue-600 focus:ring-blue-500 w-4 h-4"
            />
            <span className="text-slate-700 font-medium">Event Gallery</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              name="type" 
              value="video" 
              checked={type === "video"} 
              onChange={() => setType("video")}
              className="text-blue-600 focus:ring-blue-500 w-4 h-4"
            />
            <span className="text-slate-700 font-medium">Video Highlight</span>
          </label>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700">Headline / Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-slate-300 rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50 focus:bg-white transition text-slate-900"
            placeholder="e.g. Upcoming Parent-Teacher Conference"
          />
        </div>

        {(type === "image" || type === "video") && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">Media Upload</label>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 flex flex-col items-center justify-center text-slate-500 bg-slate-50 hover:bg-slate-100 transition cursor-pointer relative">
              {files.length > 0 ? (
                <div className="flex flex-col items-center gap-2">
                  <span className="font-medium text-slate-800">{files.length} file(s) selected</span>
                  <div className="text-xs text-slate-500 max-w-xs text-center truncate">
                    {files.map(f => f.name).join(', ')}
                  </div>
                </div>
              ) : (
                <>
                  <span>Click to browse or drag and drop files</span>
                  <span className="text-xs mt-1 text-slate-400">
                    {type === "image" ? "PNG, JPG up to 10MB (Multiple allowed)" : "MP4 up to 50MB"}   
                  </span>
                </>
              )}
              <input
                type="file"
                multiple={type === "image"}
                accept={type === "image" ? "image/*" : "video/*"}
                onChange={(e) => {
                  if (e.target.files) {
                    setFiles(Array.from(e.target.files));
                  }
                }}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700">Content Details</label>
          <textarea
            required
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50 focus:bg-white transition text-slate-900 resize-none"
            placeholder="Provide context, dates, and instructions here..."
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onClick={(e) => handleSubmit(e as any, "draft")}
            disabled={loading || !title || !content}
            className="px-6 py-2.5 rounded-lg text-slate-600 font-medium hover:bg-slate-100 transition disabled:opacity-50"
          >
            Save as Draft
          </button>
          <button
            type="button"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onClick={(e) => handleSubmit(e as any, "published")}
            disabled={loading || !title || !content}
            className="px-8 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition disabled:opacity-50 shadow-sm"
          >
            {loading ? "Publishing..." : "Publish Post"}
          </button>
        </div>
      </form>
    </div>
  );
}