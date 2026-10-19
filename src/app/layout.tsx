import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "O'Nell Luciano Rasamiarison — Full-Stack Developer | AI · Data · GIS",
  description:
    "Full-stack developer engineering modern web applications, intelligent AI systems, data-driven solutions, and interactive geospatial experiences for clients worldwide.",
  authors: [{ name: "O'Nell Luciano Rasamiarison" }],
  keywords: [
    "O'Nell Luciano Rasamiarison",
    "Full-Stack Developer",
    "Software Engineer",
    "AI Developer",
    "GIS Developer",
    "PostGIS",
    "Next.js",
    "React",
    "Python",
    "FastAPI",
    "PyTorch",
    "Madagascar",
    "Remote Developer",
  ],
};

export const viewport: Viewport = {
  themeColor: "#050507",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-ink text-ivory">{children}</body>
    </html>
  );
}
