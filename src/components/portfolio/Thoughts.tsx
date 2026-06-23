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
    2,
  );
  return (
    <section id="thoughts" className="mx-auto max-w-6xl px-6 py-12 md:py-32">
      <h2 className="mb-8 text-4xl sm:text-5xl md:text-8xl font-extrabold tracking-tighter md:mb-20">
        Thoughts
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post, i) => (
          <motion.div
            key={post.id ?? post.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <Link
              href={post.id ? `/blogs/${post.id}` : "/blogs"}
              className="group relative block aspect-[3/4] overflow-hidden rounded-3xl"
            >
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                unoptimized
                className="object-cover grayscale transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-[var(--cream)]">
                <p className="text-sm text-[var(--cream)]/70">{post.date}</p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--cream)]/75">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}

        {/* CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="flex aspect-[3/4] flex-col justify-between rounded-3xl bg-[var(--ink)] p-8 text-[var(--cream)]"
        >
          <p className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            See how I build scalable products — explore the blog
          </p>
          <Link
            href="/blogs"
            className="group inline-flex items-center gap-3 text-base font-medium"
          >
            View All Posts
            <span className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--cream)]/30 transition-colors group-hover:bg-[var(--cream)] group-hover:text-[var(--ink)]">
              <ArrowUpRight size={18} />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
