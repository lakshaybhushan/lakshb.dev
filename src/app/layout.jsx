import "./globals.css";
import "@/components/utils/custom.css";
import { Figtree } from "next/font/google";

const figtree = Figtree({
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

export const metadata = {
  title: "Lakshay Bhushan",
  description:
    "Lakshay Bhushan's personal portfolio website created with Next.js, Tailwind CSS",
  url: "https://lakshb.me/",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${figtree.className} bg-bgblk text-light-main`}>
        <div className="mx-[2vw] text-sm md:mx-[10vw]">{children}</div>
      </body>
    </html>
  );
}
