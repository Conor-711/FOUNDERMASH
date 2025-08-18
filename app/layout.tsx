import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FOUNDERMASH",
  description: "Choose and view founder bios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="w-full min-h-screen bg-white">
          <header className="bg-[#8f0000] text-white text-center py-8 border-b border-[#7a0000]">
            <Link href="/" className="inline-block">
              <span className="font-extrabold tracking-wide text-4xl">FOUNDERMASH</span>
            </Link>
          </header>
          <main className="max-w-[980px] mx-auto px-6 py-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
