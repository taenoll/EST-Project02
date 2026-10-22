import { openModal, closeModal } from "../dom/renderModal.js";

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
            ON
          </button>
        </div>

        <div class="menu-setting">
          <span>효과음</span>

          <button
            type="button"
            class="audio-toggle menu-sfx"
          >
            ON
          </button>
        </div>
      </div>
    </div>
  `);

  const continueButton = document.querySelector(".menu-continue");

  continueButton.addEventListener("click", closeModal);

  // TODO: 처음부터 다시하기 기능 연결
  // TODO: 타이틀로 돌아가기 기능 연결
  // TODO: BGM ON/OFF 기능 연결
  // TODO: 효과음 ON/OFF 기능 연결
}