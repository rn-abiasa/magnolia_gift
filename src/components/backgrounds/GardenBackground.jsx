import FloatingParticles from "./FloatingParticles";
import MeadowDepthBlur from "./MeadowDepthBlur";

/**
 * Latar scene "kebun bunga Iris": langit bergradasi, cahaya matahari yang
 * berdenyut, ladang bunga ber-depth blur, dan partikel kelopak melayang.
 * Dipasang fixed di belakang seluruh konten halaman.
 */
export default function GardenBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 z-[1] w-screen h-screen overflow-hidden pointer-events-none"
    >
      {/* Langit bergradasi */}
      <div className="absolute inset-0 bg-[image:linear-gradient(180deg,#9cb8da_0%,#c4d5ea_25%,#f2dbdf_50%,#f8e3c5_75%,#e7e3bf_100%)]" />

      {/* Cahaya matahari yang berdenyut */}
      <div className="absolute top-[15%] left-1/2 w-[600px] h-[600px] [transform:translate(-50%,-50%)] blur-[40px] bg-[image:radial-gradient(circle,rgba(255,245,215,0.7)_0%,rgba(255,225,170,0.35)_45%,rgba(255,255,255,0)_70%)] animate-[sunPulse_8s_ease-in-out_infinite_alternate]" />

      {/* Lapisan bukit & ladang bunga kabur di kejauhan (depth blur) */}
      <MeadowDepthBlur />

      {/* Partikel kelopak melayang & kilau cahaya */}
      <FloatingParticles />
    </div>
  );
}
