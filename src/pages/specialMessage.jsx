import { useNavigate } from "react-router-dom";

import GardenBackground from "../components/backgrounds/GardenBackground";
import Typewriter from "../components/ui/Typewriter";
import PolaroidPhoto from "../components/ui/PolaroidPhoto";
import Button from "../components/ui/button";
import photoTwo from "../assets/2.webp";
import photoFour from "../assets/4.webp";

const text = `Selamat ulang tahun, sayangku 🎉 Terima kasih sudah menjadi bagian terindah dalam hidupku, selalu ada di setiap suka dan duka, dan mengisi hari-hariku dengan tawa serta kehangatan. Semoga di usia yang baru ini kamu makin bahagia, sehat selalu, dan semua impianmu perlahan jadi nyata. Aku bersyukur banget bisa punya kamu, dan semoga kita bisa terus tumbuh bersama, melewati banyak momen indah lainnya. Aku sayang kamu, selamat ulang tahun ❤️`;

export default function SpecialMessage() {
  const navigate = useNavigate();

  return (
    <>
      <GardenBackground />

      {/* Dekorasi foto berbingkai polaroid, ditaruh menggantung di sisi
          kertas pesan supaya terasa seperti kenangan yang diselipkan */}
      <div
        className="reveal-pop pointer-events-none fixed left-[4vw] top-[10vh] z-[3] hidden sm:block"
        style={{ "--reveal-delay": "0.35s" }}
      >
        <PolaroidPhoto src={photoTwo} rotate={-8} lift={7} duration={6.5} />
      </div>
      <div
        className="reveal-pop pointer-events-none fixed right-[5vw] bottom-[8vh] z-[3] hidden sm:block"
        style={{ "--reveal-delay": "0.5s" }}
      >
        <PolaroidPhoto src={photoFour} rotate={7} lift={6} duration={5.5} />
      </div>

      <main className="relative z-10 p-10 py-16 flex justify-center items-center min-h-screen">
        <section className="max-w-100">
          <h1
            className="reveal text-5xl yuyu text-white text-center mb-5"
            style={{ "--reveal-delay": "0s" }}
          >
            Special Message
          </h1>

          <div
            className="reveal rounded-2xl bg-white/10 p-5 backdrop-blur-sm"
            style={{ "--reveal-delay": "0.2s" }}
          >
            <Typewriter text={text} className="text-2xl yuyu text-white" />
          </div>

          <div
            className="reveal mt-6 flex justify-center"
            style={{ "--reveal-delay": "0.35s" }}
          >
            <Button action={() => navigate("/reason-you-are-special")}>
              Next
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}
