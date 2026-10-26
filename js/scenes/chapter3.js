
import { items } from "../data/items.js";
import { renderInventory } from "../dom/renderInventory.js";
import { initDialogue } from "../game/index.js";
import { addItem, clearChapterItems } from "../game/inventory.js";
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
// clearChapterItems(); 화면 에러가 나서 주석처리 했습니다..😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭
export function DisplayChapter3() {

  const scene = document.querySelector("#scene3");

  scene.innerHTML = ` 
    <div class="mainScreenChapterThree">
      <button class="investigate-button search-shelf"></button>
      
      <button class="investigate-button search-cabinet"></button>
      
      <button class="investigate-button search-portrait"></button>
      
      <button class="investigate-button search-desk"></button>
      
      <button class="investigate-button search-door"></button>
      
      <div id="dialogueContainer"></div>
    
    </div>
  `;

  // HTML 생성 후 대화창 초기화
  initDialogue(chiefRoomDialogues);


  const investigateButtons = scene.querySelectorAll(".investigate-button");
  //console.log("조사 버튼 개수:", investigateButtons.length);

  const chapter3Items = items.filter(item => item.chapter === 3);
  let i=0;
  investigateButtons.forEach((button) => {

    // 각 버튼에 대해 반복 실행할 코드
    button.dataset.id=chapter3Items[i].id;

    i++;
  });

  investigateButtons.forEach((button) => {
    const objectId = button.dataset.id;
    

    if (gameState.checkedObjects.includes(objectId)) {
      button.classList.add("is-checked");
    }
  });


  investigateButtons.forEach((button) =>{
    button.addEventListener("click", () => {
      const objectId = button.dataset.id;
      const result = investigate(objectId);

      
      addItem(objectId);
      renderInventory();

      
      if (!result) return;
      
      button.classList.add("is-checked");

      // 처음 조사한 경우에만 상태 변경
      if (!result.alreadyChecked) {

        //필수 조사 완료 여부 확인
        //const isComplete = isChapterChecked(chapterNumber);

        //console.log("CH${chapterNumber} 필수 조사 완료:", isComplete);
        //clearChapterItems()
        // TODO: 자동 저장
        //saveGame();
      }    
    });
  })

}



/* let total = items.filter(item => item.chapter === gameState[0].currentChapter).length;
let count = 0;
// count 변수는 조사이벤트가 활성화 될때 마다 1씩 증가하게 할 것.
// total은 한챕터당 아이템의 갯수

nextChapterOption(3,total); */