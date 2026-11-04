"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, scale: 0.95, y: 40 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };

const cards = ["oneOnOne", "group", "consulting", "speaker"] as const;

export function Services() {
  const t = useTranslations("Services");

  return (
    <section id="services" className="w-full bg-bg-forest py-32 overflow-hidden text-text-light">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="max-w-[800px] mb-20 text-center mx-auto flex flex-col items-center"
        >
          <motion.span variants={fadeUp} className="font-sans text-sm uppercase tracking-[0.18em] text-accent-gold mb-6 block">{t("label")}</motion.span>
          <motion.h2 variants={fadeUp} className="font-display text-h1 leading-[1.1] mb-8">{t("title")}</motion.h2>
          <motion.p variants={fadeUp} className="font-serif text-body-lg text-text-light max-w-[600px] leading-relaxed">{t("intro")}</motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {cards.map((card) => (
            <motion.div
              key={card}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              className="group p-10 bg-bg-deep border border-accent-gold/20 hover:border-accent-gold/60 transition-all duration-500 rounded flex flex-col h-full shadow-2xl shadow-black/20"
            >
              <div className="mb-8">
                <span className="font-sans text-sm uppercase tracking-[0.18em] text-accent-gold mb-4 block">{t(`cards.${card}.type`)}</span>
                <h3 className="font-display text-h3 text-text-light mb-4">{t(`cards.${card}.title`)}</h3>
                <p className="font-body text-body text-text-light leading-[1.75]">{t(`cards.${card}.description`)}</p>
              </div>
              <div className="mt-auto pt-4">
                <button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="w-full py-4 border border-accent-gold text-accent-gold hover:bg-accent-gold hover:text-bg-deep transition-colors duration-300 font-sans uppercase text-sm tracking-[0.18em] rounded cursor-pointer"
                >
                  {t("cta")}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
