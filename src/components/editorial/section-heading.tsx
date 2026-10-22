import type { ReactNode } from "react";
import { RevealMask } from "./reveal-mask";

/** Titre de section monumental, numéroté en marge. */
export function SectionHeading({
  numero,
  title,
  intro,
  id,
}: {
  numero: string;
  title: string;
  intro?: ReactNode;
  id: string;
}) {
  return (
    <header className="grid gap-y-8 md:grid-cols-12 md:items-end md:gap-x-8">
      <p className="label text-sage md:col-span-2 md:pb-[1.6vw]" aria-hidden="true">
        ({numero})
      </p>
      <h2
        id={id}
        className="font-serif text-[clamp(3rem,8vw,10rem)] font-light leading-[0.9] tracking-[-0.035em] md:col-span-10"
      >
        <RevealMask as="span" className="block">
          {title}
        </RevealMask>
      </h2>
      {intro && (
        <div className="max-w-[48ch] text-ink-soft md:col-span-6 md:col-start-3">
          <RevealMask delay={0.1}>{intro}</RevealMask>
        </div>
      )}
    </header>
  );
}
