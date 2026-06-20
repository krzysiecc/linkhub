import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { LANGS, DEFAULT_LANG, dict, type Lang } from "./dictionary";

const STORAGE_KEY = "linkhub.lang";

interface I18nValue {
  lang: Lang;
  setLang: (next: Lang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value);
}

function readInitialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && isLang(saved)) return saved;
  } catch {
    /* localStorage unavailable */
  }
  return DEFAULT_LANG;
}

function pick(root: unknown, path: string[]): unknown {
  return path.reduce<unknown>(
    (o, k) => (o == null ? undefined : (o as Record<string, unknown>)[k]),
    root,
  );
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    if (!isLang(next)) return;
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const t = useCallback(
    (key: string): string => {
      const path = key.split(".");
      const val = pick(dict[lang], path);
      if (typeof val === "string") return val;
      const fallback = pick(dict[DEFAULT_LANG], path);
      return typeof fallback === "string" ? fallback : key;
    },
    [lang],
  );

  const value = useMemo<I18nValue>(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
