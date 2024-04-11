"use client";
import React from "react";
import Contacts from "@/components/contact/Contacts";
import Untitled from "@/components/utils/Untitled";
import Menu from "@/components/contact/Menu";
import ContactForm from "@/components/contact/Form";
import FooterComp from "@/components/footer/Footer";
import { Toaster } from "sonner";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/components/utils/anim";
import { BackgroundBeams } from "@/components/ui/BackgroundBeams";

const page = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex min-h-screen flex-col"
      transition={{ duration: 1.5, delayChildren: 0.5 }}>
      <Toaster />
      <motion.div variants={itemVariants}>
        <Untitled />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Menu />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Contacts />
      </motion.div>
      <motion.div variants={itemVariants}>
        <ContactForm />
      </motion.div>
      <BackgroundBeams />
      <FooterComp />
    </motion.div>
  );
};

export default page;
