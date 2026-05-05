"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function Benefits() {
  const t = useTranslations("Benefits");

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const } }
  };

  const items = ["health", "immune", "mental", "sleep", "clarity"];

  return (
    <section id="benefits" className="w-full bg-bg-cream py-32 overflow-hidden relative z-10">
      
      {/* Decorative vertical line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-text-dark/20 to-transparent" />

      <div className="max-w-[1240px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[40%_55%] gap-20 lg:gap-24">
        
        {/* Left Sticky Context */}
        <div className="lg:sticky lg:top-32 h-fit">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="pr-4"
          >
            <span className="font-sans text-label uppercase tracking-[0.16em] text-text-muted mb-6 block">
              {t("label")}
            </span>
            <h2 className="font-display text-h1 text-text-dark leading-[1.1] mb-8 pb-6 border-b border-text-dark/10">
              {t("title")}
            </h2>
            <p className="font-serif text-body-lg text-text-medium leading-relaxed">
              {t("intro")}
            </p>
          </motion.div>
        </div>

        {/* Right Scroll List */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } }
          }}
          className="flex flex-col gap-14 lg:gap-16 pt-8 lg:pt-0"
        >
          {items.map((item, i) => (
            <motion.div 
              key={item}
              variants={fadeUp}
              className="flex gap-8 group"
            >
              {/* Abstract Icon Index - Adjusted for WCAG Contrast */}
              <div className="text-accent-terracotta font-sans font-medium text-2xl pt-1 min-w-8">
                0{i + 1}
              </div>
              <div>
                <h4 className="font-display text-h3 text-text-dark mb-4">
                  {t(`items.${item}.title`)}
                </h4>
                <p className="font-serif text-body text-text-medium leading-relaxed max-w-[500px]">
                  {t(`items.${item}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
