import { getAllPages, getChapters, getBookData } from "@/lib/bookContent";
import TableOfContentsGuard from "@/components/TableOfContentsGuard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Table of Contents | The Brand Attention Strategy",
  description: "Browse all chapters and pages of The Brand Attention Strategy",
};

export default function TableOfContentsPage() {
  const book = getBookData();
  const pages = getAllPages();
  const chapters = getChapters();

  return (
    <TableOfContentsGuard
      pages={pages}
      chapters={chapters}
      bookTitle={book.title}
      bookAuthor={book.author}
    />
  );
}
