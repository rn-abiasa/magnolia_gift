import FloatingParticles from "./FloatingParticles";
import MeadowDepthBlur from "./MeadowDepthBlur";
import { DEFAULT_GARDEN_THEME, GARDEN_THEMES } from "./gardenThemes";

/**
 * Latar scene "kebun bunga": langit bergradasi, cahaya yang berdenyut,
 * ladang bunga ber-depth blur, dan partikel kelopak melayang. Dipasang
 * fixed di belakang seluruh konten halaman.
 *
 * `theme` memilih palet warna (lihat gardenThemes.js) sehingga tiap
 * halaman punya "waktu & suasana langit" sendiri lewat teknik yang sama
 * persis — hanya warnanya yang berbeda, bukan strukturnya.
 */
export default function GardenBackground({ theme = DEFAULT_GARDEN_THEME }) {
  const t = GARDEN_THEMES[theme] ?? GARDEN_THEMES[DEFAULT_GARDEN_THEME];

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 w-full h-full min-h-dvh overflow-hidden pointer-events-none select-none"
    >
      {/* Langit bergradasi */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{ backgroundImage: t.sky }}
      />

      {/* Cahaya (matahari/bulan) yang berdenyut */}
      <div
        className="absolute top-[15%] left-1/2 w-[360px] h-[360px] sm:w-[600px] sm:h-[600px] [transform:translate(-50%,-50%)] blur-[40px] animate-[sunPulse_8s_ease-in-out_infinite_alternate]"
        style={{ backgroundImage: t.glow }}
      />

      {/* Lapisan bukit & ladang bunga kabur di kejauhan (depth blur) */}
      <MeadowDepthBlur theme={theme} />

      {/* Partikel kelopak melayang & kilau cahaya */}
      <FloatingParticles theme={theme} />
    </div>
  );
}
