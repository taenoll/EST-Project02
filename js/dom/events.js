// 게임 화면의 공통 UI 이벤트를 연결할 파일입니다.

import { openMenu } from "../game/menu.js";

const menuButton = document.querySelector(".menu-button");

menuButton.addEventListener("click", openMenu);