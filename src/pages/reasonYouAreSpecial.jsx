import { useNavigate } from "react-router-dom";

import GardenBackground from "../components/backgrounds/GardenBackground";
import Stack from "../components/ui/stack";
import Button from "../components/ui/button";

/* >>> Ubah 5 alasan di bawah ini sesuka hati <<< */
const REASONS = [
  "Kamu selalu tau cara bikin hari burukku jadi lebih ringan.",
  "Cara kamu tertawa itu salah satu suara favoritku di dunia ini.",
  "Kamu sabar banget menghadapi aku, bahkan di hari-hari susah.",
  "Setiap cerita kecilmu selalu aku tunggu, sekecil apapun itu.",
  "Bersamamu, hal paling sederhana pun terasa seperti rumah.",
];

function ReasonCard({ text }) {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-3xl border border-white/60 bg-white p-6 text-center shadow-lg shadow-[#2c2538]/30">
      <p className="oooh-baby text-xl text-[#4a3e72] sm:text-2xl">{text}</p>
    </div>
  );
}

export default function ReasonYouAreSpecial() {
  const navigate = useNavigate();

  const cards = REASONS.map((text, index) => (
    <ReasonCard key={index} text={text} />
  ));

  return (
    <>
      <GardenBackground />
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center p-8">
        <h1
          className="reveal yuyu text-center text-4xl text-white sm:text-5xl"
          style={{ "--reveal-delay": "0s" }}
        >
          Reason You Are Special
        </h1>
        <p
          className="reveal yuyu mt-2 text-center text-lg text-white/90"
          style={{ "--reveal-delay": "0.15s" }}
        >
          Geser kartunya untuk lihat alasan berikutnya.
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
