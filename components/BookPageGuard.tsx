"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BookPage from "./BookPage";
import type { BookPageProps } from "./BookPage";

const BookPageGuard = (props: BookPageProps) => {
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

  return <BookPage {...props} />;
};

export default BookPageGuard;
