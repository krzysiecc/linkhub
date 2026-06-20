import { useI18n } from "../i18n";

// Karuzela (marquee) z tekstem monospace. Dwa identyczne kawalki +
// przesuniecie o -50% daja bezszwowa petle.
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
