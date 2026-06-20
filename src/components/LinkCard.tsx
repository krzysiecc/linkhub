import { motion } from "framer-motion";
import Icon, { type IconName } from "./Icon";
import { useI18n } from "../i18n";

interface LinkCardProps {
  id: string;
  href: string;
  icon: IconName;
}

// Domyslnie widac tylko wyposrodkowana etykiete. Na hover / focus-visible
// glowny tekst znika, a wjezdza ikonka (z lewej) i opis (z prawej) - patrz index.css.
export default function LinkCard({ id, href, icon }: LinkCardProps) {
  const { t } = useI18n();
  const isMail = href.startsWith("mailto:");
  return (
    <motion.a
      className="link"
      href={href}
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
