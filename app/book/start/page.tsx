"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getBookData } from "@/lib/bookContent";
import Link from "next/link";

export default function StartPage() {
  const [hasAccess, setHasAccess] = useState(false);
  const router = useRouter();
  const book = getBookData();

  useEffect(() => {
    // Check if user has signed up
    const signedUp = localStorage.getItem('brand-attention-strategy-signed-up') === 'true';
    
    if (signedUp) {
      setHasAccess(true);
    } else {
      // Redirect to homepage to sign up
      router.push('/');
    }
  }, [router]);

  if (!hasAccess) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-hero text-adenine mb-6 text-balance">
          {book.title}
        </h1>
        <p className="text-body text-text-secondary mb-12">
          by {book.author}
        </p>
        
        <div className="mt-12">
          <Link
            href="/book/1"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-thymine hover:opacity-60 transition-opacity group"
          >
            <span>start reading</span>
            <span className="text-lg">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
