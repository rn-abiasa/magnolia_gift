import { useNavigate } from "react-router-dom";

import GardenBackground from "../components/backgrounds/GardenBackground";
import SongCard from "../components/ui/SongCard";
import Button from "../components/ui/button";

/* >>> Isi 3 lagu kalian di sini <<<
   youtubeId: ambil dari URL video, mis. youtube.com/watch?v=XXXXXXXXXXX
   -> youtubeId: "XXXXXXXXXXX". Biarkan null jika belum ada, kartu akan
   menampilkan placeholder "tempel link YouTube di sini". */
const SONGS = [
  {
    title: "Overnight - Kita Lewati Berdua",
    artist: "OVERNIGHT",
    youtubeId: "__Pb1fO2H2A",
  },
  {
    title: "Raim Laode - Arti Hidup",
    artist: "RAIM LAODE",
    youtubeId: "6dscL3C_t2U",
  },
  {
    title: "Nadhif Basalamah - Bergema Sampai Selamanya",
    artist: "NADHIF BASALAMAH",
    youtubeId: "gvunApwKIiY",
  },
];

const TILTS = [-1.8, 1.5, -1.2];

export default function OurSongs() {
  const navigate = useNavigate();

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

        <div className="mt-8 flex w-full max-w-100 flex-col justify-center items-center gap-6 sm:flex-row">
          {SONGS.map((song, index) => (
            <div
              key={song.title}
              className="reveal tilt"
              style={{
                "--reveal-delay": `${0.25 + index * 0.15}s`,
                "--tilt-rot": `${TILTS[index % TILTS.length]}deg`,
              }}
            >
              <SongCard {...song} />
            </div>
          ))}
        </div>

        <div className="reveal mt-10" style={{ "--reveal-delay": "0.75s" }}>
          <Button action={() => navigate("/wish")}>Next</Button>
        </div>
      </main>
    </>
  );
}
