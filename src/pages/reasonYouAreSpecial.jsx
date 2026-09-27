import { useNavigate } from "react-router-dom";

import GardenBackground from "../components/backgrounds/GardenBackground";
import Stack from "../components/ui/stack";
import Button from "../components/ui/button";
import magnoliaFlower from "../assets/magnolia_flower.webp";
import irisFlower from "../assets/iris_flower_v1.webp";
import melatiFlower from "../assets/melati_flower.webp";
import lavenderFlower from "../assets/lavender_flower.webp";

/**
 * Semak bunga setinggi layar di halaman ini: 5 tangkai berlapis — dua sayap
 * besar di kiri/kanan, dua tangkai tengah yang lebih blur/bayar, dan satu
 * bunga blur di belakang tengah — supaya konten (judul, Stack, tombol)
 * terasa berada di dalam semak bunga. Gerakannya memakai windBreeze* yang
 * sama seperti tirai bunga di cover; durasi & delay berbeda-beda agar
 * tidak serempak. Semua tangkai tetap di belakang konten (main z-10) dan
 * pointer-events-none agar drag/klik Stack serta tombol Next terus terpakai.
 */
const BUSH_STEMS = [
  {
    id: "bush-left-front",
    position:
      "left-[-12vw] -bottom-[6vh] w-[46vw] max-w-[560px] max-md:w-[64vw] h-[108vh] z-[3]",
    anim: "animate-[windBreezeLeftDeep_7.4s_cubic-bezier(0.445,0.05,0.55,0.95)_infinite]",
    flowerSrc: magnoliaFlower,
  },
  {
    id: "bush-left-mid",
    position:
      "left-[6vw] -bottom-[5vh] w-[38vw] max-w-[480px] max-md:w-[56vw] h-[96vh] z-[2] brightness-90 blur-[1.5px]",
    anim: "animate-[windBreezeLeftCross_8.6s_cubic-bezier(0.445,0.05,0.55,0.95)_1.2s_infinite]",
    flowerSrc: melatiFlower,
  },
  {
    id: "bush-center-back",
    position:
      "left-0 right-0 mx-auto -bottom-[4vh] w-[34vw] max-w-[440px] max-md:w-[52vw] h-[102vh] z-[1] brightness-75 blur-[3px]",
    anim: "animate-[windBreezeLeft_9.2s_cubic-bezier(0.445,0.05,0.55,0.95)_2.4s_infinite]",
    flowerSrc: lavenderFlower,
  },
  {
    id: "bush-right-mid",
    position:
      "right-[6vw] -bottom-[5vh] w-[38vw] max-w-[480px] max-md:w-[56vw] h-[96vh] z-[2] brightness-90 blur-[1.5px]",
    anim: "animate-[windBreezeRightCross_7.4s_cubic-bezier(0.445,0.05,0.55,0.95)_1.5s_infinite]",
    flowerSrc: irisFlower,
  },
  {
    id: "bush-right-front",
    position:
      "right-[-12vw] -bottom-[6vh] w-[46vw] max-w-[560px] max-md:w-[64vw] h-[108vh] z-[3]",
    anim: "animate-[windBreezeRightDeep_8.1s_cubic-bezier(0.445,0.05,0.55,0.95)_0.5s_infinite]",
    flowerSrc: magnoliaFlower,
  },
];

/* >>> Ubah 5 alasan di bawah ini sesuka hati <<< */
const REASONS = [
  "Kamu selalu tau cara bikin hari burukku jadi lebih ringan.",
  "Cara kamu tertawa itu salah satu suara favoritku di dunia ini.",
  "Kamu sabar banget menghadapi aku, bahkan di hari-hari susah.",
  "Setiap cerita kecilmu selalu aku tunggu, sekecil apapun itu.",
  "Bersamamu, hal paling sederhana pun terasa seperti rumah.",
];

function ReasonCard({ text, rot }) {
  return (
    <div
      className="paper-card flex h-full w-full items-center justify-center p-6 text-center"
      style={{ "--paper-rot": `${rot}deg` }}
    >
      <p className="oooh-baby text-xl text-[#4a3e72] sm:text-2xl">{text}</p>
    </div>
  );
}

export default function ReasonYouAreSpecial() {
  const navigate = useNavigate();

  const cards = REASONS.map((text, index) => (
    <ReasonCard key={index} text={text} rot={index % 2 === 0 ? -1.6 : 1.4} />
  ));

  return (
    <>
      <GardenBackground theme="sunset" />

      {/* Semak bunga setinggi layar: 5 tangkai berlapis kiri-tengah-kanan
          dengan terpaan angin windBreeze* seperti tirai bunga di cover.
          Berada di belakang konten (main z-10) dan pointer-events-none
          agar Stack tetap bisa di-drag/diklik dan tombol Next terus terpakai. */}
      {BUSH_STEMS.map((stem) => (
        <div
          key={stem.id}
          className={`corner-flower pointer-events-none select-none fixed origin-bottom ${stem.position} ${stem.anim}`}
        >
          <img
            src={stem.flowerSrc}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="block w-full h-full object-contain object-bottom drop-shadow-[0_15px_25px_rgba(28,18,48,0.28)]"
          />
        </div>
      ))}

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center p-8">
        <h1
          className="reveal yuyu text-center text-4xl text-white sm:text-5xl heading-glow"
          style={{ "--reveal-delay": "0s", "--glow-color": "rgba(255,170,130,0.55)" }}
        >
          Reason You Are Special
        </h1>
        <p
          className="reveal caveat mt-1 text-center text-2xl text-white/85"
          style={{ "--reveal-delay": "0.12s" }}
        >
          baru sebagian, masih banyak lagi
        </p>

        <div
          className="reveal-pop mt-8 h-72 w-64 sm:h-80 sm:w-72"
          style={{ "--reveal-delay": "0.3s" }}
        >
          <Stack
            cards={cards}
            randomRotation
            sensitivity={150}
            sendToBackOnClick
          />
        </div>

        <div className="reveal mt-10" style={{ "--reveal-delay": "0.5s" }}>
          <Button action={() => navigate("/our-songs")}>Next</Button>
        </div>
      </main>
    </>
  );
}
