import { useEffect, useState } from "react";

// "Mobile" = waski ekran lub dotykowe urzadzenie (brak myszy/klawiatury).
const QUERY = "(max-width: 768px), (pointer: coarse)";

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(QUERY).matches : false,
  );

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    const onChange = () => setIsMobile(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}
