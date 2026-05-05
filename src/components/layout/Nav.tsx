"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import Image from "next/image";

export function Nav() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

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
    { key: "benefits", href: "#benefits" },
    { key: "experiences", href: "#experiences" },
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
        scrolled ? "bg-bg-deep/60 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent"
      )}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className={clsx("flex items-center gap-3 font-display text-2xl tracking-wide transition-colors duration-700", scrolled ? "text-text-light" : "text-text-dark")}>
          <Image src="/images/logo.png" alt="Poteca.io Logo" width={50} height={50} className="w-[42px] h-[42px] md:w-[50px] md:h-[50px] object-contain drop-shadow-sm" />
          <span className="mt-1">Poteca</span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link.key}
              onClick={() => {
                const id = link.href.replace('#', '');
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={clsx(
                "text-label font-sans uppercase tracking-[0.08em] hover:text-accent-gold transition-colors duration-400 relative group cursor-pointer",
                scrolled ? "text-text-light/85" : "text-text-dark/85"
              )}
            >
              {t(link.key)}
              <span className="absolute -bottom-1.5 left-0 w-0 h-[1px] bg-accent-gold transition-all duration-500 ease-out group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* Language Toggle */}
        <div className="flex items-center gap-3 font-sans text-label uppercase tracking-widest">
          <Link
            href={pathname}
            locale="ro"
            className={clsx("transition-colors duration-300", locale === "ro" ? "text-accent-gold" : (scrolled ? "text-text-muted hover:text-text-light" : "text-text-medium hover:text-text-dark"))}
          >
            RO
          </Link>
          <span className={clsx("font-light transition-colors duration-300", scrolled ? "text-text-muted/40" : "text-text-medium/40")}>/</span>
          <Link
            href={pathname}
            locale="en"
            className={clsx("transition-colors duration-300", locale === "en" ? "text-accent-gold" : (scrolled ? "text-text-muted hover:text-text-light" : "text-text-medium hover:text-text-dark"))}
          >
            EN
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
