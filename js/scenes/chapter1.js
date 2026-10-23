// 챕터 1에서만 사용하는 화면과 진행 코드를 작성하는 파일입니다.

import {
  investigate,
  isChapterChecked,
  initDialogue,
} from "../game/index.js";

import { gameState } from "../state/gameState.js";


/**
 * CH1 화면을 생성합니다.
 */
export function renderChapter1() {
  const scene = document.querySelector("#scene");

  scene.innerHTML = `
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

      <div id="dialogueContainer"></div>
    </section>
  `;

  setupInvestigation();
}


/**
 * CH1 조사 버튼의 상태와 클릭 이벤트를 연결합니다.
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
 * 조사 버튼 클릭 시 실행되는 처리입니다.
 */
function handleInvestigation(button) {
  const objectId = button.dataset.objectId;

  const result = investigate(objectId);

  if (!result) return;

  // 조사 완료 표시
  button.classList.add("is-checked");

  // 조사 문구를 대화창에 출력
  initDialogue([
    {
      name: "주인공",
      text: result.text,
    },
  ]);

  // 처음 조사한 경우에만 진행 상태 확인
  if (!result.alreadyChecked) {
    const isComplete = isChapterChecked(1);

    console.log("CH1 필수 조사 완료:", isComplete);

    // TODO: 아이템 획득 연결
    // if (result.itemId) {
    //   addItem(result.itemId);
    //   renderInventory();
    // }

    // TODO: 필수 조사 + 퍼즐 완료 후 다음 챕터 연결
  }
}