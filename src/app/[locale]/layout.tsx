import type { Metadata } from "next";
import { DM_Serif_Display, Cormorant_Garamond, Lora, Outfit } from "next/font/google";
import "@/app/globals.css";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const lora = Lora({
  weight: ["400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const outfit = Outfit({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.poteca.io'),
  title: "Poteca.io — Healing Nature Trail",
  description: "A digital forest bath — the website itself should feel like stepping onto a healing trail in the Carpathian mountains.",
  openGraph: {
    title: "Poteca.io — Healing Nature Trail",
    description: "A digital forest bath — the website itself should feel like stepping onto a healing trail in the Carpathian mountains.",
    url: "https://www.poteca.io",
    siteName: "Poteca.io",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Poteca.io — Healing Nature Trail",
    description: "A digital forest bath — the website itself should feel like stepping onto a healing trail in the Carpathian mountains.",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${dmSerif.variable} ${cormorant.variable} ${lora.variable} ${outfit.variable} antialiased`}
    >
      <body className="grain flex flex-col min-h-screen bg-bg-cream text-text-dark">
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
