// 챕터 2에서만 사용하는 진행 코드를 작성할 파일입니다.
import { getNode } from "../../lib/dom/getNode.js";
import { gameState } from "../state/gameState.js";
import { initDialogue } from "../game/dialogue.js";
import { addItem, clearChapterItems } from "../game/inventory.js";
import { investigate, isChapterChecked } from "../game/investigation.js";
import { renderInventory } from "../dom/renderInventory.js";
import { callPuzzle } from "../game/puzzle.js";
import { nextChapterModal } from "../dom/renderModal.js";

const nurseRoomDialogues = [
  {
    name: "주인공",
    text: "여긴 다른 곳과는 다르게 깔끔하게 정돈되어있어.",
  },
  {
    name: "주인공",
    text: "양지바른 곳으로 나가자",
  },
];
gameState.currentChapter = 2;
let count = 0;

/**
 * TODO: CH2 화면을 생성합니다.
 */
export function renderChapter2() {
  // 기본 셋팅
  clearChapterItems();
  initDialogue(nurseRoomDialogues);

  const app = getNode("#app");
  app.innerHTML = `
    <div class="inventory-layout">
      <main id="scene">
        <section class="chapter chapter2">
          <div class="chapter-title">
            <span>CHAPTER 02</span>
            <h1>간호사실</h1>
          </div>

          <button 
           type="button"
           class="investigationButtons" 
           id="board1" 
           aria-label="야간 근무 일지"
          >
          </button>
          <button
           type="button" 
           class="investigationButtons" 
           id="trashcan" 
           aria-label="약품 관리 대장"
          >
          </button>
          <button
           type="button" 
           class="investigationButtons" 
           id="desk" 
           aria-label="M-04 투약 기록"
          >
          </button>
          <button
           type="button" 
           class="investigationButtons" 
           id="computer" 
           aria-label="간호사의 녹음 기록"
          >
          </button>
          <button
           type="button" 
           class="investigationButtons" 
           id="drawer1" 
           aria-label="원장실 열쇠"
          >
          </button>
          <button type="button" class="investigationButtons" id="sink"></button>
          <button type="button" class="investigationButtons" id="board2"></button>
          <button type="button" class="investigationButtons" id="drawer2"></button>

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

  setupInvestigation();
}

gameState.currentChapter = 2;

const investigationButtons = [
  /!--인벤토리에 아이템이 들어오는 조사버튼--/,
  getNode("#board1"), // night-duty-log
  getNode("#trashcan"), // medicine-log
  getNode("#desk"), // m04-medication-log
  getNode("#computer"), // nurse-recording
  getNode("#drawer1"), // director-key
  /!--다음 버튼들은 아이템이 들어오지 않는 조사버튼입니다--/,
  getNode("#sink"),
  getNode("#board2"),
  getNode("#drawer2"),
];

export function setupInvestigation() {
  investigationButtons.forEach((btn) => {
    if (!btn) return;
    // 페이지 로드 시 이미 조사된 항목이라면 표시 유지
    const objectId = btn.id;
    if (gameState.checkedObjects.includes(objectId)) {
      btn.classList.add("is-checked");
    }

    btn.addEventListener("click", (e) => {
      const clickedId = e.currentTarget.id; // ex. board1, desk, computer...

      // 1. 해당 버튼을 "조사 완료"로 표시
      btn.classList.add("is-checked");
      count++;

      // 2. 특정 오브젝트를 플레이어가 조사했을 때 그 결과를 처리하고 상태를 업데이트하는 함수
      const result = investigate(clickedId);
      if (!result) return;

      // 3. 조사 문구를 대화창에 출력
      initDialogue([
        {
          name: "주인공",
          text: result.text,
        },
      ]);

      // 4. 조사한 오브젝트에 연결된 itemId 값이 null이 아니라면 인벤토리에 아이템 추가
      if (result.itemId) {
        addItem(result.itemId);
        renderInventory();
      }

      // 5. 퍼즐이 들어간 버튼이라면, 퍼즐 실행
      /!--key director--/;
      if (clickedId === "drawer1") {
        callPuzzle("930");
      }

      // 6. 모든 investigationButtons 클릭되었는지 확인 후, 되었다면 다음챕터
      if (isChapterChecked(2)) {
        console.log("CH2 필수 조사 완료:");
        nextChapterModal(`
            <h2>챕터 클리어</h2>
            <p>다음 챕터로 이동하시겠습니까?</p>
        `);
      }
    });
  });
}
