import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

type PostLocale = "es" | "en";

interface PostLocalizedContent {
  title: string;
  excerpt: string;
  category: string;
  content: string;
  readTime?: string;
}

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  tags: string[];
  content: string;
  readTime?: string;
  translations: Partial<Record<PostLocale, PostLocalizedContent>>;
}

interface PostCollectionItem {
  slug: string;
  date: string;
  tags: string[];
  translations: Partial<Record<PostLocale, PostLocalizedContent>>;
}

function parsePostVariantFileName(fileName: string): { slug: string; locale: PostLocale } | null {
  if (!fileName.endsWith(".md")) {
    return null;
  }

  if (fileName.endsWith(".en.md")) {
    return {
      slug: fileName.replace(/\.en\.md$/, ""),
      locale: "en",
    };
  }

  return {
    slug: fileName.replace(/\.md$/, ""),
    locale: "es",
  };
}

function buildPostsIndex(): Post[] {
  // Verificar si el directorio existe
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory).filter((fileName) => fileName.endsWith(".md"));
  const postsBySlug = new Map<string, PostCollectionItem>();

  for (const fileName of fileNames) {
    const parsed = parsePostVariantFileName(fileName);
    if (!parsed) {
      continue;
    }

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const existing = postsBySlug.get(parsed.slug);
    const postItem: PostCollectionItem = existing ?? {
      slug: parsed.slug,
      date: String(data.date ?? ""),
      tags: Array.isArray(data.tags) ? data.tags : [],
      translations: {},
    };

    if (parsed.locale === "es" || !postItem.date) {
      postItem.date = String(data.date ?? postItem.date ?? "");
    }

    if (parsed.locale === "es" || postItem.tags.length === 0) {
      postItem.tags = Array.isArray(data.tags) ? data.tags : postItem.tags;
    }

    postItem.translations[parsed.locale] = {
      title: String(data.title ?? ""),
      excerpt: String(data.excerpt ?? ""),
      category: String(data.category ?? ""),
      content,
      readTime: data.readTime ? String(data.readTime) : undefined,
    };

    postsBySlug.set(parsed.slug, postItem);
  }

  const allPostsData = Array.from(postsBySlug.values())
    .map((postItem) => {
      const baseContent = postItem.translations.es ?? postItem.translations.en;
      if (!baseContent) {
        return null;
      }

      return {
        slug: postItem.slug,
        title: baseContent.title,
        date: postItem.date,
        excerpt: baseContent.excerpt,
        category: baseContent.category,
        tags: postItem.tags,
        content: baseContent.content,
        readTime: baseContent.readTime,
        translations: postItem.translations,
      } as Post;
    })
    .filter((post): post is Post => post !== null);

  // Ordenar posts por fecha
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    }
    return -1;
  });
}

export function getAllPosts(): Post[] {
  return buildPostsIndex();
}

export function getPostBySlug(slug: string): Post | null {
  const posts = buildPostsIndex();
  return posts.find((post) => post.slug === slug) ?? null;
}

export function getPostsByCategory(category: string): Post[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.category === category);
}

export function getAllCategories(): string[] {
  const allPosts = getAllPosts();
  const categories = allPosts.map((post) => post.category);
  return Array.from(new Set(categories));
}
