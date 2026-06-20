import type { IconName } from "../components/Icon";

export interface Profile {
  name: string;
}

export const profile: Profile = {
  name: "Krzysztof Wiłnicki",
};

export interface LinkItem {
  id: string;
  href: string;
  icon: IconName;
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
    href: "Krzysztof_Wiłnicki_CV_PL.pdf",
    icon: "cv",
  },
];
