import { useEffect, useState } from "react";
import { motion, useMotionValue, useMotionTemplate, useSpring } from "framer-motion";

// flashlight under the "L" key: dims the whole screen except an irregular,
// "breathing" beam of light that follows the cursor.
// the irregularity and edge animation come from an SVG filter (feTurbulence + feDisplacementMap).
const REDUCE =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Flashlight() {
  const [on, setOn] = useState(false);

  const cx = typeof window !== "undefined" ? window.innerWidth / 2 : 400;
  const cy = typeof window !== "undefined" ? window.innerHeight / 2 : 300;
  const mx = useMotionValue(cx);
  const my = useMotionValue(cy);
  const sx = useSpring(mx, { stiffness: 350, damping: 30, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 350, damping: 30, mass: 0.4 });
  const radius = useMotionValue(170);

  // mask center is transparent (a hole -> content shows through), edge is black (overlay stays dark).
  const mask = useMotionTemplate`radial-gradient(circle ${radius}px at ${sx}px ${sy}px, transparent 0%, transparent 38%, rgba(0,0,0,0.75) 62%, #000 100%)`;

  // toggle under the L key (ignore text fields)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "l" && e.key !== "L") return;
      const el = document.activeElement as HTMLElement | null;
      const tag = el?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || el?.isContentEditable) return;
      setOn((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // cursor tracking + dynamic exposure (only when on)
  useEffect(() => {
    if (!on) return;

    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove);

    if (REDUCE) {
      radius.set(185);
      return () => window.removeEventListener("pointermove", onMove);
    }

    let raf = 0;
    let startTs: number | null = null;
    const tick = (ts: number) => {
      if (startTs == null) startTs = ts;
      const s = (ts - startTs) / 1000;
      // breath (slow) + flicker (fast)
      radius.set(165 + Math.sin(s * 1.6) * 22 + Math.sin(s * 9) * 6);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [on, mx, my, radius]);

  if (!on) return null;

  return (
    <>
      <svg
        className="pointer-events-none absolute h-0 w-0"
        width={0}
        height={0}
        aria-hidden="true"
        focusable="false"
      >
        <filter id="torch-distort" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.018"
            numOctaves={2}
            seed={7}
            result="noise"
          >
            {!REDUCE && (
              <animate
                attributeName="baseFrequency"
                dur="9s"
                repeatCount="indefinite"
                values="0.012 0.018; 0.02 0.012; 0.012 0.018"
              />
            )}
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={40}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <motion.div
        className="pointer-events-none fixed inset-0 z-40 bg-torch-dark mask-no-repeat filter-[url(#torch-distort)]"
        aria-hidden="true"
        style={{ WebkitMaskImage: mask, maskImage: mask }}
      />
    </>
  );
}
