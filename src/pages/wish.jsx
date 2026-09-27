import GardenBackground from "../components/backgrounds/GardenBackground";
import Typewriter from "../components/ui/Typewriter";

/* >>> Ubah wish di bawah ini sesuka hati <<< */
const wishText = `Semoga tahun ini membawa lebih banyak alasan untuk tersenyum, lebih banyak momen tenang yang kita nikmati berdua, dan lebih banyak mimpi yang perlahan jadi kenyataan. Apapun yang terjadi, aku akan selalu ada di sampingmu. Selamat ulang tahun, semoga selalu bahagia 🤍`;

export default function Wish() {
  return (
    <>
      <GardenBackground theme="night" />
      <main className="relative z-10 flex min-h-screen items-center justify-center p-8">
        <section className="max-w-100">
          <h1
            className="reveal yuyu mb-1 text-center text-4xl text-white sm:text-5xl heading-glow"
            style={{ "--reveal-delay": "0s", "--glow-color": "rgba(200,210,255,0.5)" }}
          >
            My Wish For You
          </h1>
          <p
            className="reveal caveat mb-5 text-center text-2xl text-white/85"
            style={{ "--reveal-delay": "0.1s" }}
          >
            dibisikkan pada bintang
          </p>

          <div
            className="paper-card reveal p-6 sm:p-7"
            style={{ "--reveal-delay": "0.25s", "--paper-rot": "1.1deg" }}
          >
            <Typewriter
              text={wishText}
              speed={30}
              className="text-xl leading-relaxed text-[#4a3e72] oooh-baby"
            />
          </div>
        </section>
      </main>
    </>
  );
}
