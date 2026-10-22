import { openModal, closeModal } from "../dom/renderModal.js";

export function openMenu() {
  openModal(`
    <div class="menu-content">
      <h2>MENU</h2>

      <button type="button" class="menu-continue">계속하기</button>
      <button type="button" class="menu-restart">처음부터 다시하기</button>
      <button type="button" class="menu-title">타이틀로 돌아가기</button>
      <button type="button" class="menu-bgm">BGM ON</button>
      <button type="button" class="menu-sfx">효과음 ON</button>
    </div>
  `);

  document
    .querySelector(".menu-continue")
    .addEventListener("click", closeModal);
}