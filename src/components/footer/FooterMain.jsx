import React from "react";
import Spotify from "../spotify/Spotify";
import Socials from "../socials/Socials";

const FooterMain = () => {
  return (
    <footer className="md:absolute md:bottom-[3vh] md:left-0 right-0 flex md:flex-row md:w-full md:items-end md:justify-between md:px-[10vw] text-xs md:text-sm flex-col items-center mt-10">
      <div className="flex items-end mb-10">
        <Spotify />
      </div>
      <div className="flex items-end mb-[2vh]">
        <Socials />
      </div>
    </footer>
  );
};

export default FooterMain;
