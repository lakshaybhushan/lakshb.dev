import React from "react";
import Spotify from "../spotify/Spotify";
import Socials from "../socials/Socials";

const FooterMain = () => {
  return (
    <footer className="absolute bottom-[3vh] left-0 right-0 flex w-full items-end justify-between px-[10vw]">
      <div className="flex items-end">
        <Spotify />
      </div>
      <div className="flex items-end">
        <Socials />
      </div>
    </footer>
  );
};

export default FooterMain;
