// 공통 모달을 화면에 렌더링하는 UI 코드를 작성할 파일입니다.

import { clearChapterItems } from "../game/inventory.js";
import { renderChapter2 } from "../scenes/chapter2.js";
import { renderChapter3 } from "../scenes/chapter3.js";
import { renderEnding } from "../scenes/ending.js";
import { gameState } from "../state/gameState.js";
import { gameSave } from "../state/storage.js";

// 공통 모달 사용법
// 1. index.html에 <div id="next-Chapter"></div> 필요
// 2. 사용할 파일에서 openModal을 import
// 3. openModal(content)에 보여줄 HTML 문자열 전달
// 4. 닫기 버튼은 내부에서 closeModal()이 자동 연결됨

// 사용 예시
// import { openModal } from "./renderModal.js";
//
// openModal(`
//   <h2>힌트</h2>
//   <p>환자 기록지를 다시 확인해보자.</p>
// `);

const modal = document.querySelector("#modal");

export function openModal(content) {
  modal.innerHTML = `
    <div class="modal-overlay">
      <div
        class="modal-box"
        role="dialog"
        aria-modal="true"
      >
        <button
          class="modal-close"
          type="button"
          aria-label="닫기"
        >
          ×
        </button>

        <div class="modal-body">
          ${content}
        </div>
      </div>
    </div>
  `;

  modal.classList.add("is-open");

  modal.querySelector(".modal-close").addEventListener("click", closeModal);
}

export function closeModal() {
  modal.classList.remove("is-open");
  modal.innerHTML = "";
}

// 다음 챕터로 넘어가는 화면이 나오는 코드를 작성할 파일입니다.
// 함수 사용법
// 1. index.html에 import { nextChapterOption } from "../dom/renderModal.js"; 필요
// 2. index.html에 <div id="next-Chapter"></div> 필요
// 3. js파일에서 변수 2개를 선언해준다.
// 4. 마지막 아이템 활성화이후 팝업창 닫기 이후에 작동되도록 설정할 것

//예시 코드
//let total = items.filter(item => item.chapter === gameState[0].currentChapter).length;
//let count = 0;
// count 변수는 조사이벤트가 활성화 될때 마다 1씩 증가하게 할 것.
// total 변수는 한챕터당 아이템의 갯수
//
//nextChapterOption(count,total);

const chapterImages = {
  1: "./assets/images/backgrounds/nurse-room-entrance.png",
  2: "./assets/images/backgrounds/chief-room-entrance.png",
  3: "./assets/images/backgrounds/ending-entrance.png",
};

export function nextChapterModal(content, onNext = null) {
  const chapter = gameState.currentChapter;
  const imagePath = chapterImages[chapter];
  const nextChapter = document.querySelector("#next-Chapter");

  nextChapter.innerHTML = `
  <div class="next-modal-overlay">
    <div
      class="next-modal-box"
      role="dialog"
      aria-modal="true"
      style="background-image: url('${imagePath}')"
    >
      <button
        class="next-modal-close"
        type="button"
        aria-label="닫기"
      >
        ×
      </button>

      <div class="next-modal-body">
        ${content}
      </div>

      <button
        class="next-modal-next"
        type="button"
        aria-label="다음 챕터로 넘어가기"
      >
        다음 챕터로 이동
      </button>
    </div>
  </div>
`;
  nextChapter.classList.add("is-open");

  // 챕터 화면에 챕터 클리어 버튼 생성
  const scene = document.querySelector(".mainScreenChapterThree");
  let chapterButton = document.querySelector("#chapter-clear-button");

  if (!chapterButton && scene) {
    chapterButton = document.createElement("button");
    chapterButton.id = "chapter-clear-button";
    chapterButton.textContent = "챕터 클리어";
    chapterButton.type = "button";

    scene.appendChild(chapterButton);
  }

  // 버튼 클릭 시 챕터 클리어 모달 표시
  if (chapterButton && scene) {
    chapterButton.onclick = () => {
      nextChapterModal(
        `
          <h2 class="nextModalTitle">챕터 클리어</h2>
          <p class="nextModalText">다음 챕터로 이동하시겠습니까?</p>
        `,
        onNext,
      );
    };
  }

  nextChapter
    .querySelector(".next-modal-close")
    .addEventListener("click", nextCloseModal);

  nextChapter
    .querySelector(".next-modal-next")
    .addEventListener("click", () => {
      nextCloseModal();

      if (typeof onNext === "function") {
        onNext();
      }
    });
}

function nextCloseModal() {
  const nextChapter = document.querySelector("#next-Chapter");

  if (!nextChapter) {
    console.error("모달 요소 #next-Chapter를 찾을 수 없습니다.");
    return;
  }

  nextChapter.classList.remove("is-open");
  nextChapter.innerHTML = "";
}

export function nextChapterOption(checkedItem, stageItem, onNext = null) {
  // stageItem : 이번스테이지에서 획득해야할 아이템수
  // checkedItem : 확인한 아이템 수 // 조사이벤트 활성화마다 1씩 증가하도록 설정해주세요
  if (checkedItem !== stageItem) {
    return;
  }
  nextChapterModal(
    `
      <h2 class="nextModalTitle">챕터 클리어</h2>
      <p class="nextModalText">다음 챕터로 이동하시겠습니까?</p>
    `,
    onNext,
  );
}

// total : 이번스테이지에서 획득해야할 아이템수
// count : 확인한 아이템 수 조사이벤트 활성화마다 1씩 증가하도록 설정해주세요
export function checkChapterClear(count, total) {
  // 모든 아이템을 조사하지 않았다면 종료
  if (count !== total) return;

  setTimeout(() => {
    const moveToNextChapter = () => {
      clearChapterItems();

      if (gameState.currentChapter === 1) {
        renderChapter2();
      } else if (gameState.currentChapter === 2) {
        renderChapter3();
      } else if (gameState.currentChapter === 3) {
        renderEnding();
      }
      gameSave();
    };

    nextChapterOption(count, total, moveToNextChapter);
  }, 2000);
}

// Chapter2에서 Chapter3로 넘어가는 모달이 뜨는 함수
export function showNextChapterButton() {
  const chapter = document.querySelector(".chapter2");

  if (!chapter) return;
  if (document.querySelector("#chapter-clear-button")) return;

  const button = document.createElement("button");

  button.id = "chapter-clear-button";
  button.type = "button";
  button.textContent = "원장실로 이동";

  chapter.appendChild(button);

  button.addEventListener("click", () => {
    nextChapterModal(
      `
        <h2 class="nextModalTitle">챕터 클리어</h2>
        <p class="nextModalText">원장실로 이동하시겠습니까?</p>
      `,
      () => {
        gameState.currentScene = "chapter3";
        gameState.currentChapter = 3;

        gameSave();

        renderChapter3();
        renderInventory();
      },
    );
  });
}
