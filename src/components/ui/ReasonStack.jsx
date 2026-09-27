import { useRef, useState } from "react";

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

/* ── a small deck of reasons, swiped away one at a time ────
   Only the top card listens to the pointer. Past the release
   threshold it flies off in the direction it was pushed and
   the next card takes its place; short of it, it snaps back.
   When the deck is empty, "lihat lagi" reshuffles it to the
   top rather than reloading the page. */
export default function ReasonStack({ reasons }) {
  const [i, setI] = useState(0);
  const [drag, setDrag] = useState({ dx: 0, dy: 0, rot: 0 });
  const [leaving, setLeaving] = useState(null); // 'left' | 'right' | null
  const [dragging, setDragging] = useState(false);
  const start = useRef(null);

  const remaining = reasons.length - i;

  const down = (e) => {
    if (leaving) return;
    start.current = { x: e.clientX, y: e.clientY };
    setDragging(true);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* not a live pointer */
    }
  };

  const move = (e) => {
    if (!start.current || leaving) return;
    const dx = e.clientX - start.current.x;
    const dy = e.clientY - start.current.y;
    setDrag({ dx, dy, rot: clamp(dx / 14, -14, 14) });
  };

  const release = () => {
    if (!start.current || leaving) return;
    start.current = null;
    setDragging(false);
    const { dx } = drag;
    if (Math.abs(dx) > 90) {
      const dir = dx > 0 ? "right" : "left";
      setLeaving(dir);
      window.setTimeout(() => {
        setI((v) => v + 1);
        setLeaving(null);
        setDrag({ dx: 0, dy: 0, rot: 0 });
      }, 420);
    } else {
      setDrag({ dx: 0, dy: 0, rot: 0 });
    }
  };

  if (remaining <= 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-14 text-center">
        <p className="oooh-baby text-2xl text-white">
          itu baru sebagian alasan ✨
        </p>
        <button
          onClick={() => setI(0)}
          className="h-9 rounded-full border border-white/40 px-5 text-xs font-semibold text-white transition-colors active:bg-white/15"
        >
          Lihat lagi
        </button>
      </div>
    );
  }

  const topTransform = leaving
    ? `translate3d(${leaving === "right" ? 420 : -420}px, ${drag.dy}px, 0) rotate(${leaving === "right" ? 24 : -24}deg)`
    : `translate3d(${drag.dx}px, ${drag.dy}px, 0) rotate(${drag.rot}deg)`;

  const visible = reasons.slice(i, i + 3);

  return (
    <div className="relative mx-auto h-72 w-64 select-none sm:h-80 sm:w-72">
      {visible.map((text, idx) => {
        const isTop = idx === 0;
        return (
          <div
            key={i + idx}
            className="reason-card absolute inset-0 flex items-center justify-center rounded-3xl border border-white/60 bg-white p-6 text-center shadow-lg shadow-rose-950/40"
            data-leaving={isTop && !!leaving}
            data-snap={isTop && !leaving && !dragging}
            style={{
              transform: isTop
                ? topTransform
                : `translateY(${idx * 8}px) scale(${1 - idx * 0.04})`,
              zIndex: 10 - idx,
              cursor: isTop ? "grab" : "default",
            }}
            onPointerDown={isTop ? down : undefined}
            onPointerMove={isTop ? move : undefined}
            onPointerUp={isTop ? release : undefined}
            onPointerCancel={isTop ? release : undefined}
          >
            <p className="oooh-baby text-xl text-rose-950/80 sm:text-2xl">
              {text}
            </p>
          </div>
        );
      })}
    </div>
  );
}
