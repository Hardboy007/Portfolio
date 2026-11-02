import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Hardik Srivastava — Software Engineer",
  description:
    "Full-stack engineer & project lead. I build web products that combine thoughtful design, solid engineering, and effective project leadership.",
  keywords: ["Hardik Srivastava", "Software Engineer", "Full Stack Developer", "React", "Next.js", "MERN"],
  authors: [{ name: "Hardik Srivastava" }],
  creator: "Hardik Srivastava",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://hardik.dev",
    title: "Hardik Srivastava — Software Engineer",
    description: "Full-stack engineer & project lead building real web products.",
    siteName: "Hardik Srivastava",
    images: [
      {
        url: "/images/og-preview.png",
        width: 1200,
        height: 630,
        alt: "Hardik Srivastava Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hardik Srivastava — Software Engineer",
    description: "Full-stack engineer & project lead building real web products.",
    images: ["/images/og-preview.png"],
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
  return (
  <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
    </head>
    <body className="antialiased">{children}</body>
  </html>
);
}