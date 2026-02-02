"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

interface GoogleAnalyticsWrapperProps {
  gaId: string;
}

const GoogleAnalyticsWrapper = ({ gaId }: GoogleAnalyticsWrapperProps) => {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Check cookie consent
    const consent = localStorage.getItem('cookie-consent');
    if (consent === 'accepted') {
      setHasConsent(true);
    }
  }, []);

  // Only render Google Analytics if user has consented
  if (!hasConsent) {
    return null;
  }

  return <GoogleAnalytics gaId={gaId} />;
};

export default GoogleAnalyticsWrapper;
