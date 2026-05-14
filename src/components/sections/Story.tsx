"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { VideoModal } from "@/components/ui/VideoModal";

export function Story() {
  const t = useTranslations("Story");
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const fadeUp = {
    hidden: { opacity: 0, scale: 0.98, y: 40 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as const } 
    }
  };

  return (
    <>
    <section id="story" className="w-full bg-bg-cream pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden relative z-10">
      
      {/* Decorative center divider leading into section */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-text-dark/20 to-transparent" />

      <div className="max-w-[1300px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[45%_50%] gap-16 lg:gap-24 items-center">
        
        {/* Intentionally asymmetrical composition for visual interest */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="order-2 lg:order-1 relative aspect-[3/4] w-full max-w-[480px] mx-auto lg:mx-0 group cursor-pointer"
          onClick={() => setIsVideoOpen(true)}
        >
          <div className="absolute inset-0 z-10 transition-transform duration-700 group-hover:scale-[1.02]">
            <Image 
              src="/images/story/oana.jpg" 
              alt="Oana - Healing Nature Trail Guide"
              fill
              sizes="(max-width: 1024px) 100vw, 480px"
              className="absolute inset-0 object-cover rounded shadow-lg filter sepia-[0.05] saturate-[0.9] contrast-[1.05]"
            />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-end justify-center pb-16">
              <div className="relative">
                {/* Ripple Effect */}
                <div className="absolute inset-0 rounded-full bg-accent-gold/30 animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative w-20 h-20 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white transition-all duration-500 group-hover:bg-accent-gold group-hover:border-accent-gold group-hover:scale-110 shadow-xl">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                
                {/* Label that appears on hover */}
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 font-sans text-[10px] uppercase tracking-[0.2em] text-white opacity-0 group-hover:opacity-100 transition-all duration-500 whitespace-nowrap bg-bg-deep/40 px-3 py-1 rounded backdrop-blur-sm">
                  {t("watchStory")}
                </span>
              </div>
            </div>
          </div>
          
          {/* Subtle gold decoration logic per design spec */}
          <div className="absolute -bottom-6 -right-6 w-full h-full border border-accent-gold/20 pointer-events-none rounded transition-transform duration-700 group-hover:translate-x-2 group-hover:translate-y-2" />
        </motion.div>

        {/* Text Block */}
        <div className="order-1 lg:order-2 flex flex-col justify-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <span className="font-sans text-label uppercase tracking-[0.16em] text-text-dark/70 mb-10 block">
              {t("label")}
            </span>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } }
            }}
            className="flex flex-col gap-6 font-serif text-body-lg text-text-medium leading-relaxed"
          >
            <motion.p variants={fadeUp}>{t("body1")}</motion.p>
            <motion.p variants={fadeUp} className="italic pr-6 border-l-2 border-accent-gold text-text-dark my-4 pl-6 text-[1.15em] leading-[1.6]">
              {t("body2")}
            </motion.p>
            <motion.p variants={fadeUp}>{t("body3")}</motion.p>
            <motion.p variants={fadeUp}>{t("body4")}</motion.p>
            <motion.p variants={fadeUp}>{t("body5")}</motion.p>
            
            <motion.div variants={fadeUp} className="mt-12">
              <span className="font-serif italic text-h3 text-text-dark pl-6 border-l-[3px] border-accent-gold block py-1">
                {t("quote")}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>

    <VideoModal 
      isOpen={isVideoOpen} 
      onClose={() => setIsVideoOpen(false)} 
      videoId="117isr-BNIE" 
    />
    </>
  );
}
