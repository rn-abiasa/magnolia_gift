import { useNavigate } from "react-router-dom";

import GardenBackground from "../components/backgrounds/GardenBackground";
import { Carousel } from "../components/ui/Carousel";
import Button from "../components/ui/button";

export default function Memories() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/special-message");
  };

  return (
    <>
      <GardenBackground />
      <main className="relative z-10 p-10 py-20">
        <section>
          <h1 className="text-5xl yuyu text-white text-center">Our Memories</h1>
          <p className="text-2xl yuyu text-white text-center">
            Kenangan yang kita lewati bersama.
          </p>

          <div className="flex flex-col justify-center items-center mt-5">
            <Carousel />

            <Button action={handleNext}>Next</Button>
          </div>
        </section>
      </main>
    </>
  );
}
