"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

interface ProtectedLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  [key: string]: any; // Allow other Link props
}

const ProtectedLink = ({ href, className, children, ...props }: ProtectedLinkProps) => {
  const router = useRouter();

  // Check if user has already signed up
  const hasSignedUp = () => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('brand-attention-strategy-signed-up') === 'true';
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If user has already signed up, allow normal navigation
    if (hasSignedUp()) {
      return; // Let the Link component handle navigation normally
    }
    
    // Otherwise, prevent default and redirect to homepage to show modal
    e.preventDefault();
    router.push('/');
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
};

export default ProtectedLink;
