"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;

/* ── Media query ─────────────────────────────────────────────── */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

/* ── Magnetic wrapper ────────────────────────────────────────── */
export function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 180, damping: 14, mass: 0.35 });
  const y = useSpring(0, { stiffness: 180, damping: 14, mass: 0.35 });

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={`inline-flex ${className}`}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ── Word-by-word masked reveal ──────────────────────────────── */
export function SplitReveal({
  text,
  className = "",
  wordClassName,
  delay = 0,
  stagger = 0.055,
  play,
  accent,
}: {
  text: string;
  className?: string;
  wordClassName?: (word: string, index: number) => string;
  delay?: number;
  stagger?: number;
  /** When provided, animation is driven by this flag instead of viewport entry. */
  play?: boolean;
  /** Word indexes rendered in divine serif italic. */
  accent?: number[];
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const active = play ?? inView;
  const words = text.split(" ");

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden="true" className="inline-block overflow-hidden pb-[0.2em] mb-[-0.2em] align-bottom">
          <motion.span
            className={`inline-block will-change-transform ${
              accent?.includes(i) ? "display-serif text-divine pr-[0.08em] italic lowercase" : ""
            } ${wordClassName?.(word, i) ?? ""}`}
            initial={{ y: "115%", rotate: 4 }}
            animate={active ? { y: "0%", rotate: 0 } : undefined}
            transition={{ duration: 1.1, ease: EASE, delay: delay + i * stagger }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}

/* ── Scroll-lit paragraph (words light up while scrolling) ───── */
export function ScrollWords({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <LitWord key={`${word}-${i}`} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {word}
        </LitWord>
      ))}
    </p>
  );
}

function LitWord({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <span className="relative mr-[0.24em]">
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
}

/* ── Fade-up on view ─────────────────────────────────────────── */
export function FadeUp({
  children,
  className = "",
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ── Section header ──────────────────────────────────────────── */
export function SectionLabel({ label, className = "" }: { label: string; className?: string }) {
  const name = label.split(" / ").slice(-1)[0];
  return (
    <p className={`eyebrow flex items-center gap-3 text-mute ${className}`}>
      <span className="text-gold">✦</span>
      <span>{name}</span>
    </p>
  );
}

/* ── Animated counter ────────────────────────────────────────── */
export function Counter({ value, suffix = "", className = "" }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, { duration: 2.2, ease: EASE, onUpdate: (v) => setDisplay(Math.round(v)) });
    return () => controls.stop();
  }, [inView, mv, value]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}

/* ── Live local time in Fianarantsoa ─────────────────────────── */
export function LocalTime({ className = "" }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone: "Indian/Antananarivo",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date());
    const tick = () => setTime(format());
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className={className} suppressHydrationWarning>
      {time ?? "--:--"}
    </span>
  );
}

/* ── Infinite marquee ────────────────────────────────────────── */
export function Marquee({
  children,
  reverse = false,
  className = "",
  speed = 38,
}: {
  children: ReactNode;
  reverse?: boolean;
  className?: string;
  speed?: number;
}) {
  return (
    <div className={`marquee ${reverse ? "marquee-reverse" : ""} ${className}`}>
      {[0, 1].map((copy) => (
        <div key={copy} className="marquee-track" style={{ animationDuration: `${speed}s` }} aria-hidden={copy === 1}>
          {children}
        </div>
      ))}
    </div>
  );
}

/* ── Spotlight pointer tracking ──────────────────────────────── */
export function trackSpotlight(e: React.PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}
