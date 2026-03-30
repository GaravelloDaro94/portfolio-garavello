import { getAllPosts } from '@/lib/posts';
import DynamicBackground from '../components/layout/DynamicBackground';
import LoadingAnimation from '../components/animations/LoadingAnimation';
import BlogPageClient from './BlogPageClient';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <LoadingAnimation />
      <DynamicBackground />
      <BlogPageClient posts={posts} />
    </>
  );
}
