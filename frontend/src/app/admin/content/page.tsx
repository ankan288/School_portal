"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function ManageContentPage() {
  const { user, profile } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"posts" | "comments">("posts");
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [posts, setPosts] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Edit Post State
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editingPost, setEditingPost] = useState<any | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .select("id, title, content, type, status, created_at, profiles(name)")
      .order("created_at", { ascending: false });

    if (!error && data) setPosts(data);
    setLoading(false);
  };

  const fetchComments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("comments")
      .select("id, text, created_at, user_name, post_id, posts(title)")
      .order("created_at", { ascending: false });

    if (!error && data) setComments(data);
    setLoading(false);
  };

  useEffect(() => {
    if (user && profile?.role === "admin") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (activeTab === "posts") { setTimeout(() => fetchPosts(), 0); }
      // eslint-disable-next-line react-hooks/set-state-in-effect
      else { setTimeout(() => fetchComments(), 0); }
    }
  }, [activeTab, user, profile]);

  // Security Gate
  if (!user || profile?.role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-500">
        <div className="bg-slate-50 p-6 rounded-full mb-4">
          <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-slate-900 tracking-tight">Access Denied</h2>
        <p className="text-slate-500">You must be an authorized School Admin to view this area.</p>
        <button onClick={() => router.push("/")} className="mt-8 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 font-medium transition shadow-sm">
          Return Home
        </button>
      </div>
    );
  }

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm("Are you sure you want to permanently delete this comment?")) return;
    setActionLoading(commentId);
    const { error } = await supabase.from("comments").delete().eq("id", commentId);
    if (!error) setComments(prev => prev.filter(c => c.id !== commentId));
    setActionLoading(null);
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm("Warning: Deleting this post will permanently erase it along with all related comments. Proceed?")) return;
    setActionLoading(postId);
    const { error } = await supabase.from("posts").delete().eq("id", postId);
    if (!error) setPosts(prev => prev.filter(p => p.id !== postId));
    setActionLoading(null);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openEditPost = (post: any) => {
    setEditingPost(post);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  const saveEditPost = async () => {
    if (!editingPost) return;
    setActionLoading("save-" + editingPost.id);
    
    const { error } = await supabase
      .from("posts")
      .update({ title: editTitle, content: editContent })
      .eq("id", editingPost.id);

    if (!error) {
      setPosts(prev => prev.map(p => p.id === editingPost.id ? { ...p, title: editTitle, content: editContent } : p));
      setEditingPost(null);
    } else {
      alert("Failed to update post.");
    }
    setActionLoading(null);
  };

  const Badge = ({ type }: { type: string }) => {
    const styles: Record<string, string> = {
      notice: "bg-blue-50 text-blue-700 ring-blue-600/20",
      image: "bg-purple-50 text-purple-700 ring-purple-600/20",
      video: "bg-rose-50 text-rose-700 ring-rose-600/20"
    };
    const applied = styles[type] || "bg-slate-50 text-slate-600 ring-slate-500/10";
    return <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset uppercase tracking-wider ${applied}`}>{type}</span>;
  };

  return (
    <div className="py-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900">
            Content Management
          </h1>
          <p className="mt-2 text-sm text-slate-500 max-w-2xl">
            Keep your portal clean. Edit existing announcements, remove outdated posts, and moderate student or parent comments.
          </p>
        </div>
      </div>

      {/* Modern Tabs */}
      <div className="mb-6 flex space-x-1 rounded-xl bg-slate-100/80 p-1 w-full max-w-md">
        <button
          onClick={() => setActiveTab("posts")}
          className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all outline-none ${
            activeTab === "posts"
              ? "bg-white shadow text-blue-700"
              : "text-slate-600 hover:bg-white/[0.12] hover:text-slate-800"
          }`}
        >
          All Posts
        </button>
        <button
          onClick={() => setActiveTab("comments")}
          className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all outline-none ${
            activeTab === "comments"
              ? "bg-white shadow text-blue-700"
              : "text-slate-600 hover:bg-white/[0.12] hover:text-slate-800"
          }`}
        >
          User Comments
        </button>
      </div>

      {/* Main Table Card */}
      <div className="bg-white shadow-sm ring-1 ring-slate-200 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center flex flex-col items-center justify-center text-slate-400">
            <svg className="animate-spin h-8 w-8 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            <p className="font-medium animate-pulse">Loading {activeTab} data...</p>
          </div>
        ) : activeTab === "posts" ? (
          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider w-[35%]">Post Details</th>
                  <th className="py-3.5 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider w-[45%]">Content Preview</th>
                  <th className="py-3.5 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right w-[20%]">Management</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50/60 transition group">
                    <td className="py-4 px-6 align-top">
                      <p className="text-sm font-semibold text-slate-900 truncate max-w-xs" title={post.title}>{post.title}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <Badge type={post.type} />
                        <span className="text-xs text-slate-500 font-medium">{new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 align-top whitespace-normal">
                      <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">{post.content}</p>
                    </td>
                    <td className="py-4 px-6 align-top text-right">
                      <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openEditPost(post)}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Edit Post"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          disabled={actionLoading === post.id}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                          title="Delete Post"
                        >
                          {actionLoading === post.id ? (
                            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h-8z"></path></svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {posts.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <svg className="w-12 h-12 text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-.2-1l-2-4.5h-4.3A2 2 0 0013 5M19 20h2M9 13h4M9 17h.01" /></svg>
                        <p className="text-slate-500 font-medium">No posts published yet</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider w-[25%]">Comment Author</th>
                  <th className="py-3.5 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider w-[40%]">Message</th>
                  <th className="py-3.5 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider w-[25%]">Origin Post</th>
                  <th className="py-3.5 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right w-[10%]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {comments.map((comment) => (
                  <tr key={comment.id} className="hover:bg-slate-50/60 transition group">
                    <td className="py-4 px-6 align-top">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                          {(comment.user_name || "U")[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 truncate max-w-[150px]">{comment.user_name || "Unknown User"}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{new Date(comment.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 align-top whitespace-normal">
                      <p className="text-sm text-slate-700 break-words leading-relaxed whitespace-pre-wrap">{comment.text}</p>
                    </td>
                    <td className="py-4 px-6 align-top">
                      <span className="text-xs inline-flex px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md font-medium truncate max-w-[180px]" title={comment.posts?.title}>
                        {comment.posts?.title || "Unknown Post"}
                      </span>
                    </td>
                    <td className="py-4 px-6 align-top text-right">
                      <div className="flex items-center justify-end opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          disabled={actionLoading === comment.id}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                          title="Delete Spam/Abuse"
                        >
                          {actionLoading === comment.id ? (
                            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h-8z"></path></svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {comments.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <svg className="w-12 h-12 text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                        <p className="text-slate-500 font-medium">No comments found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Refined Edit Post Modal */}
      {editingPost && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setEditingPost(null)}></div>
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full flex flex-col gap-6 relative transform transition-all overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-900">Edit Post</h2>
              <button onClick={() => setEditingPost(null)} className="text-slate-400 hover:text-slate-600 bg-white hover:bg-slate-100 p-1.5 rounded-full transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <div className="px-6 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">Headline / Title</label>
                <input 
                  type="text" 
                  value={editTitle} 
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-900 bg-slate-50 hover:bg-white focus:bg-white" 
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">Detailed Content</label>
                <textarea 
                  rows={6}
                  value={editContent} 
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-900 bg-slate-50 hover:bg-white focus:bg-white resize-none" 
                />
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3 mt-2">
              <button 
                onClick={() => setEditingPost(null)}
                className="px-5 py-2.5 rounded-xl font-semibold text-slate-600 hover:bg-slate-200 transition"
              >
                Cancel
              </button>
              <button 
                onClick={saveEditPost}
                disabled={actionLoading === "save-" + editingPost.id}
                className="px-6 py-2.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition disabled:opacity-50 flex items-center justify-center min-w-[120px]"
              >
                {actionLoading === "save-" + editingPost.id ? (
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h-8z"></path></svg>
                ) : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}