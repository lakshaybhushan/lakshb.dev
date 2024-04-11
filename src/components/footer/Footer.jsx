import { motion } from "framer-motion";
import Spotify from "../spotify/Spotify";
import Socials from "../socials/Socials";

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { when: "beforeChildren", staggerChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const FooterComp = () => {
  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      animate="visible"
      className="mt-auto flex flex-col items-center md:mb-[3vh] md:w-full md:flex-row md:items-end md:justify-between">
      <motion.div
        variants={itemVariants}
        className="my-12 flex items-end md:my-0">
        <Spotify />
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="mb-[2vh] flex items-end md:mb-0">
        <Socials />
      </motion.div>
    </motion.footer>
  );
};

export default FooterComp;
