"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useFinePointer } from "@/lib/use-fine-pointer";

/**
 * Curseur de géomètre : un réticule fin (deux lignes qui se croisent sous
 * la souris) et une étiquette en mono, comme dans un logiciel SIG.
 * Desktop seulement. Aucun rendu React pendant le mouvement : la position
 * est écrite directement dans le DOM, une fois par image.
 *
 * `cible` doit être positionnée (relative) et masquer son débordement.
 * `libelle` renvoie le texte à afficher, ou null pour cacher le réticule.
 */
export function Reticule({
  cible,
  libelle,
}: {
  cible: RefObject<HTMLElement | null>;
  libelle: (clientX: number, clientY: number) => string | null;
}) {
  const fin = useFinePointer();
  const racine = useRef<HTMLDivElement>(null);
  const verticale = useRef<HTMLSpanElement>(null);
  const horizontale = useRef<HTMLSpanElement>(null);
  const centre = useRef<HTMLSpanElement>(null);
  const etiquette = useRef<HTMLSpanElement>(null);
  const libelleRef = useRef(libelle);

  useEffect(() => {
    libelleRef.current = libelle;
  });

  useEffect(() => {
    const zone = cible.current;
    if (!fin || !zone) return;
    let image = 0;
    let dernier: PointerEvent | null = null;

    const cacher = () => {
      if (racine.current) racine.current.style.opacity = "0";
      delete zone.dataset.reticule;
    };

    const peindre = () => {
      image = 0;
      const e = dernier;
      if (!e || !racine.current || !etiquette.current) return;
      // Sur un lien ou un bouton, on rend la main au curseur habituel.
      const texte = (e.target as Element | null)?.closest("a, button") ? null : libelleRef.current(e.clientX, e.clientY);
      if (!texte) return cacher();

      const r = zone.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      verticale.current!.style.transform = `translateX(${x}px)`;
      horizontale.current!.style.transform = `translateY(${y}px)`;
      centre.current!.style.transform = `translate(${x}px, ${y}px)`;

      etiquette.current.textContent = texte;
      const largeur = etiquette.current.offsetWidth;
      const ex = x + 14 + largeur > r.width ? x - 14 - largeur : x + 14;
      const ey = y < 36 ? y + 14 : y - 30;
      etiquette.current.style.transform = `translate(${ex}px, ${ey}px)`;

      racine.current.style.opacity = "1";
      zone.dataset.reticule = "actif";
    };

    const bouger = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      dernier = e;
      if (!image) image = requestAnimationFrame(peindre);
    };

    zone.addEventListener("pointermove", bouger);
    zone.addEventListener("pointerleave", cacher);
    return () => {
      cancelAnimationFrame(image);
      zone.removeEventListener("pointermove", bouger);
      zone.removeEventListener("pointerleave", cacher);
      delete zone.dataset.reticule;
    };
  }, [fin, cible]);

  if (!fin) return null;

  return (
    <div
      ref={racine}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-200"
    >
      <span ref={verticale} className="absolute inset-y-0 left-0 w-px bg-carte-trait/25" />
      <span ref={horizontale} className="absolute inset-x-0 top-0 h-px bg-carte-trait/25" />
      <span ref={centre} className="absolute left-0 top-0">
        <span className="absolute -left-2 -top-2 block size-4 rounded-full border border-accent" />
        <span className="absolute -left-px -top-px block size-0.5 rounded-full bg-accent" />
      </span>
      <span
        ref={etiquette}
        className="coord absolute left-0 top-0 whitespace-nowrap bg-paper/90 px-1.5 py-0.5 text-ink ring-1 ring-carte-trait/20"
      />
    </div>
  );
}
