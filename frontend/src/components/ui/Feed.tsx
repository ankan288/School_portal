"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";

interface Post {
  id: string;
  title: string;
  content: string;
  type: "notice" | "image" | "video";
  file_url?: string;
  status?: string;
  created_at: string;
  likes_count?: number;
  comments_count?: number;
  author: { full_name: string } | null;
}

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [commentsData, setCommentsData] = useState<Record<string, any[]>>({});
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [isLiking, setIsLiking] = useState<Record<string, boolean>>({});
  const { user, setAuthModalOpen } = useAuth();

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .select("id, title, content, type, file_url, status, created_at, likes_count, comments_count, profiles(name)")
    if (error) {
      console.error("Supabase fetch error:", error);
    }
    if (!error && data) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let mapped = data.map((d: any) => ({
        ...d,
        author: d.profiles ? { full_name: d.profiles.name } : null
      }));
      if (user?.user_metadata?.role !== "admin") {
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         mapped = mapped.filter((post: any) => !post.status || post.status === "published");
      }
      setPosts(mapped);

      if (user) {
        const { data: userLikes } = await supabase
          .from('likes')
          .select('post_id')
          .eq('user_id', user.id);
        
        if (userLikes) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setLikedPosts(new Set(userLikes.map((l: any) => l.post_id)));
        }
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const handleLike = async (postId: string) => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    
    if (isLiking[postId] || likedPosts.has(postId)) {
      return; // prevent multi-click or re-liking if they just did it
    }

    setIsLiking(prev => ({ ...prev, [postId]: true }));

    // Optimistic UI update
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, likes_count: (p.likes_count || 0) + 1 } : p));
    setLikedPosts(prev => new Set(prev).add(postId));
    
    const { error } = await supabase.from('likes').insert([{ post_id: postId, user_id: user.id }]);
    if (error) {
      // Revert if error
      console.log('Like error:', error.message);
      setPosts(prev => prev.map(p => p.id === postId ? { ...p, likes_count: Math.max(0, (p.likes_count || 0) - 1) } : p));
      setLikedPosts(prev => {
        const next = new Set(prev);
        next.delete(postId);
        return next;
      });
    }

    setIsLiking(prev => ({ ...prev, [postId]: false }));
  };

  const handleComment = async (postId: string) => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    
    // Toggle UI visibility
    setExpandedComments(prev => ({ ...prev, [postId]: !prev[postId] }));
    
    // Fetch comments if expanding and not fetched yet
    if (!expandedComments[postId] && !commentsData[postId]) {
      const { data, error } = await supabase
        .from('comments')
        .select('id, text, created_at, user_name, profiles(name)')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });
        
      if (!error && data) {
        setCommentsData(prev => ({ ...prev, [postId]: data }));
      }
    }
  };

  const submitComment = async (postId: string) => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    const commentText = commentInputs[postId]?.trim();
    if (!commentText) return;
    
    // Optimistic UI updates
    const tempComment = {
      id: "temp-" + Date.now().toString(),
      text: commentText,
      created_at: new Date().toISOString(),
      profiles: { name: user.user_metadata?.full_name || user.email?.split('@')[0] || "You" }
    };
    
    setCommentsData(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), tempComment]
    }));
    setCommentInputs(prev => ({ ...prev, [postId]: "" }));
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, comments_count: (p.comments_count || 0) + 1 } : p));
    
    // DB insert
    const { error } = await supabase.from('comments').insert([
      { 
        post_id: postId, 
        user_id: user.id, 
        text: commentText,
        user_name: user.user_metadata?.full_name || user.email?.split('@')[0] || "User"
      }
    ]);
    
    if (error) {
      console.error('Comment submit error:', error);
    } else {
      // Re-fetch to get correct IDs
      const { data } = await supabase
        .from('comments')
        .select('id, text, created_at, user_name, profiles(name)')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });
        
      if (data) {
        setCommentsData(prev => ({ ...prev, [postId]: data }));
      }
    }
  };

  if (loading) {
    return (
      <section className="flex flex-col gap-8 w-full max-w-3xl mx-auto">
        {[1, 2, 3].map((skeleton) => (
          <div key={skeleton} className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8 flex flex-col gap-4">
            <div className="flex items-center gap-3 mb-2">
               <div className="w-10 h-10 rounded-full bg-slate-200 animate-pulse"></div>
               <div>
                 <div className="h-4 w-32 bg-slate-200 animate-pulse rounded mb-2"></div>
                 <div className="h-3 w-20 bg-slate-100 animate-pulse rounded"></div>
               </div>
            </div>
            <div className="h-4 w-full bg-slate-100 animate-pulse rounded mt-2"></div>
            <div className="h-4 w-5/6 bg-slate-100 animate-pulse rounded"></div>
            <div className="h-64 w-full bg-slate-100 animate-pulse rounded-2xl mt-4"></div>
          </div>
        ))}
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center max-w-3xl mx-auto w-full">
        <div className="w-20 h-20 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-.2-1l-2-4.5h-4.3A2 2 0 0013 5M19 20h2M9 13h4M9 17h.01"></path></svg>
        </div>
        <h3 className="text-2xl font-bold text-slate-900">No updates yet</h3>
        <p className="text-slate-500 mt-3 max-w-md text-lg">
          Everything is quiet for now. Check back later for new announcements and updates.
        </p>
      </div>
    );
  }

  const mediaPosts = posts.filter(p => p.type === "image" || p.type === "video");
  const noticePosts = posts.filter(p => p.type === "notice");

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-[90rem] mx-auto items-start">
      {/* Left Column - Media Posts */}
      <section className="flex-1 flex flex-col gap-8 w-full">
        {mediaPosts.length === 0 && (
          <div className="text-center py-12 bg-white rounded-[2rem] shadow-sm border border-slate-200/60 p-8">
            <h3 className="text-xl font-bold text-slate-900">No Media Posts</h3>
          </div>
        )}
        {mediaPosts.map((post) => (
          <article key={post.id} className="bg-white rounded-[2rem] shadow-sm border border-slate-200/60 p-5 sm:p-8 flex flex-col gap-5 transition hover:shadow-md">
            {/* Header */}
            <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-lg shrink-0">
                {post.author?.full_name?.charAt(0) || "A"}
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                  {post.author?.full_name || "Admin"}
                </h2>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mt-0.5">
                  <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  <span>•</span>
                  <span className="capitalize">{post.type}</span>
                </div>
              </div>
            </div>
            
            <button className="text-slate-400 hover:text-slate-600 p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
            </button>
          </div>
          
          {/* Content */}
          <div className="break-words">
            <h3 className="text-xl font-bold text-slate-900 mb-2 break-words max-w-full overflow-hidden">{post.title}</h3>
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed whitespace-pre-wrap break-words max-w-full overflow-hidden">
              {post.content}
            </p>
          </div>

          {/* Media */}
          {post.file_url && post.type === "image" && (() => {
            const urls = post.file_url.split(',');
            return (
              <div className={`mt-2 grid gap-2 ${urls.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                {urls.map((url, i) => (
                  <div key={i} className="relative w-full rounded-3xl overflow-hidden bg-slate-100 border border-slate-100">
                    <img src={url} alt={`${post.title} image ${i + 1}`} className="object-cover w-full h-auto max-h-[600px] hover:scale-105 transition-transform duration-300" loading="lazy" />
                  </div>
                ))}
              </div>
            );
          })()}

          {post.file_url && post.type === "video" && (
            <div className="relative w-full rounded-3xl overflow-hidden bg-slate-900 mt-2">
              <video src={post.file_url.split(',')[0]} controls className="object-cover w-full max-h-[600px]" />
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-4 mt-2">
            <div className="flex items-center gap-6">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center gap-2 text-base font-medium transition ${likedPosts.has(post.id) ? 'text-red-500' : 'text-slate-500 hover:text-red-500'}`}
              >
                <svg className={`w-6 h-6 ${likedPosts.has(post.id) ? 'fill-current' : 'fill-none'}`} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                {post.likes_count || 0} Likes
              </button>
              <button
                onClick={() => handleComment(post.id)}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-900 text-base font-medium transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                {post.comments_count || 0} Comments
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="text-slate-500 hover:text-slate-900 transition flex items-center gap-2 font-medium">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>
          </div>

          {expandedComments[post.id] && (
            <div className="mt-2 pt-4 border-t border-slate-100 flex flex-col gap-3">
              <div className="max-h-60 overflow-y-auto pr-1 flex flex-col gap-3 custom-scrollbar">
                {commentsData[post.id]?.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-2">No comments yet. Be the first!</p>
                ) : (
                  commentsData[post.id]?.map((comment, index) => (
                    <div key={comment.id || index} className="flex flex-col mb-1">
                      <span className="text-xs font-semibold text-slate-700">{comment.user_name || comment.profiles?.name || "User"}</span>
                      <span className="text-sm text-slate-600 bg-slate-50 p-2 rounded-lg inline-block w-full break-words max-w-full">{comment.text}</span>
                    </div>
                  ))
                )}
              </div>
              
              {user && (
                <div className="flex gap-2 mt-2">
                  <input 
                    type="text" 
                    value={commentInputs[post.id] || ""}
                    onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                    placeholder="Write a comment..."
                    className="flex-1 text-sm border-slate-200 border rounded-xl px-4 py-2 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition"
                    onKeyDown={(e) => e.key === "Enter" && submitComment(post.id)}
                  />
                  <button 
                    onClick={() => submitComment(post.id)}
                    className="bg-slate-900 text-white text-xs px-5 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition"
                  >
                    Post
                  </button>
                </div>
              )}
            </div>
          )}
        </article>
      ))}
      </section>

      {/* Right Sidebar - Notice Posts */}
      <aside className="w-full lg:w-[400px] xl:w-[450px] shrink-0 sticky top-24 flex flex-col gap-6">
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200/60 p-6 sm:p-8 flex flex-col gap-6 w-full">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 font-serif">Notices & Updates</h3>
            <button className="text-slate-400 hover:text-slate-900 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
            </button>
          </div>
          
          <div className="flex flex-col gap-6 max-h-[calc(100vh-16rem)] overflow-y-auto pr-2 custom-scrollbar">
            {noticePosts.length === 0 && (
              <p className="text-sm text-slate-500 text-center py-4">No recent notices</p>
            )}
            {noticePosts.map((post) => (
              <article key={post.id} className="flex gap-4 items-start group">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-900 flex items-center justify-center font-bold text-sm shrink-0 border border-slate-200">
                  {post.author?.full_name?.charAt(0) || "A"}
                </div>
                <div className="flex-1 flex flex-col gap-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">
                       {post.author?.full_name || "Admin"}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap shrink-0">
                      {new Date(post.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-800 line-clamp-1 mb-0.5">{post.title}</p>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 break-words">
                    {post.content}
                  </p>
                  
                  <div className="flex gap-3 mt-2">
                     <button
                        onClick={() => handleLike(post.id)}
                        className={`text-[10px] font-bold px-3 py-1 rounded-full border transition ${
                          likedPosts.has(post.id) 
                            ? 'bg-rose-50 text-rose-600 border-rose-200' 
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {likedPosts.has(post.id) ? 'Liked' : 'Like'} ({post.likes_count || 0})
                      </button>
                      <button
                        onClick={() => handleComment(post.id)}
                        className="text-[10px] font-bold px-3 py-1 rounded-full bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 transition"
                      >
                         Comment ({post.comments_count || 0})
                      </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
