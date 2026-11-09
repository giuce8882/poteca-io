"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { fadeUp, stagger, view, scrollToId } from "@/lib/motion";

type Item = { title: string; text: string };
type WhereItem = Item & { tag: string };
type Stat = { value: string; label: string };
type Step = { n: string; title: string; text: string };
type Tone = "deep" | "forest" | "cream";

// Each band sets its own colour variables so children stay readable on dark, green and light backgrounds.
const tones: Record<Tone, string> = {
  deep: "bg-bg-deep [--bg:var(--color-bg-deep)] [--fg:var(--color-text-light)] [--accent:var(--color-accent-gold)] [--soft:var(--color-accent-sage)]",
  forest: "bg-bg-forest [--bg:var(--color-bg-forest)] [--fg:var(--color-text-light)] [--accent:var(--color-accent-gold)] [--soft:var(--color-accent-sage)]",
  cream: "bg-bg-cream [--bg:var(--color-bg-cream)] [--fg:var(--color-text-dark)] [--accent:var(--color-green-deep)] [--soft:var(--color-text-medium)]",
};

// One image per history item, in message order: Cretan, Chartres, Nordic stone, Tohono O’odham (no free-licence diagram yet).
const historyImages: (string | null)[] = [
  "/images/labyrinth/diagrams/cretan.svg",
  "/images/labyrinth/diagrams/chartres.svg",
  "/images/labyrinth/diagrams/nordic.png",
  null,
];

const label = "font-sans text-sm uppercase tracking-[0.18em] text-(--accent)";
const card = "p-8 rounded-lg border border-(--accent)/25 bg-(--fg)/5";
const body = "font-body text-body text-(--fg) leading-[1.75]";

function Band({ tone, id, children }: { tone: Tone; id?: string; children: React.ReactNode }) {
  return (
    <div id={id} className={`${tones[tone]} text-(--fg) py-24 md:py-32 overflow-hidden`}>
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12">{children}</div>
    </div>
  );
}

