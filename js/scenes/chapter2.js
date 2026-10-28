// 챕터 2에서만 사용하는 진행 코드를 작성할 파일입니다.

import {
  addItem,
  hasItem,
  addMultipleItems,
  clearChapterItems,
  openInventoryItems,
} from "../game/inventory.js";
import { getNode } from "../../lib/dom/getNode.js";
import { gameState } from "../state/gameState.js";
import { initDialogue } from "../game/dialogue.js";
import { investigate } from "../game/investigation.js";
import { renderInventory } from "../dom/renderInventory.js";
import { callPuzzle } from "../game/puzzle.js";
import { initHint } from "../game/hint.js";

const nurseRoomDialogues = [
  {
    name: "주인공",
    text: "여기는 곳곳에 많은 정보가 있는 것 같아.",
  },
  {
    name: "주인공",
    text: "정보들을 모두 찾아서 맞춰보자.",
  },
];

/**
 * TODO: CH2 화면을 생성합니다.
 */
export function renderChapter2() {
  gameState.currentChapter = 2;

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
           id="board" 
           aria-label="야간 근무 일지"
          >
          </button>
          <button
           type="button" 
           class="investigationButtons" 
           id="desk" 
           aria-label="약품 관리 대장"
          >
          </button>
          <button
           type="button" 
           class="investigationButtons" 
           id="books" 
           aria-label="약물 정보 책들"
          >
          </button>
          <button
           type="button" 
           class="investigationButtons" 
           id="cellphone" 
           aria-label="간호사의 녹음 기록"
          >
          </button>
          <button
           type="button" 
           class="investigationButtons is-hidden" 
           id="drawer2" 
           aria-label="원장실 열쇠"
          >
          </button>
          <button type="button" class="investigationButtons" id="sink"></button>
          <button type="button" class="investigationButtons" id="noticeboard"></button>
          <button type="button" class="investigationButtons" id="shelf"></button>

          <div id="dialogueContainer"></div>
          <div id="next-Chapter"></div>
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

  // 기본 셋팅
  clearChapterItems();
  initDialogue(nurseRoomDialogues);

  openInventoryItems();
  setupInvestigation();

  initHint();
}

export function setupInvestigation() {
  const investigationButtons = [
    // 인벤토리에 아이템이 들어오는 조사버튼
    getNode("#board"), // night-duty-log
    getNode("#desk"), // medicine-log
    getNode("#books"), // m04-book...
    getNode("#cellphone"), // nurse-recording
    getNode("#drawer2"), // director-key
    // 다음 버튼들은 아이템이 들어오지 않는 조사버튼입니다
    getNode("#sink"),
    getNode("#noticeboard"),
    getNode("#shelf"),
  ];

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

      // 2. 특정 오브젝트를 플레이어가 조사했을 때 그 결과를 처리하고 상태를 업데이트하는 함수
      const result = investigate(clickedId);
      if (!result) return;

      const dialogues = Array.isArray(result.text)
        ? result.text.map((text) => ({
            name: "주인공",
            text,
          }))
        : [
            {
              name: "주인공",
              text: result.text,
            },
          ];

      // 3. 조사 문구를 대화창에 출력
      initDialogue(dialogues);

      // 4. 조사한 오브젝트에 연결된 itemId값이 null이 아니라면 인벤토리에 아이템 추가
      setTimeout(() => {
        chapter2_items(objectId, result);
      }, 2000);

      // 5. 퍼즐이 들어간 버튼이라면, 2초 뒤 퍼즐 실행
      const hasDirectorKey = hasItem("director-key");
      if (clickedId === "drawer2") {
        setTimeout(() => {
          callPuzzle("930", "director-key");
        }, 2000);
      }
    });
  });
}

// 클릭한 조사 버튼에 알맞는 아이템을 설정해주는 함수
function chapter2_items(objectId, result) {
  if (objectId === "books") {
    const medicine_books = [
      "m04-book",
      "amiorillia-book",
      "anovaxanol-book",
      "co-proxin-book",
    ];

    addMultipleItems(medicine_books);
    renderInventory();
    updateButtonVisibility();
    return;
  }

  if (result.itemId !== null && result.itemId !== "director-key") {
    addItem(result.itemId);
    renderInventory();
    updateButtonVisibility();
  }
}

// 단서를 다 찾아야만 퍼즐조사 버튼이 뜨게 하는 함수
function updateButtonVisibility() {
  const drawerButton = getNode("#drawer2");
  if (!drawerButton) return;

  const hasNightDutyLog = hasItem("night-duty-log");
  const hasMedicineLog = hasItem("medicine-log");
  const hasM04Book = hasItem("m04-book");
  const hasAmiorilliaBook = hasItem("amiorillia-book");
  const hasAnovaxanolBook = hasItem("anovaxanol-book");
  const hasCoProxinBook = hasItem("co-proxin-book");
  const hasNurseRecording = hasItem("nurse-recording");

  if (
    hasNightDutyLog &&
    hasMedicineLog &&
    hasM04Book &&
    hasAmiorilliaBook &&
    hasAnovaxanolBook &&
    hasCoProxinBook &&
    hasNurseRecording
  ) {
    drawerButton.classList.remove("is-hidden");
  } else return;
}
