"use client";

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA4_ID || "";

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== "undefined" && GA_TRACKING_ID) {
    // Load gtag script
    const script1 = document.createElement("script");
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script1);

    // Initialize gtag
    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_TRACKING_ID}');
    `;
    document.head.appendChild(script2);
  }
};

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track book page view
export const trackPageView = (
  pageId: string,
  pageNumber: number,
  pageTitle: string
) => {
  // Track in Google Analytics
  event({
    action: "page_view",
    category: "book",
    label: `Page ${pageNumber}: ${pageTitle}`,
    value: pageNumber,
  });

  // Track in custom API
  if (typeof window !== "undefined") {
    fetch("/api/analytics/pageview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pageId,
        pageNumber,
        pageTitle,
        timestamp: new Date().toISOString(),
      }),
    }).catch((error) => {
      console.error("Error tracking page view:", error);
    });
  }
};

// Track dwell time
export const trackDwellTime = (
  pageId: string,
  pageNumber: number,
  dwellTime: number
) => {
  // Convert to seconds
  const dwellTimeSeconds = Math.round(dwellTime / 1000);

  // Track in Google Analytics
  event({
    action: "dwell_time",
    category: "book",
    label: `Page ${pageNumber}`,
    value: dwellTimeSeconds,
  });

  // Track in custom API
  if (typeof window !== "undefined") {
    fetch("/api/analytics/dwelltime", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pageId,
        pageNumber,
        dwellTime: dwellTimeSeconds,
        timestamp: new Date().toISOString(),
      }),
    }).catch((error) => {
      console.error("Error tracking dwell time:", error);
    });
  }
};

// Track navigation events
export const trackNavigation = (
  fromPageId: string,
  toPageId: string,
  direction: "next" | "previous" | "toc"
) => {
  event({
    action: "navigation",
    category: "book",
    label: `${direction}: ${fromPageId} -> ${toPageId}`,
  });
};
