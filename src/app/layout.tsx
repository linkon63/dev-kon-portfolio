import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import ScrollToTop from "@/components/portfolio/ScrollToTop";
import HangingLamp from "@/components/portfolio/HangingLamp";
import { ThemeProvider } from "@/components/portfolio/ThemeProvider";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-0N792Q9769";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://dev-kon-portfolio.web.app",
  ),
  title: "Md Abdul Ahad Linkon — Software Engineer",
  description:
    "Md Abdul Ahad Linkon — Software Engineer building modern, scalable, conversion-driven web experiences.",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
        </Script>
      </head>
      <body className="min-h-full">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <ScrollToTop />
          <HangingLamp />
        </ThemeProvider>
      </body>
    </html>
  );
}
