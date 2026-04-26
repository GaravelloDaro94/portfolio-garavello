"use client";

import type { StaticImageData } from "next/image";
import movieTheaterImage from "../assets/movie-theater.png";
import liviaAccesoriosImage from "../assets/livia-accesorios.png";
import eventraImage from "../assets/eventra.png";
import { useI18n } from "./useI18n";

export interface ProjectRepoUrl {
  label: string;
  url: string;
}

export interface ProjectMobileLinks {
  expoGo: string;
  apk: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  demoUrl: string;
  repoUrls: ProjectRepoUrl[];
  imageUrl: StaticImageData | null;
  mobileLinks?: ProjectMobileLinks;
}

export function useProjects(): Project[] {
  const { t } = useI18n();

  return [
    {
      id: "ecommerce-platform",
      title: t.projects.items["ecommerce-platform"].title,
      description: t.projects.items["ecommerce-platform"].description,
      tags: ["Nextjs", "Node.js", "Supabase", "PostgreSQL", "Tailwind CSS", "Monolito"],
      demoUrl: "https://www.liviaccesorios.com.ar/",
      repoUrls: [{ label: "Repo", url: "https://gitlab.com/garavello.manuel/livia-accesorios" }],
      imageUrl: liviaAccesoriosImage,
    },
    {
      id: "task-management-app",
      title: t.projects.items["task-management-app"].title,
      description: t.projects.items["task-management-app"].description,
      tags: [
        "Expo",
        "React Native",
        "Zustand",
        "SQLite",
        "PostgreSQL",
        "Socket.IO",
        "Prisma",
        "Railway",
      ],
      demoUrl: "",
      repoUrls: [],
      imageUrl: null,
      mobileLinks: {
        expoGo: "https://expo.dev/@dario.garavello/to-do-getter",
        apk: "https://expo.dev/artifacts/eas/eTh47NcBEEApJtLZMasQdm.apk",
      },
    },
    {
      id: "eventra-platform",
      title: t.projects.items["eventra-platform"].title,
      description: t.projects.items["eventra-platform"].description,
      tags: ["Laravel", "PHP", "MySQL", "Redis", "Docker", "Vite", "React"],
      demoUrl: "https://eventra-ui.vercel.app/",
      repoUrls: [
        { label: "Backend", url: "https://gitlab.com/garavello.manuel/eventra-platform" },
        { label: "Frontend", url: "https://gitlab.com/garavello.manuel/eventra-ui" },
        { label: "Swagger", url: "https://eventra-platform-demo.fly.dev/api/documentation" },
      ],
      imageUrl: eventraImage,
    },
    {
      id: "movie-theater",
      title: t.projects.items["movie-theater"].title,
      description: t.projects.items["movie-theater"].description,
      tags: ["Stack MERN", "GraphQL", "PostgreSQL", "SASS", "APIs externas (TMDB)"],
      demoUrl: "https://movie-theater-react.vercel.app/",
      repoUrls: [
        { label: "Frontend", url: "https://gitlab.com/garavello.manuel/movie-theater-react" },
        { label: "Backend", url: "https://gitlab.com/garavello.manuel/movie-theater-backend" },
      ],
      imageUrl: movieTheaterImage,
    },
  ];
}
