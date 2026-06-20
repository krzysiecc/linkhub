import { useI18n } from "../i18n";
import { links } from "../data/links";

// TODO: uzupelnic realne URL-e dla source/privacy.
interface MetaLink {
  id: string;
  href: string;
}

const META: MetaLink[] = [
  { id: "source", href: "#" },
  { id: "privacy", href: "#" },
  { id: "contact", href: "mailto:kris.wilnicki@gmail.com" },
];

function isExternal(href: string): boolean {
  return href !== "#" && !href.startsWith("mailto:");
}

export default function ResourceLinks() {
  const { t } = useI18n();
  const linkCls =
    "whitespace-nowrap font-body text-[18px] text-muted no-underline transition-colors hover:text-accent-2 focus-visible:text-accent-2";

  return (
    <>
      <nav className="flex flex-col gap-1.75" aria-label="profiles">
        {links.map((l) => {
          const ext = isExternal(l.href);
          return (
            <a
              key={l.id}
              className={linkCls}
              href={l.href}
              target={ext ? "_blank" : undefined}
              rel={ext ? "noopener noreferrer" : undefined}
            >
              {t(`links.${l.id}.label`)}
            </a>
          );
        })}
      </nav>

      <nav className="flex flex-col gap-1.75" aria-label="resources">
        {META.map((m) => {
          const ext = isExternal(m.href);
          return (
            <a
              key={m.id}
              className={linkCls}
              href={m.href}
              target={ext ? "_blank" : undefined}
              rel={ext ? "noopener noreferrer" : undefined}
            >
              {t(`resources.${m.id}`)}
            </a>
          );
        })}
      </nav>
    </>
  );
}
