import "../globals.css";

export const metadata = {
  title: "Lakshay's Resume",
  description: "Lakshay's resume hosted on lakshb.me",
  url: "https://lakshb.me/",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-bgblk text-light-main">
      <body>{children}</body>
    </html>
  );
}
