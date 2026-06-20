import { useRef, type MouseEvent, type ReactNode } from "react";

// Klikniecie rozmazuje fragment ekranu w miejscu kursora
// (backdrop-filter), ktory po chwili zanika.
const SPOT_SIZE = 16;

interface ClickBlurProps {
  children: ReactNode;
}

export default function ClickBlur({ children }: ClickBlurProps) {
  const layerRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const layer = layerRef.current;
    if (!layer) return;

    const spot = document.createElement("span");
    spot.className = "click-blur-spot";
    spot.style.left = `${e.clientX - SPOT_SIZE / 2}px`;
    spot.style.top = `${e.clientY - SPOT_SIZE / 2}px`;
    spot.addEventListener("animationend", () => spot.remove(), { once: true });
    layer.appendChild(spot);
  };

  return (
    <div className="relative h-full w-full" onClick={handleClick}>
      <div
        ref={layerRef}
        className="pointer-events-none fixed inset-0 z-60"
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
