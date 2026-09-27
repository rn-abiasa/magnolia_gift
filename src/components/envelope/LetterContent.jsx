import { useNavigate } from "react-router-dom";

/**
 * Isi kertas surat di dalam amplop.
 *
 * >>> Tempat mengisi konten surat <<<
 * - Teks di bawah boleh diganti bebas; `whitespace-pre-line` sudah aktif,
 *   jadi tanda baris baru (\n) di dalam string akan dihormati sebagai enter.
 * - Ukuran font sengaja kecil karena lebar kertas hanya ±300px di desktop
 *   (kertas = 90,5% lebar amplop yang di-cap 340px).
 * - `onAction` diisi otomatis oleh prop `onLetterAction` milik <EnvelopeStage />.
 *   Bila prop itu tidak diberikan, klik tombol akan melipat kembali suratnya.
 */
export default function LetterContent({ onAction }) {
  const navigate = useNavigate();

  return (
    <div className="flex h-full w-full flex-col">
      <div>
        <p className="yuyu text-2xl leading-normal text-[#4a3e72] text-center">
          Happy Birthday My Lovee
        </p>
        <p className="caveat mt-2 whitespace-pre-line text-base leading-[1.6] text-[#2c2538] text-center">
          27-09-2026
        </p>
      </div>

      <div className="flex justify-center mt-5">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            navigate("/memories");
          }}
          className="relative z-10 cursor-pointer rounded-full bg-[#6b52ae] px-4 py-2 text-[0.7rem] font-semibold tracking-[0.08em] text-white shadow-[0_6px_16px_rgba(74,62,114,0.3)] transition-colors hover:bg-[#4a3e72] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd89b] focus-visible:ring-offset-2"
        >
          Open
        </button>
      </div>
    </div>
  );
}
