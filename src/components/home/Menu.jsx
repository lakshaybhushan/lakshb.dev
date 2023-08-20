import React from "react";
import Link from "next/link";
const Menu = () => {
  return (
    <nav className="flex flex-col gap-y-1.5 text-right items-end">
      <Link
        href="https://v1.lakshb.me/"
        className="linkAnime transition-all duration-300 ease-in-out hover:text-white">
        Version 1.0
      </Link>
      <Link
        href="/projects"
        className="linkAnime transition-all duration-300 ease-in-out hover:text-white">
        Projects
      </Link>
      <Link
        href="/resume"
        className="linkAnime transition-all duration-300 ease-in-out hover:text-white">
        Resume
      </Link>
      <Link
        href="/contact"
        className="linkAnime transition-all duration-300 ease-in-out hover:text-white">
        Contact
      </Link>
    </nav>
  );
};

export default Menu;
