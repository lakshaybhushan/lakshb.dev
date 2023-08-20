import React from "react";
import Spotify from "../spotify/Spotify";
import Socials from "../socials/Socials";

const FooterOther = () => {
  return (
    <footer className="mb-[3vh] flex w-full items-end justify-between">
      <div className="flex items-end">
        <Spotify />
      </div>
      <div className="flex items-end">
        <Socials />
      </div>
    </footer>
  );
};

export default FooterOther;
