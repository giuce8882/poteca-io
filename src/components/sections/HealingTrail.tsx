"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { fadeUp, stagger } from "@/lib/motion";

export function HealingTrail() {
  const t = useTranslations("HealingTrail");

  return (
    <section id="healing-trail" className="w-full bg-bg-forest py-24 md:py-32 overflow-hidden text-text-light">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          <motion.span variants={fadeUp} className="font-sans text-sm uppercase tracking-[0.18em] text-accent-gold mb-8 block">
            {t("label")}
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-display text-h1 text-text-light leading-[1.1] mb-10 pb-6 border-b border-text-light/20 max-w-max">
            {t("title")}
          </motion.h2>
          <motion.div variants={fadeUp} className="flex flex-col gap-6 font-serif text-body-lg text-text-light leading-[1.75]">
            <p>{t("body1")}</p>
            <p>{t("body2")}</p>
            <p>{t("body3")}</p>
          </motion.div>
          <motion.a
            variants={fadeUp}
            href="https://www.potecawalden.ro"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-3 font-sans text-sm uppercase tracking-[0.18em] text-accent-gold border-b border-accent-gold/60 pb-1 hover:text-text-light hover:border-text-light transition-colors duration-300"
          >
            {t("website")} <span aria-hidden>↗</span>
          </motion.a>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="relative aspect-[4/5] w-full max-w-[520px] mx-auto lg:ml-auto rounded-lg overflow-hidden shadow-[0_28px_60px_-30px_rgba(8,14,9,0.8)]"
        >
          <Image src="/images/gallery/oct-13.webp" alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
        </motion.div>
      </div>
    </section>
  );
}
