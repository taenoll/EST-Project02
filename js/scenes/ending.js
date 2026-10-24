// 엔딩 장면에서만 사용하는 진행 코드를 작성할 파일입니다.
export function renderEnding() {
  const app = document.querySelector("#app");

  app.innerHTML = `
    <main class="ending-screen">

      <div class="ending-content">
        <h1 class="ending-title">ENDING</h1>

        <p class="ending-subtitle">
          마지막 목격자는 <span>나</span>였다.
        </p>
      </div>

      <div class="ending-bottom">
        <p class="ending-chapter">PROLOGUE</p>
        <p class="ending-chapter-title">낯선 병실</p>
      </div>

    </main>
  `;
}