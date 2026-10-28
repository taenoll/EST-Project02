
import { items } from '../data/items.js';
import {
  handleInventoryClick,
  inventoryClickButton,
  renderInventory,
} from '../dom/renderInventory.js';
import { checkChapterClear, nextChapterModal, nextChapterOption } from '../dom/renderModal.js';
import { initDialogue } from '../game/index.js';
import {
  addItem,
  clearChapterItems,
  openInventoryItems,
} from '../game/inventory.js';
import { investigate } from '../game/investigation.js';
import { gameState } from '../state/gameState.js';
import { callPuzzle } from '../game/puzzle.js';
import { objects } from '../data/objects.js';
import { gameSave } from '../state/storage.js';
import { renderEnding } from './ending.js';
import { initHint } from '../game/hint.js';
import { getNode } from '../../lib/dom/getNode.js';


// 챕터 3에서만 사용하는 진행 코드를 작성할 파일입니다.

const chiefRoomDialogues = [
  {
    name: '주인공',
    text: '여긴 다른 곳과는 다르게 깔끔하게 정돈되어있어.',
  },

  {
    name: '주인공',
    text: '목적지에 다다른거 같아 서두르자 ...',
  },
];

/**
 * CH3 화면을 생성합니다.
 */

export function renderChapter3() {
  const app = document.querySelector('#app');

    //챕터번호 변경 및 저장
  gameState.currentChapter = 3;


  app.innerHTML = ` 
  <div class="inventory-layout">
    <main id="scene">
      <section class="mainScreenChapterThree chapter chapter1">

        <div class="chapter-title">
          <span>CHAPTER 03</span>
          <h1>원장실</h1>
        </div>

        <button class="investigateIcon search-desk"></button>
      
        <button class="investigateIcon search-shelf"></button>
      
        <button class="investigateIcon search-door"></button>
      
        <button class="investigateIcon search-portrait"></button>
      
        <button class="investigateIcon search-cabinet"></button>
      
        <div id="dialogueContainer"></div>
        
        <div id="next-Chapter"></div>

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

  //아이템창 초기화
  //renderInventory();

  clearChapterItems();

  // HTML 생성 후 대화창 초기화
  initDialogue(chiefRoomDialogues);

  chapterInvestigation();

  const hint_btn = getNode('#hint_btn');
  hint_btn.addEventListener('click', initHint);
}

export function chapterInvestigation() {
  const scene = document.querySelector("#scene");
  const investigateButtons = scene.querySelectorAll('.investigateIcon');
  const chapter3Items = items.filter((item) => item.chapter === 3);
  let i = 0;
  const getCount = () => {
    return chapter3Items.filter((item) =>
      gameState.checkedObjects.includes(item.id)
    ).length;
  };
  const total = chapter3Items.length;
    

  investigateButtons.forEach((button) => {
    // 각 버튼에 대해 반복 실행할 코드
    button.dataset.id = chapter3Items[i].id;
    button.dataset.important = chapter3Items[i].important;

    i++;
  });

  investigateButtons.forEach((button) => {
    const objectId = button.dataset.id;

    if (gameState.checkedObjects.includes(objectId)) {
      button.classList.add('is-checked');
    }
  });

  //클릭 이벤트 설정
  investigateButtons.forEach((button) => {
    button.addEventListener('click', () => {
      //변수선언
      const objectId = button.dataset.id;
      const result = investigate(objectId);
      let classify=false
      
      //클릭시 아이템설명화면 시작
      openInventoryItems();

      
      //클릭한 버튼을 흐릿하게 만들기
      button.classList.add('is-checked');

      if (objectId === 'restricted-area-card') {
        callPuzzle('179', 'restricted-area-card');

  // 퍼즐 정답 여부 감시
        const checkPuzzleInterval = setInterval(() => {
        const answerMessage = document.querySelector('#answer_message');
        let isChapter3PuzzleCompleted = false;


          if (answerMessage?.textContent === '정답입니다') {
            clearInterval(checkPuzzleInterval);

            isChapter3PuzzleCompleted = true;
            gameSave();

            const count = getCount();


            checkChapterClear(count, total);
          }

          // 퍼즐 모달이 닫히면 감시 종료
          if (!document.querySelector('#answer_message')) {
            clearInterval(checkPuzzleInterval);
          }
        }, 1000);

        return;
      }

      addItem(objectId);
      renderInventory();
      gameSave();

      // 아이템 획득시 대화창
      const itemDialogues = [
        {
          name: '주인공',
          text: '',
        },
      ];

      // 클릭한 오브젝트 ID와 일치하는 데이터를 찾기
      const clickedObject = objects.find((object) => object.id === objectId);

      // 해당 오브젝트의 설명을 대사로 사용
      if (clickedObject) {
        itemDialogues[0].text = clickedObject.text;
        initDialogue(itemDialogues);
      } else {
        console.error('오브젝트를 찾을 수 없습니다:', objectId);
      }

      //갯수를 파악하기위한 선언
      const count = getCount();

      if(count === total){
        checkChapterClear(count, total);
      }

    });
  });
}
