import { Fragment, useEffect, useRef, useState } from "react";
import { useI18n } from "../i18n";
import { LANGS, NATIVE_NAME, type Lang } from "../i18n/dictionary";
import DecryptedText from "./DecryptedText";

const REDUCE =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Dropdown jezyka: nad triggerem wysuwa sie poziomy div
// "polski | english | deutsch", a kazda nazwa "odszyfrowuje sie" (DecryptedText).
export default function LangSwitcher() {
  const { lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const close = () => setClosing(true);
  const toggle = () => {
    if (open && !closing) close();
    else if (!open) setOpen(true);
  };
  const choose = (l: Lang) => {
    setLang(l);
    close();
  };

  // Finalizacja zamkniecia po animacji (lub od razu przy reduce-motion)
  useEffect(() => {
    if (!closing) return;
    const id = setTimeout(
      () => {
        setClosing(false);
        setOpen(false);
      },
      REDUCE ? 0 : 220,
    );
    return () => clearTimeout(id);
  }, [closing]);

  // Zamykanie klikiem poza menu / klawiszem Escape
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="lang-dd" ref={ref}>
      {open && (
        <div
          className={`lang-menu${closing ? " closing" : ""}`}
          role="listbox"
          aria-label="Language"
        >
          {LANGS.map((l, i) => (
            <Fragment key={l}>
              {i > 0 && (
                <span className="lang-sep" aria-hidden="true">
                  |
                </span>
              )}
              <button
                type="button"
                role="option"
                aria-selected={l === lang}
                className={`lang-option${l === lang ? " active" : ""}`}
                onClick={() => choose(l)}
              >
                {REDUCE ? (
                  NATIVE_NAME[l]
                ) : (
                  <DecryptedText
                    text={NATIVE_NAME[l]}
                    animateOn="inViewHover"
                    sequential
                    revealDirection="center"
                    speed={45}
                    maxIterations={12}
                    parentClassName="lang-dec"
                    className="lang-dec-rev"
                    encryptedClassName="lang-dec-enc"
                  />
                )}
              </button>
            </Fragment>
          ))}
        </div>
      )}

      <button
        type="button"
        className="lang-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={toggle}
      >
        <span className="code">{lang.toUpperCase()}</span>
        <span className="caret" aria-hidden="true">
          ▾
        </span>
      </button>
    </div>
  );
}
