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
