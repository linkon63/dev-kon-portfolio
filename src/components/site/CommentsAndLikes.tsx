"use client";

import React, { useState, useEffect } from "react";
import { Heart, MessageSquare, Send, Loader2 } from "lucide-react";
import type { Comment } from "@/lib/types";

interface CommentsAndLikesProps {
  blogId: string;
  blogSlug: string;
  initialLikes: number;
  allowLikes: boolean;
  allowComments: boolean;
}

export default function CommentsAndLikes({
  blogId,
  blogSlug,
  initialLikes,
  allowLikes,
  allowComments,
}: CommentsAndLikesProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);

  // Main comment form state
  const [mainForm, setMainForm] = useState({ name: "", email: "", content: "" });
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyForm, setReplyForm] = useState({ name: "", email: "", content: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [likesLoading, setLikesLoading] = useState(false);

  // Load initial liked status and cached name/email
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLiked = localStorage.getItem(`liked-${blogSlug}`) === "true";
      setLiked(isLiked);

      const cachedName = localStorage.getItem("comment-name") || "";
      const cachedEmail = localStorage.getItem("comment-email") || "";
      setMainForm((f) => ({ ...f, name: cachedName, email: cachedEmail }));
      setReplyForm((f) => ({ ...f, name: cachedName, email: cachedEmail }));
    }

    if (allowComments) {
      loadComments();
    }
  }, [blogSlug, allowComments]);

  const loadComments = async () => {
    setLoadingComments(true);
    try {
      const res = await fetch(`/api/blogs/${blogSlug}/comments`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch (e) {
      console.error("Failed to load comments:", e);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleLike = async () => {
    if (liked || likesLoading || !allowLikes) return;
    setLikesLoading(true);
    try {
      const res = await fetch(`/api/blogs/${blogSlug}/like`, { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setLikes(data.likes);
        setLiked(true);
        localStorage.setItem(`liked-${blogSlug}`, "true");
      }
    } catch (e) {
      console.error("Failed to like post:", e);
    } finally {
      setLikesLoading(false);
    }
  };

  const onSubmitMainComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setError("");
    const name = mainForm.name.trim();
    const email = mainForm.email.trim();
    const content = mainForm.content.trim();

    if (!name) return setError("Name is required.");
    if (!email || !/\S+@\S+\.\S+/.test(email)) return setError("A valid email is required.");
    if (!content) return setError("Comment message cannot be empty.");

    setSubmitting(true);
    try {
      const res = await fetch(`/api/blogs/${blogSlug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, content }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to post comment.");
      }

      // Cache name & email
      localStorage.setItem("comment-name", name);
      localStorage.setItem("comment-email", email);

      setMainForm((f) => ({ ...f, content: "" }));
      // Reload comments
      await loadComments();
    } catch (err: any) {
      setError(err.message || "Failed to submit comment.");
    } finally {
      setSubmitting(false);
    }
  };

  const onSubmitReply = async (parentId: string) => {
    if (submitting) return;

    setError("");
    const name = replyForm.name.trim();
    const email = replyForm.email.trim();
    const content = replyForm.content.trim();

    if (!name) return setError("Name is required to reply.");
    if (!email || !/\S+@\S+\.\S+/.test(email)) return setError("A valid email is required to reply.");
    if (!content) return setError("Reply message cannot be empty.");

    setSubmitting(true);
    try {
      const res = await fetch(`/api/blogs/${blogSlug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, content, parentId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to post reply.");
      }

      // Cache name & email
      localStorage.setItem("comment-name", name);
      localStorage.setItem("comment-email", email);

      // Reset states
      setActiveReplyId(null);
      setReplyForm((f) => ({ ...f, content: "" }));
      // Reload comments
      await loadComments();
    } catch (err: any) {
      setError(err.message || "Failed to submit reply.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-16 border-t border-[var(--ink)]/10 pt-10">
      {/* Likes Section */}
      {allowLikes && (
        <div className="flex items-center justify-between pb-8 border-b border-[var(--ink)]/10 mb-10">
          <div className="flex items-center gap-3">
            <button
              onClick={handleLike}
              disabled={liked || likesLoading}
              className={`flex items-center justify-center h-12 w-12 rounded-full border border-[var(--ink)]/10 shadow-sm transition-all duration-300 cursor-pointer ${
                liked
                  ? "bg-red-500 border-red-500 text-white"
                  : "bg-[var(--cream)] hover:scale-105 hover:border-[var(--ink)]/30 text-[var(--ink)]"
              } disabled:cursor-not-allowed`}
              title={liked ? "You liked this post" : "Like this post"}
            >
              {likesLoading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Heart size={20} className={liked ? "fill-white" : ""} />
              )}
            </button>
            <div>
              <p className="text-sm font-bold text-[var(--ink)]">{likes} likes</p>
              <p className="text-xs text-[var(--ink)]/55">
                {liked ? "You liked this article." : "Anyone can like this article."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Comments Section */}
      {allowComments ? (
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-[var(--ink)]">
              Discussion
            </h3>
            <p className="text-sm text-[var(--ink)]/55 mt-1">
              Share your thoughts and join the conversation.
            </p>
          </div>

          {/* Discussion List */}
          {loadingComments && comments.length === 0 ? (
            <div className="flex items-center gap-2 text-sm text-[var(--ink)]/55">
              <Loader2 className="animate-spin" size={16} /> Loading discussion...
            </div>
          ) : (
            <div className="space-y-6">
              {comments.map((comment) => (
                <CommentNodeComponent
                  key={comment.id}
                  comment={comment}
                  activeReplyId={activeReplyId}
                  setActiveReplyId={setActiveReplyId}
                  onSubmitReply={onSubmitReply}
                  submitting={submitting}
                  replyForm={replyForm}
                  setReplyForm={setReplyForm}
                />
              ))}
              {comments.length === 0 && (
                <p className="text-sm text-[var(--ink)]/45 italic">
                  No comments yet. Be the first to start the conversation!
                </p>
              )}
            </div>
          )}

          {/* Main Comment Form */}
          <form onSubmit={onSubmitMainComment} className="border-t border-[var(--ink)]/10 pt-8 mt-10">
            <h4 className="text-lg font-bold text-[var(--ink)] mb-4">
              Write a Comment
            </h4>
            <div className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-[var(--ink)]/60 uppercase tracking-wider mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter name"
                    value={mainForm.name}
                    onChange={(e) => {
                      setMainForm({ ...mainForm, name: e.target.value });
                      setReplyForm((rf) => ({ ...rf, name: e.target.value }));
                    }}
                    className="w-full rounded-xl border border-[var(--ink)]/15 px-4 py-2.5 text-sm outline-none focus:border-[var(--ink)] bg-transparent text-[var(--ink)]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--ink)]/60 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Enter email (not published)"
                    value={mainForm.email}
                    onChange={(e) => {
                      setMainForm({ ...mainForm, email: e.target.value });
                      setReplyForm((rf) => ({ ...rf, email: e.target.value }));
                    }}
                    className="w-full rounded-xl border border-[var(--ink)]/15 px-4 py-2.5 text-sm outline-none focus:border-[var(--ink)] bg-transparent text-[var(--ink)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--ink)]/60 uppercase tracking-wider mb-1.5">
                  Message
                </label>
                <textarea
                  required
                  placeholder="Write your comment here..."
                  rows={4}
                  value={mainForm.content}
                  onChange={(e) => setMainForm({ ...mainForm, content: e.target.value })}
                  className="w-full rounded-xl border border-[var(--ink)]/15 px-4 py-3 text-sm outline-none focus:border-[var(--ink)] bg-transparent text-[var(--ink)] resize-none"
                />
              </div>

              {error && <p className="text-xs text-red-500">{error}</p>}

              <div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--ink)] text-[var(--cream)] px-5 py-3 text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="animate-spin" size={16} /> Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Post Comment
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <p className="text-sm text-[var(--ink)]/45 italic py-4">
          Comments are disabled for this article.
        </p>
      )}
    </div>
  );
}

// Recursive Comment Node Component
function CommentNodeComponent({
  comment,
  activeReplyId,
  setActiveReplyId,
  onSubmitReply,
  submitting,
  replyForm,
  setReplyForm,
}: {
  comment: Comment;
  activeReplyId: string | null;
  setActiveReplyId: (id: string | null) => void;
  onSubmitReply: (parentId: string) => Promise<void>;
  submitting: boolean;
  replyForm: { name: string; email: string; content: string };
  setReplyForm: React.Dispatch<React.SetStateAction<{ name: string; email: string; content: string }>>;
}) {
  const isReplying = activeReplyId === comment.id;

  return (
    <div className="space-y-4">
      <div className="group relative rounded-2xl border border-[var(--ink)]/10 bg-[var(--cream)] p-5 hover:border-[var(--ink)]/20 transition-all duration-300 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-bold text-[var(--ink)] text-base">{comment.name}</span>
            <span className="ml-2.5 text-xs text-[var(--ink)]/40">
              {new Date(comment.createdAt!).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
        <p className="mt-3 text-[var(--ink)]/80 leading-relaxed text-sm whitespace-pre-wrap">
          {comment.content}
        </p>

        {/* Reply Trigger */}
        <div className="mt-4 flex items-center gap-4">
          <button
            type="button"
            onClick={() => {
              if (isReplying) {
                setActiveReplyId(null);
              } else {
                setActiveReplyId(comment.id!);
                setReplyForm((f) => ({ ...f, content: "" }));
              }
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ink)]/60 hover:text-[var(--ink)] transition-colors cursor-pointer"
          >
            <MessageSquare size={13} />
            Reply
          </button>
        </div>

        {/* Reply Form */}
        {isReplying && (
          <div className="mt-4 border-t border-[var(--ink)]/10 pt-4">
            <h4 className="text-xs font-bold text-[var(--ink)]/70 uppercase tracking-wider mb-3">
              Reply to {comment.name}
            </h4>
            <div className="grid gap-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={replyForm.name}
                  onChange={(e) => setReplyForm({ ...replyForm, name: e.target.value })}
                  className="w-full rounded-lg border border-[var(--ink)]/15 px-3 py-2 text-xs outline-none focus:border-[var(--ink)] bg-transparent text-[var(--ink)]"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={replyForm.email}
                  onChange={(e) => setReplyForm({ ...replyForm, email: e.target.value })}
                  className="w-full rounded-lg border border-[var(--ink)]/15 px-3 py-2 text-xs outline-none focus:border-[var(--ink)] bg-transparent text-[var(--ink)]"
                />
              </div>
              <textarea
                placeholder="Write your reply..."
                rows={3}
                value={replyForm.content}
                onChange={(e) => setReplyForm({ ...replyForm, content: e.target.value })}
                className="w-full rounded-lg border border-[var(--ink)]/15 px-3 py-2 text-xs outline-none focus:border-[var(--ink)] bg-transparent text-[var(--ink)] resize-none"
              />
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setActiveReplyId(null)}
                  className="rounded-lg border border-[var(--ink)]/15 px-3 py-1.5 text-xs hover:bg-[var(--ink)]/5 transition-colors cursor-pointer text-[var(--ink)]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => onSubmitReply(comment.id!)}
                  className="rounded-lg bg-[var(--ink)] text-[var(--cream)] px-3.5 py-1.5 text-xs font-bold hover:opacity-90 disabled:opacity-50 transition-opacity cursor-pointer flex items-center gap-1.5"
                >
                  Post Reply
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Child replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-6 md:ml-10 border-l-2 border-[var(--ink)]/10 pl-4 md:pl-6 space-y-4">
          {comment.replies.map((reply) => (
            <CommentNodeComponent
              key={reply.id}
              comment={reply}
              activeReplyId={activeReplyId}
              setActiveReplyId={setActiveReplyId}
              onSubmitReply={onSubmitReply}
              submitting={submitting}
              replyForm={replyForm}
              setReplyForm={setReplyForm}
            />
          ))}
        </div>
      )}
    </div>
  );
}
