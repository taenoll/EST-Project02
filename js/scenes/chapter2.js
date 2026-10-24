// 챕터 2에서만 사용하는 진행 코드를 작성할 파일입니다.
import { getNode } from "../../lib/dom/getNode.js";
import { gameState } from "../state/gameState.js";
import { items } from "../data/items.js";
import { investigate } from "../game/investigation.js";
import { openModal } from "../dom/renderModal.js";

const investigationButtons = [
  /!--인벤토리에 아이템이 들어오는 조사버튼--/,
  getNode("#night-duty-log"),
  getNode("#medicine-log"),
  getNode("#m04-medication-log"),
  getNode("#nurse-recording"),
  getNode("#director-key"),
  /!--다음 버튼들은 아이템이 들어오지 않는 조사버튼입니다--/,
  getNode("#investigation_btn1"),
  getNode("#investigation_btn2"),
  getNode("#investigation_btn3"),
  getNode("#investigation_btn4"),
  getNode("#investigation_btn5"),
];

// TODO: CH2 화면을 생성합니다.

// investigationButtons 클릭 시, 모달창 띄움
investigationButtons.forEach((btn) => {
  if (!btn) return;

  btn.addEventListener("click", (e) => {
    const objectId = e.currentTarget.id; //

    const result = investigate(objectId);

    openModal(`//`);
  });
});

// TODO: item data에 있는 investigationButtons 클릭 시, 인벤토리에 아이템 들어옴

// TODO: 모든 investigationButtons 클릭 시, message & 다음챕터

// 이미 조사한 오브젝트라면 화면에 "조사 완료로 연하게" 표시
investigationButtons.forEach((button) => {
  const objectId = button.dataset.objectId;

  if (gameState.checkedObjects.includes(objectId)) {
    button.classList.add("is-checked");
  }
});
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
