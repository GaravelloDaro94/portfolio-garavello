import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import DynamicBackground from '../components/layout/DynamicBackground';
import LoadingAnimation from '../components/animations/LoadingAnimation';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <LoadingAnimation />
      <DynamicBackground />
      <div className="min-h-screen py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-pink dark:text-dark-blue-pastel hover:text-light-text dark:hover:text-dark-smoke mb-6 transition-colors"
          >
            ← Volver al inicio
          </Link>
          <h1 className="text-5xl md:text-6xl font-bold text-light-text dark:text-dark-smoke mb-4">
            Blog Técnico
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Artículos sobre desarrollo web, tecnologías y mejores prácticas
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Próximamente publicaré artículos técnicos sobre desarrollo web.
            </p>
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
                  <h2 className="text-xl sm:text-2xl font-bold text-light-text dark:text-dark-smoke mb-3 group-hover:text-pink dark:group-hover:text-dark-blue-pastel transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                    {post.excerpt}
                  </p>
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
    </>
  );
}
