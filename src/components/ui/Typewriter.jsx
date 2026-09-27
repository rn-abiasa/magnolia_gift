import { useEffect, useRef, useState } from "react";

/* ── types out `text`, one character at a time ─────────────

   Two things this deliberately does NOT do:

   1. It does not check prefers-reduced-motion. Plenty of
      Android phones turn that flag on as part of battery
      saving without the owner ever asking for it, and the
      result here was the whole letter appearing at once on
      mobile — the typing effect simply never ran.

   2. It does not let the running timer and a "skip" fight
      each other. Skipping used to set the text to full length
      while the pending timeout was still queued; that timeout
      then fired with its own stale counter and snapped the
      text back to where it had been, which is why the button
      looked dead. The loop now reads a ref before every tick
      and stops itself the moment skipping starts. */
export default function Typewriter({
  text,
  speed = 26,
  startDelay = 250,
  skip = false,
  onDone,
  className = "",
}) {
  const [shown, setShown] = useState(0);
  const [done, setDone] = useState(false);

  const skipRef = useRef(skip);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  // keep the ref in sync so the timer loop can see the latest
  // value without being torn down and restarted
  useEffect(() => {
    skipRef.current = skip;
  }, [skip]);

  useEffect(() => {
    let i = 0;
    let timer = 0;

    const finish = () => {
      setShown(text.length);
      setDone(true);
      doneRef.current?.();
    };

    const tick = () => {
      if (skipRef.current) {
        finish();
        return;
      }
      i += 1;
      setShown(i);
      if (i >= text.length) {
        setDone(true);
        doneRef.current?.();
        return;
      }
      timer = window.setTimeout(tick, speed);
    };

    const kickoff = window.setTimeout(tick, startDelay);

    return () => {
      window.clearTimeout(kickoff);
      window.clearTimeout(timer);
    };
  }, [text, speed, startDelay]);

  // a skip pressed during the opening delay (before the first
  // tick) still has to land
  useEffect(() => {
    if (!skip || done) return;
    setShown(text.length);
    setDone(true);
    doneRef.current?.();
  }, [skip, done, text]);

  return (
    <span className={className}>
      {text.slice(0, shown)}
      {!done && (
        <span className="type-cursor" aria-hidden="true">
          &nbsp;
        </span>
      )}
    </span>
  );
}
