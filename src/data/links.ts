import type { IconName } from "../components/Icon";
import type { Lang } from "../i18n/dictionary";

export interface Profile {
  name: string;
}

export const profile: Profile = {
  name: "Krzysztof Wiłnicki",
};

// a link can have one shared URL (string) or a separate URL per language
// (Record<Lang, string>) - e.g. the CV, which has 3 language versions.
export type LocalizedHref = string | Record<Lang, string>;

export interface LinkItem {
  id: string;
  href: LocalizedHref;
  icon: IconName;
}

// returns the URL for the active language; for a plain string returns it unchanged.
export function resolveHref(href: LocalizedHref, lang: Lang): string {
  return typeof href === "string" ? href : href[lang];
}

export const links: LinkItem[] = [
  {
    id: "linkedin",
    href: "https://www.linkedin.com/in/krzysztof-wi%C5%82nicki/",
    icon: "linkedin",
  },
  {
    id: "credly",
    href: "https://www.credly.com/users/krzysztof-wilnicki",
    icon: "credly",
  },
  {
    id: "github",
    href: "https://github.com/krzysiecc",
    icon: "github",
  },
  {
    id: "cv",
    // CV on Google Drive - a separate file per language (in-browser preview).
    href: {
      pl: "https://drive.google.com/file/d/1HU66zUSgJUdC0mxSQG5K8UhwsqfzUSYF/view?usp=sharing",
      en: "https://drive.google.com/file/d/16h7swXEUIe56K9O7X-kuMo5VFbpMuoO0/view?usp=sharing",
      de: "https://drive.google.com/file/d/1Q1T7T3mO-I--AOHFPqFWjl8DyxTUxIF1/view?usp=sharing",
    },
    icon: "cv",
  },
];
