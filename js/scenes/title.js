// 타이틀 장면에서만 사용하는 진행 코드를 작성할 파일입니다.
export function renderTitle() {
  const app = document.querySelector("#app");

  app.innerHTML = `
    <main class="title-screen" aria-labelledby="game-title">
      <section class="title-screen-content">

        <h1 id="game-title" class="title-screen-title">
          THE <span>WITNESS</span>
        </h1>

        <p class="title-screen-description">
          기억의 조각을 모아, 사건의 진실을 밝혀라.
        </p>

        <nav aria-label="게임 메뉴">
          <ul class="auth-nav">
            <li>
              <button type="button" class="game-start-btn">
                게임 시작
              </button>
            </li>
            <li>
              <button type="button" class="continue-btn">
                이어 하기
              </button>
            </li>
          </ul>
        </nav>
      </section>
    </main>
  `;
}