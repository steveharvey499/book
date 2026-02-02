import { getBookData } from "@/lib/bookContent";
import type { Metadata } from "next";
import QualificationForm from "@/components/QualificationForm";

export const metadata: Metadata = {
  title: "The Brand Attention Strategy | Book",
};

export default function HomePage() {
  const book = getBookData();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-hero text-adenine mb-6 text-balance">
            {book.title}
          </h1>
          <p className="text-body text-text-secondary mb-12">
            by {book.author}
          </p>
        </div>
      </section>

      {/* Signup Form */}
      <QualificationForm />
    </div>
  );
}
