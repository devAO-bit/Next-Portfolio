"use client";

import { motion } from "framer-motion";

export default function ProjectCard({ project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg"
    >
      <h2 className="text-xl font-semibold">{project.title}</h2>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        {project.description}
      </p>
    </motion.div>
  );
}   