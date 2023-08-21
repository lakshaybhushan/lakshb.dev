import React from "react";
import Link from "next/link";
const Socials = () => {
  return (
    <div>
      <div className="flex items-center justify-end gap-x-4 text-sm text-light-other md:gap-x-5">
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
        <Link
          href="https://twitter.com/bhushanlakshay/"
          className="linkAnime transition-all duration-300 ease-in-out hover:text-white"
          rel="noopener noreferrer"
          target="_blank">
          Twitter
        </Link>
      </div>
    </div>
  );
};

export default Socials;
