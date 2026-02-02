import { notFound } from "next/navigation";
import { getPageById, getNextPage, getPreviousPage, getReadingProgress } from "@/lib/bookContent";
import BookPageGuard from "@/components/BookPageGuard";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ pageId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { pageId } = await params;
  const page = getPageById(pageId);

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: `${page.title} - Page ${page.pageNumber} | The Brand Attention Strategy`,
    description: page.content.substring(0, 160),
  };
}

export default async function BookPageRoute({ params }: PageProps) {
  const { pageId } = await params;
  const page = getPageById(pageId);

  if (!page) {
    notFound();
  }

  const nextPage = getNextPage(pageId);
  const previousPage = getPreviousPage(pageId);
  const progress = getReadingProgress(pageId);

  return (
    <BookPageGuard
      key={page.id}
      page={page}
      nextPage={nextPage}
      previousPage={previousPage}
      progress={progress}
    />
  );
}
