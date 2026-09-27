import { useState } from "react";
import { useNavigate } from "react-router-dom";

import GardenBackground from "../components/backgrounds/GardenBackground";
import PolaroidPhoto from "../components/ui/PolaroidPhoto";
import SongCard from "../components/ui/SongCard";
import Button from "../components/ui/button";
import photoThree from "../assets/3.webp";
import photoFive from "../assets/5.webp";
import photoSix from "../assets/6.webp";

/* >>> Isi 3 lagu kalian di sini <<<
   youtubeId: ambil dari URL video, mis. youtube.com/watch?v=XXXXXXXXXXX
   -> youtubeId: "XXXXXXXXXXX". Biarkan null jika belum ada, kartu akan
   menampilkan placeholder "tempel link YouTube di sini". */
const SONGS = [
  {
    title: "Kita Lewati Berdua",
    artist: "OVERNIGHT",
    youtubeId: "__Pb1fO2H2A",
  },
  {
    title: "Arti Hidup",
    artist: "RAIM LAODE",
    youtubeId: "6dscL3C_t2U",
  },
  {
    title: "Bergema Sampai Selamanya",
    artist: "NADHIF BASALAMAH",
    youtubeId: "gvunApwKIiY",
  },
];

const TILTS = [-1.8, 1.5, -1.2];

/* Deret foto berbingkai polaroid di bawah kartu lagu — rotasi, lift
   dan durasi float yang berbeda-beda supaya terasa ditempel asal-
   asalan, bukan disusun rapi. */
const MEMORY_PHOTOS = [
  { src: photoThree, rotate: -7, lift: 7, duration: 6.2 },
  { src: photoFive, rotate: 3, lift: 6, duration: 5.4 },
  { src: photoSix, rotate: 8, lift: 8, duration: 7 },
];

export default function OurSongs() {
  const navigate = useNavigate();

  /* Satu lagu pada satu waktu: memulai kartu lain membuat iframe
     kartu sebelumnya unmount, jadi audionya berhenti sendiri. */
  const [playingId, setPlayingId] = useState(null);

  return (
    <>
      <GardenBackground theme="twilight" />
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center p-8 py-16">
        <h1
          className="reveal yuyu text-center text-4xl text-white sm:text-5xl heading-glow"
          style={{
            "--reveal-delay": "0s",
            "--glow-color": "rgba(210,190,255,0.5)",
          }}
        >
          Our Songs
        </h1>
        <p
          className="reveal caveat mt-1 text-center text-2xl text-white/85"
          style={{ "--reveal-delay": "0.12s" }}
        >
          lagu-lagu yang selalu mengingatkanku padamu
        </p>

        {/* Kartu lagu kotak kecil — selalu flex-row (termasuk di mobile)
            dengan flex-1 + min-w-0 supaya tiga kartu sejajar satu baris
            dan sama lebar di semua ukuran layar */}
        <div className="mt-8 flex w-full max-w-100 flex-row flex-wrap items-stretch justify-center gap-3 sm:gap-4">
          {SONGS.map((song, index) => (
            <div
              key={song.title}
              className="reveal tilt min-w-0 flex-1"
              style={{
                "--reveal-delay": `${0.25 + index * 0.15}s`,
                "--tilt-rot": `${TILTS[index % TILTS.length]}deg`,
              }}
            >
              <SongCard
                {...song}
                playing={playingId === song.youtubeId}
                onPlay={() => setPlayingId(song.youtubeId)}
                onStop={() => setPlayingId(null)}
              />
            </div>
          ))}
        </div>

        {/* Dekorasi foto berbingkai polaroid tepat di bawah kartu lagu */}
        <div className="mt-9 flex flex-row flex-wrap items-start justify-center gap-4 sm:gap-6">
          {MEMORY_PHOTOS.map((photo, index) => (
            <div
              key={photo.src}
              className="reveal-pop"
              style={{ "--reveal-delay": `${0.6 + index * 0.08}s` }}
            >
              <PolaroidPhoto
                src={photo.src}
                rotate={photo.rotate}
                lift={photo.lift}
                duration={photo.duration}
              />
            </div>
          ))}
        </div>

        <div className="reveal mt-9" style={{ "--reveal-delay": "0.9s" }}>
          <Button action={() => navigate("/wish")}>Next</Button>
        </div>
      </main>
    </>
  );
}
