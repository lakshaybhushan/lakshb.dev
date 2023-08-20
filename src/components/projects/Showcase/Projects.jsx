"use client";
import styles from "./style.module.scss";
import { useState, useEffect, useRef } from "react";
import Project from "./SliderComponent";
import { motion } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";

const projects = [
  {

    title: "Pixelverse",
    src: "me.webp",
    color: "#FC9459",
    stack: "React, tailwindcss, HuggingFaceAPI",
    link: "pixelverse.lakshb.me",
  },
  {
    title: "Urlify.",
    src: "me.webp",
    color: "#049379",
    stack: "HTML, CSS, JS, BitlyAPI",
    link: "urlify.lakshb.me",
  },
  {
    title: "Greeney.",
    src: "me.webp",
    color: "#021C23",
    stack: "JSON",
    link: "greeney.lakshb.me",
  },
  {
    title: "lakshb.me (V1.0)",
    src: "me.webp",
    color: "#C4DBE0",
    stack: "React, tailwindcss, Vite, Netlify",
    link: "v1.lakshb.me",
  },
  {
    title: "Design Hall",
    src: "me.webp",
    color: "#53FFA3",
    stack: "HTML, CSS, JS",
    link: "designhall.lakshb.me",
  },
  {
    title: "Tank Stars",
    src: "me.webp",
    color: "#FFBA52",
    stack: "Java, libGDX",
    link: "github.com/lakshaybhushan/tankstars",
  },
  {
    title: "Cabco",
    src: "me.webp",
    color: "#FFD23C",
    stack: "Python. Tkinter, MySQL",
    link: "github.com/lakshaybhushan/CabCo-DBMS-Project",
  },
];

const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
  },
};

export default function Projects() {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const { active, index } = modal;
  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  let xMoveContainer = useRef(null);
  let yMoveContainer = useRef(null);
  let xMoveCursor = useRef(null);
  let yMoveCursor = useRef(null);
  let xMoveCursorLabel = useRef(null);
  let yMoveCursorLabel = useRef(null);

  useEffect(() => {
    //Move Container
    xMoveContainer.current = gsap.quickTo(modalContainer.current, "left", {
      duration: 1.2,
      ease: "power3",
    });
    yMoveContainer.current = gsap.quickTo(modalContainer.current, "top", {
      duration: 1.2,
      ease: "power3",
    });
    //Move cursor
    xMoveCursor.current = gsap.quickTo(cursor.current, "left", {
      duration: 0.5,
      ease: "power3",
    });
    yMoveCursor.current = gsap.quickTo(cursor.current, "top", {
      duration: 0.5,
      ease: "power3",
    });
    //Move cursor label
    xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "left", {
      duration: 0.45,
      ease: "power3",
    });
    yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "top", {
      duration: 0.45,
      ease: "power3",
    });
  }, []);

  const moveItems = (x, y) => {
    xMoveContainer.current(x);
    yMoveContainer.current(y);
    xMoveCursor.current(x);
    yMoveCursor.current(y);
    xMoveCursorLabel.current(x);
    yMoveCursorLabel.current(y);
  };
  const manageModal = (active, index, x, y) => {
    moveItems(x, y);
    setModal({ active, index });
  };

  return (
    <main
      onMouseMove={(e) => {
        moveItems(e.clientX, e.clientY);
      }}
      className={styles.projects}>
      <div className={styles.body}>
        {projects.map((project, index) => {
          return (
            <Project
              index={index}
              title={project.title}
              stack={project.stack}
              link={project.link}
              manageModal={manageModal}
              key={index}
            />
          );
        })}
      </div>
      <>
        <motion.div
          ref={modalContainer}
          variants={scaleAnimation}
          initial="initial"
          animate={active ? "enter" : "closed"}
          className={styles.modalContainer}>
          <div
            style={{ top: index * -100 + "%" }}
            className={styles.modalSlider}>
            {projects.map((project, index) => {
              const { src, color } = project;
              return (
                <div
                  className={styles.modal}
                  style={{ backgroundColor: color }}
                  key={`modal_${index}`}>
                  <Image
                    src={`/images/${src}`}
                    width={300}
                    height={0}
                    alt="project Image"
                    style={{ width: "50%", height: "auto" }}
                  />
                </div>
              );
            })}
          </div>
        </motion.div>
        <motion.div
          ref={cursor}
          className={styles.cursor}
          variants={scaleAnimation}
          initial="initial"
          animate={active ? "enter" : "closed"}></motion.div>
        <motion.div
          ref={cursorLabel}
          variants={scaleAnimation}
          initial="initial"
          animate={active ? "enter" : "closed"}
          className={`${styles.cursorLabel} text-xs`}>
          View
        </motion.div>
      </>
    </main>
  );
}
