import { gameState } from "../state/gameState.js";

const bgm = new Audio("./assets/audio/bgm/main-bgm.mp3");

bgm.loop = true;
bgm.volume = 0.20;

// BGM 재생
export function playBgm() {
  if (!gameState.audio.bgmOn) return;

  bgm.play().catch((error) => {
    console.warn("BGM을 재생하지 못했습니다.", error);
  });
}

// BGM 일시정지
export function pauseBgm() {
  bgm.pause();
}

// BGM ON / OFF 변경
export function toggleBgm() {
  gameState.audio.bgmOn = !gameState.audio.bgmOn;

  if (gameState.audio.bgmOn) {
    playBgm();
  } else {
    pauseBgm();
  }

  return gameState.audio.bgmOn;
}

// 효과음 ON / OFF 상태만 변경
export function toggleSfx() {
  gameState.audio.sfxOn = !gameState.audio.sfxOn;

  return gameState.audio.sfxOn;
}

// 효과음 재생
export function playSfx(src) {
  if (!gameState.audio.sfxOn) return;

  const sound = new Audio(src);
  sound.volume = 0.7;

  sound.play().catch((error) => {
    console.warn("효과음을 재생하지 못했습니다.", error);
  });
}