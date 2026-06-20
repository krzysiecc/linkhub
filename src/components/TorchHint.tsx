import { useI18n } from "../i18n";

// Podpowiedz w lewym dolnym rogu: jak wlaczyc latarke.
export default function TorchHint() {
  const { t } = useI18n();
  return (
    <span className="pointer-events-none fixed bottom-3.5 left-4 z-2 font-mono text-[10.5px] tracking-[0.4px] text-muted opacity-72 max-[600px]:hidden">
      {t("torchHint")}
    </span>
  );
}
