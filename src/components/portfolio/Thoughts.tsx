"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { posts as fallbackPosts } from "@/data/posts";
import { useCollectionData } from "@/lib/useCollectionData";
import { COLLECTIONS, type Blog } from "@/lib/types";

export default function Thoughts() {
  const posts = useCollectionData<Blog>(COLLECTIONS.blogs, fallbackPosts).slice(
    0,
    4,
  );

  return (
    <section id="thoughts" className="mx-auto max-w-6xl px-6 py-6 md:py-32">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-6 md:mb-20">
        <h2 className="text-4xl sm:text-5xl md:text-8xl font-extrabold tracking-tighter whitespace-nowrap">
          Thoughts
        </h2>
        <Link
          href="/blogs"
          className="group mt-4 inline-flex items-center gap-3 text-base font-medium"
        >
          View All Blogs / Thoughts
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--ink)]/30 transition-colors group-hover:bg-[var(--ink)] group-hover:text-[var(--cream)]">
            <ArrowUpRight size={18} />
          </span>
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {posts.map((post, i) => (
          <motion.div
            key={post.slug ?? post.id ?? post.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <Link
              href={post.slug ? `/blogs/${post.slug}` : (post.id ? `/blogs/${post.id}` : "/blogs")}
              className="group relative block aspect-[3/4] overflow-hidden rounded-3xl"
            >
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                unoptimized
                className="object-cover grayscale transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-[var(--cream)]">
                <p className="text-sm text-[var(--cream)]/70">{post.date}</p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--cream)]/75 line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
