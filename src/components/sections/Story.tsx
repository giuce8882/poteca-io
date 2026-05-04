"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function Story() {
  const t = useTranslations("Story");

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
    <section id="story" className="w-full bg-bg-cream pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden relative z-10">
      
      {/* Decorative center divider leading into section */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-text-dark/20 to-transparent" />

      <div className="max-w-[800px] mx-auto px-6 lg:px-12">
        {/* Text Block */}
        <div className="flex flex-col justify-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <span className="font-sans text-label uppercase tracking-[0.16em] text-text-muted mb-10 block">
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
  );
}
