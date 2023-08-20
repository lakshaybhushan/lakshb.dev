"use client";
import React, { useEffect } from "react";
import Untitled from "@/components/utils/Untitled";
import Menu from "@/components/projects/Menu";
import FooterOther from "@/components/footer/FooterOther";
import Projects from "@/components/projects/Showcase/Projects";
import Header from "@/components/projects/Header";
import Lenis from "@studio-freight/lenis";

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
    <>
      <Untitled />
      <Menu />
      <Header />
      <Projects />
      <FooterOther />
    </>
  );
};

export default page;
