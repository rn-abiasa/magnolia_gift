import { useNavigate } from "react-router-dom";

import GardenBackground from "../components/backgrounds/GardenBackground";
import { Carousel } from "../components/ui/Carousel";
import Button from "../components/ui/button";
import magnoliaFlower from "../assets/magnolia_flower.webp";
import irisFlower from "../assets/iris_flower_v1.webp";

export default function Memories() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/special-message");
  };

  return (
    <>
      <GardenBackground theme="golden" />

      {/* Dekorasi bunga kecil di sudut bawah, dengan terpaan angin halus
          yang sama seperti tirai bunga di halaman cover (windBreeze*Deep) */}
      <img
        src={magnoliaFlower}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="corner-flower pointer-events-none select-none fixed -bottom-4 left-[-4vw] z-[3] w-[34vw] max-w-[190px] origin-bottom drop-shadow-[0_10px_18px_rgba(28,18,48,0.22)] animate-[windBreezeLeftDeep_7.4s_cubic-bezier(0.445,0.05,0.55,0.95)_infinite]"
      />
      <img
        src={irisFlower}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="corner-flower pointer-events-none select-none fixed -bottom-4 right-[-4vw] z-[3] w-[34vw] max-w-[190px] origin-bottom drop-shadow-[0_10px_18px_rgba(28,18,48,0.22)] animate-[windBreezeRightDeep_8.1s_cubic-bezier(0.445,0.05,0.55,0.95)_0.5s_infinite]"
      />

      <main className="relative z-10 p-10 py-20">
        <section>
          <h1
            className="reveal text-5xl yuyu text-white text-center heading-glow"
            style={{ "--reveal-delay": "0s", "--glow-color": "rgba(255,214,140,0.6)" }}
          >
            Our Memories
          </h1>
          <p
            className="reveal caveat text-2xl text-white/85 text-center"
            style={{ "--reveal-delay": "0.15s" }}
          >
            kenangan yang kita lewati bersama
          </p>

          <div className="flex flex-col justify-center items-center mt-5">
            <div
              className="reveal-pop w-full flex justify-center items-center"
              style={{ "--reveal-delay": "0.3s" }}
            >
              <Carousel />
            </div>

            <div className="reveal" style={{ "--reveal-delay": "0.5s" }}>
              <Button action={handleNext}>Next</Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
