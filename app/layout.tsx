import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import GoogleAnalyticsWrapper from "@/components/GoogleAnalyticsWrapper";

// Fallback font - Inter will be used until Adobe Fonts are configured
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Note: To use brand fonts (Freight Display Pro & Acumin Pro):
// 1. Get your Adobe Fonts project ID from https://fonts.adobe.com
// 2. Add the kit link to styles/globals.css (replace @import with your kit URL)
// 3. Update CSS variables below with the correct font-family names from Adobe Fonts
// For now, Inter serves as a fallback that closely matches Acumin Pro

export const metadata: Metadata = {
  title: "The Brand Attention Strategy | Book",
  keywords: [
    "brand strategy",
    "brand attention",
    "marketing",
    "branding",
    "business strategy",
  ],
  authors: [{ name: "Steve Harvey" }],
  openGraph: {
    title: "The Brand Attention Strategy | Book",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Brand Attention Strategy | Book",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA4_ID;

  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col" style={{ backgroundColor: '#FAF8F3' }}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        {gaId && <GoogleAnalyticsWrapper gaId={gaId} />}
        <CookieBanner />
      </body>
    </html>
  );
}
