// 챕터 2에서만 사용하는 진행 코드를 작성할 파일입니다.
import { getNode } from "../../lib/dom/getNode.js";
import { gameState } from "../state/gameState.js";
import { investigate, isChapterChecked } from "../game/investigation.js";
import { addItem } from "../game/inventory.js";
import { renderInventory } from "../dom/renderInventory.js";
import { callPuzzle } from "../game/puzzle.js";
import { nextChapterModal, openModal } from "../dom/renderModal.js";

/**
 * TODO: CH2 화면을 생성합니다.
 */
export function renderChapter2() {
  const scene = getNode("#sceneChapter2");

  scene.textContent = `
        <section class="chapter chapter2">
             <div id="dialogueContainer"></div>
        </section>
    `;

  setupInvestigation();
}

const investigationButtons = [
  /!--인벤토리에 아이템이 들어오는 조사버튼--/,
  getNode("#board1"), // night-duty-log
  getNode("#trashcan"), // medicine-log
  getNode("#desk"), // m04-medication-log
  getNode("#computer"), // nurse-recording
  getNode("#drawer1"), // director-key
  /!--다음 버튼들은 아이템이 들어오지 않는 조사버튼입니다--/,
  getNode("#sink"),
  getNode("#mirror"),
  getNode("#board2"),
  getNode("#chair"),
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

      // 해당 버튼을 "조사 완료"로 표시
      btn.classList.add("is-checked");

      // 특정 오브젝트를 플레이어가 조사했을 때 그 결과를 처리하고 상태를 업데이트하는 함수
      const result = investigate(clickedId);
      if (!result) return;

      // 조사 문구를 대화창에 출력
      initDialogue([
        {
          name: "주인공",
          text: result.text,
        },
      ]);

      // 조사한 오브젝트에 연결된 itemId 값이 null이 아니라면 인벤토리에 아이템 추가
      if (result.itemId) {
        addItem(result.itemId);
        renderInventory();
      }

      // 퍼즐이 들어간 버튼이라면, 퍼즐 실행
      /!--key director--/;
      if (clickedId === "drawer1") {
        callPuzzle("444");
      }

      // 모든 investigationButtons 클릭되었다면, 다음챕터
      if (isChapterChecked(2)) {
        let total = items.filter(
          (item) => item.chapter === gameState[0].currentChapter,
        ).length;
        let count = 0;
        nextChapterModal(5, total);
      }
    });
  });
}

// TODO: 대화창

`
<div class="investigation_btns">
    <button 
     class="investigationButtons" 
     id="board1" 
     aria-label="야간 근무 일지"
     >돋보기
     </button>

     <button 
     class="investigationButtons" 
     id="trashcan" 
     aria-label="약품 관리 대장"
     >돋보기
     </button>

     <button 
     class="investigationButtons" 
     id="desk" 
     aria-label="M-04 투약 기록"
     >돋보기
     </button>

     <button 
     class="investigationButtons" 
     id="computer" 
     aria-label="간호사의 녹음 기록"
     >돋보기
     </button>

     <button 
     class="investigationButtons" 
     id="drawer1" 
     aria-label="원장실 열쇠"
     >돋보기
     </button>

     <button class="investigationButtons" id="sink">돋보기</button>
     <button class="investigationButtons" id="mirror">돋보기</button>
     <button class="investigationButtons" id="board2">돋보기</button>
     <button class="investigationButtons" id="chair">돋보기</button>
     <button class="investigationButtons" id="drawer2">돋보기</button>
</div>
`;
