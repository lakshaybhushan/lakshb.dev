import "../globals.css";

export const metadata = {
  title: "Lakshay's Resume",
  description: "Lakshay's official IIITD resume hosted on lakshb.me",
  url: "https://lakshb.me/resume-iiitd",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-bgblk text-light-main">
      <body>{children}</body>
    </html>
  );
}
