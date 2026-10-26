
import { items } from "../data/items.js";
import { handleInventoryClick, inventoryClickButton, renderInventory } from "../dom/renderInventory.js";
import { nextChapterModal, nextChapterOption } from "../dom/renderModal.js";
import { initDialogue } from "../game/index.js";
import { addItem, clearChapterItems, openInventoryItems } from "../game/inventory.js";
import { investigate } from "../game/investigation.js";
import { gameState } from "../state/gameState.js";

//const chapterNumber = gameState.currentChapter;
const chapterNumber = 3;
// 챕터 3에서만 사용하는 진행 코드를 작성할 파일입니다.

const chiefRoomDialogues = [
  {
    name: "주인공",
    text: "여긴 다른 곳과는 다르게 깔끔하게 정돈되어있어."
  },

  {
    name: "주인공",
    text: "양지바른 곳으로 나가자"
  }
];

/**
 * CH3 화면을 생성합니다.
 */

export function DisplayChapter3() {
  const app = document.querySelector("#app");

  app.innerHTML = ` 
  <div class="inventory-layout">
    <main id="scene">
      <section class="mainScreenChapterThree chapter chapter1">

        <button class="investigate-button search-shelf"></button>
      
        <button class="investigate-button search-cabinet"></button>
      
        <button class="investigate-button search-portrait"></button>
      
        <button class="investigate-button search-desk"></button>
      
        <button class="investigate-button search-door"></button>
      
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
  //console.log("조사 버튼 개수:", investigateButtons.length);

  const chapter3Items = items.filter(item => item.chapter === 3);
  let i=0;
  investigateButtons.forEach((button) => {

    // 각 버튼에 대해 반복 실행할 코드
    button.dataset.id=chapter3Items[i].id;
    button.dataset.important=chapter3Items[i].important;

    i++;
  });


  investigateButtons.forEach((button) => {
    const objectId = button.dataset.id;

    if (gameState.checkedObjects.includes(objectId)) {
      button.classList.add("is-checked");
    }
  });

//클릭 이벤트 설정
  investigateButtons.forEach((button) =>{
    button.addEventListener("click", () => {
      const objectId = button.dataset.id;
      const result = investigate(objectId);
      
      //클릭시 아이템설명화면 시작
      openInventoryItems();
      //종료

      //클릭시 인벤토리에 아이템 추가 //시작
      addItem(objectId);
      renderInventory();
      //종료

      
      if (!result) return;
      
      //클릭한 버튼을 흐릿하게 만들기
      button.classList.add("is-checked");
      
      let total = chapter3Items.length;
      let count = gameState.inventory.length;

      // 처음 조사한 경우에만 상태 변경
      if (count === total) {
        //다음챕터로 넘어가기
        nextChapterOption(count,total);
      }
    });
  })
}



/* let total = items.filter(item => item.chapter === gameState[0].currentChapter).length;
let count = 0;
// count 변수는 조사이벤트가 활성화 될때 마다 1씩 증가하게 할 것.
// total은 한챕터당 아이템의 갯수

nextChapterOption(3,total); */