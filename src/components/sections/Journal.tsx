"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { fadeUp, stagger, scrollToId } from "@/lib/motion";


export function Journal() {
  const t = useTranslations("Journal");
  const list = t.raw("list") as string[];
  const paragraphs = t.raw("paragraphs") as string[];
  const closing = t.raw("closing") as string[];

  return (
    <section id="journal" className="w-full bg-bg-cream text-text-dark py-32 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[45%_55%] gap-16 lg:gap-24 items-start">
        {/* Photo */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="lg:sticky lg:top-32">
          <div className="relative aspect-square overflow-hidden rounded-lg shadow-[0_22px_44px_-22px_rgba(44,36,25,0.55)]">
            <Image src="/images/journal/journal-03.webp" alt={t("title")} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
        </motion.div>

        {/* Text */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger} className="space-y-8">
          <motion.span variants={fadeUp} className="font-sans text-sm uppercase tracking-[0.18em] text-text-dark block">{t("label")}</motion.span>
          <motion.h2 variants={fadeUp} className="font-display text-h1 leading-[1.1]">{t("title")}</motion.h2>
          <motion.p variants={fadeUp} className="font-serif italic text-body-lg text-text-medium">{t("subtitle")}</motion.p>

          <motion.p variants={fadeUp} className="font-display text-h2 leading-snug pt-4">{t("lead")}</motion.p>
          <motion.div variants={fadeUp} className="font-serif text-body-lg text-text-dark space-y-1">
            {list.map((l) => <p key={l}>{l}</p>)}
          </motion.div>

          {paragraphs.map((p) => (
            <motion.p key={p} variants={fadeUp} className="font-body text-body text-text-dark leading-[1.75]">{p}</motion.p>
          ))}

          <motion.p variants={fadeUp} className="font-display text-h2 text-green-deep">{t("emphasis")}</motion.p>

          {closing.map((p) => (
            <motion.p key={p} variants={fadeUp} className="font-body text-body text-text-dark leading-[1.75]">{p}</motion.p>
          ))}

          <motion.button
            variants={fadeUp}
            onClick={() => scrollToId("contact")}
            className="px-10 py-4 bg-bg-deep text-text-light hover:bg-green-deep transition-colors duration-300 font-sans text-sm uppercase tracking-[0.18em] rounded cursor-pointer"
          >
            {t("cta")}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
