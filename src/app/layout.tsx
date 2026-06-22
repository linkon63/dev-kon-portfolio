import type { Metadata, Viewport } from "next";
import { Barriecito } from "next/font/google";
import "./globals.css";

const barriecito = Barriecito({
  weight: "400",
  variable: "--font-barriecito",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DevKon",
  description: "Md Abdul Ahad Linkon — Software Engineer portfolio.",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${barriecito.variable} h-full`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
