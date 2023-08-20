import React from "react";
import Spotify from "../spotify/Spotify";
import Socials from "../socials/Socials";

const FooterOther = () => {
  return (
    <footer className="flex md:flex-row md:mb-[3vh] md:w-full md:items-end md:justify-between flex-col items-center">
      <div className="my-12 flex items-end md:my-0">
        <Spotify />
      </div>
      <div className="flex items-end mb-[2vh] md:mb-0">
        <Socials />
      </div>
    </footer>
  );
};

export default FooterOther;
