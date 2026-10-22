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

  modal
    .querySelector(".modal-close")
    .addEventListener("click", closeModal);
}

export function closeModal() {
  modal.classList.remove("is-open");
  modal.innerHTML = "";
}