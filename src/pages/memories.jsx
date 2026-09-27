import { useNavigate } from "react-router-dom";

import GardenBackground from "../components/backgrounds/GardenBackground";
import { Carousel } from "../components/ui/Carousel";
import Button from "../components/ui/button";
import magnoliaFlower from "../assets/magnolia_flower.webp";
import irisFlower from "../assets/iris_flower_v1.webp";
import melatiFlower from "../assets/melati_flower.webp";
import lavenderFlower from "../assets/lavender_flower.webp";

/**
 * Bed bunga di area bawah halaman Memories: 5 tangkai tersebar dari kiri
 * ke kanan hampir menutup area bawah, dengan kedalaman berlapis (layer
 * belakang lebih kecil + blur/brightness) dan terpaan angin windBreeze*
 * yang sama seperti tirai bunga di halaman cover. Durasi & delay tiap
 * tangkai dibuat berbeda supaya goyangannya tidak serempak.
 */
const BOTTOM_STEMS = [
  {
    id: "bed-left-front",
    position:
      "left-[-6vw] -bottom-[5vh] w-[30vw] max-w-[320px] max-md:w-[46vw] h-[44vh] z-[3]",
    anim: "animate-[windBreezeLeftDeep_7.4s_cubic-bezier(0.445,0.05,0.55,0.95)_infinite]",
    flowerSrc: magnoliaFlower,
  },
  {
    id: "bed-left-mid",
    position:
      "left-[20vw] -bottom-[4vh] w-[27vw] max-w-[300px] max-md:w-[42vw] h-[36vh] z-[2]",
    anim: "animate-[windBreezeLeftCross_8.6s_cubic-bezier(0.445,0.05,0.55,0.95)_1.2s_infinite]",
    flowerSrc: melatiFlower,
  },
  {
    id: "bed-center-back",
    position:
      "left-0 right-0 mx-auto -bottom-[3vh] w-[24vw] max-w-[280px] max-md:w-[38vw] h-[30vh] z-[1] brightness-90 blur-[2px]",
    anim: "animate-[windBreezeLeft_9.2s_cubic-bezier(0.445,0.05,0.55,0.95)_2.4s_infinite]",
    flowerSrc: lavenderFlower,
  },
  {
    id: "bed-right-mid",
    position:
      "right-[20vw] -bottom-[4vh] w-[27vw] max-w-[300px] max-md:w-[42vw] h-[36vh] z-[2]",
    anim: "animate-[windBreezeRightCross_7.4s_cubic-bezier(0.445,0.05,0.55,0.95)_1.5s_infinite]",
    flowerSrc: irisFlower,
  },
  {
    id: "bed-right-front",
    position:
      "right-[-6vw] -bottom-[5vh] w-[30vw] max-w-[320px] max-md:w-[46vw] h-[44vh] z-[3]",
    anim: "animate-[windBreezeRightDeep_8.1s_cubic-bezier(0.445,0.05,0.55,0.95)_0.5s_infinite]",
    flowerSrc: magnoliaFlower,
  },
];

export default function Memories() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/special-message");
  };

  return (
    <>
      <GardenBackground theme="golden" />

      {/* Bed bunga di area bawah: 5 tangkai berlapis hampir menutup area
          bawah, ditiup angin halus (windBreeze*) seperti tirai bunga di
          halaman cover. Tetap di belakang konten (main z-10) dan
          pointer-events-none agar carousel & tombol Next terus terpakai. */}
      {BOTTOM_STEMS.map((stem) => (
        <div
          key={stem.id}
          className={`corner-flower pointer-events-none select-none fixed origin-bottom ${stem.position} ${stem.anim}`}
        >
          <img
            src={stem.flowerSrc}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="block w-full h-full object-contain object-bottom drop-shadow-[0_10px_18px_rgba(28,18,48,0.22)]"
          />
        </div>
      ))}

      <main className="relative z-10 p-10 py-20">
        <section>
          <h1
            className="reveal text-5xl yuyu text-white text-center heading-glow"
            style={{ "--reveal-delay": "0s", "--glow-color": "rgba(255,214,140,0.6)" }}
          >
            Our Memories
          </h1>
          <p
            className="reveal caveat text-2xl text-white/85 text-center"
            style={{ "--reveal-delay": "0.15s" }}
          >
            kenangan yang kita lewati bersama
          </p>

          <div className="flex flex-col justify-center items-center mt-5">
            <div
              className="reveal-pop w-full flex justify-center items-center"
              style={{ "--reveal-delay": "0.3s" }}
            >
              <Carousel />
            </div>

            <div className="reveal" style={{ "--reveal-delay": "0.5s" }}>
              <Button action={handleNext}>Next</Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
