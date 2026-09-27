/**
 * Palet "waktu & suasana langit" untuk GardenBackground, dipakai bersama
 * oleh GardenBackground (langit + glow), MeadowDepthBlur (3 lapis siluet
 * depth-blur), dan FloatingParticles (kelopak + kilau).
 *
 * Setiap halaman punya tema sendiri supaya urutan halaman terasa seperti
 * satu hari yang berjalan: senja (cover) -> sore keemasan (memories) ->
 * semburat merah muda (special message) -> sunset hangat (reason) ->
 * twilight ungu (our songs) -> langit malam berbintang (wish).
 *
 * Teknik render-nya tetap sama persis di setiap tema: siluet yang muncul
 * hanya lewat 3 gradient + blur bertingkat (back/mid/front), tidak ada
 * bentuk baru yang digambar.
 */

export const DEFAULT_GARDEN_THEME = "dusk";

export const GARDEN_THEMES = {
  /* Cover: senja lavender-persik, tema asli proyek ini. Dipertahankan
     byte-identik supaya halaman cover tidak berubah. */
  dusk: {
    sky: "linear-gradient(180deg, #9cb8da 0%, #c4d5ea 25%, #f2dbdf 50%, #f8e3c5 75%, #e7e3bf 100%)",
    glow: "radial-gradient(circle, rgba(255,245,215,0.7) 0%, rgba(255,225,170,0.35) 45%, rgba(255,255,255,0) 70%)",
    meadowBack:
      "radial-gradient(ellipse at 25% 100%, #879978 0%, #7d8e6e 60%, transparent 80%), radial-gradient(ellipse at 75% 100%, #9987a0 0%, #897893 50%, transparent 75%), linear-gradient(to top, #7e947b 0%, rgba(142,168,140,0.4) 60%, transparent 100%)",
    meadowMid:
      "radial-gradient(circle at 15% 90%, rgba(107,82,174,0.45) 0%, transparent 40%), radial-gradient(circle at 45% 85%, rgba(220,180,240,0.4) 0%, transparent 45%), radial-gradient(circle at 80% 90%, rgba(125,95,185,0.45) 0%, transparent 40%), radial-gradient(circle at 60% 95%, rgba(245,205,120,0.35) 0%, transparent 35%), linear-gradient(to top, #506e4c 0%, rgba(95,126,92,0.6) 50%, transparent 100%)",
    meadowFront:
      "radial-gradient(ellipse at 30% 100%, rgba(61,90,69,0.8) 0%, transparent 60%), radial-gradient(ellipse at 70% 100%, rgba(74,62,114,0.35) 0%, transparent 55%), linear-gradient(to top, #395238 0%, rgba(61,90,69,0.3) 70%, transparent 100%)",
    petalColors: [
      "rgba(175, 150, 220, 0.65)",
      "rgba(145, 120, 205, 0.55)",
      "rgba(215, 190, 245, 0.7)",
      "rgba(255, 230, 180, 0.6)",
      "rgba(240, 210, 230, 0.65)",
    ],
    petalCount: 24,
    sparkleCount: 16,
    sparkleGlow: "0 0 10px #ffeaa7, 0 0 20px #ffeaa7",
  },

  /* Memories: sore keemasan, hangat & nostalgik. */
  golden: {
    sky: "linear-gradient(180deg, #a9c9e6 0%, #f3d9a4 32%, #f0b56b 62%, #e2924a 100%)",
    glow: "radial-gradient(circle, rgba(255,238,190,0.85) 0%, rgba(255,196,120,0.4) 45%, rgba(255,255,255,0) 70%)",
    meadowBack:
      "radial-gradient(ellipse at 25% 100%, #9c8a5e 0%, #8f7a52 60%, transparent 80%), radial-gradient(ellipse at 75% 100%, #b98f5e 0%, #a67c4d 50%, transparent 75%), linear-gradient(to top, #96814f 0%, rgba(150,129,79,0.4) 60%, transparent 100%)",
    meadowMid:
      "radial-gradient(circle at 15% 90%, rgba(184,122,54,0.5) 0%, transparent 40%), radial-gradient(circle at 45% 85%, rgba(240,196,120,0.4) 0%, transparent 45%), radial-gradient(circle at 80% 90%, rgba(168,104,45,0.5) 0%, transparent 40%), radial-gradient(circle at 60% 95%, rgba(245,205,120,0.4) 0%, transparent 35%), linear-gradient(to top, #6e5a34 0%, rgba(110,90,52,0.6) 50%, transparent 100%)",
    meadowFront:
      "radial-gradient(ellipse at 30% 100%, rgba(72,56,30,0.85) 0%, transparent 60%), radial-gradient(ellipse at 70% 100%, rgba(120,80,40,0.4) 0%, transparent 55%), linear-gradient(to top, #4a3a20 0%, rgba(72,56,30,0.3) 70%, transparent 100%)",
    petalColors: [
      "rgba(240, 196, 120, 0.65)",
      "rgba(224, 158, 84, 0.55)",
      "rgba(250, 220, 170, 0.7)",
      "rgba(255, 214, 140, 0.6)",
      "rgba(235, 180, 110, 0.65)",
    ],
    petalCount: 22,
    sparkleCount: 14,
    sparkleGlow: "0 0 10px #ffd98a, 0 0 20px #ffd98a",
  },

  /* Special Message: semburat merah muda, lembut & intim. */
  blush: {
    sky: "linear-gradient(180deg, #c9b9dd 0%, #e3c3d4 30%, #f6d6dd 60%, #fbe7dd 100%)",
    glow: "radial-gradient(circle, rgba(255,230,240,0.8) 0%, rgba(255,200,215,0.35) 45%, rgba(255,255,255,0) 70%)",
    meadowBack:
      "radial-gradient(ellipse at 25% 100%, #9b7f95 0%, #8d7288 60%, transparent 80%), radial-gradient(ellipse at 75% 100%, #a98a9e 0%, #977a8f 50%, transparent 75%), linear-gradient(to top, #8f7690 0%, rgba(143,118,144,0.4) 60%, transparent 100%)",
    meadowMid:
      "radial-gradient(circle at 15% 90%, rgba(154,96,140,0.45) 0%, transparent 40%), radial-gradient(circle at 45% 85%, rgba(232,182,205,0.4) 0%, transparent 45%), radial-gradient(circle at 80% 90%, rgba(150,100,150,0.45) 0%, transparent 40%), radial-gradient(circle at 60% 95%, rgba(245,190,205,0.35) 0%, transparent 35%), linear-gradient(to top, #5e4a5e 0%, rgba(94,74,94,0.6) 50%, transparent 100%)",
    meadowFront:
      "radial-gradient(ellipse at 30% 100%, rgba(58,42,58,0.8) 0%, transparent 60%), radial-gradient(ellipse at 70% 100%, rgba(107,74,110,0.35) 0%, transparent 55%), linear-gradient(to top, #3c2c3c 0%, rgba(58,42,58,0.3) 70%, transparent 100%)",
    petalColors: [
      "rgba(232, 182, 205, 0.65)",
      "rgba(210, 150, 185, 0.55)",
      "rgba(245, 205, 220, 0.7)",
      "rgba(255, 220, 225, 0.6)",
      "rgba(220, 175, 200, 0.65)",
    ],
    petalCount: 22,
    sparkleCount: 14,
    sparkleGlow: "0 0 10px #ffd6e4, 0 0 20px #ffd6e4",
  },

  /* Reason You Are Special: sunset hangat, coral & plum. */
  sunset: {
    sky: "linear-gradient(180deg, #4d5a94 0%, #7a5f96 30%, #c17a68 65%, #eda86a 100%)",
    glow: "radial-gradient(circle, rgba(255,200,150,0.75) 0%, rgba(255,150,110,0.35) 45%, rgba(255,255,255,0) 70%)",
    meadowBack:
      "radial-gradient(ellipse at 25% 100%, #6b4a5e 0%, #5e4053 60%, transparent 80%), radial-gradient(ellipse at 75% 100%, #7a5248 0%, #69453d 50%, transparent 75%), linear-gradient(to top, #5c4050 0%, rgba(92,64,80,0.4) 60%, transparent 100%)",
    meadowMid:
      "radial-gradient(circle at 15% 90%, rgba(178,90,60,0.5) 0%, transparent 40%), radial-gradient(circle at 45% 85%, rgba(230,150,100,0.4) 0%, transparent 45%), radial-gradient(circle at 80% 90%, rgba(150,70,90,0.45) 0%, transparent 40%), radial-gradient(circle at 60% 95%, rgba(240,170,100,0.35) 0%, transparent 35%), linear-gradient(to top, #402c3a 0%, rgba(64,44,58,0.6) 50%, transparent 100%)",
    meadowFront:
      "radial-gradient(ellipse at 30% 100%, rgba(35,24,32,0.85) 0%, transparent 60%), radial-gradient(ellipse at 70% 100%, rgba(90,50,45,0.4) 0%, transparent 55%), linear-gradient(to top, #241a20 0%, rgba(35,24,32,0.3) 70%, transparent 100%)",
    petalColors: [
      "rgba(230, 150, 100, 0.65)",
      "rgba(200, 100, 90, 0.55)",
      "rgba(240, 180, 130, 0.7)",
      "rgba(180, 90, 110, 0.6)",
      "rgba(220, 130, 100, 0.65)",
    ],
    petalCount: 22,
    sparkleCount: 14,
    sparkleGlow: "0 0 10px #ffb27a, 0 0 20px #ffb27a",
  },

  /* Our Songs: twilight ungu-biru, mulai muncul bintang. */
  twilight: {
    sky: "linear-gradient(180deg, #262a52 0%, #423a6b 30%, #6a4f82 60%, #b97a6e 100%)",
    glow: "radial-gradient(circle, rgba(220,210,255,0.6) 0%, rgba(180,150,220,0.3) 45%, rgba(255,255,255,0) 70%)",
    meadowBack:
      "radial-gradient(ellipse at 25% 100%, #453a5e 0%, #3a3050 60%, transparent 80%), radial-gradient(ellipse at 75% 100%, #4d3f66 0%, #40355a 50%, transparent 75%), linear-gradient(to top, #362c4c 0%, rgba(54,44,76,0.4) 60%, transparent 100%)",
    meadowMid:
      "radial-gradient(circle at 15% 90%, rgba(90,60,140,0.5) 0%, transparent 40%), radial-gradient(circle at 45% 85%, rgba(150,120,200,0.4) 0%, transparent 45%), radial-gradient(circle at 80% 90%, rgba(110,60,120,0.45) 0%, transparent 40%), radial-gradient(circle at 60% 95%, rgba(200,140,150,0.35) 0%, transparent 35%), linear-gradient(to top, #241c38 0%, rgba(36,28,56,0.6) 50%, transparent 100%)",
    meadowFront:
      "radial-gradient(ellipse at 30% 100%, rgba(14,10,26,0.85) 0%, transparent 60%), radial-gradient(ellipse at 70% 100%, rgba(60,40,80,0.4) 0%, transparent 55%), linear-gradient(to top, #0e0a1a 0%, rgba(14,10,26,0.3) 70%, transparent 100%)",
    petalColors: [
      "rgba(150, 120, 200, 0.6)",
      "rgba(120, 100, 190, 0.5)",
      "rgba(180, 150, 220, 0.65)",
      "rgba(200, 170, 140, 0.5)",
      "rgba(140, 110, 170, 0.6)",
    ],
    petalCount: 16,
    sparkleCount: 24,
    sparkleGlow: "0 0 12px #e6d9ff, 0 0 24px #e6d9ff",
  },

  /* Wish: langit malam dalam, penuh bintang untuk membuat permintaan. */
  night: {
    sky: "linear-gradient(180deg, #0c0b1e 0%, #17142f 30%, #262047 60%, #3c2f52 100%)",
    glow: "radial-gradient(circle, rgba(220,230,255,0.55) 0%, rgba(160,180,230,0.25) 45%, rgba(255,255,255,0) 70%)",
    meadowBack:
      "radial-gradient(ellipse at 25% 100%, #211d36 0%, #1a1730 60%, transparent 80%), radial-gradient(ellipse at 75% 100%, #26213e 0%, #1e1a34 50%, transparent 75%), linear-gradient(to top, #1c1830 0%, rgba(28,24,48,0.4) 60%, transparent 100%)",
    meadowMid:
      "radial-gradient(circle at 15% 90%, rgba(60,50,110,0.5) 0%, transparent 40%), radial-gradient(circle at 45% 85%, rgba(100,90,160,0.35) 0%, transparent 45%), radial-gradient(circle at 80% 90%, rgba(70,50,100,0.45) 0%, transparent 40%), radial-gradient(circle at 60% 95%, rgba(120,100,140,0.3) 0%, transparent 35%), linear-gradient(to top, #120f20 0%, rgba(18,15,32,0.6) 50%, transparent 100%)",
    meadowFront:
      "radial-gradient(ellipse at 30% 100%, rgba(6,5,14,0.9) 0%, transparent 60%), radial-gradient(ellipse at 70% 100%, rgba(35,25,55,0.4) 0%, transparent 55%), linear-gradient(to top, #06050e 0%, rgba(6,5,14,0.3) 70%, transparent 100%)",
    petalColors: [
      "rgba(120, 110, 180, 0.45)",
      "rgba(90, 80, 150, 0.4)",
      "rgba(160, 150, 210, 0.5)",
      "rgba(200, 190, 230, 0.4)",
      "rgba(110, 100, 160, 0.45)",
    ],
    petalCount: 10,
    sparkleCount: 30,
    sparkleGlow: "0 0 14px #ffffff, 0 0 28px #cdd6ff",
  },
};
