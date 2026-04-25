import type { Metadata } from "next";
import { montserrat, montserratMono } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shajidul Hoque — Designer, Researcher & Developer",
  description:
    "Personal portfolio of Shajidul Hoque — a Designer, Researcher, and Developer lost in space. Explore featured projects, recent thoughts, and get in touch.",
  keywords: [
    "Shajidul Hoque",
    "portfolio",
    "designer",
    "developer",
    "researcher",
    "web development",
    "UI/UX",
  ],
  authors: [{ name: "Shajidul Hoque" }],
  openGraph: {
    title: "Shajidul Hoque — Designer, Researcher & Developer",
    description:
      "A Designer, Researcher, and Developer lost in space. Explore projects and get in touch.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shajidul Hoque — Designer, Researcher & Developer",
    description:
      "A Designer, Researcher, and Developer lost in space.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${montserratMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0f] text-white">
        {children}
      </body>
    </html>
  );
}
