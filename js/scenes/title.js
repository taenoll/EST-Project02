// 타이틀 장면에서만 사용하는 진행 코드를 작성할 파일입니다.
export function renderTitle() {
  const app = document.querySelector("#app");

  app.innerHTML = `
    <main class="title-screen" aria-labelledby="game-title">
      <div class="title-screen-content">

        <h1 id="game-title" class="title-screen-title">
          THE <span>WITNESS</span>
        </h1>

        <nav aria-label="게임 메뉴">
          <ul class="auth-nav">
            <li>
              <button type="button" class="signup-btn">
                회원 가입
              </button>
            </li>
            <li>
              <button type="button" class="login-btn">
                로그인
              </button>
            </li>
          </ul>
        </nav>

      </div>
    </main>
  `;
}