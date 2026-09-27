import { useEffect, useState } from "react";

import GardenBackground from "../components/backgrounds/GardenBackground";
import FlowerCurtain from "../components/curtain/FlowerCurtain";
import EnvelopeStage from "../components/envelope/EnvelopeStage";

// Jeda sebelum tirai bunga terbuka otomatis (ms)
const CURTAIN_AUTO_OPEN_DELAY = 1400;

export default function Cover() {
  const [isCurtainOpen, setIsCurtainOpen] = useState(false);

  // Tirai terbuka otomatis setelah jeda singkat agar bunga sempat terlihat
  useEffect(() => {
    const timer = setTimeout(() => setIsCurtainOpen(true), CURTAIN_AUTO_OPEN_DELAY);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <GardenBackground />

      {/* Konten utama: hanya amplop 3D presisi, tampil setelah tirai terbuka */}
      <main
        className={`relative z-[5] min-h-screen flex items-center justify-center p-8 transition-[opacity,transform] duration-[1800ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
          isCurtainOpen
            ? "[transform:scale(1)] opacity-100 pointer-events-auto"
            : "[transform:scale(0.94)] opacity-0 pointer-events-none"
        }`}
      >
        {/* Isi surat: src/components/envelope/LetterContent.jsx
            Aksi tombol di kertas: <EnvelopeStage onLetterAction={...} /> —
            tanpa prop itu, tombol akan melipat kembali suratnya */}
        <EnvelopeStage />
      </main>

      <FlowerCurtain isOpen={isCurtainOpen} onOpen={() => setIsCurtainOpen(true)} />
    </>
  );
}

