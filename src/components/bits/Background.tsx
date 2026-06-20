import { useEffect, useRef } from "react";
import * as THREE from "three";

interface BackgroundProps {
  // total particle count across all layers (lower = lighter on weak GPUs)
  count?: number;
  // upper bound for devicePixelRatio (lower = much less fill work on retina phones)
  pixelRatioCap?: number;
  // pointer-driven camera parallax; pointless on touch, so off on mobile
  interactive?: boolean;
}

export default function Background({
  count = 1000,
  pixelRatioCap = 2,
  interactive = true,
}: BackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    const camera = new THREE.PerspectiveCamera(
      70,
      container.clientWidth / container.clientHeight,
      0.1,
      1000,
    );
    camera.position.z = 60;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, pixelRatioCap));
    renderer.setClearColor(0x000000, 1);
    container.appendChild(renderer.domElement);

    const createShapeTexture = (shape: string): THREE.Texture | null => {
      const size = 64;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      ctx.clearRect(0, 0, size, size);
      ctx.translate(size / 2, size / 2);

      const glow = ctx.createRadialGradient(0, 0, 2, 0, 0, size / 2);
      glow.addColorStop(0, "rgba(255,255,255,1)");
      glow.addColorStop(0.4, "rgba(255,255,255,0.8)");
      glow.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = glow;

      if (shape === "diamond") {
        ctx.beginPath();
        ctx.moveTo(0, -20);
        ctx.lineTo(14, 0);
        ctx.lineTo(0, 20);
        ctx.lineTo(-14, 0);
        ctx.closePath();
        ctx.fill();
      } else if (shape === "star") {
        const spikes = 5;
        const outer = 20;
        const inner = 8;
        let rot = -Math.PI / 2;
        const step = Math.PI / spikes;
        ctx.beginPath();
        for (let i = 0; i < spikes; i++) {
          ctx.lineTo(Math.cos(rot) * outer, Math.sin(rot) * outer);
          rot += step;
          ctx.lineTo(Math.cos(rot) * inner, Math.sin(rot) * inner);
          rot += step;
        }
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, 14, 0, Math.PI * 2);
        ctx.fill();
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    const COUNT = count;
    const SHAPES = ["circle", "diamond", "star"];
    const particleLayers: THREE.Points[] = [];

    SHAPES.forEach((shape, shapeIdx) => {
      const baseCount = Math.floor(COUNT / SHAPES.length);
      const count =
        shapeIdx === SHAPES.length - 1
          ? COUNT - baseCount * (SHAPES.length - 1)
          : baseCount;

      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const color = new THREE.Color();

      for (let i = 0; i < count; i++) {
        positions[i * 3 + 0] = (Math.random() - 0.5) * 180;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 140;

        color.setHSL(
          Math.random(),
          0.35 + Math.random() * 0.6,
          0.65 + Math.random() * 0.3,
        );
        colors[i * 3 + 0] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        vertexColors: true,
        map: createShapeTexture(shape),
        size: 0.3 + shapeIdx * 0.1,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.8,
        alphaTest: 0.2,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);
      particleLayers.push(points);
    });

    let mouseX = 0;
    let mouseY = 0;
    const onMove = (e: PointerEvent) => {
      mouseX = e.clientX / window.innerWidth - 0.5;
      mouseY = e.clientY / window.innerHeight - 0.5;
    };
    if (interactive) window.addEventListener("pointermove", onMove);

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const clock = new THREE.Clock();
    let raf = 0;

    const renderFrame = () => {
      const t = clock.getElapsedTime();
      particleLayers.forEach((layer, i) => {
        const speedMul = 1 + i * 0.25;
        layer.rotation.y = t * 0.02 * speedMul;
        layer.rotation.x = t * 0.01 * speedMul;
      });
      camera.position.x += (mouseX * 12 - camera.position.x) * 0.03;
      camera.position.y += (-mouseY * 8 - camera.position.y) * 0.03;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };

    const animate = () => {
      renderFrame();
      raf = requestAnimationFrame(animate);
    };

    if (reduce) {
      renderFrame();
    } else {
      animate();
    }

    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      if (interactive) window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      particleLayers.forEach((layer) => {
        layer.geometry.dispose();
        const mat = layer.material as THREE.PointsMaterial;
        if (mat.map) mat.map.dispose();
        mat.dispose();
      });
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [count, pixelRatioCap, interactive]);

  return <div ref={ref} className="fixed inset-0 z-0" aria-hidden="true" />;
}
