// 프롤로그 장면에서만 사용하는 진행 코드를 작성할 파일입니다.
export function renderProlog() {
  const app = document.querySelector("#app");

  app.innerHTML = `
    <main class="prolog-screen">

      <!-- 왼쪽 제목 -->
      <h1 class="prolog-title">PROLOGUE</h1>

      <!-- 오른쪽 스토리 창 -->
      <div class="prolog-content">

        <div class="prolog-story">
          <p>......</p>
          <p>여기가... 어디지?</p>
          <p>
            눈을 뜨자 낯선 천장이 보였다.<br>
            희미한 형광등 불빛과 차가운 공기.
          </p>
          <p>
            몸을 일으키려 했지만<br>
            머릿속이 안개처럼 흐릿했다.
          </p>
          <p>
            나는 누구지...?<br>
            그리고 왜 이 병실에 있는 걸까?
          </p>
          <p>
            주변을 둘러보니<br>
            오래된 침대와 정체를 알 수 없는 기록들이 보였다.
          </p>
          <p>그때, 어디선가 작은 목소리가 들려왔다.</p>
          <p>"이곳에 오래 머물러서는 안 돼..."</p>
          <p>
            이곳에는 분명 무언가 숨겨져 있다.<br>
            잃어버린 기억을 되찾아야 한다.
          </p>
          <p>그리고 반드시 이곳을 빠져나가야 한다.</p>
          <p>양지바른 곳으로 나가자.</p>
        </div>

        <button type="button" class="prolog-next" hidden>
          계속하기
        </button>

      </div>
    </main>
  `;
}