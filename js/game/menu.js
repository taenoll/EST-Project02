import { openModal, closeModal } from "../dom/renderModal.js";
import { toggleBgm, toggleSfx } from "./audio.js";

import { gameState } from "../state/gameState.js";
import { gameSave } from "../state/storage.js";

import { items } from "../data/items.js";
import { objects } from "../data/objects.js";

import { renderInventory } from "../dom/renderInventory.js";
import { renderTitle } from "../scenes/title.js";
import { renderChapter1 } from "../scenes/chapter1.js";
import { renderChapter2 } from "../scenes/chapter2.js";
import { DisplayChapter3 } from "../scenes/chapter3.js";


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
        챕터 다시 시작
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
  const restartButton = document.querySelector(".menu-restart");
  const titleButton = document.querySelector(".menu-title");

  const bgmButton = document.querySelector(".menu-bgm");
  const sfxButton = document.querySelector(".menu-sfx");


  // 계속하기
  continueButton.addEventListener("click", closeModal);


  // 챕터 다시 시작
  restartButton.addEventListener("click", () => {
    restartCurrentChapter();
  });


  // 타이틀로 돌아가기
  titleButton.addEventListener("click", () => {
    closeModal();
    renderTitle();
  });


  // BGM
  bgmButton.addEventListener("click", () => {
    const isOn = toggleBgm();

    bgmButton.textContent = isOn ? "ON" : "OFF";
  });


  // 효과음
  sfxButton.addEventListener("click", () => {
    const isOn = toggleSfx();

    sfxButton.textContent = isOn ? "ON" : "OFF";
  });
}


/**
 * 현재 챕터의 진행 상황만 초기화
 */
function restartCurrentChapter() {
  const chapterNumber = gameState.currentChapter;

  const newInventory = [];
  const newCheckedObjects = [];


  // 현재 챕터에서 얻은 아이템만 제외
  for (const itemId of gameState.inventory) {
    let currentChapterItem = false;

    for (const item of items) {
      if (item.id === itemId && item.chapter === chapterNumber) {
        currentChapterItem = true;
      }
    }

    // 현재 챕터 아이템이 아니라면 유지
    if (!currentChapterItem) {
      newInventory.push(itemId);
    }
  }


  // 현재 챕터에서 조사한 오브젝트만 제외
  for (const objectId of gameState.checkedObjects) {
    let currentChapterObject = false;

    for (const object of objects) {
      if (
        object.id === objectId &&
        object.chapter === chapterNumber
      ) {
        currentChapterObject = true;
      }
    }

    // 현재 챕터 오브젝트가 아니라면 유지
    if (!currentChapterObject) {
      newCheckedObjects.push(objectId);
    }
  }


  gameState.inventory = newInventory;
  gameState.checkedObjects = newCheckedObjects;


  // 현재 챕터 힌트 초기화
  gameState.hintLevel[`chapter${chapterNumber}`] = 0;


  // 변경된 gameState를 다시 localStorage에 저장
  gameSave();

  closeModal();

  renderCurrentChapter();
}


/**
 * 현재 챕터 다시 렌더링
 */
function renderCurrentChapter() {
  if (gameState.currentScene === "chapter1") {
    renderChapter1();
  }

  if (gameState.currentScene === "chapter2") {
    renderChapter2();
  }

  if (gameState.currentScene === "chapter3") {
    DisplayChapter3();
  }

  renderInventory();
}