import { useState } from "react";

const PETAL_COLORS = [
  "rgba(175, 150, 220, 0.65)",
  "rgba(145, 120, 205, 0.55)",
  "rgba(215, 190, 245, 0.7)",
  "rgba(255, 230, 180, 0.6)",
  "rgba(240, 210, 230, 0.65)",
];

const PETAL_COUNT = 24;
const SPARKLE_COUNT = 16;

function createPetals() {
  return Array.from({ length: PETAL_COUNT }, (_, index) => {
    const size = Math.floor(Math.random() * 12) + 10; // 10px - 22px

    return {
      id: `petal-${index}`,
      style: {
        width: `${size}px`,
        height: `${size * 1.3}px`,
        left: `${Math.random() * 100}vw`,
        background: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
        animationDuration: `${Math.random() * 8 + 9}s`, // 9s - 17s
        animationDelay: `${Math.random() * 8}s`,
      },
    };
  });
}

function createSparkles() {
  return Array.from({ length: SPARKLE_COUNT }, (_, index) => {
    const size = Math.floor(Math.random() * 4) + 3; // 3px - 6px

    return {
      id: `sparkle-${index}`,
      style: {
        width: `${size}px`,
        height: `${size}px`,
        top: `${Math.random() * 80 + 10}vh`,
        left: `${Math.random() * 95 + 2.5}vw`,
        animationDuration: `${Math.random() * 4 + 3}s`, // 3s - 7s
        animationDelay: `${Math.random() * 5}s`,
      },
    };
  });
}

/**
 * Partikel latar: 24 kelopak bunga melayang & 16 kilau cahaya (pollen bokeh).
 * Posisi/ukuran/durasi diacak sekali saja lewat lazy state initializer supaya
 * tidak berubah setiap kali komponen render ulang.
 */
export default function FloatingParticles() {
  const [petals] = useState(createPetals);
  const [sparkles] = useState(createSparkles);

  return (
    <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
      {petals.map((petal) => (
        <div
          key={petal.id}
          aria-hidden="true"
          style={petal.style}
          className="absolute rounded-[50%_0_50%_50%] opacity-0 pointer-events-none animate-[floatPetal_linear_infinite]"
        />
      ))}

      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          aria-hidden="true"
          style={sparkle.style}
          className="absolute w-[5px] h-[5px] bg-white rounded-full opacity-0 pointer-events-none shadow-[0_0_10px_#ffeaa7,0_0_20px_#ffeaa7] animate-[floatSparkle_ease-in-out_infinite_alternate]"
        />
      ))}
    </div>
  );
}
