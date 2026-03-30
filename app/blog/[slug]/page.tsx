import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import LoadingAnimation from '@/app/components/animations/LoadingAnimation';
import DynamicBackground from '@/app/components/layout/DynamicBackground';
import BlogPostClient from '../BlogPostClient';

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
      <BlogPostClient post={post} />
    </>
  );
}
