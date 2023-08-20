"use client";
import React, { useEffect } from "react";
import Untitled from "@/components/utils/Untitled";
import Menu from "@/components/projects/Menu";
import FooterOther from "@/components/footer/FooterOther";
import Projects from "@/components/projects/Showcase/Projects";
import Header from "@/components/projects/Header";
import Lenis from "@studio-freight/lenis";
import {motion} from "framer-motion";

const page = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}>
      <Untitled />
      <Menu />
      <Header />
      <Projects />
      <FooterOther />
    </motion.div>
  );
};

export default page;
