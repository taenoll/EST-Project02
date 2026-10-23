import { openModal, closeModal } from "../dom/renderModal.js";
import { toggleBgm, toggleSfx } from "./audio.js";
import { gameState } from "../state/gameState.js";

export function openMenu() { 
  openModal(`
    <div class="menu-content">
      <h2>MENU</h2>

      <button
        type="button"
        class="menu-button menu-continue"
      >
        계속하기
      </button>

      <button
        type="button"
        class="menu-button menu-restart"
      >
        처음부터 다시하기
      </button>

      <button
        type="button"
        class="menu-button menu-title"
      >
        타이틀로 돌아가기
      </button>

      <div class="menu-audio">
        <p class="menu-section-title">AUDIO</p>

        <div class="menu-setting">
          <span>BGM</span>

          <button
            type="button"
            class="audio-toggle menu-bgm"
          >
            ${gameState.audio.bgmOn ? "ON" : "OFF"}
          </button>
        </div>

        <div class="menu-setting">
          <span>효과음</span>

          <button
            type="button"
            class="audio-toggle menu-sfx"
          >
            ${gameState.audio.sfxOn ? "ON" : "OFF"}
          </button>
        </div>
      </div>
    </div>
  `);

  const continueButton = document.querySelector(".menu-continue");

  continueButton.addEventListener("click", closeModal);

  const bgmButton = document.querySelector(".menu-bgm");
  const sfxButton = document.querySelector(".menu-sfx");

  bgmButton.addEventListener("click", () => {
    const isOn = toggleBgm();

    bgmButton.textContent = isOn ? "ON" : "OFF";
  });

  sfxButton.addEventListener("click", () => {
    const isOn = toggleSfx();

    sfxButton.textContent = isOn ? "ON" : "OFF";
  });

  // TODO: 처음부터 다시하기 기능 연결
  // TODO: 타이틀로 돌아가기 기능 연결
}