export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Delay between each child animation
    },
  },
};

export const itemVariants = {
  hidden: {
    opacity: 0,
    x: -10, // Start position to the left
    y: 10, // Start position below
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type: "spring", // This creates a nice effect
      stiffness: 100,
      damping: 10,
    },
  },
};
