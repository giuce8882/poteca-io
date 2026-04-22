"use client";

import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

const GALLERY_IMAGES = [
  "/images/gallery/media__1776851678407.jpg",
  "/images/gallery/media__1776851678680.jpg",
  "/images/gallery/media__1776851678695.jpg",
  "/images/gallery/media__1776851678711.jpg",
  "/images/gallery/media__1776851678724.jpg",
  "/images/gallery/media__1776852768698.jpg",
  "/images/gallery/media__1776852772554.jpg",
  "/images/gallery/media__1776852795228.jpg",
  "/images/gallery/media__1776852809348.jpg",
];

export function Gallery() {
  const t = useTranslations("Gallery");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (selectedImageIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedImageIndex]);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const } }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % GALLERY_IMAGES.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
    }
  };

  return (
    <section id="gallery" className="w-full bg-bg-cream pt-16 pb-32 overflow-hidden relative z-10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, amount: 0.3 }}
           variants={fadeUp}
           className="mb-16 md:mb-24 text-center mx-auto flex flex-col items-center"
        >
          <span className="font-sans text-label uppercase tracking-[0.16em] text-text-muted mb-6 block">
            {t("label")}
          </span>
          <h2 className="font-display text-h1 text-text-dark leading-[1.1] mb-6">
            {t("title")}
          </h2>
          <p className="font-serif text-body-lg text-text-medium max-w-[600px] leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Masonry-style Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {GALLERY_IMAGES.map((src, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: (index % 3) * 0.15 } }
              }}
              whileHover={{ scale: 1.02 }}
              className="relative w-full overflow-hidden break-inside-avoid cursor-pointer rounded-sm"
              onClick={() => setSelectedImageIndex(index)}
            >
              <img 
                src={src} 
                alt={`Trail Gallery Image ${index + 1}`} 
                className="w-full h-auto object-cover filter saturate-[0.85] contrast-[1.05] hover:saturate-100 transition-all duration-500"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox / Fullscreen Viewer */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-deep/95 backdrop-blur-md p-4 md:p-12 cursor-zoom-out"
            onClick={() => setSelectedImageIndex(null)}
            role="dialog"
            aria-modal="true"
          >
            {/* Close Button */}
            <button 
              className="absolute top-6 right-6 md:top-10 md:right-10 text-text-light hover:text-accent-gold transition-colors z-50 p-2 cursor-pointer"
              onClick={() => setSelectedImageIndex(null)}
              aria-label="Close gallery"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            {/* Prev Button */}
            <button 
              className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-text-light hover:text-accent-gold transition-colors z-50 p-4 cursor-pointer hidden md:block"
              onClick={handlePrev}
              aria-label="Previous image"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>

            {/* Current Image (Fades gently on change) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedImageIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative max-w-full max-h-full flex items-center justify-center cursor-default"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
              >
                <img 
                  src={GALLERY_IMAGES[selectedImageIndex]} 
                  alt={`Enlarged Trail Gallery Image ${selectedImageIndex + 1}`}
                  className="max-w-full max-h-[85vh] object-contain shadow-2xl"
                />
              </motion.div>
            </AnimatePresence>

            {/* Next Button */}
            <button 
              className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-text-light hover:text-accent-gold transition-colors z-50 p-4 cursor-pointer hidden md:block"
              onClick={handleNext}
              aria-label="Next image"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-sans text-xs tracking-[0.2em] text-text-light/50">
              {selectedImageIndex + 1} / {GALLERY_IMAGES.length}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
