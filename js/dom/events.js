// 게임 화면의 공통 UI 이벤트를 연결할 파일입니다.

import { openMenu } from "../game/menu.js";
import { playBgm } from "../game/audio.js";

document.addEventListener("click", (event) => {
  const menuButton = event.target.closest(".inventory-menu");

  if (!menuButton) return;

  openMenu();
});

// 새로하기 이어하기 누를 시 바로 bgm 시작되도록
document.addEventListener("click", (event) => {
  const gameButton = event.target.closest(
    ".game-start-btn, .continue-btn",
  );

  if (!gameButton) return;

  playBgm();
});