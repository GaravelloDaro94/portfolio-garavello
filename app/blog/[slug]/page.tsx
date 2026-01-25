import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import LoadingAnimation from '@/app/components/animations/LoadingAnimation';
import DynamicBackground from '@/app/components/layout/DynamicBackground';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: { readonly params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <LoadingAnimation />
      <DynamicBackground />
      <div className="min-h-screen py-20 px-6 relative z-10">
      <article className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-pink dark:text-dark-blue-pastel hover:text-light-text dark:hover:text-dark-smoke mb-8 transition-colors"
        >
          ← Volver al blog
        </Link>

        {/* Post Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-mint dark:bg-dark-blue-gray text-light-text dark:text-gray-300 text-sm rounded-full">
              {post.category}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(post.date).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            {post.readTime && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                • {post.readTime}
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-light-text dark:text-dark-smoke mb-4">
            {post.title}
          </h1>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-light-border dark:bg-dark-medium text-gray-600 dark:text-gray-400 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Post Content */}
        <div className="rounded-2xl p-6 sm:p-8 bg-white/30 dark:bg-dark-medium/40 backdrop-blur-sm shadow-md shadow-gray-300/50 dark:shadow-black/50">
          <style dangerouslySetInnerHTML={{__html: `
            .blog-content h1,
            .blog-content h2,
            .blog-content h3,
            .blog-content h4,
            .blog-content h5,
            .blog-content h6 {
              font-weight: 700 !important;
              margin-top: 2rem !important;
              margin-bottom: 1rem !important;
            }
            
            .blog-content h1 { font-size: 1.5rem !important; }
            .blog-content h2 { font-size: 1.375rem !important; }
            .blog-content h3 { font-size: 1.25rem !important; }
            .blog-content h4 { font-size: 1.125rem !important; }
            
            .blog-content pre {
              background-color: #1e1e1e !important;
              border: 2px solid #333333 !important;
              border-radius: 0.5rem !important;
              padding: 1rem !important;
              overflow-x: auto !important;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
            }
            
            .blog-content pre code {
              background-color: transparent !important;
              color: #d4d4d4 !important;
              padding: 0 !important;
              font-family: 'Courier New', monospace !important;
              font-size: 0.875rem !important;
            }
            
            .blog-content code:not(pre code) {
              background-color: rgba(156, 200, 255, 0.2) !important;
              color: #FF6B9D !important;
              padding: 0.125rem 0.25rem !important;
              border-radius: 0.25rem !important;
              font-family: 'Courier New', monospace !important;
            }
            
            .dark .blog-content code:not(pre code) {
              background-color: rgba(45, 55, 72, 0.8) !important;
              color: #9AC8FF !important;
            }
          `}} />
          <div className="blog-content prose prose-lg dark:prose-invert max-w-none
            prose-headings:text-light-text dark:prose-headings:text-dark-smoke
            prose-p:text-gray-700 dark:prose-p:text-gray-300
            prose-a:text-pink dark:prose-a:text-dark-blue-pastel prose-a:no-underline hover:prose-a:text-light-text dark:hover:prose-a:text-dark-smoke
            prose-strong:text-light-text dark:prose-strong:text-dark-smoke prose-strong:font-bold
            prose-ul:text-gray-700 dark:prose-ul:text-gray-300
            prose-ol:text-gray-700 dark:prose-ol:text-gray-300
            prose-li:marker:text-pink dark:prose-li:marker:text-dark-blue-pastel
            prose-blockquote:border-l-pink dark:prose-blockquote:border-l-dark-blue-pastel prose-blockquote:bg-mint/10 dark:prose-blockquote:bg-dark-medium/50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
            prose-img:rounded-xl prose-img:border-2 prose-img:border-light-border dark:prose-img:border-dark-medium
          ">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>
    </div>
    </>
  );
}
