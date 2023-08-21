import "./globals.css";
import "@/components/utils/custom.css";
import { Major_Mono_Display } from "next/font/google";

const majorMonoDisplay = Major_Mono_Display({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  title: "Lakshay Bhushan",
  description: "My minimal personal website made with Next.js & Tailwind CSS.",
  url: "https://lakshb.me/",
  image:
    "https://github.com/lakshaybhushan/lakshb.me-minimal/assets/74349407/d478569e-8552-48b1-8cd2-d3223b662f69",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="mx-[2vw] mt-[2vh] bg-bgblk text-sm lowercase text-light-main md:mx-[10vw] md:mt-[3vh]">
      <body className={majorMonoDisplay.className}>{children}</body>
    </html>
  );
}
