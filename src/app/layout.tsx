import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import ScrollToTop from "@/components/portfolio/ScrollToTop";
import HangingLamp from "@/components/portfolio/HangingLamp";
import { ThemeProvider } from "@/components/portfolio/ThemeProvider";
import "./globals.css";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-WLW7MGVQ";

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
        {/* Google Tag Manager */}
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </head>
      <body className="min-h-full">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <ScrollToTop />
          <HangingLamp />
        </ThemeProvider>
      </body>
    </html>
  );
}
