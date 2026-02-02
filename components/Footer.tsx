import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-transparent border-t border-gray-200" style={{ backgroundColor: '#FAF8F3' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xs tracking-wider mb-4 text-black uppercase">About</h3>
            <p className="text-gray-600 text-sm">
              The Brand Attention Strategy is a comprehensive guide to building
              brand attention and engagement in today's competitive market.
            </p>
          </div>

          {/* Navigation Links - Centered */}
          <div className="text-center">
            <h3 className="text-xs tracking-wider mb-4 text-black uppercase">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-black transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/book"
                  className="text-gray-600 hover:text-black transition-colors text-sm"
                >
                  Contents
                </Link>
              </li>
            </ul>
          </div>

          {/* Author - Right Aligned */}
          <div className="text-left md:text-right">
            <h3 className="text-xs tracking-wider mb-4 text-black uppercase">Author</h3>
            <p className="text-gray-600 text-sm">Steve Harvey</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-6 mt-8">
          <p className="text-xs text-gray-500 text-center">
            © The Synthesis Ltd
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
