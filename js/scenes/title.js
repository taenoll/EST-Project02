import { renderInventory } from '../dom/renderInventory.js';
import { gameState } from '../state/gameState.js';
import { gameLoad, gameReset } from '../state/storage.js';
import { renderLoginModal ,renderSignupModal } from './auth.js';
import { renderChapter1 } from './chapter1.js';
import { renderChapter2 } from './chapter2.js';
import { DisplayChapter3 } from './chapter3.js';
import { renderProlog } from './prolog.js';
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


  // 게임 시작 버튼 선택
  const startButton = document.querySelector('.game-start-btn');

  // 게임 시작 버튼 클릭 이벤트
  startButton.addEventListener('click', () => {
    gameReset();
    renderProlog();
  });

  // 이어하기 버튼 선택
  const continueButton = document.querySelector('.continue-btn');
    continueButton.addEventListener('click',() => {
    gameLoad();
    if(gameState.currentScene === 'chapter1'){
      renderChapter1();
      renderInventory();
    }else if(gameState.currentScene === 'chapter2'){
      renderChapter2();
      renderInventory();
    }else if(gameState.currentScene === 'chapter3'){
      DisplayChapter3();
      renderInventory();
    }
  })

  // 저장된 게임 데이터 확인
  const savedGame = localStorage.getItem('gameState');

  // 저장된 게임이 없으면 이어하기 버튼 비활성화
  if (savedGame === null) {
    continueButton.disabled = true;
  } else {
    continueButton.disabled = false;
  }

  // 회원가입 로그인
  const loginButton = document.querySelector('.login-btn');
  const signupButton = document.querySelector('.signup-btn');

  function handleLogin(){
    renderLoginModal();
  };

  function handleSignup(){
    renderSignupModal();
  };

  loginButton.addEventListener('click',handleLogin);
  signupButton.addEventListener('click',handleSignup);
}