
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
            <label for="login-nickname">닉네임</label>

            <input
              type="text"
              id="login-nickname"
              name="nickname"
              placeholder="닉네임을 입력하세요"
              autocomplete="nickname"
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

        <p class="auth-subtitle">SIGN UP</p>

        <form class="signup-form">
          <div class="auth-field">
            <label for="signup-name">이름</label>

            <input
              type="text"
              id="signup-name"
              name="name"
              placeholder="이름을 입력하세요"
              autocomplete="name"
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
              autocomplete="nickname"
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

          <p class="auth-message" aria-live="polite"></p>

          <button type="submit" class="auth-submit">
            회원가입
          </button>
        </form>
      </section>
    </div>
  `;

  document.body.append(modal);
}
