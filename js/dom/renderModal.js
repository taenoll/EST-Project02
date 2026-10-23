// 공통 모달을 화면에 렌더링하는 UI 코드를 작성할 파일입니다.
// 공통 모달 사용법
// 1. index.html에 <div id="modal"></div> 필요
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
//nextChapterOption(3,total);

const nextChapter = document.querySelector("#next-Chapter");

const chapterImages = {
  1: "./assets/images/backgrounds/nurse-room-entrance.png",
  2: "./assets/images/backgrounds/chief-room-entrance.png",
  3: "./assets/images/backgrounds/ending-entrance.png",
};

export function nextChapterModal(content) {
  const chapter = gameState[0].currentChapter;
  const imagePat = chapterImages[chapter];

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

  nextChapter
    .querySelector(".next-modal-close")
    .addEventListener("click", nextCloseModal);
}

export function nextCloseModal() {
  nextChapter.classList.remove("is-open");
  nextChapter.innerHTML = "";
}

export function nextChapterOption(checkedItem, stageItem) {
  // stageItem : 이번스테이지에서 획득해야할 아이템수
  // checkedItem : 확인한 아이템 수 // 조사이벤트 활성화마다 1씩 증가하도록 설정해주세요
  if (checkedItem !== stageItem) {
    return;
  }

  nextChapterModal(`
    <h2>챕터 클리어</h2>
    <p>다음 챕터로 이동하시겠습니까?</p>
  `);
}
