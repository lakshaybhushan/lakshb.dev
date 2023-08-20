import React from "react";
import Link from "next/link";
const Menu = () => {
  return (
    <nav className="flex flex-col items-end gap-y-1.5 text-right">
      <Link
        href="/"
        className="linkAnime transition-all duration-300 ease-in-out hover:text-white">
        Home
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
