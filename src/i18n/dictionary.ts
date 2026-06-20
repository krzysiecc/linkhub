// i18n dictionary. technical link data (href/icon) stays in data/links.ts;
// here are only the language-dependent texts, keyed by link id.
export const LANGS = ["pl", "en", "de"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "pl";

export const NATIVE_NAME: Record<Lang, string> = {
  pl: "polski",
  en: "english",
  de: "deutsch",
};

export interface LinkText {
  label: string;
  sub: string;
}

export interface Dictionary {
  role: string;
  location: string;
  links: Record<string, LinkText>;
  resources: Record<string, string>;
  marquee: string;
  footerSuffix: string;
  torchHint: string;
}

export const dict: Record<Lang, Dictionary> = {
  pl: {
    role: "Cloud & AI Engineer",
    location: "Wrocław, Polska",
    links: {
      linkedin: { label: "linkedin", sub: "profil zawodowy" },
      credly: { label: "credly", sub: "certyfikaty i osiągnięcia" },
      github: { label: "github", sub: "projekty własne i studenckie" },
      cv: { label: "CV", sub: "podgląd pdf" },
    },
    resources: {
      source: "źródło",
      privacy: "polityka prywatności",
      contact: "kontakt",
    },
    marquee:
      "CLOUD · AI · DEVOPS · DOCKER · TERRAFORM · PYTHON · AWS · ML · GIT · ",
    footerSuffix: "wszelkie prawa zastrzeżone",
    torchHint: "naciśnij L, aby włączyć latarkę",
  },
  en: {
    role: "Cloud & AI Engineer",
    location: "Wrocław, Poland",
    links: {
      linkedin: { label: "linkedin", sub: "professional profile" },
      credly: { label: "credly", sub: "certificates & achievements" },
      github: { label: "github", sub: "personal & student projects" },
      cv: { label: "CV", sub: "overview pdf" },
    },
    resources: { source: "source", privacy: "privacy", contact: "contact" },
    marquee:
      "CLOUD · AI · DEVOPS · DOCKER · TERRAFORM · PYTHON · AWS · ML · GIT · ",
    footerSuffix: "all rights reserved",
    torchHint: "press L to toggle the flashlight",
  },
  de: {
    role: "Cloud- & AI-Engineer",
    location: "Wrocław, Polen",
    links: {
      linkedin: { label: "linkedin", sub: "berufliches profil" },
      credly: { label: "credly", sub: "zertifikate & erfolge" },
      github: { label: "github", sub: "eigene & studentische Projekte" },
      cv: { label: "CV", sub: "pdf-vorschau" },
    },
    resources: {
      source: "quellcode",
      privacy: "datenschutz",
      contact: "kontakt",
    },
    marquee:
      "CLOUD · AI · DEVOPS · DOCKER · TERRAFORM · PYTHON · AWS · ML · GIT · ",
    footerSuffix: "alle rechte vorbehalten",
    torchHint: "drücke L für die Taschenlampe",
  },
};
