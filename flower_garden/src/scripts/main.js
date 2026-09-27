document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const curtainPrompt = document.getElementById('curtainPrompt');
  const flowerCurtain = document.getElementById('flowerCurtain');
  const envelopeStage = document.getElementById('envelopeStage');
  const envelope3D = document.getElementById('envelope3D');
  const particlesContainer = document.getElementById('particles-container');

  let isCurtainOpen = false;

  // Fungsi membuka tirai bunga
  function openCurtain() {
    if (isCurtainOpen) return;
    isCurtainOpen = true;
    body.classList.add('curtain-opened');
  }

  // Buka otomatis setelah jeda waktu singkat (1.4 detik) agar pengunjung melihat bunga terlebih dahulu
  const autoOpenTimer = setTimeout(() => {
    openCurtain();
  }, 1400);

  // Jika pengunjung mengklik/tap layar saat tirai masih tertutup, langsung buka
  if (flowerCurtain) {
    flowerCurtain.addEventListener('click', () => {
      clearTimeout(autoOpenTimer);
      openCurtain();
    });
  }

  if (curtainPrompt) {
    curtainPrompt.addEventListener('click', (e) => {
      e.stopPropagation();
      clearTimeout(autoOpenTimer);
      openCurtain();
    });
  }

  // ========================================================================
  // FISIKA INTERAKSI BUNGA DI BELAKANG AMPLOP
  // ========================================================================
  const backdropFlowers = document.querySelectorAll('.env-flower');
  const flowerPhysics = [];

  backdropFlowers.forEach((flower, index) => {
    const baseRot = parseFloat(flower.dataset.baseRot || '0');
    const depth = parseFloat(flower.dataset.depth || '-20');
    const flexibility = 1 + (index % 2 === 0 ? 0.4 : 0.2);
    const lagFactor = 0.08 + (index * 0.015);

    flowerPhysics.push({
      el: flower,
      baseRot,
      depth,
      currentRot: baseRot,
      targetRot: baseRot,
      currentTiltX: 0,
      targetTiltX: 0,
      currentTranslateY: 0,
      targetTranslateY: 0,
      flexibility,
      lagFactor
    });
  });

  let isHoveringEnvelope = false;
  let animFrameId = null;

  function updateFlowerPhysics() {
    let needsUpdate = false;

    flowerPhysics.forEach((item) => {
      const diffRot = item.targetRot - item.currentRot;
      const diffTiltX = item.targetTiltX - item.currentTiltX;
      const diffY = item.targetTranslateY - item.currentTranslateY;

      if (Math.abs(diffRot) > 0.01 || Math.abs(diffTiltX) > 0.01 || Math.abs(diffY) > 0.1) {
        needsUpdate = true;
        item.currentRot += diffRot * item.lagFactor;
        item.currentTiltX += diffTiltX * item.lagFactor;
        item.currentTranslateY += diffY * item.lagFactor;

        item.el.style.transform = `translateZ(${item.depth}px) rotate(${item.currentRot.toFixed(2)}deg) rotateX(${item.currentTiltX.toFixed(2)}deg) translateY(${item.currentTranslateY.toFixed(1)}px)`;
      } else if (!isHoveringEnvelope && item.currentRot !== item.baseRot) {
        item.currentRot = item.baseRot;
        item.currentTiltX = 0;
        item.currentTranslateY = 0;
        item.el.style.transform = `translateZ(${item.depth}px) rotate(${item.baseRot}deg)`;
      }
    });

    if (isHoveringEnvelope || needsUpdate) {
      animFrameId = requestAnimationFrame(updateFlowerPhysics);
    } else {
      animFrameId = null;
    }
  }

  function startPhysicsLoop() {
    if (!animFrameId) {
      animFrameId = requestAnimationFrame(updateFlowerPhysics);
    }
  }

  // ========================================================================
  // EFEK 3D TILT AMPLOP MENGIKUTI KURSOR & RESPON BUNGA
  // ========================================================================
  if (envelope3D && envelopeStage) {
    const maxTilt = 22; // Sudut kemiringan maksimum dalam derajat

    function handlePointerMove(clientX, clientY) {
      const rect = envelope3D.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const normalizedX = (clientX - centerX) / (rect.width / 2);
      const normalizedY = (clientY - centerY) / (rect.height / 2);

      const clampedX = Math.max(-1.3, Math.min(1.3, normalizedX));
      const clampedY = Math.max(-1.3, Math.min(1.3, normalizedY));

      const rotateY = clampedX * maxTilt;
      const rotateX = -clampedY * maxTilt;

      envelope3D.classList.remove('resting');
      envelope3D.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(10px)`;

      // Gerakkan bunga di belakang amplop mengikuti sentuhan/hover
      flowerPhysics.forEach((item) => {
        const lateralPush = clampedX * (11 * item.flexibility);
        const verticalDip = Math.abs(clampedX) * 4 - clampedY * 6;
        const stemFlexX = -clampedY * 8 * item.flexibility;

        item.targetRot = item.baseRot + lateralPush;
        item.targetTiltX = stemFlexX;
        item.targetTranslateY = -verticalDip;
      });

      startPhysicsLoop();
    }

    envelopeStage.addEventListener('mouseenter', () => {
      isHoveringEnvelope = true;
      envelopeStage.classList.add('is-hovered');

      // Memberikan efek sentuhan pertama (touch impulse) seperti bunga tersenggol
      flowerPhysics.forEach((item, idx) => {
        const impulse = (idx % 2 === 0 ? 3.5 : -3.5) * item.flexibility;
        item.targetRot = item.baseRot + impulse;
      });

      startPhysicsLoop();
    });

    envelopeStage.addEventListener('mousemove', (e) => {
      if (!isHoveringEnvelope) {
        isHoveringEnvelope = true;
        envelopeStage.classList.add('is-hovered');
      }
      handlePointerMove(e.clientX, e.clientY);
    });

    envelopeStage.addEventListener('mouseleave', () => {
      isHoveringEnvelope = false;
      envelopeStage.classList.remove('is-hovered');
      envelope3D.classList.add('resting');
      envelope3D.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';

      flowerPhysics.forEach((item) => {
        item.targetRot = item.baseRot;
        item.targetTiltX = 0;
        item.targetTranslateY = 0;
      });
      startPhysicsLoop();
    });

    // Mobile touch
    envelopeStage.addEventListener('touchstart', () => {
      isHoveringEnvelope = true;
      envelopeStage.classList.add('is-hovered');

      flowerPhysics.forEach((item, idx) => {
        const impulse = (idx % 2 === 0 ? 3.5 : -3.5) * item.flexibility;
        item.targetRot = item.baseRot + impulse;
      });

      startPhysicsLoop();
    }, { passive: true });

    envelopeStage.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        handlePointerMove(touch.clientX, touch.clientY);
      }
    }, { passive: true });

    envelopeStage.addEventListener('touchend', () => {
      isHoveringEnvelope = false;
      envelopeStage.classList.remove('is-hovered');
      envelope3D.classList.add('resting');
      envelope3D.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';

      flowerPhysics.forEach((item) => {
        item.targetRot = item.baseRot;
        item.targetTiltX = 0;
        item.targetTranslateY = 0;
      });
      startPhysicsLoop();
    });
  }

  // Generator Partikel Kelopak Melayang & Cahaya (Floating Petals & Sparkles)
  function createParticles() {
    if (!particlesContainer) return;

    const colors = [
      'rgba(175, 150, 220, 0.65)',
      'rgba(145, 120, 205, 0.55)',
      'rgba(215, 190, 245, 0.7)',
      'rgba(255, 230, 180, 0.6)',
      'rgba(240, 210, 230, 0.65)'
    ];

    // Buat 24 kelopak bunga melayang
    for (let i = 0; i < 24; i++) {
      const petal = document.createElement('div');
      petal.classList.add('particle');
      
      const size = Math.floor(Math.random() * 12) + 10; // 10px - 22px
      const leftPos = Math.random() * 100;
      const duration = Math.random() * 8 + 9; // 9s - 17s
      const delay = Math.random() * 8;
      const color = colors[Math.floor(Math.random() * colors.length)];

      petal.style.width = `${size}px`;
      petal.style.height = `${size * 1.3}px`;
      petal.style.left = `${leftPos}vw`;
      petal.style.background = color;
      petal.style.animationDuration = `${duration}s`;
      petal.style.animationDelay = `${delay}s`;

      particlesContainer.appendChild(petal);
    }

    // Buat 16 kilau cahaya / pollen bokeh
    for (let i = 0; i < 16; i++) {
      const sparkle = document.createElement('div');
      sparkle.classList.add('sparkle');

      const size = Math.floor(Math.random() * 4) + 3;
      const topPos = Math.random() * 80 + 10;
      const leftPos = Math.random() * 95 + 2.5;
      const duration = Math.random() * 4 + 3;
      const delay = Math.random() * 5;

      sparkle.style.width = `${size}px`;
      sparkle.style.height = `${size}px`;
      sparkle.style.top = `${topPos}vh`;
      sparkle.style.left = `${leftPos}vw`;
      sparkle.style.animationDuration = `${duration}s`;
      sparkle.style.animationDelay = `${delay}s`;

      particlesContainer.appendChild(sparkle);
    }
  }

  createParticles();
});
