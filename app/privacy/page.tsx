import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy & Cookie Policy | The Brand Attention Strategy",
  description: "Privacy and cookie policy for The Brand Attention Strategy",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-hero text-adenine mb-8">Privacy & Cookie Policy</h1>
        
        <div className="prose prose-lg max-w-none space-y-6 text-text-body">
          <section>
            <h2 className="text-section text-adenine mb-4">Cookies</h2>
            <p>
              We use cookies to analyze site usage and improve your experience. Cookies are small text files that are stored on your device when you visit our website.
            </p>
          </section>

          <section>
            <h2 className="text-section text-adenine mb-4">How We Use Cookies</h2>
            <p>
              We use Google Analytics to understand how visitors interact with our website. This helps us improve the user experience and understand which content is most valuable.
            </p>
            <p>
              Google Analytics uses cookies to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Track page views and user interactions</li>
              <li>Analyze website traffic and usage patterns</li>
              <li>Provide insights to help improve the website</li>
            </ul>
          </section>

          <section>
            <h2 className="text-section text-adenine mb-4">Your Choices</h2>
            <p>
              You can choose to accept or reject cookies when you first visit our website. You can also change your cookie preferences at any time by clearing your browser cookies and revisiting the site.
            </p>
            <p>
              If you reject cookies, Google Analytics will not be loaded and we will not track your visit.
            </p>
          </section>

          <section>
            <h2 className="text-section text-adenine mb-4">Data Collection</h2>
            <p>
              When you subscribe to our newsletter, we collect your email address and the information you provide in the qualification form. This data is stored securely and used only for the purposes of sending you newsletter content and understanding our audience.
            </p>
          </section>

          <section>
            <h2 className="text-section text-adenine mb-4">Contact</h2>
            <p>
              If you have any questions about this privacy policy or our use of cookies, please contact us.
            </p>
          </section>

          <section className="pt-8">
            <p className="text-sm text-text-secondary">
              Last updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
