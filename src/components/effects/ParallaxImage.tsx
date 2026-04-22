"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax + Zoom to mimic forward moving space
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section ref={containerRef} className="relative w-full h-[80vh] md:h-screen overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-[-15%] w-[130%] h-[130%] z-0">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-center filter saturate-[0.85] contrast-[1.05]"
          sizes="100vw"
        />
      </motion.div>
      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-overlay-green z-10 pointer-events-none" />
    </section>
  );
}
