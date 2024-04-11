"use client";
import React from "react";
import Untitled from "@/components/utils/Untitled";
import Profile from "@/components/home/Profile";
import Menu from "@/components/home/Menu";
import Header from "@/components/home/Header";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/components/utils/anim";
import FooterComp from "@/components/footer/Footer";

const page = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 1.5, delayChildren: 0.5 }}
      className="flex min-h-screen flex-col">
      {[Untitled, Menu, Header, Profile].map((Component, index) => (
        <motion.div variants={itemVariants} key={index}>
          <Component />
        </motion.div>
      ))}
      <FooterComp />
    </motion.div>
  );
};

export default page;
