// 챕터 1에서만 사용하는 화면과 진행 코드를 작성하는 파일입니다.

import { investigate, isChapterChecked, initDialogue, } from "../game/index.js";
import { addItem,hasItem,openInventoryItems } from "../game/inventory.js";
import { renderInventory } from "../dom/renderInventory.js";
import { gameState } from "../state/gameState.js";
import { callPuzzle } from "../game/puzzle.js";


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
            class="investigate-button investigate-medicine-cabinet"
            data-object-id="medicine-cabinet"
            aria-label="약 보관함 조사"
          >
            <img src="./assets/images/icons/icon-search.png" alt="" aria-hidden="true" />
          </button>

          <div id="dialogueContainer"></div>
        </section>
      </main>
      <aside class="inventory" aria-label="인벤토리">
        <!-- 상단 힌트 / 메뉴 -->
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

        <!-- 아이템 목록 -->
        <button type="button" class="inventory-prev" aria-label="이전 아이템">▲</button>

        <ul class="inventory-list"></ul>

        <button type="button" class="inventory-next" aria-label="다음 아이템">▼</button>
      </aside>
    </div>
  `;

  

  openInventoryItems();
  setupInvestigation();
  
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
 * 조사 버튼 클릭 시 실행되는 처리
 */
function handleInvestigation(button) {
  const objectId = button.dataset.objectId;

  const result = investigate(objectId);

  if (!result) return;

  button.classList.add("is-checked");

  const dialogues = Array.isArray(result.text)
  ? result.text.map((text) => ({
      name: "주인공",
      text: text,
    }))
  : [
      {
        name: "주인공",
        text: result.text,
      },
    ];

  

  if (objectId === "medicine-cabinet") {
    initDialogue(dialogues, () => {
      callPuzzle("404", () => {
        addItem("nurse-card");
        renderInventory();

        showNextChapterButton();
      });
    });
  } else {
    initDialogue(dialogues);
  }

  // 처음 조사한 경우에만 진행 상태 확인
  if (!result.alreadyChecked) {
  if (result.itemId) {
    addItem(result.itemId);
    renderInventory();
  }

  const isComplete = isChapterChecked(1);
  console.log("CH1 필수 조사 완료:", isComplete);


    // TODO: 필수 조사 + 퍼즐 완료 후 다음 챕터 연결
  }
}

function showNextChapterButton() {
  const chapter = document.querySelector(".chapter1");

  // 이미 버튼이 있으면 또 만들지 않게!!
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