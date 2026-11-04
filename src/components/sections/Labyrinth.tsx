"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { fadeUp, stagger, view, scrollToId } from "@/lib/motion";

type Item = { title: string; text: string };
type WhereItem = Item & { tag: string };
type Stat = { value: string; label: string };
type Step = { n: string; title: string; text: string };


const label = "font-sans text-sm uppercase tracking-[0.18em] text-accent-gold";
const card = "p-8 bg-bg-deep border border-accent-gold/20 rounded";

function Quote({ text, cite }: { text: string; cite: string }) {
  return (
    <blockquote className="border-l-2 border-accent-gold pl-6">
      <p className="font-serif italic text-body-lg text-text-light leading-relaxed">„{text}”</p>
      <cite className="mt-4 block font-sans text-sm not-italic tracking-wide text-accent-sage">— {cite}</cite>
    </blockquote>
  );
}

export function Labyrinth() {
  const t = useTranslations("Labyrinth");
  const history = t.raw("history.items") as Item[];
  const stats = t.raw("stats.items") as Stat[];
  const bodyItems = t.raw("effects.body.items") as string[];
  const mindItems = t.raw("effects.mind.items") as string[];
  const steps = t.raw("steps.items") as Step[];
  const where = t.raw("where.items") as WhereItem[];
  const inviteLines = t.raw("invite.lines") as string[];
  const goContact = () => scrollToId("contact");

  return (
    <section id="labyrinth" className="w-full bg-bg-deep text-text-light py-32 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12 space-y-32">
        {/* Header + night photos */}
        <div>
          <motion.div initial="hidden" whileInView="visible" viewport={view} variants={stagger} className="text-center max-w-[800px] mx-auto mb-16">
            <motion.span variants={fadeUp} className={`${label} mb-6 block`}>{t("label")}</motion.span>
            <motion.h2 variants={fadeUp} className="font-display text-h1 leading-[1.1] mb-6">{t("title")}</motion.h2>
            <motion.p variants={fadeUp} className="font-serif italic text-body-lg text-text-light">{t("subtitle")}</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={view} variants={fadeUp} className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded">
              <Image src="/images/labyrinth/night-01.webp" alt={t("nightCaption")} fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover" />
            </div>
            <div className="relative aspect-[3/4] md:aspect-auto overflow-hidden rounded">
              <Image src="/images/labyrinth/night-02.webp" alt="" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
            </div>
          </motion.div>
          <p className="mt-4 text-center font-serif italic text-body text-text-light">{t("nightCaption")}</p>
        </div>

        {/* What is a labyrinth */}
        <motion.div initial="hidden" whileInView="visible" viewport={view} variants={stagger} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <motion.span variants={fadeUp} className={`${label} block`}>{t("what.kicker")}</motion.span>
            <motion.h3 variants={fadeUp} className="font-display text-h2">{t("what.title")}</motion.h3>
            <motion.div variants={fadeUp}><Quote text={t("what.quote")} cite={t("what.cite")} /></motion.div>
            <motion.p variants={fadeUp} className="font-body text-body text-text-light leading-[1.75]">{t("what.intro")}</motion.p>
          </div>
          <motion.div variants={fadeUp} className="grid gap-6">
            <div className={card}>
              <h4 className="font-display text-h3 text-accent-gold mb-2">{t("what.vsLabyrinth")}</h4>
              <p className="font-body text-body text-text-light leading-[1.75]">{t("what.vsLabyrinthText")}</p>
            </div>
            <div className={card}>
              <h4 className="font-display text-h3 text-accent-stone mb-2">{t("what.vsMaze")}</h4>
              <p className="font-body text-body text-text-light leading-[1.75]">{t("what.vsMazeText")}</p>
            </div>
          </motion.div>
        </motion.div>

        {/* History */}
        <div>
          <div className="text-center max-w-[700px] mx-auto mb-12">
            <h3 className="font-display text-h2 mb-4">{t("history.title")}</h3>
            <p className="font-body text-body text-text-light leading-[1.75]">{t("history.intro")}</p>
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={view} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {history.map((h) => (
              <motion.div key={h.title} variants={fadeUp} className={card}>
                <h4 className="font-display text-h3 mb-3">{h.title}</h4>
                <p className="font-body text-body text-text-light leading-[1.75]">{h.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Why + stats */}
        <div className="bg-bg-forest rounded px-6 py-16 md:px-16 space-y-16">
          <motion.div initial="hidden" whileInView="visible" viewport={view} variants={fadeUp} className="max-w-[760px] mx-auto space-y-8">
            <h3 className="font-display text-h2 text-center">{t("why.title")}</h3>
            <Quote text={t("why.quote")} cite={t("why.cite")} />
            <p className="font-body text-body text-text-light leading-[1.75]">{t("why.text")}</p>
          </motion.div>
          <div>
            <h3 className="font-display text-h2 text-center mb-10">{t("stats.title")}</h3>
            <motion.div initial="hidden" whileInView="visible" viewport={view} variants={stagger} className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {stats.map((s) => (
                <motion.div key={s.label} variants={fadeUp} className="text-center py-6">
                  <div className="font-display text-hero text-accent-gold leading-none">{s.value}</div>
                  <div className="mt-3 font-serif text-body-lg text-text-light">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
            <p className="mt-6 text-center font-sans text-sm text-text-light">{t("stats.note")}</p>
            <div className="mt-10 max-w-[760px] mx-auto"><Quote text={t("stats.quote")} cite={t("stats.cite")} /></div>
          </div>
        </div>

        {/* Body & mind */}
        <div>
          <h3 className="font-display text-h2 text-center mb-12">{t("effects.title")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: t("effects.body.title"), items: bodyItems },
              { title: t("effects.mind.title"), items: mindItems },
            ].map((col) => (
              <div key={col.title} className={card}>
                <h4 className="font-display text-h3 text-accent-gold mb-6">{col.title}</h4>
                <ul className="space-y-4">
                  {col.items.map((i) => (
                    <li key={i} className="font-body text-body text-text-light leading-[1.75] flex gap-3">
                      <span aria-hidden className="text-accent-gold">–</span>
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div>
          <div className="text-center mb-12">
            <h3 className="font-display text-h2 mb-3">{t("steps.title")}</h3>
            <p className="font-serif italic text-body-lg text-text-light">{t("steps.intro")}</p>
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={view} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <motion.div key={s.n} variants={fadeUp} className={card}>
                <span className="font-display text-hero text-accent-gold/90 leading-none block mb-4">{s.n}</span>
                <h4 className="font-display text-h3 mb-3">{s.title}</h4>
                <p className="font-body text-body text-text-light leading-[1.75]">{s.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Hard to sit still + mobile labyrinth video */}
        <motion.div initial="hidden" whileInView="visible" viewport={view} variants={stagger} className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-16 items-center">
          <div className="space-y-8">
            <motion.h3 variants={fadeUp} className="font-display text-h2">{t("still.title")}</motion.h3>
            <motion.div variants={fadeUp}><Quote text={t("still.quote")} cite={t("still.cite")} /></motion.div>
            <motion.p variants={fadeUp} className="font-body text-body text-text-light leading-[1.75]">{t("still.text")}</motion.p>
          </div>
          <motion.figure variants={fadeUp} className="mx-auto w-full max-w-[340px]">
            <video
              controls
              playsInline
              preload="none"
              poster="/images/labyrinth/mobile-poster.webp"
              className="w-full aspect-[464/832] rounded bg-bg-deep object-cover"
            >
              <source src="/videos/labyrinth-mobile.mp4" type="video/mp4" />
            </video>
            <figcaption className="mt-3 text-center font-serif italic text-body text-text-light">{t("still.videoCaption")}</figcaption>
          </motion.figure>
        </motion.div>

        {/* Where */}
        <div>
          <div className="text-center max-w-[760px] mx-auto mb-12">
            <h3 className="font-display text-h2 mb-4">{t("where.title")}</h3>
            <p className="font-body text-body text-text-light leading-[1.75]">{t("where.intro")}</p>
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={view} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {where.map((w) => (
              <motion.div key={w.title} variants={fadeUp} className={card}>
                <span className={`${label} block mb-3`}>{w.tag}</span>
                <h4 className="font-display text-h3 mb-3">{w.title}</h4>
                <p className="font-body text-body text-text-light leading-[1.75]">{w.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Finger labyrinths */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
          <div className="space-y-6">
            <h3 className="font-display text-h2">{t("finger.title")}</h3>
            <p className="font-body text-body text-text-light leading-[1.75]">{t("finger.text")}</p>
            <button onClick={goContact} className="px-8 py-4 border border-accent-gold text-accent-gold hover:bg-accent-gold hover:text-bg-deep transition-colors duration-300 font-sans text-sm uppercase tracking-[0.18em] rounded cursor-pointer">
              {t("finger.cta")}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="relative aspect-[4/3] overflow-hidden rounded">
                <Image src={`/images/labyrinth/finger-0${n}.webp`} alt={n === 1 ? t("finger.title") : ""} fill sizes="(min-width: 1024px) 30vw, 50vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Invitation */}
        <motion.div initial="hidden" whileInView="visible" viewport={view} variants={stagger} className="text-center max-w-[760px] mx-auto">
          <motion.span variants={fadeUp} className={`${label} block mb-4`}>{t("invite.kicker")}</motion.span>
          <motion.h3 variants={fadeUp} className="font-display text-h1 leading-[1.1] mb-8">{t("invite.title")}</motion.h3>
          <motion.div variants={fadeUp} className="font-serif text-body-lg text-text-light space-y-1 mb-10">
            {inviteLines.map((l) => <p key={l}>{l}</p>)}
          </motion.div>
          <motion.button variants={fadeUp} onClick={goContact} className="px-10 py-4 bg-accent-gold text-bg-deep hover:bg-text-light transition-colors duration-300 font-sans text-sm uppercase tracking-[0.18em] rounded cursor-pointer">
            {t("invite.cta")}
          </motion.button>
          <motion.p variants={fadeUp} className="mt-8 font-serif text-body-lg text-text-light">
            {t("invite.contactLabel")} ·{" "}
            <a href="mailto:oana@poteca.io" className="underline decoration-accent-gold underline-offset-4 hover:text-accent-gold">oana@poteca.io</a> ·{" "}
            <a href="tel:+40722246178" className="underline decoration-accent-gold underline-offset-4 hover:text-accent-gold">+40 722 246 178</a>
          </motion.p>
          <p className="mt-12 font-sans text-sm text-text-light">{t("sources")}</p>
        </motion.div>
      </div>
    </section>
  );
}
