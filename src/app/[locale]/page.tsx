import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Story } from "@/components/sections/Story";
import { HealingTrail } from "@/components/sections/HealingTrail";
import { Benefits } from "@/components/sections/Benefits";
import { Experiences } from "@/components/sections/Experiences";
import { Contact } from "@/components/sections/Contact";
import { Gallery } from "@/components/sections/Gallery";
import { ParallaxImage } from "@/components/effects/ParallaxImage";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);

  return (
    <>
      <Nav />
      <main className="flex-grow w-full bg-bg-cream">
        <Hero />
        
        <Story />

        {/* Dynamic transition photo */}
        <ParallaxImage 
          src="/images/parallax/kids-forest.jpg" 
          alt="Kids playing in the forest on the Poteca Vindecătoare" 
        />
        
        <HealingTrail />
        
        <ParallaxImage 
          src="/images/parallax/flowers.jpg" 
          alt="Colorful wildflowers collected on the Healing Trail" 
        />
        
        <Benefits />
        
        <Experiences />
        <Gallery />
        <Contact />

      </main>
      <Footer />
    </>
  );
}
