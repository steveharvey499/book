"use client";

import Link from "next/link";
import { BookPage } from "@/lib/bookContent";
import { trackNavigation } from "@/lib/analytics";

interface BookNavigationProps {
  previousPage: BookPage | null;
  nextPage: BookPage | null;
  currentPageId: string;
}

const BookNavigation = ({
  previousPage,
  nextPage,
  currentPageId,
}: BookNavigationProps) => {
  const handleNavigation = (direction: "next" | "previous" | "toc", targetPageId: string) => {
    trackNavigation(currentPageId, targetPageId, direction);
  };

  return (
    <nav className="flex items-center justify-between mt-12 pt-8 border-t border-bg-tertiary">
      <div className="flex-1">
        {previousPage ? (
          <Link
            href={`/book/${previousPage.id}`}
            onClick={() => handleNavigation("previous", previousPage.id)}
            className="inline-flex items-center text-thymine hover:text-thymine-light transition-colors group"
          >
            <svg
              className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Previous</span>
          </Link>
        ) : (
          <div className="text-text-tertiary">Start of Book</div>
        )}
      </div>

      <div className="flex-1 text-center">
        <Link
          href="/book"
          onClick={() => handleNavigation("toc", "toc")}
          className="text-text-secondary hover:text-thymine transition-colors text-small"
        >
          Table of Contents
        </Link>
      </div>

      <div className="flex-1 text-right">
        {nextPage ? (
          <Link
            href={`/book/${nextPage.id}`}
            onClick={() => handleNavigation("next", nextPage.id)}
            className="inline-flex items-center text-thymine hover:text-thymine-light transition-colors group ml-auto"
          >
            <span className="font-medium">Next</span>
            <svg
              className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ) : (
          <div className="text-text-tertiary">End of Book</div>
        )}
      </div>
    </nav>
  );
};

export default BookNavigation;
