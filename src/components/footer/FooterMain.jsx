import React from "react";
import Spotify from "../spotify/Spotify";
import Socials from "../socials/Socials";

const FooterMain = () => {
  return (
    <footer className="left-0 right-0 mt-10 flex w-full flex-col items-center md:absolute md:bottom-[3vh] md:my-0 md:flex-row md:items-end md:justify-between md:px-[10vw] md:text-sm">
      <div className="my-2 hidden items-end md:my-0 md:block">
        <Spotify />
      </div>
      <div className="flex items-end">
        <Socials />
      </div>
    </footer>
  );
};

export default FooterMain;
