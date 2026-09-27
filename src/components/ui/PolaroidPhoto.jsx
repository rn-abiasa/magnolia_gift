/* ── a photo with a polaroid-style frame ────────────────────
   A white border, a little rotated "tape" strip on top (pure
   CSS, see .polaroid in index.css), and a gentle idle float so
   it reads as something stuck onto the page rather than a
   generic thumbnail sitting in a list. */
export default function PolaroidPhoto({
  src,
  alt = "",
  caption,
  rotate = -4,
  lift = 6,
  duration = 6,
  className = "",
}) {
  return (
    <figure
      className={`polaroid polaroid-float w-fit bg-white p-2 pb-4 shadow-lg shadow-rose-950/40 ${className}`}
      style={{
        ["--pf-rot"]: `${rotate}deg`,
        ["--pf-lift"]: `${lift}px`,
        ["--pf-duration"]: `${duration}s`,
      }}
    >
      <img
        src={src}
        alt={alt}
        className="h-32 w-28 rounded-[1px] object-cover sm:h-36 sm:w-32"
      />
      {caption && (
        <figcaption className="oooh-baby mt-1 text-center text-sm text-rose-950/70">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
