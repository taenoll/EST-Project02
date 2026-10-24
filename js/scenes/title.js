// 타이틀 화면
export function renderTitle() {
  const app = document.querySelector("#app");

  app.innerHTML = `
    <div class="title-screen">

      <!-- 헤더 -->
      <header class="title-header">
        <div class="title-header-inner">

          <p class="title-header-logo">
            THE WITNESS
          </p>

          <nav aria-label="회원 메뉴">
            <ul class="title-header-nav">
              <li>
                <button type="button" class="login-btn">
                  로그인
                </button>
              </li>
              <li>
                <button type="button" class="signup-btn">
                  회원가입
                </button>
              </li>
            </ul>
          </nav>

        </div>
      </header>

      <!-- 메인 -->
      <main class="title-main" aria-labelledby="game-title">
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

      <!-- 푸터 -->
      <footer class="title-footer">
        <p>
          &copy; 2026 THE WITNESS. All rights reserved.
        </p>
      </footer>

    </div>
  `;
}