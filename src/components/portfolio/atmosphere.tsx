"use client";

import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE, EASE_IN_OUT, useMediaQuery } from "./primitives";

/*  Preloader: counter + name, then a curtain lifts  */
export function Preloader({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);
  const seenRef = useRef<boolean | null>(null);

  useEffect(() => {
    // Read once per mount (StrictMode re-runs effects) — returning visitors get a short intro.
    if (seenRef.current === null) {
      try {
        seenRef.current = sessionStorage.getItem("onell:intro") === "1";
        sessionStorage.setItem("onell:intro", "1");
      } catch {
        seenRef.current = false;
      }
    }
    const seen = seenRef.current;

    const duration = reduce || seen ? 350 : 1900;
    const start = performance.now();
    let raf = 0;
    document.documentElement.style.overflow = "hidden";

    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(step);
      else
        window.setTimeout(() => {
          setVisible(false);
          document.documentElement.style.overflow = "";
          onDone();
        }, reduce || seen ? 0 : 250);
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.style.overflow = "";
    };
  }, [onDone, reduce]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-100 flex flex-col justify-between bg-ink px-5 py-6 sm:px-10 sm:py-8"
          exit={{ y: "-100%", transition: { duration: 1.05, ease: EASE_IN_OUT } }}
          aria-hidden="true"
        >
          <div className="eyebrow flex justify-between text-mute">
            <span>Portfolio ✦ {new Date().getFullYear()}</span>
            <span>Fianarantsoa — MG</span>
          </div>

          <div className="relative flex flex-col items-center">
            <div className="aura h-72 w-72 bg-gold/20" />
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: EASE }}
                className="display-serif text-[clamp(3rem,11vw,9rem)] italic text-divine"
              >
                O&apos;Nell Luciano
              </motion.p>
            </div>
            <div className="mt-6 h-px w-[min(22rem,70vw)] overflow-hidden bg-line">
              <div className="h-full origin-left bg-gold" style={{ transform: `scaleX(${count / 100})` }} />
            </div>
          </div>

          <div className="flex items-end justify-between">
            <span className="eyebrow text-mute">Full-Stack · AI · Data · GIS</span>
            <span className="display-serif text-[clamp(3.5rem,9vw,7rem)] leading-none text-ivory tabular-nums">
              {count}
              <span className="text-gold">%</span>
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/*  Custom cursor: dot + trailing ring with contextual label  */
export function Cursor() {
  const enabled = useMediaQuery("(pointer: fine) and (prefers-reduced-motion: no-preference)");
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [down, setDown] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 260, damping: 26, mass: 0.5 });

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      const interactive = target?.closest("a, button, input, [role='button']");
      setLabel(labelled?.dataset.cursor ?? null);
      setHover(Boolean(interactive));
    };
    const press = () => setDown(true);
    const release = () => setDown(false);

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    window.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", release);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = label ? 96 : hover ? 56 : 34;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-200 flex items-center justify-center rounded-full border"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: size,
          height: size,
          scale: down ? 0.85 : 1,
          backgroundColor: label ? "rgba(230,194,122,0.95)" : hover ? "rgba(230,194,122,0.08)" : "rgba(230,194,122,0)",
          borderColor: label ? "rgba(230,194,122,0)" : hover ? "rgba(230,194,122,0.8)" : "rgba(243,238,228,0.35)",
        }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="eyebrow text-[0.62rem] font-semibold text-ink"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-200 h-1.5 w-1.5 rounded-full bg-gold"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: label ? 0 : 1, scale: hover ? 0 : 1 }}
      />
    </>
  );
}

/*  Starfield: slow, twinkling gold & ivory dust  */
export function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let mouseX = 0;
    let mouseY = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const count = Math.round(Math.min(170, (w * h) / 9000));
    const stars = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.1 + 0.25,
      depth: Math.random() * 0.8 + 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.012 + 0.004,
      gold: Math.random() < 0.35,
    }));

    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      const scroll = window.scrollY;
      for (const s of stars) {
        const twinkle = reduce ? 0.7 : 0.45 + Math.sin(s.phase + time * s.speed * 0.06) * 0.35;
        const px = (s.x + mouseX * s.depth * 14 + w) % w;
        const py = (((s.y - scroll * s.depth * 0.08 + mouseY * s.depth * 14) % h) + h) % h;
        ctx.beginPath();
        ctx.arc(px, py, s.r * s.depth + 0.15, 0, Math.PI * 2);
        ctx.fillStyle = s.gold ? `rgba(230, 194, 122, ${twinkle})` : `rgba(243, 238, 228, ${twinkle * 0.8})`;
        ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const onMove = (e: PointerEvent) => {
      mouseX = e.clientX / w - 0.5;
      mouseY = e.clientY / h - 0.5;
    };
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reduce]);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 opacity-70" />;
}

/*  Scroll progress hairline  */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-60 h-px">
      <div className="h-full origin-left bg-linear-to-r from-gold-deep via-gold to-gold-pale" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}
