import "./globals.css";
import { Major_Mono_Display } from "next/font/google";

const majorMonoDisplay = Major_Mono_Display({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  title: "Lakshay Bhushan",
  description: "My minimal personal website made with Next.js & Tailwind CSS.",
  url: "https://lakshb.me/",
  image: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-bgblk text-light-main text-sm lowercase">
      <body className={majorMonoDisplay.className}>{children}</body>
    </html>
  );
}
