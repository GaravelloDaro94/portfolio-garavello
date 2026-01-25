import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  tags: string[];
  content: string;
  readTime?: string;
}

export function getAllPosts(): Post[] {
  // Verificar si el directorio existe
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        category: data.category,
        tags: data.tags || [],
        content,
        readTime: data.readTime,
      } as Post;
    });

  // Ordenar posts por fecha
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      category: data.category,
      tags: data.tags || [],
      content,
      readTime: data.readTime,
    } as Post;
  } catch {
    return null;
  }
}

export function getPostsByCategory(category: string): Post[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.category === category);
}

export function getAllCategories(): string[] {
  const allPosts = getAllPosts();
  const categories = allPosts.map(post => post.category);
  return Array.from(new Set(categories));
}
