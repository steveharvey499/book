import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-hero text-adenine mb-4">404</h1>
        <h2 className="text-section text-adenine mb-6">Page Not Found</h2>
        <p className="text-body text-text-secondary mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist. It may have been moved or
          removed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-thymine text-white rounded-lg hover:bg-thymine-light transition-colors font-medium"
          >
            Go Home
          </Link>
          <Link
            href="/book"
            className="inline-block px-8 py-4 bg-white text-thymine border-2 border-thymine rounded-lg hover:bg-thymine hover:text-white transition-colors font-medium"
          >
            Table of Contents
          </Link>
        </div>
      </div>
    </div>
  );
}
