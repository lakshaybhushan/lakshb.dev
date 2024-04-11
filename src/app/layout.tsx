import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "@/components/navbar";
import "./globals.css";

const satoshi = localFont({
  src: "../../public/fonts/Satoshi-Variable.woff2",
  display: "swap",
  variable: "--font-satoshi",
});

const voyage = localFont({
  src: "../../public/fonts/voyage-bold.otf",
  display: "swap",
  variable: "--font-voyage",
});

export const metadata: Metadata = {
  title: "Lakshay Bhushan",
  description:
    "Hey! I’m Lakshay, a 20 yr old student currently studying cs + social sciences at IIIT Delhi (India). I make stuff for the web and XR, which is minimal yet beautifully designed for better user experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${satoshi.variable} ${voyage.variable} bg-background text-dark`}
    >
      <body>
        <Navbar />
        <main className="mx-40 my-8">{children}</main>
      </body>
    </html>
  );
}
