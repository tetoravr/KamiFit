import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KamiFit | AI Hairstyle Studio",
  description:
    "Upload your photo, pick a hairstyle inspiration, and let Gemini Flash Image (nano banana) render stunning previews instantly.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased text-dark">
        <div className="min-h-screen flex flex-col">
          <header className="px-6 py-5 md:px-12 flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-[0.4em] text-primary font-semibold">
                KamiFit Studio
              </span>
              <h1 className="font-display text-2xl md:text-3xl font-semibold text-dark mt-1">
                Find your next signature look
              </h1>
            </div>
            <nav className="hidden md:flex gap-6 text-sm text-slate-600" aria-label="Primary">
              <a href="#how-it-works" className="hover:text-primary transition-colors">
                How it works
              </a>
              <a href="#style-gallery" className="hover:text-primary transition-colors">
                Gallery
              </a>
              <a href="#faq" className="hover:text-primary transition-colors">
                FAQ
              </a>
            </nav>
          </header>
          <main className="flex-1 px-4 pb-12 md:px-12 lg:px-16">{children}</main>
          <footer className="px-6 md:px-12 py-8 text-sm text-slate-500">
            Built for stylists and dreamers • Powered by Gemini Flash Image (nano banana)
          </footer>
        </div>
      </body>
    </html>
  );
}
