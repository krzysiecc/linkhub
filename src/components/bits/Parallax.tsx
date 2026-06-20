import { useEffect, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  baseX?: number;
  depth?: number;
}

// subtle content parallax: drifts slightly with the cursor,
// giving a sense of depth. baseX holds a constant "slightly to the left" offset.
export default function Parallax({
  children,
  className,
  baseX = -20,
  depth = 8,
}: ParallaxProps) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 50, damping: 18, mass: 0.6 });

  const x = useTransform(sx, (v) => baseX + v * depth);
  const y = useTransform(sy, (v) => v * depth);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <motion.div className={className} style={{ x, y }}>
      {children}
    </motion.div>
  );
}
