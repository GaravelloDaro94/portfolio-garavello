import { notFound, redirect } from "next/navigation";

const cvContent = {
  es: {
    pdfPath: "/resumes/resume-es.pdf",
  },
  en: {
    pdfPath: "/resumes/resume-en.pdf",
  },
} as const;

type CvLang = keyof typeof cvContent;

export default async function CvPage({
  params,
}: Readonly<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  const normalized = lang.toLowerCase() as CvLang;

  if (!(normalized in cvContent)) {
    notFound();
  }

  const content = cvContent[normalized];

  redirect(content.pdfPath);
}
