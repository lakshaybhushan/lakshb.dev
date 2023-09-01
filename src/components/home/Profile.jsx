import React from "react";
import Image from "next/image";
const Profile = () => {
  return (
    <div className="ImageContainer mt-[2vh] flex h-full items-center justify-center overflow-hidden">
      <Image
        src="/images/me.webp"
        alt="Picture of the author"
        width={400}
        height={500}
        className="saturate-0 transition-all duration-700 ease-in-out hover:saturate-[96%] md:w-[24vw]"
      />
    </div>
  );
};

export default Profile;
