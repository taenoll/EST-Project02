
/* 엔딩 장면에서만 사용하는 진행 코드를 작성할 파일입니다. */
export function renderEnding() {
  const app = document.querySelector("#app");

  app.innerHTML = `
    <main class="ending-screen" aria-labelledby="ending-title">

      <div class="ending-content">

        <h1 id="ending-title" class="ending-label">
          - ENDING -
        </h1>

        <p class="ending-title">낯선 병실</p>

        <p class="ending-subtitle">
          목격자는 <span>나</span>였다.
        </p>

        <button type="button" class="ending-home-btn">
          처음으로 돌아가기
        </button>

      </div>

    </main>
  `;
}
