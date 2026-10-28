// 여러 챕터에서 공통으로 사용하는 힌트 로직을 작성할 파일입니다.
import { getNode } from "../../lib/dom/getNode.js";
import { renderHint } from "../dom/renderHint.js";
import { openModal } from "../dom/renderModal.js";

/** 사용방법
 * 각 챕터.js 파일의 화면을 생성하는 '챕터render함수' 안에 initHint(); 함수만 호출해주면 됩니다.
 * 
 * Ex)
 * import { initHint } from "../game/hint.js";
  
   export function renderChapter2() {
   app.innerHTML = `~~`

   initHint();
  }
 */

export function initHint() {
  const hint_btn = getNode("#hint_btn");
  if (!hint_btn) return;

  hint_btn.addEventListener("click", () => {
    openModal(`
      <div class="hint-inner-content">
        <div class="hint-header">
          <h2>HINT</h2>
        </div>
        
        <p>돋보기 아이콘을 눌러 단서를 모두 찾아주세요.</p>

        <div class="hint_buttons">
          <button id="level_1">레벨1</button>
          <button id="level_2">레벨2</button>
          <button id="level_3">레벨3</button>
        </div>

      <div class="hint_content">힌트 단계를 선택해주세요.</div>
    </div>
`);

    const level_1 = getNode("#level_1");
    const level_2 = getNode("#level_2");
    const level_3 = getNode("#level_3");

    // 힌트 단계 버튼 이벤트
    level_1.addEventListener("click", () => {
      renderHint(1);
    });
    level_2.addEventListener("click", () => {
      renderHint(2);
    });
    level_3.addEventListener("click", () => {
      renderHint(3);
    });
  });
}
