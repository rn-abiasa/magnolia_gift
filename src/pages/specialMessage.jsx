import GardenBackground from "../components/backgrounds/GardenBackground";
import Typewriter from "../components/ui/Typewriter";

const text = `Selamat ulang tahun, sayangku 🎉 Terima kasih sudah menjadi bagian terindah dalam hidupku, selalu ada di setiap suka dan duka, dan mengisi hari-hariku dengan tawa serta kehangatan. Semoga di usia yang baru ini kamu makin bahagia, sehat selalu, dan semua impianmu perlahan jadi nyata. Aku bersyukur banget bisa punya kamu, dan semoga kita bisa terus tumbuh bersama, melewati banyak momen indah lainnya. Aku sayang kamu, selamat ulang tahun ❤️`;

export default function SpecialMessage() {
  return (
    <>
      <GardenBackground />
      <main className="relative z-10 p-10 py-16 flex justify-center items-center">
        <section className="max-w-100">
          <h1 className="text-5xl yuyu text-white text-center mb-5">
            Special Message
          </h1>
          <Typewriter text={text} className="text-2xl yuyu text-white" />
        </section>
      </main>
    </>
  );
}
