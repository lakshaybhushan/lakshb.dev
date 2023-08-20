import React from "react";
import Untitled from "@/components/utils/Untitled";
import Profile from "@/components/home/Profile";
import Menu from "@/components/home/Menu";
import Header from "@/components/home/Header";
import About from "@/components/home/About";
import Footer from "@/components/footer/Footer";

const page = () => {
  return (
    <main className="">
      <Untitled />
      <Menu />
      <Header />

      <Profile />
      <About />

      <Footer />
    </main>
  );
};

export default page;
