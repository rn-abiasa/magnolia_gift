import { useState } from "react";

import envelopeBack from "../../assets/evenlope_v1.webp";
import envelopeFront from "../../assets/evenlope_front_v1.webp";
import envelopePaper from "../../assets/evenlope_paper_v1.webp";
import irisFlower from "../../assets/iris_flower_v1.webp";
import sticker from "../../assets/siri_with_hat.webp";
import useEnvelopePhysics from "../../hooks/useEnvelopePhysics";
import LetterContent from "./LetterContent";

/**
 * Layer 0: rangkaian bunga di belakang amplop (urutan DOM sama dengan aslinya).
 * `baseRot` & `depth` dipakai oleh fisika interaksi, sisanya class Tailwind.
 */
const BACKDROP_FLOWERS = [
  {
    id: "flower-bg-l2",
    baseRot: -24,
    depth: -30,
    shell:
      "w-[58%] h-[98%] ml-[-48%] bottom-[12%] [transform:translateZ(-15px)_rotate(-24deg)] drop-shadow-[-4px_10px_18px_rgba(35,20,55,0.22)] brightness-92",
    idleAnim: "animate-[envFlowerIdleL2_6.8s_ease-in-out_infinite_alternate]",
    hoverAnim:
      "animate-[envFlowerHoverL2_2.2s_cubic-bezier(0.44,0.05,0.55,0.95)_infinite_alternate]",
  },
  {
    id: "flower-bg-l1",
    baseRot: -12,
    depth: -20,
    shell:
      "w-[54%] h-[110%] ml-[-32%] bottom-[16%] [transform:translateZ(-8px)_rotate(-12deg)] drop-shadow-[-2px_10px_20px_rgba(35,20,55,0.2)] brightness-98",
    idleAnim:
      "animate-[envFlowerIdleL1_5.9s_ease-in-out_0.8s_infinite_alternate]",
    hoverAnim:
      "animate-[envFlowerHoverL1_2.5s_cubic-bezier(0.44,0.05,0.55,0.95)_0.15s_infinite_alternate]",
  },
  {
    id: "flower-bg-mid",
    baseRot: 1,
    depth: -25,
    shell:
      "w-[52%] h-[116%] ml-[-26%] bottom-[20%] [transform:translateZ(-12px)_rotate(1deg)] drop-shadow-[0_12px_22px_rgba(35,20,55,0.18)] brightness-102",
    idleAnim:
      "animate-[envFlowerIdleMid_7.4s_ease-in-out_1.4s_infinite_alternate]",
    hoverAnim:
      "animate-[envFlowerHoverMid_2.7s_cubic-bezier(0.44,0.05,0.55,0.95)_0.3s_infinite_alternate]",
  },
  {
    id: "flower-bg-r1",
    baseRot: 13,
    depth: -20,
    shell:
      "w-[54%] h-[110%] ml-[-22%] bottom-[16%] [transform:translateZ(-8px)_rotate(13deg)] drop-shadow-[2px_10px_20px_rgba(35,20,55,0.2)] brightness-98",
    idleAnim:
      "animate-[envFlowerIdleR1_6.2s_ease-in-out_0.4s_infinite_alternate]",
    hoverAnim:
      "animate-[envFlowerHoverR1_2.4s_cubic-bezier(0.44,0.05,0.55,0.95)_0.2s_infinite_alternate]",
  },
  {
    id: "flower-bg-r2",
    baseRot: 25,
    depth: -30,
    shell:
      "w-[58%] h-[98%] ml-[-10%] bottom-[12%] [transform:translateZ(-15px)_rotate(25deg)] drop-shadow-[4px_10px_18px_rgba(35,20,55,0.22)] brightness-92",
    idleAnim:
      "animate-[envFlowerIdleR2_7.1s_ease-in-out_1.9s_infinite_alternate]",
    hoverAnim:
      "animate-[envFlowerHoverR2_2.1s_cubic-bezier(0.44,0.05,0.55,0.95)_0.4s_infinite_alternate]",
  },
];

// Stiker kecil yang ditempel di bagian kanan depan amplop
// (translateZ 26px = di atas permukaan kantung depan yang ada di 18px)
const STICKER_SHELL =
  "absolute right-[3%] bottom-[10%] w-[40%] aspect-[542/1172] z-[4] origin-bottom-right object-contain block pointer-events-none select-none [transform:translateZ(26px)_rotate(-12deg)] drop-shadow-[3px_8px_14px_rgba(35,20,55,0.25)]";

/**
 * Panggung amplop 3D.
 *
 * @param {ReactNode} letter         konten di atas kertas surat (default <LetterContent />)
 * @param {Function}  onLetterAction aksi tombol di kertas; default: melipat kembali suratnya
 * @param {string}    stickerSrc     gambar stiker di kanan depan amplop
 */
