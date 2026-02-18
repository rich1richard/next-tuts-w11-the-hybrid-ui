import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cooking Baba",
  description: "Gives life to your cooking with the best recipes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="relative w-full h-44 md:h-80 flex items-center justify-center overflow-hidden">
          <Image
            src='/background.jpg'
            alt="A table full of spices"
            fill
            className="object-cover inset-0 -z-15 blur-xs"
          />

          <div className="absolute inset-0 -z-10 bg-gray-100/40"></div>

          <Image src='/logo-nobg.png' alt="Logo" className="md:hidden" width={150} height={150} />
          <Image src='/logo-nobg.png' alt="Logo" className="hidden md:block" width={200} height={200} />
        </header>

        {children}
      </body>
    </html>
  );
}
