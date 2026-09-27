import { useEffect, useRef, useState } from "react";

// Sudut kemiringan maksimum amplop (derajat) & batas normalisasi gerakan pointer
const MAX_TILT = 22;
const POINTER_CLAMP = 1.3;

/**
 * Menyusun state fisika awal untuk setiap bunga di belakang amplop.
 * Rumus dipertahankan persis seperti flower_garden/src/scripts/main.js
 */
function buildPhysicsState(flowers) {
  return flowers.map((flower, index) => ({
    baseRot: flower.baseRot,
    depth: flower.depth,
    currentRot: flower.baseRot,
    targetRot: flower.baseRot,
    currentTiltX: 0,
    targetTiltX: 0,
    currentTranslateY: 0,
    targetTranslateY: 0,
    // Bunga pada indeks genap lebih lentur daripada indeks ganjil
    flexibility: 1 + (index % 2 === 0 ? 0.4 : 0.2),
    // Semakin belakang posisinya, semakin lambat reaksinya (lag)
    lagFactor: 0.08 + index * 0.015,
  }));
}

/**
 * Fisika interaksi amplop 3D:
 * - kemiringan amplop mengikuti kursor / sentuhan
 * - 5 bunga di belakang amplop ikut tersenggol dan terayun
 *
 * Transform ditulis langsung ke DOM di dalam frame loop (bukan lewat state)
 * agar animasi tetap 60fps tanpa memicu re-render React setiap frame.
 */
export default function useEnvelopePhysics(flowers) {
  const stageRef = useRef(null);
  const envelopeRef = useRef(null);
  const flowerRefs = useRef([]);
  const physicsRef = useRef(null);
  const rafRef = useRef(null);
  const hoveringRef = useRef(false);

  const [isHovered, setIsHovered] = useState(false);
  const [isResting, setIsResting] = useState(true);

  // State fisika dibuat sekali saja, yaitu saat interaksi pertama terjadi
  function getPhysicsState() {
    if (physicsRef.current === null) {
      physicsRef.current = buildPhysicsState(flowers);
    }
    return physicsRef.current;
  }

  function updateFlowerPhysics() {
    let needsUpdate = false;

    getPhysicsState().forEach((item, index) => {
      const element = flowerRefs.current[index];
      if (!element) return;

      const diffRot = item.targetRot - item.currentRot;
      const diffTiltX = item.targetTiltX - item.currentTiltX;
      const diffY = item.targetTranslateY - item.currentTranslateY;

      if (
        Math.abs(diffRot) > 0.01 ||
        Math.abs(diffTiltX) > 0.01 ||
        Math.abs(diffY) > 0.1
      ) {
        needsUpdate = true;
        item.currentRot += diffRot * item.lagFactor;
        item.currentTiltX += diffTiltX * item.lagFactor;
        item.currentTranslateY += diffY * item.lagFactor;

        element.style.transform = `translateZ(${item.depth}px) rotate(${item.currentRot.toFixed(2)}deg) rotateX(${item.currentTiltX.toFixed(2)}deg) translateY(${item.currentTranslateY.toFixed(1)}px)`;
      } else if (!hoveringRef.current && item.currentRot !== item.baseRot) {
        item.currentRot = item.baseRot;
        item.currentTiltX = 0;
        item.currentTranslateY = 0;

        element.style.transform = `translateZ(${item.depth}px) rotate(${item.baseRot}deg)`;
      }
    });

    if (hoveringRef.current || needsUpdate) {
      rafRef.current = requestAnimationFrame(updateFlowerPhysics);
    } else {
      rafRef.current = null;
    }
  }

  function startPhysicsLoop() {
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(updateFlowerPhysics);
    }
  }

  function handlePointerMove(clientX, clientY) {
    const envelope = envelopeRef.current;
    if (!envelope) return;

    const rect = envelope.getBoundingClientRect();
    const normalizedX = (clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const normalizedY = (clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

    const clampedX = Math.max(-POINTER_CLAMP, Math.min(POINTER_CLAMP, normalizedX));
    const clampedY = Math.max(-POINTER_CLAMP, Math.min(POINTER_CLAMP, normalizedY));

    // Amplop dimiringkan mengikuti posisi kursor
    setIsResting(false);
    envelope.style.transform = `rotateX(${(-clampedY * MAX_TILT).toFixed(2)}deg) rotateY(${(clampedX * MAX_TILT).toFixed(2)}deg) translateZ(10px)`;

    // Bunga di belakang amplop ikut tersenggol mengikuti arah kursor
    getPhysicsState().forEach((item) => {
      const lateralPush = clampedX * (11 * item.flexibility);
      const verticalDip = Math.abs(clampedX) * 4 - clampedY * 6;
      const stemFlexX = -clampedY * 8 * item.flexibility;

      item.targetRot = item.baseRot + lateralPush;
      item.targetTiltX = stemFlexX;
      item.targetTranslateY = -verticalDip;
    });

    startPhysicsLoop();
  }

  function handleEnter() {
    hoveringRef.current = true;
    setIsHovered(true);

    // Efek sentuhan pertama: bunga seperti tersenggol lalu terayun
    getPhysicsState().forEach((item, index) => {
      const impulse = (index % 2 === 0 ? 3.5 : -3.5) * item.flexibility;
      item.targetRot = item.baseRot + impulse;
    });

    startPhysicsLoop();
  }

  function handleLeave() {
    hoveringRef.current = false;
    setIsHovered(false);
    setIsResting(true);

    const envelope = envelopeRef.current;
    if (envelope) {
      envelope.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0px)";
    }

    getPhysicsState().forEach((item) => {
      item.targetRot = item.baseRot;
      item.targetTiltX = 0;
      item.targetTranslateY = 0;
    });

    startPhysicsLoop();
  }

  function handleMove(event) {
    if (!hoveringRef.current) {
      hoveringRef.current = true;
      setIsHovered(true);
    }

    handlePointerMove(event.clientX, event.clientY);
  }

  function handleTouchMove(event) {
    if (event.touches.length > 0) {
      const touch = event.touches[0];
      handlePointerMove(touch.clientX, touch.clientY);
    }
  }

  // Hentikan frame loop saat komponen dilepas
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  return {
    stageRef,
    envelopeRef,
    flowerRefs,
    isHovered,
    isResting,
    stageHandlers: {
      onMouseEnter: handleEnter,
      onMouseMove: handleMove,
      onMouseLeave: handleLeave,
      onTouchStart: handleEnter,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleLeave,
    },
  };
}
