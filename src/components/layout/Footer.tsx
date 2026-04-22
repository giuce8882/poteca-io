import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="w-full bg-bg-deep text-text-muted py-10 border-t border-white/5 font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <div className="opacity-60">{t("left")}</div>
        <div className="opacity-40">{t("center")}</div>
        <div className="text-accent-gold opacity-80">{t("right")}</div>
      </div>
    </footer>
  );
}
