// 게임 화면의 공통 UI 이벤트를 연결할 파일입니다.

import { openMenu } from "../game/menu.js";

document.addEventListener("click", (event) => {
  const menuButton = event.target.closest(".inventory-menu");

  if (!menuButton) return;

  openMenu();
});