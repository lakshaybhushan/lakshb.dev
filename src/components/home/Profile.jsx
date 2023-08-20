import React from "react";
import Image from "next/image";
const Profile = () => {
  return (
    <div className="ImageContainer flex items-center justify-center">
      <Image
        src="/images/me.webp"
        alt="Picture of the author"
        width={400}
        height={500}
        className="h-full md:w-[24vw] mt-[2vh]"
        id="ImageEffect"
      />
    </div>
  );
};

export default Profile;
