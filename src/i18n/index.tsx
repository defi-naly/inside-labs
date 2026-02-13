import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import en from "./en.json";
import de from "./de.json";

// Article content files — EN
import enGuides from "./articles/en/guides.json";
import enStrategy from "./articles/en/strategy.json";
import enInterviews from "./articles/en/interviews.json";
import enProduct from "./articles/en/product.json";
import enIndustry from "./articles/en/industry.json";

// Article content files — DE
import deGuides from "./articles/de/guides.json";
import deStrategy from "./articles/de/strategy.json";
import deInterviews from "./articles/de/interviews.json";
import deProduct from "./articles/de/product.json";
import deIndustry from "./articles/de/industry.json";

export type Locale = "en" | "de";

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

function deepMerge(target: Record<string, JsonValue>, ...sources: Record<string, JsonValue>[]): Record<string, JsonValue> {
  for (const source of sources) {
    for (const key of Object.keys(source)) {
      const targetVal = target[key];
      const sourceVal = source[key];
      if (
        targetVal && sourceVal &&
        typeof targetVal === "object" && !Array.isArray(targetVal) &&
        typeof sourceVal === "object" && !Array.isArray(sourceVal)
      ) {
        target[key] = deepMerge(
          { ...(targetVal as Record<string, JsonValue>) },
          sourceVal as Record<string, JsonValue>
        );
      } else {
        target[key] = sourceVal;
      }
    }
  }
  return target;
}

function buildTranslations(base: Record<string, unknown>, articleFiles: Record<string, unknown>[]): Record<string, unknown> {
  const articles: Record<string, JsonValue> = {};
  for (const file of articleFiles) {
    Object.assign(articles, file);
  }

  return deepMerge(
    { ...(base as Record<string, JsonValue>) },
    { insights: { articles } } as Record<string, JsonValue>
  );
}

const translations: Record<Locale, Record<string, unknown>> = {
  en: buildTranslations(en, [enGuides, enStrategy, enInterviews, enProduct, enIndustry]),
  de: buildTranslations(de, [deGuides, deStrategy, deInterviews, deProduct, deIndustry]),
};

function resolve(obj: unknown, path: string): string {
  const keys = path.replace(/\[(\d+)\]/g, ".$1").split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current == null || typeof current !== "object") return path;
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === "string" ? current : path;
}

// Resolve to any type (for content blocks which are arrays/objects)
export function resolveRaw(obj: unknown, path: string): unknown {
  const keys = path.replace(/\[(\d+)\]/g, ".$1").split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return current;
}

interface LanguageContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
  tRaw: (key: string) => unknown;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: "en",
  setLocale: () => {},
  t: (k) => k,
  tRaw: () => undefined,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    try {
      const stored = localStorage.getItem("lang");
      if (stored === "de") return "de";
    } catch {}
    return "en";
  });

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {}
  };

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const t = (key: string) => resolve(translations[locale], key);
  const tRaw = (key: string) => resolveRaw(translations[locale], key);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, tRaw }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);
