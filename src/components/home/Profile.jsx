import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import meDark from "../../../public/images/meDark.jpg";
import meColor from "../../../public/images/meColor.jpg";
import About from "@/components/home/About";

const Profile = () => {
  const [hover, setHover] = useState(false);

  return (
    <section className="flex m-10 items-start justify-center gap-6">
      <div className="flex h-full items-center justify-center">
        <div
          className="relative transform overflow-hidden rounded-md bg-[#00dca1]/40 shadow-lg duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}>
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: hover ? 0 : 1, scale: hover ? 1.1 : 1 }}
            transition={{ duration: 0.5 }}>
            <Image
              src={meDark}
              alt="me wit a filter"
              width={1000}
              height={1350}
              placeholder="blur"
              priority
              className="min-h-[26rem] max-w-[20.8rem]"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: hover ? 1 : 0, scale: hover ? 1.1 : 1 }}
            transition={{ duration: 0.5 }}
            className="absolute left-0 top-0">
            <Image
              src={meColor}
              alt="me irl also wit a filter :hehe"
              width={1000}
              height={1350}
              placeholder="blur"
              className="min-h-[26rem] max-w-[20.8rem]"
              priority
            />
          </motion.div>
        </div>
      </div>
      <About />
    </section>
  );
};

export default Profile;
