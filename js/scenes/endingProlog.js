
import { renderEnding } from "./ending.js";

// 엔딩 프롤로그 화면
export function renderEndingProlog() {
  const app = document.querySelector("#app");

  app.innerHTML = `
    <main class="ending-prolog-screen">
      <div class="ending-prolog-layout">
        <h1 class="ending-prolog-title">ENDING</h1>
        <div class="ending-prolog-content">

          <div class="ending-prolog-story">

            <p>
              마침내 모든 진실을 마주한 당신.<br>
              이제야 이 병원의 진짜 모습을 깨닫게 됩니다.
            </p>

            <p>
              양지정신병원은 환자를 치료하는 곳이 아니었습니다.<br>
              그곳은 인간의 기억을 지우고 진실을 은폐하기 위해
              만들어진 거대한 인체 실험장이었습니다.
            </p>

            <p>
              매달 마지막 날.<br>
              병원에서는 환자들을 대상으로
              불법 임상실험이 자행되고 있었습니다.
            </p>

            <p>
              그리고 그날, 누군가가 그 현장을 목격했습니다.
            </p>

            <p>
              하지만 목격자는 곧 발각되었고,<br>
              모든 기억을 강제로 지워진 채
              404호 병실에 갇히게 되었습니다.
            </p>

            <p>
              간호사실에서 발견한 약물 기록 M04.<br>
              의문의 통화 녹취.<br>
              그리고 9월 30일을 가리키는 숫자 930.
            </p>

            <p>
              우연이라고 생각했던 모든 단서는
              하나의 진실을 가리키고 있었습니다.
            </p>

            <p>
              잃어버린 기억을 되찾을수록
              당신은 점점 이상한 사실을 깨닫게 됩니다.
            </p>

            <p>
              왜 자신은 404호 병실에서 눈을 떴는지.<br>
              왜 이 병원의 모든 흔적이
              자신의 잃어버린 기억과 연결되어 있는지.
            </p>

            <p>
              마침내 흩어진 기억의 조각들이
              하나의 장면으로 이어집니다.
            </p>

            <p>
              그날, 모든 것을 지켜본 사람.<br>
              병원이 끝까지 감추려 했던 단 한 사람.
            </p>

            <p>
              이제 당신은 그 목격자가 누구인지 알게 됩니다.
            </p>

          </div>

        </div>

      </div>

      <!-- 스크롤 완료 후 표시되는 버튼 -->
      <button type="button" class="ending-prolog-next" hidden>
        엔딩
      </button>

    </main>
  `;

  // 필요한 요소 선택
  const story = document.querySelector(".ending-prolog-story");
  const nextButton = document.querySelector(".ending-prolog-next");

  let isFinished = false;

  // 스토리 스크롤 감지
  story.addEventListener("scroll", () => {

    // 이미 끝까지 읽었다면 다시 실행하지 않기
    if (isFinished) return;

    // 스크롤을 맨 아래까지 내렸는지 확인
    if (story.scrollTop + story.clientHeight >= story.scrollHeight - 1) {
      isFinished = true;

      setTimeout(() => {
        nextButton.hidden = false;
      }, 500);
    }
  });

  // 스크롤이 필요 없는 화면에서도 버튼 표시
  if (story.scrollHeight <= story.clientHeight) {
    isFinished = true;

    setTimeout(() => {
      nextButton.hidden = false;
    }, 500);
  }

  // 엔딩 버튼 클릭 시 최종 엔딩 화면으로 이동
  nextButton.addEventListener("click", () => {
    renderEnding();
  });
}
