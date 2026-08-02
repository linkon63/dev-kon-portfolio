"use client";

import BlogEditor, { type BlogDraft } from "@/components/admin/BlogEditor";

const EMPTY: BlogDraft = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  image: "",
  date: "",
  active: true,
  likes: 0,
  allowLikes: true,
  allowComments: true,
};

export default function CreateBlogPage() {
  return <BlogEditor mode="create" initial={EMPTY} />;
}
