"use client"
import React from "react";
import Untitled from "@/components/utils/Untitled";
import Profile from "@/components/home/Profile";
import Menu from "@/components/home/Menu";
import Header from "@/components/home/Header";
import About from "@/components/home/About";
import FooterMain from "@/components/footer/FooterMain";
import { motion } from "framer-motion";

const page = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <Untitled />
      <Menu />
      <Header />
      <Profile />
      <About />
      <FooterMain />
    </motion.div>
  );
};

export default page;
