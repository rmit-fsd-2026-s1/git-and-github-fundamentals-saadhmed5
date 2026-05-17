import type { Metadata } from "next";

// Import Google fonts
import { Geist, Geist_Mono } from "next/font/google";

// Import global CSS
import "./globals.css";

// Main sans-serif font
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Monospace font
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Website metadata
export const metadata: Metadata = {
  title: "Smart Bin Collection System",
  description:
    "A waste management and rubbish collection web application built with Next.js and TypeScript.",
};

// Root layout component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    // Main HTML document
    <html
      lang="en"
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        h-full
        antialiased
      `}
    >
      {/* Body section */}
      <body className="min-h-screen bg-green-50 text-gray-900 flex flex-col">

        {/* Render all page content */}
        {children}

      </body>
    </html>
  );
}