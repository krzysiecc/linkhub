export type IconName =
  | "cloud"
  | "linkedin"
  | "credly"
  | "github"
  | "cv"
  | "mail"
  | "chevron";

interface IconProps {
  name: IconName;
}

export default function Icon({ name }: IconProps) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  } as const;
  switch (name) {
    case "cloud":
      return (
        <svg {...common} strokeWidth={1.8}>
          <path d="M7 18a4 4 0 1 1 .8-7.9A5.5 5.5 0 0 1 18.5 11 3.5 3.5 0 0 1 18 18z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 17v-7" />
        </svg>
      );
    case "credly":
      return (
        <svg {...common}>
          <circle cx="12" cy="9" r="5" />
          <path d="M9 13.5 7.5 21l4.5-2.5L16.5 21 15 13.5" />
        </svg>
      );
    case "github":
      return (
        <svg {...common}>
          <path d="M9 19c-4 1.5-4-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C6.3 3.8 5.3 4.1 5.3 4.1a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 3.9 10.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V22" />
        </svg>
      );
    case "cv":
      return (
        <svg {...common}>
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
          <path d="M14 3v5h5M9 13h6M9 17h6" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    case "chevron":
      return (
        <svg {...common} strokeWidth={2}>
          <path d="M9 6l6 6-6 6" />
        </svg>
      );
    default:
      return null;
  }
}
