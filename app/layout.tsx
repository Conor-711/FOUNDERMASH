import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import Analytics from '@/components/Analytics';

export const metadata: Metadata = {
  title: "FOUNDERMASH",
  description: "Choose and view founder bios",
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <div className="w-full min-h-screen bg-white">
          <header className="bg-[#8f0000] text-white text-center py-9 border-b border-[#7a0000]">
            <Link href="/" className="inline-block">
              <span className="font-extrabold tracking-wide text-[2.75rem]">FOUNDERMASH</span>
            </Link>
          </header>
          <main className="max-w-[980px] mx-auto px-6 py-8">{children}</main>
          <Analytics />
        </div>
      </body>
    </html>
  );
}
