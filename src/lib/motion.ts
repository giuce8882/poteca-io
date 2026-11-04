// Shared scroll-reveal variants and helpers for section components.
const ease = [0.25, 0.1, 0.25, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

export const fadeScaleUp = {
  hidden: { opacity: 0, scale: 0.95, y: 40 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease } },
};

export const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
export const staggerSlow = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };

export const view = { once: true, amount: 0.2 } as const;

export const scrollToId = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
