"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const Untitled = () => {
  const messages = [
    "arrived here?",
    "how's it going?",
    "fine day, isn't it?",
    "enjoy your stay!",
    "before you exit...",
    "have a look around!",
    "thanks for visiting!",
  ];
  const [currentMessage, setCurrentMessage] = useState(messages[0]);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setCurrentMessage((prevMessage) => {
          const currentIndex = messages.indexOf(prevMessage);
          const nextIndex = (currentIndex + 1) % messages.length;
          return messages[nextIndex];
        });
        setFade(true);
      }, 500);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Link href="/">
      <div className="absolute mt-[2vh] flex h-12 w-12 items-end justify-center rounded-sm bg-light-main transition-all duration-300 ease-in-out hover:bg-[#00DCA1] hover:text-bgblk md:mt-[3vh]">
        <p
          className={`p-1 text-xs font-medium leading-none tracking-tighter text-gray-500 transition-all duration-500 ease-in-out hover:text-bgblk ${
            fade ? "opacity-100" : "opacity-0"
          }`}>
          {currentMessage}
        </p>
      </div>
    </Link>
  );
};

export default Untitled;
