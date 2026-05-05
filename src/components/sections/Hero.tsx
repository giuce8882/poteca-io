"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("Hero");
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  // Ready signal with fallback for iOS Low Power Mode
  useEffect(() => {
    let active = true;
    
    const handleCanPlay = () => {
      if (active) {
        setLoaded(true);
        // Pause the autoplaying video so scroll can take over
        if (videoRef.current) videoRef.current.pause();
      }
    };

    if (videoRef.current) {
      if (videoRef.current.readyState >= 1) {
        handleCanPlay();
      } else {
        videoRef.current.addEventListener('loadedmetadata', handleCanPlay);
      }
    }

    // Fallback: Force remove loading screen after 1.5s in case iOS blocks autoPlay
    const fallbackTimer = setTimeout(() => {
      if (active) setLoaded(true);
    }, 1500);

    return () => {
      active = false;
      clearTimeout(fallbackTimer);
      if (videoRef.current) {
        videoRef.current.removeEventListener('loadedmetadata', handleCanPlay);
      }
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Sync scroll with video playback seamlessly
  useEffect(() => {
    if (!loaded) return;

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (videoRef.current && videoRef.current.duration) {
        // Calculate the target time in the video
        // We use Math.max to avoid assigning NaN or infinity if duration isn't fetched
        const targetTime = Math.max(0, latest * videoRef.current.duration);
        
        requestAnimationFrame(() => {
          if (videoRef.current) {
             videoRef.current.currentTime = targetTime;
          }
        });
      }
    });

    return () => unsubscribe();
  }, [loaded, scrollYProgress]);

  // Smoother scroll-based opacity for text elements
  // The text fades out as we start diving (0 -> 15%)
  // It stays invisible during the chaotic zoom transition (15% -> 35%)
  // It fades back in gracefully starting at 35% and perfectly stabilizes at 55%
  const contentOpacity = useTransform(
    scrollYProgress, 
    [0, 0.12, 0.35, 0.55, 1], 
    [1, 0, 0, 1, 1]
  );
  
  const contentY = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.35, 0.55, 1], 
    ["0%", "15%", "15%", "0%", "0%"]
  );
  
  // The planet/video fades out right at the end to transition to the next section
  const videoOpacity = useTransform(scrollYProgress, [0.95, 1], [1, 0]);
  
  // Final text overlay that appears when fully zoomed in the forest
  const finalTextOpacity = useTransform(scrollYProgress, [0.7, 0.85, 0.95, 1], [0, 1, 1, 0]);
  const finalTextY = useTransform(scrollYProgress, [0.7, 0.85], [40, 0]);
  const darkOverlayOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 0.5]);

  return (
    <section ref={containerRef} className="relative w-full h-[350vh] bg-bg-cream">
      <div className="sticky top-0 w-full h-[100vh] overflow-hidden bg-bg-cream">
        
        {/* Video for Scroll scrub */}
        <motion.video
          ref={videoRef}
          style={{ opacity: videoOpacity }}
          className="absolute inset-0 z-0 w-full h-full object-cover"
          src="/videos/hero-scroll.mp4"
          playsInline
          muted
          autoPlay
          preload="auto"
        />

        {/* Top Mask to smoothly blend video into the light background */}
        <div className="absolute inset-x-0 top-0 h-[65vh] z-10 pointer-events-none bg-gradient-to-b from-bg-cream via-bg-cream/95 to-transparent" />

        {/* Loading Overlay - now just waiting for video metadata which takes ~50ms */}
        {!loaded && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-bg-cream text-text-dark font-sans tracking-widest uppercase transition-opacity duration-700">
            <span className="text-sm opacity-60 mb-4 animate-pulse">Entering Forest...</span>
          </div>
        )}

        {/* Content overlaid on top of mask */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-start pt-[18vh] text-center px-6"
        >
          {/* Label */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex items-center gap-3 font-sans text-[10px] sm:text-xs uppercase tracking-[0.2em] text-text-dark/70 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-mid"></span>
            {t("label")}
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.05] text-text-dark max-w-[900px] mb-6"
          >
            {t.rich('headline', {
              highlight: (chunks) => <span className="text-green-mid italic block mt-2 md:mt-4 tracking-tight font-serif">{chunks}</span>
            })}
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-sans text-[14px] sm:text-[16px] text-text-medium/80 max-w-[500px] leading-relaxed mx-auto mb-10"
          >
            {t("subtitle")}
          </motion.p>
          
          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <button onClick={() => document.getElementById('healing-trail')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center gap-3 bg-green-deep hover:bg-green-mid transition-colors duration-300 text-bg-cream px-8 py-3.5 rounded-full font-sans text-sm tracking-wide cursor-pointer">
              {t("cta1")}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
            </button>
            <button onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center gap-3 bg-transparent border border-text-dark/15 hover:border-text-dark/30 hover:bg-text-dark/5 transition-all duration-300 text-text-dark px-8 py-3.5 rounded-full font-sans text-sm tracking-wide cursor-pointer">
              {t("cta2")}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"></path><path d="m19 12-7 7-7-7"></path></svg>
            </button>
          </motion.div>
        </motion.div>

        {/* Darkening overlay for final text readability */}
        <motion.div 
          style={{ opacity: darkOverlayOpacity }}
          className="absolute inset-0 z-20 bg-bg-deep pointer-events-none"
        />

        {/* Final Zoom In Text over the Forest */}
        <motion.div
           style={{ opacity: finalTextOpacity, y: finalTextY }}
           className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
        >
           <span className="font-sans text-xs uppercase tracking-[0.2em] text-text-light/80 mb-6 drop-shadow-md">
             POTECA VINDECĂTOARE
           </span>
           <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] text-text-light drop-shadow-lg">
             O călătorie spre tine
           </h2>
        </motion.div>

      </div>
    </section>
  );
}
