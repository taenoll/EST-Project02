import { renderInventory } from '../dom/renderInventory.js';
import { gameLoad, gameReset, gameState, handleLogout } from '../state/index.js';
import { renderChapter1, renderChapter2, renderChapter3, renderLoginModal, renderProlog, renderSignupModal } from './index.js';

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

          <nav class="title-auth-nav" aria-label="회원 메뉴">
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

          <!-- 로그인 후 환영 문구 -->
          <div class="title-user-info" hidden>
            <span class="title-user-name"></span>
            <span>님 환영합니다!</span>

            <button type="button" class="logout-btn">
              로그아웃
            </button>
          </div>

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

  // 게임 시작 버튼 선택
  const startButton = document.querySelector(".game-start-btn");

  // 게임 시작 버튼 클릭 이벤트
  startButton.addEventListener("click", () => {
    gameReset();
    renderProlog();
  });

  // 이어하기 버튼 선택
  const continueButton = document.querySelector(".continue-btn");

  // 이어하기 버튼 클릭 이벤트
  continueButton.addEventListener("click", () => {
    gameLoad();

    if (gameState.currentScene === "chapter1") {
      renderChapter1();
      renderInventory();
    } else if (gameState.currentScene === "chapter2") {
      renderChapter2();
      renderInventory();
    } else if (gameState.currentScene === "chapter3") {
      renderChapter3();
      renderInventory();
    }
  });

  // 저장된 게임 데이터 확인
  const savedGame = localStorage.getItem("gameState");

  // 저장된 게임이 없으면 이어하기 비활성화
  if (savedGame === null) {
    continueButton.disabled = true;
  } else {
    continueButton.disabled = false;
  }

  // 회원가입 / 로그인 버튼 선택
  const loginButton = document.querySelector('.login-btn');
  const signupButton = document.querySelector('.signup-btn');
  const logoutButton = document.querySelector('.logout-btn');

  // 로그인 화면 요소 선택
  const authNav = document.querySelector('.title-auth-nav');
  const userInfo = document.querySelector('.title-user-info');
  const userName = document.querySelector('.title-user-name');

  //저장된 로그인 정보 가져오기
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const savedUser = localStorage.getItem('user');

  // 로그인 상태 유지
  if (isLoggedIn === 'true' && savedUser) {
    const user = JSON.parse(savedUser);

    authNav.hidden = true;
    userInfo.hidden = false;
    userName.textContent = user.nickName;
  } else {
    authNav.hidden = false;
    userInfo.hidden = true;
  }

  function handleLogin() {
    renderLoginModal();
  }

  function handleSignup() {
    renderSignupModal();
  }

  // 로그인
  loginButton.addEventListener('click', handleLogin);

  // 회원가입
  signupButton.addEventListener('click', handleSignup);

  logoutButton.addEventListener('click', () => {
    handleLogout();
    continueButton.disabled = true;
  });
}
