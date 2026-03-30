"use client";

import Link from "next/link";
import { useI18n } from "@/app/hooks/useI18n";
import LanguageToggle from "@/app/components/layout/LanguageToggle";

type BlogPostPreview = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  tags: string[];
  readTime?: string;
};

interface BlogPageClientProps {
  posts: BlogPostPreview[];
}

export default function BlogPageClient({ posts }: Readonly<BlogPageClientProps>) {
  const { language, t } = useI18n();
  const dateLocale = language === "en" ? "en-US" : "es-AR";

  return (
    <div className="min-h-screen py-20 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 flex justify-end">
          <LanguageToggle />
        </div>

        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-dark-charcoal dark:text-dark-blue-pastel hover:text-light-text dark:hover:text-dark-smoke mb-6 transition-colors"
          >
            {"<-"} {t.blog.list.backHome}
          </Link>
          <h1 className="text-5xl md:text-6xl font-bold text-light-text dark:text-dark-smoke mb-4">
            {t.blog.list.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">{t.blog.list.subtitle}</p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 dark:text-gray-400 text-lg">{t.blog.list.empty}</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block rounded-2xl p-6 sm:p-8 hover:bg-yellow/10 dark:hover:bg-dark-blue-pastel/10 transition-all bg-white/30 dark:bg-dark-medium/40 backdrop-blur-sm shadow-md shadow-gray-300/50 dark:shadow-black/50 hover:shadow-xl hover:shadow-yellow/30 dark:hover:shadow-dark-blue-pastel/30"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-mint dark:bg-dark-blue-gray text-light-text dark:text-gray-300 text-sm rounded-full">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(post.date).toLocaleDateString(dateLocale, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  {post.readTime && (
                    <span className="text-sm text-gray-500 dark:text-gray-400">• {post.readTime}</span>
                  )}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-light-text dark:text-dark-smoke mb-3 group-hover:text-dark-charcoal dark:group-hover:text-dark-blue-pastel transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">{post.excerpt}</p>
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 bg-mint/50 dark:bg-dark-blue-gray/50 text-light-text dark:text-gray-400 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
