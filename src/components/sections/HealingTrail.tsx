"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function HealingTrail() {
  const t = useTranslations("HealingTrail");

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const } }
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };

  const spaces = ["untangle", "labyrinth", "zen", "bridges"];

  return (
    <section id="healing-trail" className="w-full bg-bg-deep py-32 overflow-hidden text-text-light">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, amount: 0.3 }}
           variants={fadeUp}
           className="max-w-[800px] mb-24"
        >
          <span className="font-sans text-label uppercase tracking-[0.16em] text-text-muted mb-6 block">
            {t("label")}
          </span>
          <h2 className="font-display text-h1 text-text-light leading-[1.1] mb-10 pb-6 border-b border-text-light/10 max-w-max">
            {t("title")}
          </h2>
          <div className="flex flex-col gap-6 font-serif text-body-lg text-text-light/80 leading-relaxed font-light">
            <p>{t("body1")}</p>
            <p>{t("body2")}</p>
            <p>{t("body3")}</p>
          </div>
        </motion.div>

        {/* Spaces Subtitle */}
        <motion.h3 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="font-display text-h2 text-accent-gold mb-12"
        >
          {t("subtitle")}
        </motion.h3>

        {/* Cards Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {spaces.map((space) => (
            <motion.div 
              key={space}
              variants={{
                hidden: { opacity: 0, scale: 0.92, y: 40 },
                visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
              }}
              whileHover={{ scale: 1.01 }}
              className="group p-10 lg:p-12 bg-white/[0.03] backdrop-blur-md border border-accent-gold/10 hover:border-accent-gold transition-all duration-500 rounded flex flex-col justify-center"
            >
              <h4 className="font-display text-h3 text-text-light mb-4 group-hover:text-accent-gold transition-colors duration-500">
                {t(`spaces.${space}.title`)}
              </h4>
              <p className="font-serif text-body text-text-light/70 leading-relaxed">
                {t(`spaces.${space}.description`)}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
