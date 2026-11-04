import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="w-full bg-bg-deep text-text-light py-10 border-t border-white/5 font-sans text-sm tracking-[0.2em] uppercase">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <div className="text-text-light">{t("left")}</div>
        <div className="text-text-light">{t("center")}</div>
        <div className="text-accent-gold">{t("right")}</div>
      </div>
      
      {/* SEO hidden-in-plain-sight block - subtle and non-intrusive */}
      <div className="max-w-[800px] mx-auto px-6 lg:px-12 mt-8 text-center text-text-light font-serif normal-case tracking-normal text-sm leading-relaxed">
        Premium Forest Bathing Retreat & Nature Therapy in the heart of Transylvania. Authentic Shinrin-Yoku experiences for deep connection and wellness in Romania.
      </div>
    </footer>
  );
}
