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
    <html
      lang="en"
      className="mx-[10vw] mt-[3vh] bg-bgblk text-sm lowercase text-light-main">
      <body className={majorMonoDisplay.className}>{children}</body>
    </html>
  );
}
