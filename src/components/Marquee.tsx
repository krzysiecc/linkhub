import { useI18n } from "../i18n";

// marquee with monospace text. two identical chunks +
// a -50% shift give a seamless loop.
export default function Marquee() {
  const { t } = useI18n();
  const chunk = t("marquee").repeat(4);
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <span className="marquee-chunk">{chunk}</span>
        <span className="marquee-chunk">{chunk}</span>
      </div>
    </div>
  );
}
