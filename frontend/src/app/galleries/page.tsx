"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Post {
  id: string;
  title: string;
  content: string;
  type: "image" | "video";
  file_url: string;
  created_at: string;
}

export default function EventGalleriesPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGalleries() {
      setLoading(true);
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, content, type, file_url, created_at, status")
        .in("type", ["image", "video"])
        .order("created_at", { ascending: false });

      if (!error && data) {
        // filter published
        const published = data.filter((post) => !post.status || post.status === "published");
        setPosts(published);
      }
      setLoading(false);
    }
    fetchGalleries();
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#FAF9F5] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight font-serif mb-4">
          Event Galleries
        </h1>
        <p className="text-lg text-slate-600 mb-12 max-w-2xl">
          Browse through the memories and highlights of our recent school events, cultural activities, and sports days.
        </p>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse flex flex-col gap-4 bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
                <div className="w-full h-64 bg-slate-200 rounded-2xl"></div>
                <div className="h-6 w-3/4 bg-slate-200 rounded"></div>
                <div className="h-4 w-1/2 bg-slate-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center">
            <svg className="w-16 h-16 text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No galleries found</h3>
            <p className="text-slate-500">Check back later for new photos and videos.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => {
              const urls = post.file_url ? post.file_url.split(',') : [];
              const firstMedia = urls[0];
              
              return (
                <div key={post.id} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col hover:shadow-md transition">
                  <div className="relative w-full h-64 bg-slate-100 shrink-0">
                    {post.type === "image" && firstMedia && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={firstMedia} alt={post.title} className="w-full h-full object-cover" loading="lazy" />
                    )}
                    {post.type === "video" && firstMedia && (
                      <video src={firstMedia} className="w-full h-full object-cover" />
                    )}
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium tracking-wide">
                      {post.type === "image" ? (urls.length > 1 ? `${urls.length} Photos` : "Photo") : "Video"}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-slate-600 line-clamp-2 text-sm flex-1">{post.content}</p>
                    <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between text-xs text-slate-500 font-medium">
                      <span>{new Date(post.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric'})}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
