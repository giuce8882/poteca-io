"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function Experiences() {
  const t = useTranslations("Experiences");

  const fadeUp = {
    hidden: { opacity: 0, scale: 0.95, y: 40 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const } }
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } }
  };

  const cards = ["walks", "online", "immersive"];

  return (
    <section id="experiences" className="w-full bg-bg-forest py-32 overflow-hidden text-text-light">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, amount: 0.3 }}
           variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
           className="max-w-[800px] mb-20 text-center mx-auto flex flex-col items-center"
        >
          <motion.span variants={fadeUp} className="font-sans text-label uppercase tracking-[0.16em] text-accent-gold mb-6 block">
            {t("label")}
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-display text-h1 leading-[1.1] mb-10">
            {t("title")}
          </motion.h2>
          <motion.p variants={fadeUp} className="font-serif text-body-lg text-text-light/70 max-w-[600px] leading-relaxed">
            {t("intro")}
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {cards.map((card) => (
            <motion.div 
              key={card}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              className="group p-10 bg-bg-deep border border-accent-gold/10 hover:border-accent-gold/50 transition-all duration-500 rounded flex flex-col h-full shadow-2xl shadow-black/20"
            >
              <div className="mb-8">
                <span className="font-sans text-xs uppercase tracking-widest text-text-muted mb-4 block">
                  {t(`cards.${card}.type`)}
                </span>
                <h3 className="font-display text-h3 text-text-light mb-4">
                  {t(`cards.${card}.title`)}
                </h3>
                <p className="font-serif text-body text-text-light/60 leading-relaxed whitespace-pre-wrap">
                  {t(`cards.${card}.description`)}
                </p>
              </div>
              <div className="mt-auto pt-8">
                <button className="w-full py-4 border border-text-light/20 hover:bg-text-light hover:text-bg-deep transition-colors duration-300 font-sans uppercase text-xs tracking-widest rounded text-accent-gold hover:border-text-light">
                  {t(`cards.${card}.cta`)}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
