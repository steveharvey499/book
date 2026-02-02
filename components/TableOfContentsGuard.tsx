"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TableOfContents from "./TableOfContents";
import { BookPage, Chapter } from "@/lib/bookContent";

interface TableOfContentsGuardProps {
  pages: BookPage[];
  chapters: Chapter[];
  bookTitle: string;
  bookAuthor: string;
}

const TableOfContentsGuard = ({ pages, chapters, bookTitle, bookAuthor }: TableOfContentsGuardProps) => {
  const [isChecking, setIsChecking] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user has signed up
    const signedUp = localStorage.getItem('brand-attention-strategy-signed-up') === 'true';
    
    if (signedUp) {
      setHasAccess(true);
      setIsChecking(false);
    } else {
      // Redirect to homepage to sign up
      router.push('/');
    }
  }, [router]);

  // Show nothing while checking (prevents flash of content)
  if (isChecking || !hasAccess) {
    return null;
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="text-hero text-adenine mb-4">{bookTitle}</h1>
          <p className="text-intro text-text-secondary">by {bookAuthor}</p>
        </div>

        <TableOfContents pages={pages} chapters={chapters} />
      </div>
    </div>
  );
};

export default TableOfContentsGuard;
