import { useState } from "react";

import { DEFAULT_GARDEN_THEME, GARDEN_THEMES } from "./gardenThemes";

function createPetals(colors, count) {
  return Array.from({ length: count }, (_, index) => {
    const size = Math.floor(Math.random() * 12) + 10; // 10px - 22px

    return {
      id: `petal-${index}`,
      style: {
        width: `${size}px`,
        height: `${size * 1.3}px`,
        left: `${Math.random() * 100}vw`,
        background: colors[Math.floor(Math.random() * colors.length)],
        animationDuration: `${Math.random() * 8 + 9}s`, // 9s - 17s
        animationDelay: `${Math.random() * 8}s`,
      },
    };
  });
}

function createSparkles(count) {
  return Array.from({ length: count }, (_, index) => {
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
 * Partikel latar: kelopak bunga melayang & kilau cahaya (pollen bokeh / bintang).
 * Warna, jumlah, dan glow-nya datang dari `theme` — makin malam temanya,
 * makin sedikit kelopak & makin banyak kilau, supaya terasa seperti bintang.
 * Posisi/ukuran/durasi diacak sekali saja lewat lazy state initializer supaya
 * tidak berubah setiap kali komponen render ulang.
 */
export default function FloatingParticles({ theme = DEFAULT_GARDEN_THEME }) {
  const t = GARDEN_THEMES[theme] ?? GARDEN_THEMES[DEFAULT_GARDEN_THEME];

  const [petals] = useState(() => createPetals(t.petalColors, t.petalCount));
  const [sparkles] = useState(() => createSparkles(t.sparkleCount));

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
          style={{ ...sparkle.style, boxShadow: t.sparkleGlow }}
          className="absolute bg-white rounded-full opacity-0 pointer-events-none animate-[floatSparkle_ease-in-out_infinite_alternate]"
        />
      ))}
    </div>
  );
}
