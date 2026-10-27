import { items } from "../data/items.js";
import {
  handleInventoryClick,
  inventoryClickButton,
  renderInventory,
} from "../dom/renderInventory.js";
import { nextChapterModal, nextChapterOption } from "../dom/renderModal.js";
import { initDialogue } from "../game/index.js";
import {
  addItem,
  clearChapterItems,
  openInventoryItems,
} from "../game/inventory.js";
import { investigate } from "../game/investigation.js";
import { gameState } from "../state/gameState.js";
import { callPuzzle } from "../game/puzzle.js";
import { objects } from "../data/objects.js";

//const chapterNumber = gameState.currentChapter;
const chapterNumber = 3;
// 챕터 3에서만 사용하는 진행 코드를 작성할 파일입니다.

const chiefRoomDialogues = [
  {
    name: "주인공",
    text: "여긴 다른 곳과는 다르게 깔끔하게 정돈되어있어.",
  },

  {
    name: "주인공",
    text: "목적지에 다다른거 같아 서두르자 ...",
  },
];

/**
 * CH3 화면을 생성합니다.
 */

export function renderChapter3() {
  const app = document.querySelector("#app");

  app.innerHTML = ` 
  <div class="inventory-layout">
    <main id="scene">
      <section class="mainScreenChapterThree chapter chapter1">

        <button class="investigate-button search-desk"></button>
      
        <button class="investigate-button search-shelf"></button>
      
        <button class="investigate-button search-door"></button>
      
        <button class="investigate-button search-portrait"></button>
      
        <button class="investigate-button search-cabinet"></button>
      
        <div id="dialogueContainer"></div>
        
        <div id="next-Chapter"></div>

        <button type="button" id="hint_btn" ></button>

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
      <button type="button" class="inventory-prev" aria-label="이전 아이템">▲</button>

      <ul class="inventory-list"></ul>

      <button type="button" class="inventory-next" aria-label="다음 아이템">▼</button>
    </aside>  
  </div>
  `;

  renderInventory();

  clearChapterItems();

  // HTML 생성 후 대화창 초기화
  initDialogue(chiefRoomDialogues);

  const investigateButtons = scene.querySelectorAll(".investigate-button");

  const chapter3Items = items.filter((item) => item.chapter === 3);
  let i = 0;
  investigateButtons.forEach((button) => {
    // 각 버튼에 대해 반복 실행할 코드
    button.dataset.id = chapter3Items[i].id;
    button.dataset.important = chapter3Items[i].important;

    i++;
  });

  investigateButtons.forEach((button) => {
    const objectId = button.dataset.id;

    if (gameState.checkedObjects.includes(objectId)) {
      button.classList.add("is-checked");
    }
  });

  //클릭 이벤트 설정
  investigateButtons.forEach((button) => {
    button.addEventListener("click", () => {
      //변수선언
      const objectId = button.dataset.id;
      const result = investigate(objectId);
      let total = chapter3Items.length;
      let count = gameState.inventory.length + 1;

      //클릭시 아이템설명화면 시작
      openInventoryItems();

      //클릭시 인벤토리에 아이템 추가
      if (objectId === "restricted-area-card") {
        callPuzzle("179");
      }

      addItem(objectId);
      renderInventory();

      // 아이템 획득시 대화창
      const itemDialogues = [
        {
          name: "주인공",
          text: "",
        },
      ];

      // 클릭한 오브젝트 ID와 일치하는 데이터를 찾기
      const clickedObject = objects.find((object) => object.id === objectId);

      // 해당 오브젝트의 설명을 대사로 사용
      if (clickedObject) {
        itemDialogues[0].text = clickedObject.text;
        initDialogue(itemDialogues);
      } else {
        console.error("오브젝트를 찾을 수 없습니다:", objectId);
      }

      if (!result) return;

      //클릭한 버튼을 흐릿하게 만들기
      button.classList.add("is-checked");

      console.log(count);
      console.log(total);

      // 챕터종료여부 확인
      if (count === total) {
        console.log("pass");
        //다음챕터로 넘어가기
        nextChapterOption(count, total);
      }
    });
  });
}
