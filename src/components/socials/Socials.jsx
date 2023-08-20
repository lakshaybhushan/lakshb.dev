import React from "react";
import Link from "next/link";
const Socials = () => {
  return (
    <div>
      <div className="flex items-center justify-end md:gap-x-3 gap-x-5 text-sm text-light-other">
        <Link
          href="https://twitter.com/bhushanlakshay/"
          className="linkAnime transition-all duration-300 ease-in-out hover:text-white"
          rel="noopener noreferrer"
          target="_blank">
          X
        </Link>
        <Link
          href="https://github.com/lakshaybhushan"
          className="linkAnime transition-all duration-300 ease-in-out hover:text-white"
          rel="noopener noreferrer"
          target="_blank">
          GitHub
        </Link>
        <Link
          href="https://behance.net/lakshaybhushan/"
          className="linkAnime transition-all duration-300 ease-in-out hover:text-white"
          rel="noopener noreferrer"
          target="_blank">
          Behance
        </Link>
        <Link
          href="https://www.linkedin.com/in/lakshaybhushan/"
          className="linkAnime transition-all duration-300 ease-in-out hover:text-white"
          rel="noopener noreferrer"
          target="_blank">
          LinkedIn
        </Link>
        <Link
          href="https://www.instagram.com/lakshaybhushan/"
          className="linkAnime transition-all duration-300 ease-in-out hover:text-white"
          rel="noopener noreferrer"
          target="_blank">
          Instagram
        </Link>
      </div>
    </div>
  );
};

export default Socials;
