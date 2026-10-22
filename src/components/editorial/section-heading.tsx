import type { ReactNode } from "react";
import { RevealMask } from "./reveal-mask";

const TAILLES = {
  lg: "text-[clamp(2.75rem,8vw,9rem)] leading-[0.9] tracking-[-0.035em]",
  md: "text-[clamp(2.25rem,5.5vw,6rem)] leading-[0.95] tracking-[-0.03em]",
};

/** Titre de section : libellé numéroté en marge, titre qui porte une idée. */
export function SectionHeading({
  numero,
  label,
  title,
  intro,
  id,
  taille = "md",
}: {
  numero: string;
  label: string;
  title: string;
  intro?: ReactNode;
  id: string;
  taille?: keyof typeof TAILLES;
}) {
  return (
    <header className="grid gap-y-6 md:grid-cols-12 md:items-end md:gap-x-8 md:gap-y-8">
      <p className="label text-sage md:col-span-2 md:pb-[1.2vw]">
        ({numero}) {label}
      </p>
      <h2 id={id} className={`font-serif font-light md:col-span-10 ${TAILLES[taille]}`}>
        <RevealMask as="span" className="block">
          {title}
        </RevealMask>
      </h2>
      {intro && <div className="max-w-[52ch] text-ink-soft md:col-span-7 md:col-start-3">{intro}</div>}
    </header>
  );
}
