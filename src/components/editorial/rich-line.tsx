import { Fragment } from "react";

/** Compose les *mots* entre astérisques en italique. */
export function RichLine({ text, emClassName = "italic" }: { text: string; emClassName?: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/g).map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <em key={i} className={emClassName}>
            {part.slice(1, -1)}
          </em>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
