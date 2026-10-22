import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const TAILLE_OG = { width: 1200, height: 630 };

const police = (fichier: string) => readFile(join(process.cwd(), "src/assets/fonts", fichier));

/**
 * Image de partage dans la DA du site : ivoire, Fraunces Light,
 * filet et point terracotta.
 */
export async function carteOG({ surtitre, titre, pied }: { surtitre: string; titre: string; pied: string }) {
  const [fraunces, frauncesItalique, inter] = await Promise.all([
    police("Fraunces-Light.ttf"),
    police("Fraunces-LightItalic.ttf"),
    police("InterTight-Regular.ttf"),
  ]);
  const corps = titre.length > 34 ? 84 : titre.length > 20 ? 104 : 128;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          background: "#f4f1ea",
          color: "#0a0a0b",
          fontFamily: "Inter Tight",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 3, textTransform: "uppercase", color: "#3d5a50" }}>
          {surtitre}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            fontFamily: "Fraunces",
            fontSize: corps,
            lineHeight: 0.95,
            letterSpacing: -corps * 0.035,
            maxWidth: 1040,
          }}
        >
          {titre}
          <span style={{ color: "#c8552f" }}>.</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(10,10,11,0.2)",
            paddingTop: 24,
            fontSize: 22,
            color: "#5e5b55",
          }}
        >
          <span style={{ fontFamily: "Fraunces", fontStyle: "italic", fontSize: 28, color: "#0a0a0b" }}>O.L.R.</span>
          <span>{pied}</span>
        </div>
      </div>
    ),
    {
      ...TAILLE_OG,
      fonts: [
        { name: "Fraunces", data: fraunces, style: "normal", weight: 300 },
        { name: "Fraunces", data: frauncesItalique, style: "italic", weight: 300 },
        { name: "Inter Tight", data: inter, style: "normal", weight: 400 },
      ],
    },
  );
}
