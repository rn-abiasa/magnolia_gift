import irisFlower from "../../assets/iris_flower_v1.webp";

/**
 * Susunan 5 tangkai menyilang per sayap tirai.
 * Posisi, ukuran, urutan tumpukan (z-index), filter kedalaman, dan
 * animasi terpaan angin dipertahankan persis seperti versi asli.
 */
const LEFT_STEMS = [
  {
    id: "stem-l-1",
    position: "left-[3vw] w-[38vw] max-w-[480px] h-[112vh] max-md:w-[62vw] z-[5]",
    anim: "animate-[windBreezeLeft_7.6s_cubic-bezier(0.445,0.05,0.55,0.95)_infinite]",
  },
  {
    id: "stem-l-2",
    position:
      "left-[17vw] max-md:left-[16vw] w-[36vw] max-w-[440px] h-[105vh] max-md:w-[56vw] z-[4]",
    anim: "animate-[windBreezeLeftCross_8.6s_cubic-bezier(0.445,0.05,0.55,0.95)_1.2s_infinite]",
  },
  {
    id: "stem-l-3",
    position:
      "left-[31vw] max-md:left-[32vw] w-[33vw] max-w-[410px] h-[100vh] max-md:w-[50vw] z-[3]",
    anim: "animate-[windBreezeLeftDeep_6.8s_cubic-bezier(0.445,0.05,0.55,0.95)_2.1s_infinite]",
  },
  {
    id: "stem-l-4",
    position:
      "left-[8vw] w-[34vw] max-w-[410px] h-[94vh] z-[2] brightness-90 blur-[1px]",
    anim: "animate-[windBreezeLeft_7.2s_cubic-bezier(0.445,0.05,0.55,0.95)_0.6s_infinite]",
  },
  {
    id: "stem-l-5",
    position:
      "left-[24vw] w-[30vw] max-w-[370px] h-[86vh] z-[1] brightness-82 blur-[3px]",
    anim: "animate-[windBreezeLeftCross_9.2s_cubic-bezier(0.445,0.05,0.55,0.95)_2.8s_infinite]",
  },
];

const RIGHT_STEMS = [
  {
    id: "stem-r-1",
    position: "right-[3vw] w-[38vw] max-w-[480px] h-[112vh] max-md:w-[62vw] z-[5]",
    anim: "animate-[windBreezeRight_8.1s_cubic-bezier(0.445,0.05,0.55,0.95)_infinite]",
  },
  {
    id: "stem-r-2",
    position:
      "right-[17vw] max-md:right-[16vw] w-[36vw] max-w-[440px] h-[105vh] max-md:w-[56vw] z-[4]",
    anim: "animate-[windBreezeRightCross_7.4s_cubic-bezier(0.445,0.05,0.55,0.95)_1.5s_infinite]",
  },
  {
    id: "stem-r-3",
    position:
      "right-[31vw] max-md:right-[32vw] w-[33vw] max-w-[410px] h-[100vh] max-md:w-[50vw] z-[3]",
    anim: "animate-[windBreezeRightDeep_8.8s_cubic-bezier(0.445,0.05,0.55,0.95)_0.8s_infinite]",
  },
  {
    id: "stem-r-4",
    position:
      "right-[8vw] w-[34vw] max-w-[410px] h-[94vh] z-[2] brightness-90 blur-[1px]",
    anim: "animate-[windBreezeRight_7s_cubic-bezier(0.445,0.05,0.55,0.95)_2.3s_infinite]",
  },
  {
    id: "stem-r-5",
    position:
      "right-[24vw] w-[30vw] max-w-[370px] h-[86vh] z-[1] brightness-82 blur-[3px]",
    anim: "animate-[windBreezeRightCross_9.5s_cubic-bezier(0.445,0.05,0.55,0.95)_1.1s_infinite]",
  },
];

const WINGS = [
  {
    id: "curtain-left",
    position: "left-0",
    stems: LEFT_STEMS,
    opened: "[transform:translateX(-118%)_rotate(-12deg)]",
  },
  {
    id: "curtain-right",
    position: "right-0",
    stems: RIGHT_STEMS,
    opened: "[transform:translateX(118%)_rotate(12deg)]",
  },
];

/**
 * Tirai bunga pembuka layar: dua sayap bunga iris yang membuka ke luar
 * (ditiup angin) saat isOpen berubah menjadi true.
 */
export default function FlowerCurtain({ isOpen, onOpen }) {
  return (
    <div
      onClick={onOpen}
      className={`fixed inset-0 z-[100] overflow-hidden ${
        isOpen ? "pointer-events-none" : "pointer-events-auto"
      }`}
    >
      {WINGS.map((wing) => (
        <div
          key={wing.id}
          className={`absolute top-0 bottom-0 h-full w-[72vw] max-md:w-[92vw] will-change-transform transition-transform duration-[3400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${wing.position} ${
            isOpen ? wing.opened : "[transform:translateX(0)]"
          }`}
        >
          {wing.stems.map((stem) => (
            <div
              key={stem.id}
              className={`absolute -bottom-[6vh] origin-bottom will-change-transform transition-[filter] duration-[800ms] ${stem.position} ${stem.anim}`}
            >
              <img
                src={irisFlower}
                alt="Iris Flower"
                draggable={false}
                className="w-full h-full object-contain block select-none drop-shadow-[0_15px_25px_rgba(28,18,48,0.28)]"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
