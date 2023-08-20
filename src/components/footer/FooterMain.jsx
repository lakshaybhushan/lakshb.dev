import React from "react";
import Spotify from "../spotify/Spotify";
import Socials from "../socials/Socials";

const FooterMain = () => {
  return (
    <footer className="my-12 md:my-0 flex flex-col items-center md:absolute bottom-[3vh] left-0 right-0 w-full md:flex-row md:items-end md:justify-between md:px-[10vw] md:text-sm">
      <div className="my-2 items-end md:my-0 hidden md:block">
        <Spotify />
      </div>
      <div className="flex items-end">
        <Socials />
      </div>
    </footer>
  );
};

export default FooterMain;
