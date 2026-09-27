import { useState } from "react";

/* single-path "music note" icon (Material's music_note glyph) —
   used both as the empty-state placeholder and as the small
   badge next to the title, so no icon library is needed */
const NoteIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
  </svg>
);

/* ── a song, shown as its thumbnail until it's asked for ───
   The iframe only mounts after a tap — a card that embeds
   every video up front loads N players nobody has pressed
   play on yet, which is the opposite of "ringan".

   The thumbnail, the darkening overlay and the play button
   are three stacked layers, ALL absolutely positioned inside
   the same relative frame — that's what keeps the button
   sitting dead center over the artwork instead of being laid
   out as a flex sibling next to a full-width image. */
export default function SongCard({ title, artist, youtubeId }) {
  const [playing, setPlaying] = useState(false);
  const hasVideo = Boolean(youtubeId);

  return (
    <div className="group w-full overflow-hidden rounded-2xl border border-white/60 bg-white shadow-md shadow-rose-950/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-rose-950/45 active:translate-y-0 active:scale-[0.99]">
      <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-rose-700/10 via-rose-700/5 to-rose-700/10">
        {playing && hasVideo ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : hasVideo ? (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="absolute inset-0"
            aria-label={`Putar ${title}`}
          >
            <img
              src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              loading="lazy"
            />
            {/* darkens toward the bottom so a white or busy
                thumbnail never fights the play button for
                contrast */}
            <span className="absolute inset-0 bg-gradient-to-t from-rose-950/55 via-rose-950/10 to-transparent transition-opacity duration-300 group-hover:from-rose-950/65" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 shadow-lg shadow-rose-950/30 ring-1 ring-white/60 backdrop-blur-sm transition-transform duration-300 ease-out group-hover:scale-110 group-active:scale-90">
                <svg
                  viewBox="0 0 24 24"
                  className="ml-0.5 h-6 w-6 fill-rose-700"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </button>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-rose-700/20 text-rose-700/40">
            <NoteIcon className="h-8 w-8 fill-current" />
            <span className="oooh-baby text-base">
              tempel link YouTube di sini
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 px-4 py-3 text-left">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-700/10 text-rose-700/70">
          <NoteIcon className="h-4 w-4 fill-current" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-rose-950/80">
            {title}
          </p>
          <p className="truncate text-xs text-rose-950/50">{artist}</p>
        </div>
      </div>
    </div>
  );
}
