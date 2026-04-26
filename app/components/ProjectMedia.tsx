"use client";

import Image from "next/image";
import QRCode from "react-qr-code";
import { useI18n } from "@/app/hooks/useI18n";
import type { Project } from "@/app/hooks/useProjects";

interface ProjectMediaProps {
  project: Project;
}

export default function ProjectMedia({ project }: Readonly<ProjectMediaProps>) {
  const { t } = useI18n();

  if (project.imageUrl) {
    return (
      <Image
        src={project.imageUrl}
        alt={project.title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1260px) 50vw, 400px"
      />
    );
  }

  if (project.mobileLinks) {
    const { expoGo, apk } = project.mobileLinks;

    return (
      <div className="flex gap-5 items-center justify-center w-full px-4">
        <div className="flex flex-col items-center gap-1.5">
          <div className="bg-white p-1.5 rounded-lg shadow-sm">
            <QRCode value={expoGo} size={72} />
          </div>
          <span className="text-[11px] font-medium text-light-text dark:text-gray-400 text-center leading-tight">
            Demo<br />Expo Go
          </span>
        </div>

        <div className="h-20 w-px bg-light-text/20 dark:bg-gray-600" />

        <div className="flex flex-col items-center gap-1.5">
          {apk ? (
            <>
              <div className="bg-white p-1.5 rounded-lg shadow-sm">
                <QRCode value={apk} size={72} />
              </div>
              <span className="text-[11px] font-medium text-light-text dark:text-gray-400 text-center leading-tight">
                {t.projects.labels.downloadApk}<br />APK
              </span>
            </>
          ) : (
            <>
              <div className="w-[84px] h-[84px] bg-white/30 dark:bg-white/10 rounded-lg border-2 border-dashed border-light-text/30 dark:border-gray-500 flex flex-col items-center justify-center gap-1">
                <svg className="w-6 h-6 text-light-text/40 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span className="text-[10px] text-light-text/40 dark:text-gray-500 text-center px-1">
                  APK<br />{t.projects.labels.apkSoon}
                </span>
              </div>
              <span className="text-[11px] text-light-text/50 dark:text-gray-500 text-center leading-tight">
                {t.projects.labels.comingSoon}
              </span>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <span className="text-light-text/50 dark:text-gray-500 text-sm">
      {t.projects.labels.projectImage}
    </span>
  );
}
