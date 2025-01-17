"use client";

import React from "react";
import { motion } from "framer-motion";

const HomebabaPromo = () => {
  const images = [
    {
      src: "/promo/1.jpeg",
      alt: "Featured Luxury Home",
      className: "main-image",
    },
    {
      src: "/promo/2.jpeg",
      alt: "Modern Living Space",
      className: "side-image",
    },
    {
      src: "/promo/3.jpeg",
      alt: "Contemporary Design",
      className: "side-image",
    },
    {
      src: "/promo/4.jpeg",
      alt: "Elegant Interior",
      className: "side-image",
    },
    {
      src: "/promo/5.jpeg",
      alt: "Premium Lifestyle",
      className: "side-image",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section className="py-12 bg-white mt-20 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
            From Homebaba to a Home
          </h2>
          <p className="text-3xl text-center text-gray-600">
            Stories of{" "}
            <span className="underline decoration-[#ff9999] decoration-2">
              Dreams
            </span>
            ,{" "}
            <span className="underline decoration-[#ff9999] decoration-2">
              Journeys
            </span>
            , and{" "}
            <span className="underline decoration-[#ff9999] decoration-2">
              New Beginnings
            </span>
            <span className="text-red-500">.</span>
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[1200px] mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              className={`relative overflow-hidden rounded-xl ${
                index === 0 ? "col-span-2 row-span-2 h-[500px]" : "h-[240px]"
              }`}
              variants={itemVariants}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HomebabaPromo;
