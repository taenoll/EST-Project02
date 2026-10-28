
import { gameSave, gameState } from "../state/index.js";
import { renderChapter1 } from "./index.js";
import { playSfx } from "../game/audio.js";

// 프롤로그 장면
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
          <p class="prolog-voice-2-trigger">
            그때, 어디선가 작은 목소리가 들려왔다.
          </p>
          <p>"이곳에 오래 머물러서는 안 돼..."</p>
          <p>
            이곳에는 분명 무언가 숨겨져 있다.<br>
            잃어버린 기억을 되찾아야 한다.
          </p>
          <p>그리고 반드시 이곳을 빠져나가야 한다.</p>
          <p>양지바른 곳으로 나가자.</p>
        </div>

      </div>

      <!-- 스토리 창 밖 하단 버튼 -->
      <button type="button" class="prolog-next" hidden>
        계속하기
      </button>

    </main>
  `;

  // 필요한 요소 선택
  const title = document.querySelector('.prolog-title');
  const content = document.querySelector('.prolog-content');
  const story = document.querySelector('.prolog-story');
  const nextButton = document.querySelector('.prolog-next');

  const voice2Trigger = document.querySelector(".prolog-voice-2-trigger");
  
  // 두 번째 더빙 중복 재생 방지
  let isVoice2Played = false;

  // 두 번째 더빙 재생 함수
  function playVoice2() {
    if (isVoice2Played) return;
    if (!document.querySelector(".prolog-screen")) return;

    isVoice2Played = true;
    playSfx("./assets/audio/sfx/prolog-2.m4a");
  }


  // 제목 등장
  setTimeout(() => {
    title.style.opacity = "1";
  }, 100);

  // 스토리 창 등장 및 첫 번째 더빙
  setTimeout(() => {
    content.style.opacity = "1";

    playSfx("./assets/audio/sfx/prolog-1.m4a");
  }, 1000);

  let isFinished = false;

  // 스토리 스크롤
  story.addEventListener("scroll", () => {

    // 두 번째 더빙
    if (!isVoice2Played) {
      const triggerTop = voice2Trigger.offsetTop;

      if (story.scrollTop + story.clientHeight >= triggerTop) {
        playVoice2();
      }
    }

    // 스크롤 완료 확인
    if (isFinished) return;

    if (story.scrollTop + story.clientHeight >= story.scrollHeight - 1) {
      isFinished = true;

      setTimeout(() => {
        nextButton.hidden = false;
      }, 500);
    }
  });

  // 스크롤이 필요 없는 화면에서는 계속하기 버튼 표시
  if (story.scrollHeight <= story.clientHeight) {
    isFinished = true;

    setTimeout(() => {
      nextButton.hidden = false;
    }, 1500);
  }

  // 프롤로그 -> 챕터 1
  nextButton.addEventListener("click", () => {
    gameState.currentScene = "chapter1";
    renderChapter1();
    gameSave();
  });
}
