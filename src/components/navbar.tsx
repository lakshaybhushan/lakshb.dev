"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logosvg from "../../public/logo.svg";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Projects",
      url: "/projects",
    },
    {
      name: "Explore",
      url: "/explore",
    },
    {
      name: "Contact",
      url: "/contact",
    },
  ];

  return (
    <nav className="mx-16 my-6 flex items-center justify-between">
      <div>
        <Link href="/">
          <Image
            src={logosvg}
            alt="abstract logo"
            width={32}
            height={32}
            priority
            className="transition-all duration-300 ease-linear hover:rotate-180"
          />
        </Link>
      </div>
      <div>
        <ul className="flex items-center gap-8 text-sm font-medium">
          {links.map((link) => {
            const isActive = link.url === pathname;
            return (
              <li
                key={link.name}
                className={
                  isActive
                    ? "text-primary underline underline-offset-4"
                    : "transition duration-150 ease-linear hover:text-primary/80"
                }>
                <Link href={link.url}>
                  <p>{link.name}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