export default function EnvelopeStage({
  letter,
  onLetterAction,
  stickerSrc = sticker,
}) {
  const {
    stageRef,
    envelopeRef,
    flowerRefs,
    isHovered,
    isResting,
    stageHandlers,
  } = useEnvelopePhysics(BACKDROP_FLOWERS);

  const [isLetterOpen, setIsLetterOpen] = useState(false);

  // Tanpa prop `onLetterAction`, tombol di kertas akan melipat kembali suratnya
  const handleLetterAction = onLetterAction ?? (() => setIsLetterOpen(false));
  const letterContent = letter ?? (
    <LetterContent onAction={handleLetterAction} />
  );

  function handleEnvelopeClick(event) {
    // Klik di dalam amplop hanya membuka/menutup surat (tidak diteruskan ke stage)
    event.stopPropagation();
    setIsLetterOpen((previous) => !previous);
  }

  function handleEnvelopeKeyDown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsLetterOpen((previous) => !previous);
    }
  }

  function handleStageClick() {
    // Klik di luar amplop: surat dilipat kembali
    setIsLetterOpen(false);
  }

  return (
    <div
      ref={stageRef}
      {...stageHandlers}
      onClick={handleStageClick}
      className="relative flex items-center justify-center p-10 cursor-grab active:cursor-grabbing select-none transform-3d perspective-[1200px] perspective-origin-center"
    >
      {/* Layer 0: rangkaian bunga di belakang amplop (bergoyang bebas) */}
      <div className="absolute top-1/2 left-1/2 w-[min(340px,78vw)] max-md:w-[min(300px,84vw)] aspect-[2540/2916] pointer-events-none z-[1] transform-3d [transform:translate(-50%,-50%)_translateZ(-25px)]">
        {BACKDROP_FLOWERS.map((flower, index) => (
          <div
            key={flower.id}
            ref={(element) => {
              flowerRefs.current[index] = element;
            }}
            className={`absolute left-1/2 origin-bottom pointer-events-none select-none will-change-transform ${flower.shell}`}
          >
            <div
              className={`w-full h-full origin-bottom will-change-transform transition-transform duration-[800ms] ease-[cubic-bezier(0.2,0.8,0.3,1)] ${
                isHovered ? flower.hoverAnim : flower.idleAnim
              }`}
            >
              <img
                src={irisFlower}
                alt="Iris Flower"
                draggable={false}
                className="w-full h-full object-contain block select-none"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Layer 1-3: amplop 3D presisi + bayangan */}
      <div
        ref={envelopeRef}
        role="button"
        tabIndex={0}
        aria-expanded={isLetterOpen}
        aria-label={isLetterOpen ? "Lipat kembali surat" : "Buka surat"}
        onClick={handleEnvelopeClick}
        onKeyDown={handleEnvelopeKeyDown}
        className={`group relative w-[min(340px,78vw)] max-md:w-[min(300px,84vw)] aspect-[2540/2916] transform-3d will-change-transform cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#ffd89b] ${
          isResting
            ? "transition-transform duration-[750ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)]"
            : "transition-transform duration-[180ms] ease-[cubic-bezier(0.2,0.8,0.4,1)]"
        }`}
      >
        {/* Layer 1: belakang amplop (tutup terbuka) */}
        <img
          src={envelopeBack}
          alt="Amplop Belakang"
          draggable={false}
          className="absolute top-0 left-0 w-full h-full object-contain z-[1] [transform:translateZ(0px)] drop-shadow-[0_14px_28px_rgba(35,20,55,0.18)] pointer-events-none select-none"
        />

        {/* Layer 2: kertas surat di dalam amplop + kontennya */}
        {/* translateZ kertas dijaga < 18px milik layer depan agar occlusion oleh kantung tetap benar */}
        <div
          className={`absolute left-1/2 bottom-[1.5%] w-[90.5%] aspect-square z-[2] pointer-events-none will-change-transform transition-transform ease-[cubic-bezier(0.25,1,0.5,1)] ${
            isLetterOpen
              ? "duration-[700ms] [transform:translateX(-50%)_translateY(-50%)_translateZ(15px)]"
              : "duration-[550ms] [transform:translateX(-50%)_translateY(0)_translateZ(8px)] group-hover:[transform:translateX(-50%)_translateY(-19%)_translateZ(14px)]"
          }`}
        >
          <img
            src={envelopePaper}
            alt="Kertas Surat"
            draggable={false}
            className="w-full h-full object-contain drop-shadow-[0_-3px_8px_rgba(0,0,0,0.08)]"
          />

          {/* Area konten surat: hanya dapat diinteraksi saat surat terbuka */}
          <div
            inert={!isLetterOpen}
            onClick={(event) => event.stopPropagation()}
            className={`absolute inset-x-[10%] top-[7%] bottom-[32%] flex flex-col overflow-hidden select-text ${
              isLetterOpen ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            {letterContent}
          </div>
        </div>

        {/* Layer 3: depan amplop (lipatan kantong segitiga) */}
        <img
          src={envelopeFront}
          alt="Amplop Depan"
          draggable={false}
          className="absolute left-1/2 bottom-[0.5%] w-[96.58%] h-auto aspect-[2453/1836] object-contain z-[3] [transform:translateX(-50%)_translateZ(18px)] drop-shadow-[0_6px_14px_rgba(35,20,55,0.12)] pointer-events-none select-none"
        />

        {/* Layer 4: stiker kecil di bagian kanan depan amplop */}
        <img
          src={stickerSrc}
          alt="Stiker amplop"
          draggable={false}
          className={STICKER_SHELL}
        />

        {/* Bayangan 3D di bawah amplop */}
        <div className="absolute -bottom-[4%] left-[6%] w-[88%] h-6 z-0 pointer-events-none blur-[14px] transition-[transform,opacity] duration-[400ms] [transform:translateZ(-35px)_scale(0.95)] group-hover:[transform:translateZ(-45px)_scale(1.06)_translateY(12px)] group-hover:opacity-85 bg-[image:radial-gradient(ellipse_at_center,rgba(40,25,65,0.38)_0%,rgba(40,25,65,0.16)_45%,transparent_75%)]" />
      </div>
    </div>
  );
}
