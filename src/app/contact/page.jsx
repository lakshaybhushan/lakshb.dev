"use client";
import React from "react";
import Contacts from "@/components/contact/Contacts";
import FooterMain from "@/components/footer/FooterMain";
import Untitled from "@/components/utils/Untitled";
import Menu from "@/components/contact/Menu";
import { motion } from "framer-motion";
import ContactForm from "@/components/contact/Form";

const page = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}>
      <Untitled />
      <Menu />
      <Contacts />
      <ContactForm />
      <FooterMain />
    </motion.div>
  );
};

export default page;
