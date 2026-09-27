import { DEFAULT_GARDEN_THEME, GARDEN_THEMES } from "./gardenThemes";

/**
 * Lapisan bukit & ladang bunga di kejauhan (depth blur).
 * Tiap layer memakai tingkat blur berbeda supaya tercipta ilusi kedalaman:
 * back (paling kabur) -> mid -> front (paling tajam). Warnanya datang dari
 * `theme` (lihat gardenThemes.js) — teknik render 3 lapisnya tetap sama di
 * setiap halaman, hanya siluetnya yang berganti suasana.
 */
export default function MeadowDepthBlur({ theme = DEFAULT_GARDEN_THEME }) {
  const t = GARDEN_THEMES[theme] ?? GARDEN_THEMES[DEFAULT_GARDEN_THEME];

  const MEADOW_LAYERS = [
    { id: "meadow-back", className: "h-[48vh] blur-[14px] opacity-85", bg: t.meadowBack },
    { id: "meadow-mid", className: "h-[38vh] blur-[6px] opacity-90", bg: t.meadowMid },
    { id: "meadow-front", className: "h-[24vh] blur-[1.5px] opacity-95", bg: t.meadowFront },
  ];

  return (
    <>
      {MEADOW_LAYERS.map((layer) => (
        <div
          key={layer.id}
          aria-hidden="true"
          className={`absolute bottom-0 left-0 w-full bg-repeat-x ${layer.className}`}
          style={{ backgroundImage: layer.bg }}
        />
      ))}
    </>
  );
}
