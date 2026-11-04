"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToId } from "@/lib/motion";
import Image from "next/image";

export function Nav() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const dark = scrolled || open;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const goTo = (href: string) => {
    setOpen(false);
    scrollToId(href.replace("#", ""));
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    // Check initial scroll
    handleScroll();
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { key: "story", href: "#story" },
    { key: "healingTrail", href: "#healing-trail" },
    { key: "labyrinth", href: "#labyrinth" },
    { key: "journal", href: "#journal" },
    { key: "services", href: "#services" },
    { key: "gallery", href: "#gallery" },
    { key: "contact", href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] px-6 py-6 md:px-12",
        dark ? "bg-bg-deep/60 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent"
      )}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className={clsx("flex items-center gap-3 font-display text-2xl tracking-wide transition-colors duration-700", dark ? "text-text-light" : "text-text-dark")}>
          <Image src="/images/logo.png" alt="Poteca.io Logo" width={50} height={50} className="w-[42px] h-[42px] md:w-[50px] md:h-[50px] object-contain drop-shadow-sm" />
          <span className="mt-1">Poteca</span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden min-[1360px]:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.key}
              onClick={() => goTo(link.href)}
              className={clsx(
                "whitespace-nowrap text-label font-sans uppercase tracking-[0.08em] hover:text-accent-gold transition-colors duration-400 relative group cursor-pointer",
                dark ? "text-text-light" : "text-text-dark"
              )}
            >
              {t(link.key)}
              <span className="absolute -bottom-1.5 left-0 w-0 h-[1px] bg-accent-gold transition-all duration-500 ease-out group-hover:w-full" />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-5">
        {/* Language Toggle */}
        <div className="flex items-center gap-3 font-sans text-label uppercase tracking-widest">
          <Link
            href={pathname}
            locale="ro"
            className={clsx("transition-colors duration-300", locale === "ro" ? "text-accent-gold" : (dark ? "text-text-light hover:text-accent-gold" : "text-text-medium hover:text-text-dark"))}
          >
            RO
          </Link>
          <span className={clsx("font-light transition-colors duration-300", dark ? "text-accent-stone" : "text-text-medium")}>/</span>
          <Link
            href={pathname}
            locale="en"
            className={clsx("transition-colors duration-300", locale === "en" ? "text-accent-gold" : (dark ? "text-text-light hover:text-accent-gold" : "text-text-medium hover:text-text-dark"))}
          >
            EN
          </Link>
        </div>

        {/* Mobile / tablet menu toggle */}
        <button
          type="button"
          aria-label={t("menu")}
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className={clsx("min-[1360px]:hidden flex flex-col justify-center gap-[6px] w-10 h-10 cursor-pointer", scrolled || open ? "text-text-light" : "text-text-dark")}
        >
          <span className={clsx("block h-[2px] w-7 bg-current transition-transform duration-300", open && "translate-y-[8px] rotate-45")} />
          <span className={clsx("block h-[2px] w-7 bg-current transition-opacity duration-300", open && "opacity-0")} />
          <span className={clsx("block h-[2px] w-7 bg-current transition-transform duration-300", open && "-translate-y-[8px] -rotate-45")} />
        </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="min-[1360px]:hidden absolute top-full left-0 right-0 bg-bg-deep border-t border-accent-gold/20 px-6 py-8 flex flex-col gap-1 max-h-[80vh] overflow-y-auto"
          >
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => goTo(link.href)}
                className="text-left py-4 font-sans text-base uppercase tracking-[0.18em] text-text-light hover:text-accent-gold border-b border-text-light/10 cursor-pointer"
              >
                {t(link.key)}
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
