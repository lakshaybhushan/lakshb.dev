import React from "react";
import Spotify from "../spotify/Spotify";
import Socials from "../socials/Socials";

const Footer = () => {
  return (
    <footer className="absolute bottom-[3vh] left-0 w-full flex justify-between items-end px-[10vw]">
      <div className="flex items-end">
        <Spotify />
      </div>
      <div className="flex items-end">
        <Socials />
      </div>
    </footer>
  );
};

export default Footer;
