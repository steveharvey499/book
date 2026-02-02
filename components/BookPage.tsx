"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { BookPage as BookPageType } from "@/lib/bookContent";
import { trackPageView, trackDwellTime } from "@/lib/analytics";

export interface BookPageProps {
  page: BookPageType;
  nextPage: BookPageType | null;
  previousPage: BookPageType | null;
  progress: number;
}

const BookPage = ({ page, nextPage, previousPage, progress }: BookPageProps) => {
  const [isFadedIn, setIsFadedIn] = useState(false);
  const [visibleParagraphs, setVisibleParagraphs] = useState<Set<number>>(new Set());
  const paragraphRefs = useRef<(HTMLParagraphElement | HTMLQuoteElement | null)[]>([]);

  // Split content into paragraphs
  const paragraphs = page.content.split("\n\n");

  // Function to check if a paragraph contains "The Actionable Framework:"
  const hasActionableFramework = (text: string) => {
    return text.includes("The Actionable Framework:");
  };

  // Function to check if paragraph is a quoted post (starts with quote)
  const isQuotedPost = (text: string) => {
    const trimmed = text.trim();
    // Remove HTML tags temporarily to check for starting quote
    const textWithoutTags = trimmed.replace(/<[^>]*>/g, '').trim();
    // Check if it starts with a quote mark
    return textWithoutTags.startsWith('"') || trimmed.startsWith('<em>"') || trimmed.match(/^<em>\s*"/);
  };

  // Function to render paragraph with bold "The Actionable Framework:" and HTML tags like <em>
  const renderParagraph = (text: string) => {
    // First handle "The Actionable Framework:" for bold
    let parts = text.split(/(The Actionable Framework:)/);
    return parts.map((part, index) => {
      if (part === "The Actionable Framework:") {
        return <strong key={index}>{part}</strong>;
      }
      // Render HTML tags like <em> for italics
      return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />;
    });
  };

  useEffect(() => {
    // Trigger fade-in animation on page change
    setIsFadedIn(false);
    setVisibleParagraphs(new Set());
    
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    // Use requestAnimationFrame for smoother animation start
    const timer = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsFadedIn(true);
      });
    });
    
    return () => {
      cancelAnimationFrame(timer);
    };
  }, [page.id]);

  // Intersection Observer for scroll-based fade animations
  useEffect(() => {
    if (!isFadedIn) return;

    const observers: IntersectionObserver[] = [];

    paragraphRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleParagraphs((prev) => new Set(prev).add(index));
            } else {
              setVisibleParagraphs((prev) => {
                const next = new Set(prev);
                next.delete(index);
                return next;
              });
            }
          });
        },
        {
          threshold: 0.2,
          rootMargin: '-100px 0px -100px 0px', // Trigger when paragraph is in the center area of viewport
        }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [paragraphs.length, isFadedIn]);

  useEffect(() => {
    // Track page view
    trackPageView(page.id, page.pageNumber, page.title);

    // Track dwell time
    const startTime = Date.now();
    let isPageVisible = true;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isPageVisible = false;
        const dwellTime = Date.now() - startTime;
        trackDwellTime(page.id, page.pageNumber, dwellTime);
      } else {
        isPageVisible = true;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Track when user leaves the page
    const handleBeforeUnload = () => {
      if (isPageVisible) {
        const dwellTime = Date.now() - startTime;
        trackDwellTime(page.id, page.pageNumber, dwellTime);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      
      // Final dwell time tracking
      if (isPageVisible) {
        const dwellTime = Date.now() - startTime;
        trackDwellTime(page.id, page.pageNumber, dwellTime);
      }
    };
  }, [page.id, page.pageNumber, page.title]);

  return (
    <div 
      className="min-h-screen"
      style={{ 
        backgroundColor: '#FAF8F3'
      }}
    >
      {/* Fixed Header */}
      <header 
        className="sticky top-0 z-50 pt-6 pb-4 border-b border-gray-200/50 shadow-sm"
        style={{ backgroundColor: '#FAF8F3' }}
      >
        <div className="max-w-2xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="text-xs tracking-wider text-gray-500 mb-2 uppercase text-center">
            {page.chapter}
          </div>
          <h1 className="text-3xl md:text-4xl font-normal text-black leading-tight text-center mb-2">
            {page.title}
          </h1>
          <div className="text-center">
            <Link 
              href="/book"
              className="text-xs tracking-wider text-gray-500 hover:opacity-60 transition-opacity uppercase"
            >
              Contents
            </Link>
          </div>
        </div>
      </header>

      <div className={isFadedIn ? "page-fade-in" : "opacity-0"}>
        <article className="max-w-2xl mx-auto px-8 sm:px-12 lg:px-16 py-20">
          {/* Content with scroll-based fade animations */}
          <div className="text-lg leading-relaxed text-black">
            {paragraphs.map((paragraph, paragraphIndex) => {
              const isVisible = visibleParagraphs.has(paragraphIndex);
              
              // Check if this paragraph contains "The Actionable Framework:"
              const containsFramework = hasActionableFramework(paragraph);
              
              // Check if this is a quoted post (only in Part 1: The Journey)
              const isQuote = page.chapter === "Part 1: The Journey" && paragraphIndex === 0 && isQuotedPost(paragraph);
              
              // Check if this is one of the two action paragraphs following "The Actionable Framework:"
              let actionNumber = 0;
              if (paragraphIndex > 0) {
                // Look back to find if we're in the actionable framework section
                for (let i = paragraphIndex - 1; i >= 0 && i >= paragraphIndex - 3; i--) {
                  if (hasActionableFramework(paragraphs[i])) {
                    // Count how many paragraphs after the framework this is
                    actionNumber = paragraphIndex - i;
                    break;
                  }
                }
              }
              
              // Only number if it's action 1 or 2 (and not the framework paragraph itself)
              const shouldNumber = actionNumber > 0 && actionNumber <= 2 && !containsFramework;
              
              // Apply blockquote styling for quoted posts
              if (isQuote) {
                return (
                  <blockquote
                    key={paragraphIndex}
                    ref={(el) => {
                      paragraphRefs.current[paragraphIndex] = el;
                    }}
                    className={`mb-8 last:mb-0 transition-opacity duration-700 ease-out border-l-4 border-thymine pl-6 pr-4 py-2 bg-thymine/5 italic text-guanine text-base leading-relaxed ${
                      isVisible ? 'opacity-100' : 'opacity-30'
                    }`}
                  >
                    {renderParagraph(paragraph)}
                  </blockquote>
                );
              }
              
              return (
                <p
                  key={paragraphIndex}
                  ref={(el) => {
                    paragraphRefs.current[paragraphIndex] = el;
                  }}
                  className={`mb-8 last:mb-0 font-normal transition-opacity duration-700 ease-out ${
                    isVisible ? 'opacity-100' : 'opacity-30'
                  }`}
                >
                  {shouldNumber && <strong>{actionNumber}. </strong>}
                  {renderParagraph(paragraph)}
                </p>
              );
            })}
          </div>

          {/* Navigation */}
          <footer className="mt-20 pt-8 border-t border-gray-200">
            <div className="flex justify-between items-center text-sm text-gray-500">
              {previousPage ? (
                <a 
                  href={`/book/${previousPage.id}`}
                  className="hover:opacity-60 transition-opacity"
                >
                  ← Previous Chapter
                </a>
              ) : (
                <span></span>
              )}
              {nextPage ? (
                <a 
                  href={`/book/${nextPage.id}`}
                  className="hover:opacity-60 transition-opacity"
                >
                  Next Chapter →
                </a>
              ) : (
                <span></span>
              )}
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
};

export default BookPage;
