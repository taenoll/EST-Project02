import { handleSignup } from '../state/userStorage.js';

/* 로그인 모달 HTML 생성 */
export function renderLoginModal() {
  const modal = document.createElement("div");

  modal.className = "auth-modal";

  modal.innerHTML = `
    <div class="auth-overlay">
      <section
        class="auth-box"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
      >
        <button
          type="button"
          class="auth-close login-close"
          aria-label="로그인 창 닫기"
        >
          &times;
        </button>

        <h2 id="login-title" class="auth-title">
          THE WITNESS
        </h2>

        <p class="auth-subtitle">LOGIN</p>

        <form class="login-form">
          <div class="auth-field">
            <label for="login-id">아이디</label>

            <input
              type="text"
              id="login-id"
              name="userId"
              placeholder="아이디를 입력하세요"
              autocomplete="username"
              required
            />
          </div>

          <div class="auth-field">
            <label for="login-password">비밀번호</label>

            <input
              type="password"
              id="login-password"
              name="password"
              placeholder="비밀번호를 입력하세요"
              autocomplete="current-password"
              required
            />
          </div>

          <p class="auth-message" aria-live="polite"></p>

          <button type="submit" class="auth-submit">
            로그인
          </button>
        </form>
      </section>
    </div>
  `;

  document.body.append(modal);

  // 로그인 닫기 버튼
  const closeLogin = modal.querySelector('.login-close');

  function handleCloseLogin() {
    modal.remove();
  }

  closeLogin.addEventListener('click', handleCloseLogin);
}

/* 회원가입 모달 HTML 생성 */
export function renderSignupModal() {
  const modal = document.createElement("div");

  modal.className = "auth-modal";

  modal.innerHTML = `
    <div class="auth-overlay">
      <section
        class="auth-box"
        role="dialog"
        aria-modal="true"
        aria-labelledby="signup-title"
      >
        <button
          type="button"
          class="auth-close signup-close"
          aria-label="회원가입 창 닫기"
        >
          &times;
        </button>

        <h2 id="signup-title" class="auth-title">
          THE WITNESS
        </h2>

        <form class="signup-form">
          <div class="auth-field">
            <label for="signup-id">아이디</label>

            <input
              type="text"
              id="signup-id"
              name="userId"
              placeholder="아이디를 입력하세요"
              autocomplete="username"
              required
            />
          </div>

          <div class="auth-field">
            <label for="signup-nickname">닉네임</label>

            <input
              type="text"
              id="signup-nickname"
              name="nickname"
              placeholder="닉네임을 입력하세요"
              required
            />
          </div>

          <div class="auth-field">
            <label for="signup-email">이메일</label>

            <input
              type="email"
              id="signup-email"
              name="email"
              placeholder="이메일을 입력하세요"
              autocomplete="email"
              required
            />
          </div>

          <div class="auth-field">
            <label for="signup-password">비밀번호</label>

            <input
              type="password"
              id="signup-password"
              name="password"
              placeholder="비밀번호를 입력하세요"
              autocomplete="new-password"
              required
            />
          </div>

          <p class="auth-warning">※ 학습용 데모 로그인입니다.<br> 실제 비밀번호나 개인정보를 입력하지 마세요.</p>
          <p class="auth-message" aria-live="polite"></p>

          <button type="submit" class="auth-submit">
            회원가입
          </button>
        </form>
      </section>
    </div>
  `;

  document.body.append(modal);

  // 회원가입 닫기 버튼
  const closeSignup = modal.querySelector('.signup-close');

  function handleCloseSignup() {
    modal.remove();
  }

  closeSignup.addEventListener('click', handleCloseSignup);

  // 회원가입
  const signupForm = modal.querySelector('.signup-form');
  const loginForm = document.querySelector('.login-form');

  signupForm.addEventListener('submit', handleSignup);
  signupForm.addEventListener('submit', handleSignup);
}
