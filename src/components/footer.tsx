import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaBehance } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import Link from "next/link";
import NowPlaying from "./nowPlaying";

export default function Footer() {
  const socialLinks = [
    {
      name: "instagram",
      link: "https://instagram.com/lakshaybhushan",
      icon: FaInstagram,
    },
    { name: "twitter", link: "https://twitter.com/blakssh", icon: FaXTwitter },
    {
      name: "linkedin",
      link: "https://linkedin.com/in/lakshaybhushan",
      icon: FaLinkedinIn,
    },
    {
      name: "github",
      link: "https://github.com/lakshaybhushan",
      icon: FaGithub,
    },
    {
      name: "behance",
      link: "https://behance.com/lakshaybhushan",
      icon: FaBehance,
    },
    {
      name: "gmail",
      link: "mailto:lakshaybhushan2403@gmail.com",
      icon: BiLogoGmail,
    },
  ];

  return (
    <footer className="bottom-0 mt-auto flex w-screen text-sm">
      <div className="mx-16 my-6 w-full">
        <div className="flex items-end justify-between">
          <div className="">
            <NowPlaying />
          </div>
          <div className="flex items-end gap-6">
            {socialLinks.map((link, index) => (
              <Link
                key={index}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary transition-all duration-150 ease-linear hover:text-primary/60">
                <link.icon size={16} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
