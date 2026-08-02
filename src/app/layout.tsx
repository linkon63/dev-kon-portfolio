import type { Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import JsonLd from "@/components/portfolio/JsonLd";
import ScrollToTop from "@/components/portfolio/ScrollToTop";
import HangingLamp from "@/components/portfolio/HangingLamp";
import { ThemeProvider } from "@/components/portfolio/ThemeProvider";
import { siteMetadata } from "@/lib/seo";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-0N792Q9769";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = siteMetadata;

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
        <JsonLd />
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
        </Script>
        {/* Impact Universal Tracking Tag */}
        <Script id="impact-utt" strategy="afterInteractive">
          {`(function(i,m,p,a,c,t){c.ire_o=p;c[p]=c[p]||function(){(c[p].a=c[p].a||[]).push(arguments)};t=a.createElement(m);var z=a.getElementsByTagName(m)[0];t.async=1;t.src=i;z.parentNode.insertBefore(t,z)})('https://utt.impactcdn.com/P-A7553382-6e97-4b51-81c9-50eeedb100c71.js','script','impactStat',document,window);impactStat('transformLinks');impactStat('trackImpression');`}
        </Script>
      </head>
      <body className="min-h-full">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <ScrollToTop />
          <HangingLamp />
        </ThemeProvider>
      </body>
      <Analytics />
    </html>
  );
}
