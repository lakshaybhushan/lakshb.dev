"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
const page = () => {
  useEffect(() => {
    const isEmbedSupported = "src" in document.createElement("embed");
    if (!isEmbedSupported) {
      window.location.href = "https://bit.ly/43RKnyN";
    }
  }, []);

  return (
<motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      id="pdf-viewer"
      className="absolute inset-0 h-screen w-screen overflow-hidden">
      <embed
        src="docs/Resume.pdf"
        type="application/pdf"
        width="100%"
        height="100%"
        className="absolute inset-0 h-full w-full"
      />
    </motion.div>
  );
};

export default page;
