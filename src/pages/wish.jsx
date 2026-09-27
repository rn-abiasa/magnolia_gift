import GardenBackground from "../components/backgrounds/GardenBackground";
import Typewriter from "../components/ui/Typewriter";

/* >>> Ubah wish di bawah ini sesuka hati <<< */
const wishText = `Semoga tahun ini membawa lebih banyak alasan untuk tersenyum, lebih banyak momen tenang yang kita nikmati berdua, dan lebih banyak mimpi yang perlahan jadi kenyataan. Apapun yang terjadi, aku akan selalu ada di sampingmu. Selamat ulang tahun, semoga selalu bahagia 🤍`;

export default function Wish() {
  return (
    <>
      <GardenBackground />
      <main className="relative z-10 flex min-h-screen items-center justify-center p-8">
        <section className="max-w-100">
          <h1
            className="reveal yuyu mb-5 text-center text-4xl text-white sm:text-5xl"
            style={{ "--reveal-delay": "0s" }}
          >
            My Wish For You
          </h1>

          <div
            className="reveal rounded-2xl bg-white/10 p-5 backdrop-blur-sm"
            style={{ "--reveal-delay": "0.2s" }}
          >
            <Typewriter
              text={wishText}
              speed={30}
              className="text-2xl yuyu text-white"
            />
          </div>
        </section>
      </main>
    </>
  );
}
