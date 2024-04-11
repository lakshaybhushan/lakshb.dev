"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/components/utils/anim";

const page = () => {
  useEffect(() => {
    const isEmbedSupported = "src" in document.createElement("embed");
    if (!isEmbedSupported) {
      window.location.href = "https://urlify.lakshb.me/resume-web";
    }
  }, []);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 1.5, delayChildren: 0.5 }}
      id="pdf-viewer"
      className="absolute inset-0 h-screen w-screen overflow-hidden">
      <motion.div
        variants={itemVariants}
        className="absolute inset-0 bg-black opacity-50"
      />
      <motion.div variants={itemVariants} className="absolute inset-0">
        <embed
          src="docs/Resume.pdf"
          type="application/pdf"
          width="100%"
          height="100%"
          className="h-full w-full"
        />
      </motion.div>
    </motion.div>
  );
};

export default page;

// "use client";
// import React, { useEffect } from "react";
// import { motion } from "framer-motion";
// const page = () => {
//   useEffect(() => {
//     const isEmbedSupported = "src" in document.createElement("embed");
//     if (!isEmbedSupported) {
//       window.location.href = "https://urlify.lakshb.me/resume-web";
//     }
//   }, []);

//   return (
// <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 1.5 }}
//       id="pdf-viewer"
//       className="absolute inset-0 h-screen w-screen overflow-hidden">
//       <embed
//         src="docs/Resume.pdf"
//         type="application/pdf"
//         width="100%"
//         height="100%"
//         className="absolute inset-0 h-full w-full"
//       />
//     </motion.div>
//   );
// };

// export default page;

"use client";

import React from "react";

const page = () => {
  return (
    <div className="flex items-center min-h-screen justify-center">
      <p className="text-lg">under maintenance</p>
    </div>
  );
};

export default page;
