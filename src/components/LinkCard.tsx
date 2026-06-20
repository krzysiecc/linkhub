import { motion } from "framer-motion";
import Icon, { type IconName } from "./Icon";
import { useI18n } from "../i18n";
import { resolveHref, type LocalizedHref } from "../data/links";

interface LinkCardProps {
  id: string;
  href: LocalizedHref;
  icon: IconName;
}

// by default only the centered label is visible. on hover / focus-visible
// the main text fades out and the icon (left) and description (right) slide in - see index.css.
export default function LinkCard({ id, href, icon }: LinkCardProps) {
  const { t, lang } = useI18n();
  const url = resolveHref(href, lang);
  const isMail = url.startsWith("mailto:");
  return (
    <motion.a
      className="link"
      href={url}
      target={isMail ? undefined : "_blank"}
      rel={isMail ? undefined : "noopener noreferrer"}
      whileTap={{ scale: 0.99 }}
    >
      <span className="ic" aria-hidden="true">
        <Icon name={icon} />
      </span>
      <b className="label">{t(`links.${id}.label`)}</b>
      <span className="sub">{t(`links.${id}.sub`)}</span>
    </motion.a>
  );
}
