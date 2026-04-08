import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SOTARA — Smarter Operations for Modern Businesses",
  description:
    "SOTARA provides SaaS platforms to help UK businesses manage their people, IT issues, and visitors with ease. Discover our Leave System, Ticket System, and Ventra.",
  openGraph: {
    title: "SOTARA — Smarter Operations for Modern Businesses",
    description:
      "UK-based SaaS company providing leave management, IT ticketing, and visitor tracking platforms.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}
