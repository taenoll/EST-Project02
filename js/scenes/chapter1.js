// 챕터 1에서만 사용하는 화면과 진행 코드를 작성하는 파일입니다. 정리 완료했습니다.

import { investigate, initDialogue } from "../game/index.js";
import { addItem, hasItem, openInventoryItems, } from "../game/inventory.js";
import { renderInventory } from "../dom/renderInventory.js";
import { gameState } from "../state/gameState.js";
import { gameSave } from "../state/storage.js";
import { initHint } from "../game/hint.js";
import { callPuzzle } from "../game/puzzle.js";
import { renderChapter2 } from "./chapter2.js";

// 챕터 오프닝 대사
const chapter1Dialogues = [
  {
    name: "주인공",
    text: "여긴... 어디지?",
  },
  {
    name: "주인공",
    text: "분명 뭔가 있었던 것 같은데, 아무것도 기억나지 않아.",
  },
  {
    name: "주인공",
    text: "일단 이 방부터 살펴보자.",
  },
];

/**
 * CH1 화면을 생성.
 */
export function renderChapter1() {
  const app = document.querySelector("#app");

  app.innerHTML = `
    <div class="inventory-layout">
      <main id="scene">
        <section class="chapter chapter1">
          <div class="chapter-title">
            <span>CHAPTER 01</span>
            <h1>낯선 병실</h1>
          </div>

          <button
            type="button"
            class="investigate-button investigate-bed"
            data-object-id="bed"
            aria-label="침대 조사"
          >
            <img src="./assets/images/icons/icon-search.png" alt="" aria-hidden="true" />
          </button>

          <button
            type="button"
            class="investigate-button investigate-clock"
            data-object-id="clock"
            aria-label="벽시계 조사"
          >
            <img src="./assets/images/icons/icon-search.png" alt="" aria-hidden="true" />
          </button>

          <button
            type="button"
            class="investigate-button investigate-window"
            data-object-id="window"
            aria-label="창문 조사"
          >
            <img src="./assets/images/icons/icon-search.png" alt="" aria-hidden="true" />
          </button>

          <button
            type="button"
            class="investigate-button investigate-drawer"
            data-object-id="drawer"
            aria-label="서랍장 조사"
          >
            <img src="./assets/images/icons/icon-search.png" alt="" aria-hidden="true" />
          </button>

          <button
            type="button"
            class="investigate-button investigate-chart"
            data-object-id="chart"
            aria-label="환자 차트 조사"
          >
            <img src="./assets/images/icons/icon-search.png" alt="" aria-hidden="true" />
          </button>

          <button
            type="button"
            class="investigate-button investigate-door"
            data-object-id="door"
            aria-label="출입문 조사"
          >
            <img src="./assets/images/icons/icon-search.png" alt="" aria-hidden="true" />
          </button>

          <button
            type="button"
            class="investigate-button investigate-medicine-cabinet is-hidden"
            data-object-id="medicine-cabinet"
            aria-label="약 보관함 조사"
          >
            <img src="./assets/images/icons/icon-search.png" alt="" aria-hidden="true" />
          </button>

          <div id="dialogueContainer"></div>
        </section>
      </main>

      <aside class="inventory" aria-label="인벤토리">
        <div class="inventory-header">
          <button type="button" id="hint_btn" class="inventory-hint">
            <span class="inventory-header-icon" aria-hidden="true">☼</span>
            <span>힌트</span>
          </button>

          <button type="button" class="inventory-menu">
            <span class="inventory-header-icon" aria-hidden="true">☰</span>
            <span>메뉴</span>
          </button>
        </div>

        <button
          type="button"
          class="inventory-prev"
          aria-label="이전 아이템"
        >
          ▲
        </button>

        <ul class="inventory-list"></ul>

        <button
          type="button"
          class="inventory-next"
          aria-label="다음 아이템"
        >
          ▼
        </button>
      </aside>
    </div>
  `;

  openInventoryItems();

  if (gameState.introSeen.chapter1) {
    setupInvestigation();
    updateMedicineCabinetVisibility();
  } else {
    initDialogue(chapter1Dialogues, () => {
      gameState.introSeen.chapter1 = true;
      gameSave();

      setupInvestigation();
      updateMedicineCabinetVisibility();
    });
  }

  // 이미 퍼즐 풀어서 가지고 있으면 안 나오도록
  if (hasItem("nurse-card")) {
    showNextChapterButton();
  }

}

/**
 * CH1 조사 버튼의 상태와 클릭 이벤트를 연결.
 */
function setupInvestigation() {
  const investigateButtons =
    document.querySelectorAll(".investigate-button");

  investigateButtons.forEach((button) => {
    const objectId = button.dataset.objectId;

    // 이미 조사했던 오브젝트라면 흐리게 표시
    if (gameState.checkedObjects.includes(objectId)) {
      button.classList.add("is-checked");
    }

    button.addEventListener("click", () => {
      handleInvestigation(button);
    });
  });
}

/**
 * 조사 버튼 클릭 시 실행.
 */
function handleInvestigation(button) {
  const objectId = button.dataset.objectId;
  const result = investigate(objectId);

  if (!result) return;

  button.classList.add("is-checked");

  const dialogues = Array.isArray(result.text) ? result.text.map((text) => (
      {
        name: "주인공",
        text,
      }))
    : [
        {
          name: "주인공",
          text: result.text,
        },
      ];

  // 약 보관함은 대화 종료 후 퍼즐 실행
  if (objectId === "medicine-cabinet") {
    initDialogue(dialogues, () => {
      callPuzzle("404", "nurse-card", () => {
        showNextChapterButton();
      });
    });

    return;
  }

  initDialogue(dialogues);

  // 처음 조사했을 때만 아이템 획득
  if (!result.alreadyChecked && result.itemId) {
    addItem(result.itemId);
    renderInventory();
  }

  updateMedicineCabinetVisibility();
}

/**
 * CH2 이동 버튼 생성.
 */
function showNextChapterButton() {
  const chapter = document.querySelector(".chapter1");

  // 이미 버튼이 있다면 중복 생성하지 않음
  if (document.querySelector("#chapter-clear-button")) return;

  const nextButton = document.createElement("button");

  nextButton.id = "chapter-clear-button";
  nextButton.type = "button";
  nextButton.textContent = "간호사실로 이동";

  chapter.appendChild(nextButton);

  nextButton.addEventListener("click", () => {
    gameState.currentScene = "chapter2";
    gameState.currentChapter = 2;

    gameSave();

    renderChapter2();
    renderInventory();
  });
}

/**
 * 단서를 다 찾아야만 조사 버튼이 뜨게 함
 */
function updateMedicineCabinetVisibility() {
  const cabinetButton = document.querySelector(
    ".investigate-medicine-cabinet",
  );

  if (!cabinetButton) return;

  const hasPatientRecord = hasItem("patient-record");
  const hasWarningMemo = hasItem("warning-memo");

  const checkedClock =
    gameState.checkedObjects.includes("clock");

  const checkedChart =
    gameState.checkedObjects.includes("chart");

  if ( hasPatientRecord && hasWarningMemo && checkedClock && checkedChart ) {
    cabinetButton.classList.remove("is-hidden");
  }
}