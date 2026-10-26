// 챕터 2에서만 사용하는 진행 코드를 작성할 파일입니다.
import { getNode } from "../../lib/dom/getNode.js";
import { gameState } from "../state/gameState.js";
import { investigate } from "../game/investigation.js";
import { addItem } from "../game/inventory.js";
import { renderInventory } from "../dom/renderInventory.js";

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

    btn.addEventListener("click", (e) => {
      const objectId = e.currentTarget.id; // ex. board1, desk, computer...

      // 클릭한 오브젝트에 해당하는 text를 모달창을 통해 보여주는 함수
      openObject(objectId);

      // 해당 버튼을 화면에 "조사 완료로 연하게" 표시
      btn.classList.add("is-checked");

      // 특정 오브젝트를 플레이어가 조사했을 때 그 결과를 처리하고 상태를 업데이트하는 함수
      const result = investigate(objectId);
      if (!result) return;

      // 조사한 오브젝트에 연결된 itemId가 존재하고, 값이 null이 아니라면 인벤토리에 아이템 추가
      if (result.itemId) {
        addItem(result.itemId);
        renderInventory();
      }

      // 모든 investigationButtons 클릭했다면, 다음챕터
    });
  });
}

// TODO: 대화창 & 퍼즐

`
<div class="investigation_btns">
    <button 
     class="investigationButtons" 
     id="night-duty-log" 
     aria-label="야간 근무 일지"
     >돋보기
     </button>

     <button 
     class="investigationButtons" 
     id="medicine-log" 
     aria-label="약품 관리 대장"
     >돋보기
     </button>

     <button 
     class="investigationButtons" 
     id="m04-medication-record" 
     aria-label="M-04 투약 기록"
     >돋보기
     </button>

     <button 
     class="investigationButtons" 
     id="nurse-recording" 
     aria-label="간호사의 녹음 기록"
     >돋보기
     </button>

     <button 
     class="investigationButtons" 
     id="director-key" 
     aria-label="원장실 열쇠"
     >돋보기
     </button>

     <button class="investigationButtons" id="investigation_btn1">돋보기</button>
     <button class="investigationButtons" id="investigation_btn2">돋보기</button>
     <button class="investigationButtons" id="investigation_btn3">돋보기</button>
     <button class="investigationButtons" id="investigation_btn4">돋보기</button>
     <button class="investigationButtons" id="investigation_btn5">돋보기</button>
</div>
`;
