"use client";

import { useId } from "react";

const R_TEXTE = 47;
const CIRCONFERENCE = 2 * Math.PI * R_TEXTE;

/**
 * Cachet postal imprimé au clic sur « Copier l'adresse » : double cercle,
 * texte gravé en couronne, date du jour au centre et « flamme » ondulée.
 * Il s'imprime légèrement penché puis s'efface (animation .tampon, globals.css).
 */
export function TamponPostal({ couronne, jour, mois }: { couronne: string; jour: string; mois: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const cercle = `tampon-cercle-${id}`;
  const encre = `tampon-encre-${id}`;

  return (
    <svg
      viewBox="0 0 220 120"
      aria-hidden="true"
      className="tampon pointer-events-none absolute bottom-full left-[-1.25rem] mb-3 w-[13.5rem] text-accent"
    >
      <defs>
        {/* Cercle parcouru dans le sens horaire depuis la gauche : le texte est droit en haut */}
        <path id={cercle} d={`M${60 - R_TEXTE},60 a${R_TEXTE},${R_TEXTE} 0 1,1 ${2 * R_TEXTE},0 a${R_TEXTE},${R_TEXTE} 0 1,1 ${-2 * R_TEXTE},0`} />
        {/* Encre irrégulière : bords légèrement déformés, comme un vrai coup de tampon */}
        <filter id={encre}>
          <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="2.6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter={`url(#${encre})`}>
        <g fill="none" stroke="currentColor">
          <circle cx={60} cy={60} r={56} strokeWidth={2.6} />
          <circle cx={60} cy={60} r={37} strokeWidth={1.2} />
          {/* Flamme postale */}
          {[42, 54, 66, 78].map((y) => (
            <path key={y} d={`M122 ${y}q10 -6 20 0t20 0t20 0t20 0t18 0`} strokeWidth={2} strokeLinecap="round" />
          ))}
        </g>
        <text fill="currentColor" fontFamily="var(--font-mono)" fontSize={9.5} fontWeight={500} letterSpacing={1}>
          <textPath href={`#${cercle}`} textLength={CIRCONFERENCE - 6} lengthAdjust="spacing">
            {couronne}
          </textPath>
        </text>
        <text x={60} y={60} textAnchor="middle" fill="currentColor" fontFamily="var(--font-mono)" fontSize={17} fontWeight={500}>
          {jour}
        </text>
        <text x={60} y={76} textAnchor="middle" fill="currentColor" fontFamily="var(--font-mono)" fontSize={10} letterSpacing={1.5}>
          {mois}
        </text>
      </g>
    </svg>
  );
}
