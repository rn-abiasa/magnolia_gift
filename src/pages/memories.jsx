import GardenBackground from "../components/backgrounds/GardenBackground";
import { Carousel } from "../components/ui/Carousel";

export default function Memories() {
  return (
    <>
      <GardenBackground />
      <main className="relative z-10 p-10">
        <section>
          <h1 className="text-5xl yuyu text-white text-center">Our Memories</h1>
          <p className="text-2xl yuyu text-white text-center">
            Kenangan yang kita lewati bersama.
          </p>

          <div>
            <Carousel />
          </div>
        </section>
      </main>
    </>
  );
}
