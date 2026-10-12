import type { Metadata } from "next";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Cursor from "@/components/chrome/Cursor";
import Preloader from "@/components/chrome/Preloader";
import ScrollProgress from "@/components/chrome/ScrollProgress";
import Nav from "@/components/chrome/Nav";
import Footer from "@/components/chrome/Footer";
import PageTransition from "@/components/chrome/PageTransition";

const display = localFont({
  src: "./fonts/BricolageGrotesque-VariableFont_opsz,wdth,wght.ttf",
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vereen Digital — When buyers ask AI who to trust",
  description:
    "AI SEO, technical SEO and paid media for businesses that need to be part of the answer in ChatGPT, Gemini, Perplexity and Google AI Overviews.",
  openGraph: {
    title: "Vereen Digital — When buyers ask AI who to trust",
    description:
      "AI SEO, technical SEO and paid media for businesses tired of being invisible when buyers search.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body className="grain bg-void">
        <SmoothScroll>
          <Preloader />
          <Cursor />
          <ScrollProgress />
          <Nav />
          <main id="top">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
