import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import ScrollToTop from "@/components/portfolio/ScrollToTop";
import HangingLamp from "@/components/portfolio/HangingLamp";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
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
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const saved = localStorage.getItem('theme');
                const pref = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                const active = saved || pref;
                if (active === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              })()
            `,
          }}
        />
      </head>
      <body className="min-h-full">
        {children}
        <ScrollToTop />
        <HangingLamp />
      </body>
    </html>
  );
}
