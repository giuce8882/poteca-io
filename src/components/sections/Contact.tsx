"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function Contact() {
  const t = useTranslations("Contact");

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const } }
  };

  return (
    <section id="contact" className="w-full bg-bg-deep text-text-light py-32 overflow-hidden border-t border-white/5">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        
        {/* Contact Info */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="flex flex-col"
        >
          <motion.span variants={fadeUp} className="font-sans text-label uppercase tracking-[0.16em] text-accent-gold mb-6 block">
            {t("label")}
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-display text-h1 leading-[1.1] mb-8 pb-6 border-b border-text-light/10 max-w-max">
            {t("title")}
          </motion.h2>
          <motion.p variants={fadeUp} className="font-serif text-body-lg text-text-light/70 mb-16 max-w-[400px]">
            {t("body")}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col gap-8 font-serif text-h3 text-text-light/90">
            <div>
              <span className="font-sans text-xs uppercase tracking-widest text-text-muted block mb-2">{t("phoneLabel")}</span>
              <a href="tel:+40722246178" className="hover:text-accent-gold transition-colors duration-300">+40 722 246 178</a>
            </div>
            <div>
              <span className="font-sans text-xs uppercase tracking-widest text-text-muted block mb-2">{t("emailLabel")}</span>
              <a href="mailto:hello@poteca.io" className="hover:text-accent-gold transition-colors duration-300">hello@poteca.io</a>
            </div>
            <div>
              <span className="font-sans text-xs uppercase tracking-widest text-text-muted block mb-2">Location</span>
              <span className="text-text-light/60">{t("location")}</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Minimal Form */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="flex flex-col justify-center"
        >
          <form className="flex flex-col gap-6 w-full max-w-[500px] ml-auto" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-name" className="font-sans text-xs uppercase tracking-widest text-text-muted">{t("form.name")}</label>
              <input 
                id="contact-name"
                type="text" 
                className="w-full bg-transparent border-b border-text-light/20 focus:border-accent-gold py-4 outline-none font-serif text-lg text-text-light transition-colors duration-300"
                placeholder="First Last" 
              />
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <label htmlFor="contact-email" className="font-sans text-xs uppercase tracking-widest text-text-muted">{t("form.contact")}</label>
              <input 
                id="contact-email"
                type="text" 
                className="w-full bg-transparent border-b border-text-light/20 focus:border-accent-gold py-4 outline-none font-serif text-lg text-text-light transition-colors duration-300"
                placeholder="hello@example.com" 
              />
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <label htmlFor="contact-message" className="font-sans text-xs uppercase tracking-widest text-text-muted">{t("form.message")}</label>
              <textarea 
                id="contact-message"
                rows={5}
                className="w-full bg-transparent border-b border-text-light/20 focus:border-accent-gold py-4 outline-none font-serif text-lg text-text-light transition-colors duration-300 resize-none"
                placeholder="I would love to explore..." 
              />
            </div>
            <div className="mt-8">
              <button type="submit" className="bg-accent-gold text-bg-deep hover:bg-text-light transition-colors duration-300 px-12 py-5 font-sans uppercase tracking-[0.15em] text-xs font-medium rounded-full cursor-pointer">
                {t("form.submit")}
              </button>
            </div>
          </form>
        </motion.div>

      </div>
    </section>
  );
}
