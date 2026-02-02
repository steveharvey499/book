"use client";

import ProtectedLink from "./ProtectedLink";
import { BookPage, Chapter } from "@/lib/bookContent";

interface TableOfContentsProps {
  pages: BookPage[];
  chapters: Chapter[];
}

const TableOfContents = ({ pages, chapters }: TableOfContentsProps) => {
  // Group pages by chapter
  const pagesByChapter = chapters.map((chapter) => ({
    chapter,
    pages: pages.filter(
      (page) =>
        page.pageNumber >= chapter.pageStart &&
        page.pageNumber <= chapter.pageEnd
    ),
  }));

  return (
    <div className="rounded-lg p-8">
      <h2 className="text-section text-adenine mb-8">Table of Contents</h2>
      <div className="space-y-8">
        {pagesByChapter.map(({ chapter, pages: chapterPages }) => (
          <div key={chapter.id} className="border-b border-bg-tertiary pb-6 last:border-b-0">
            <h3 className="text-subsection text-adenine mb-4">{chapter.title}</h3>
            <ul className="space-y-2">
              {chapterPages.map((page) => (
                <li key={page.id}>
                  <ProtectedLink
                    href={`/book/${page.id}`}
                    className="flex items-start text-text-body hover:text-thymine transition-colors group"
                  >
                    <span className="text-text-tertiary mr-3 min-w-[3rem]">
                      {page.pageNumber}.
                    </span>
                    <span className="group-hover:underline">{page.title}</span>
                  </ProtectedLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOfContents;
