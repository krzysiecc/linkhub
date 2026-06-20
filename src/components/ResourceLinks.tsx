import { useI18n } from "../i18n";
import { links, resolveHref } from "../data/links";

interface MetaLink {
  id: string;
  href: string;
}

const META: MetaLink[] = [
  { id: "source", href: "https://github.com/krzysiecc/linkhub/tree/main" },
  { id: "privacy", href: "privacy/" },
  { id: "contact", href: "mailto:kris.wilnicki@gmail.com" },
];

// external = absolute http(s) -> open in a new tab. internal pages (privacy/)
// and mailto: stay in the same tab.
function isExternal(href: string): boolean {
  return href.startsWith("http");
}

export default function ResourceLinks() {
  const { t, lang } = useI18n();
  const linkCls =
    "whitespace-nowrap font-body text-[18px] text-muted no-underline transition-colors hover:text-accent-2 focus-visible:text-accent-2";

  return (
    <>
      <nav className="flex flex-col gap-1.75" aria-label="profiles">
        {links.map((l) => {
          const href = resolveHref(l.href, lang);
          const ext = isExternal(href);
          return (
            <a
              key={l.id}
              className={linkCls}
              href={href}
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
