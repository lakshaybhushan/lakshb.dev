import React from "react";
import Image from "next/image";
import me from "../../../public/images/me.webp"
const Profile = () => {
  return (
    <div className="ImageContainer mt-[2vh] flex h-full items-center justify-center overflow-hidden">
      <div className="relative max-w-lg overflow-hidden bg-cover bg-no-repeat">
        <Image
          src={me}
          alt="Picture of the author"
          width={400}
          height={500}
          placeholder="blur"
          priority={true}
          className="saturate-0 transition-all duration-700 ease-in-out md:w-[24vw] md:hover:scale-110 md:hover:saturate-[85%]"
        />
      </div>
    </div>
  );
};

export default Profile;