function Quote({ text, cite }: { text: string; cite: string }) {
  return (
    <blockquote className="border-l-2 border-(--accent) pl-6">
      <p className="font-serif italic text-body-lg text-(--fg) leading-relaxed">„{text}”</p>
      <cite className="mt-4 block font-sans text-sm not-italic tracking-wide text-(--soft)">— {cite}</cite>
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
    <section>
      {/* 1. Header + night photos (dark: the candlelit labyrinth is the star) */}
      <Band tone="deep" id="labyrinth">
        <motion.div initial="hidden" whileInView="visible" viewport={view} variants={stagger} className="text-center max-w-[800px] mx-auto mb-16">
          <motion.span variants={fadeUp} className={`${label} mb-6 block`}>{t("label")}</motion.span>
          <motion.h2 variants={fadeUp} className="font-display text-h1 leading-[1.1] mb-6">{t("title")}</motion.h2>
          <motion.p variants={fadeUp} className="font-serif italic text-body-lg">{t("subtitle")}</motion.p>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={view} variants={fadeUp} className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image src="/images/labyrinth/night-01.webp" alt={t("nightCaption")} fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover" />
          </div>
          <div className="relative aspect-[3/4] md:aspect-auto overflow-hidden rounded-lg">
            <Image src="/images/labyrinth/night-02.webp" alt="" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
          </div>
        </motion.div>
        <p className="mt-4 text-center font-serif italic text-body">{t("nightCaption")}</p>
      </Band>

      {/* 2. What is a labyrinth + history (light) */}
      <Band tone="cream">
        <motion.div initial="hidden" whileInView="visible" viewport={view} variants={stagger} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <motion.span variants={fadeUp} className={`${label} block`}>{t("what.kicker")}</motion.span>
            <motion.h3 variants={fadeUp} className="font-display text-h2">{t("what.title")}</motion.h3>
            <motion.div variants={fadeUp}><Quote text={t("what.quote")} cite={t("what.cite")} /></motion.div>
            <motion.p variants={fadeUp} className={body}>{t("what.intro")}</motion.p>
          </div>
          <motion.div variants={fadeUp} className="grid gap-6">
            <div className={card}>
              <h4 className="font-display text-h3 text-(--accent) mb-2">{t("what.vsLabyrinth")}</h4>
              <p className={body}>{t("what.vsLabyrinthText")}</p>
            </div>
            <div className={card}>
              <h4 className="font-display text-h3 text-(--soft) mb-2">{t("what.vsMaze")}</h4>
              <p className={body}>{t("what.vsMazeText")}</p>
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-24 grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-24">
          <div className="lg:sticky lg:top-32 h-fit max-w-[460px]">
            <h3 className="font-display text-h2 mb-6">{t("history.title")}</h3>
            <p className={body}>{t("history.intro")}</p>
            <p className="mt-8 font-sans text-sm text-(--soft)">{t("history.credit")}</p>
          </div>
          <motion.ul initial="hidden" whileInView="visible" viewport={view} variants={stagger}>
            {history.map((h, i) => (
              <motion.li key={h.title} variants={fadeUp} className="grid sm:grid-cols-[112px_170px_1fr] gap-4 sm:gap-8 items-start border-t border-(--accent)/30 py-8 first:border-t-0 first:pt-0">
                <div className="h-[112px] w-[112px]">
                  {historyImages[i] && (
                    <Image src={historyImages[i]} alt="" width={112} height={112} unoptimized className="h-full w-full object-contain mix-blend-multiply" />
                  )}
                </div>
                <h4 className="font-display text-h3 text-(--accent)">{h.title}</h4>
                <p className={body}>{h.text}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </Band>

      {/* 3. Why + stats (green) */}
      <Band tone="forest">
        <motion.div initial="hidden" whileInView="visible" viewport={view} variants={fadeUp} className="max-w-[760px] mx-auto space-y-8">
          <h3 className="font-display text-h2 text-center">{t("why.title")}</h3>
          <Quote text={t("why.quote")} cite={t("why.cite")} />
          <p className={body}>{t("why.text")}</p>
        </motion.div>
        <div className="mt-20">
          <h3 className="font-display text-h2 text-center mb-10">{t("stats.title")}</h3>
          <motion.div initial="hidden" whileInView="visible" viewport={view} variants={stagger} className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {stats.map((s) => (
              <motion.div key={s.label} variants={fadeUp} className="text-center py-6">
                <div className="font-display text-hero text-(--accent) leading-none [font-variant-numeric:tabular-nums]">{s.value}</div>
                <div className="mt-3 font-serif text-body-lg">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
          <p className="mt-6 text-center font-sans text-sm">{t("stats.note")}</p>
          <div className="mt-10 max-w-[760px] mx-auto"><Quote text={t("stats.quote")} cite={t("stats.cite")} /></div>
        </div>
      </Band>

      {/* 4. Body & mind + steps (light) */}
      <Band tone="cream">
        <h3 className="font-display text-h2 text-center mb-12">{t("effects.title")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: t("effects.body.title"), items: bodyItems },
            { title: t("effects.mind.title"), items: mindItems },
          ].map((col) => (
            <div key={col.title} className={card}>
              <h4 className="font-display text-h3 text-(--accent) mb-6">{col.title}</h4>
              <ul className="space-y-4">
                {col.items.map((i) => (
                  <li key={i} className={`${body} flex gap-3`}>
                    <span aria-hidden className="text-(--accent)">–</span>
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-24">
          <div className="text-center mb-12">
            <h3 className="font-display text-h2 mb-3">{t("steps.title")}</h3>
            <p className="font-serif italic text-body-lg">{t("steps.intro")}</p>
          </div>
          <motion.ol initial="hidden" whileInView="visible" viewport={view} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
            {steps.map((st, i) => (
              <motion.li key={st.n} variants={fadeUp}>
                <div className="flex items-center gap-5 mb-6" aria-hidden>
                  <span className="font-display text-hero text-(--accent) leading-none">{st.n}</span>
                  {i < steps.length - 1 && <span className="hidden md:block h-px flex-1 bg-gradient-to-r from-(--accent) to-transparent opacity-60" />}
                </div>
                <h4 className="font-display text-h3 mb-3">{st.title}</h4>
                <p className={body}>{st.text}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </Band>

      {/* 5. Hard to sit still + mobile labyrinth video (green) */}
      <Band tone="forest">
        <motion.div initial="hidden" whileInView="visible" viewport={view} variants={stagger} className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-16 items-center">
          <div className="space-y-8">
            <motion.h3 variants={fadeUp} className="font-display text-h2">{t("still.title")}</motion.h3>
            <motion.div variants={fadeUp}><Quote text={t("still.quote")} cite={t("still.cite")} /></motion.div>
            <motion.p variants={fadeUp} className={body}>{t("still.text")}</motion.p>
          </div>
          <motion.figure variants={fadeUp} className="mx-auto w-full max-w-[340px]">
            <video
              controls
              playsInline
              preload="none"
              poster="/images/labyrinth/mobile-poster.webp"
              className="w-full aspect-[464/832] rounded-lg bg-bg-deep object-cover"
            >
              <source src="/videos/labyrinth-mobile.mp4" type="video/mp4" />
            </video>
            <figcaption className="mt-3 text-center font-serif italic text-body">{t("still.videoCaption")}</figcaption>
          </motion.figure>
        </motion.div>
      </Band>

      {/* 6. Where we can build (light, with a photo) */}
      <Band tone="cream">
        <div className="text-center max-w-[760px] mx-auto mb-12">
          <h3 className="font-display text-h2 mb-4">{t("where.title")}</h3>
          <p className={body}>{t("where.intro")}</p>
        </div>
        <motion.div initial="hidden" whileInView="visible" viewport={view} variants={fadeUp} className="relative aspect-[21/9] mb-14 overflow-hidden rounded-lg">
          <Image src="/images/oana/where-forest.webp" alt="" fill sizes="(min-width: 1240px) 1240px, 100vw" className="object-cover object-[50%_85%]" />
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={view} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {where.map((w) => (
            <motion.div key={w.title} variants={fadeUp} className="border-t border-(--accent)/40 pt-6">
              <span className={`${label} block mb-3`}>{w.tag}</span>
              <h4 className="font-display text-h3 mb-3">{w.title}</h4>
              <p className={body}>{w.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </Band>

      {/* 7. Labyrinths for meditation at home (green) */}
      <Band tone="forest">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
          <div className="space-y-6">
            <h3 className="font-display text-h2">{t("finger.title")}</h3>
            <p className={body}>{t("finger.text")}</p>
            <button onClick={goContact} className="px-8 py-4 border border-(--accent) text-(--accent) hover:bg-(--accent) hover:text-(--bg) transition-colors duration-300 font-sans text-sm uppercase tracking-[0.18em] rounded cursor-pointer">
              {t("finger.cta")}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image src={`/images/labyrinth/finger-0${n}.webp`} alt={n === 1 ? t("finger.title") : ""} fill sizes="(min-width: 1024px) 30vw, 50vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </Band>

      {/* 8. Invitation (dark) */}
      <Band tone="deep">
        <motion.div initial="hidden" whileInView="visible" viewport={view} variants={stagger} className="text-center max-w-[760px] mx-auto">
          <motion.span variants={fadeUp} className={`${label} block mb-4`}>{t("invite.kicker")}</motion.span>
          <motion.h3 variants={fadeUp} className="font-display text-h1 leading-[1.1] mb-8">{t("invite.title")}</motion.h3>
          <motion.div variants={fadeUp} className="font-serif text-body-lg space-y-1 mb-10">
            {inviteLines.map((l) => <p key={l}>{l}</p>)}
          </motion.div>
          <motion.button variants={fadeUp} onClick={goContact} className="px-10 py-4 bg-(--accent) text-(--bg) hover:bg-(--fg) transition-colors duration-300 font-sans text-sm uppercase tracking-[0.18em] rounded cursor-pointer">
            {t("invite.cta")}
          </motion.button>
          <motion.p variants={fadeUp} className="mt-8 font-serif text-body-lg">
            {t("invite.contactLabel")} ·{" "}
            <a href="mailto:oana@poteca.io" className="underline decoration-(--accent) underline-offset-4 hover:text-(--accent)">oana@poteca.io</a> ·{" "}
            <a href="tel:+40722246178" className="underline decoration-(--accent) underline-offset-4 hover:text-(--accent)">+40 722 246 178</a>
          </motion.p>
          <p className="mt-12 font-sans text-sm">{t("sources")}</p>
        </motion.div>
      </Band>
    </section>
  );
}
