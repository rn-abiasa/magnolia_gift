import { useNavigate } from "react-router-dom";

import GardenBackground from "../components/backgrounds/GardenBackground";
import SongCard from "../components/ui/SongCard";
import Button from "../components/ui/button";

/* >>> Isi 3 lagu kalian di sini <<<
   youtubeId: ambil dari URL video, mis. youtube.com/watch?v=XXXXXXXXXXX
   -> youtubeId: "XXXXXXXXXXX". Biarkan null jika belum ada, kartu akan
   menampilkan placeholder "tempel link YouTube di sini". */
const SONGS = [
  { title: "Lagu Kita #1", artist: "Isi nama artis", youtubeId: null },
  { title: "Lagu Kita #2", artist: "Isi nama artis", youtubeId: null },
  { title: "Lagu Kita #3", artist: "Isi nama artis", youtubeId: null },
];

export default function OurSongs() {
  const navigate = useNavigate();

  return (
    <>
      <GardenBackground />
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center p-8 py-16">
        <h1
          className="reveal yuyu text-center text-4xl text-white sm:text-5xl"
          style={{ "--reveal-delay": "0s" }}
        >
          Our Songs
        </h1>
        <p
          className="reveal yuyu mt-2 text-center text-lg text-white/90"
          style={{ "--reveal-delay": "0.15s" }}
        >
          Lagu-lagu yang selalu mengingatkanku padamu.
        </p>

        <div className="mt-8 flex w-full max-w-100 flex-col gap-5">
          {SONGS.map((song, index) => (
            <div
              key={song.title}
              className="reveal"
              style={{ "--reveal-delay": `${0.25 + index * 0.15}s` }}
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
