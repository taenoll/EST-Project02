// 여러 챕터에서 공통으로 사용하는 힌트 로직을 작성할 파일입니다.
import { getNode } from "../../lib/dom/getNode.js";
import { renderHint } from "../dom/renderHint.js";

const hint_btn = getNode("#hint_btn");
const hint_popup = getNode("#hint_popup");
const hint_content = getNode(".hint_content");
const close_btn = getNode("#close_btn");

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

// // 힌트 팝업창 열기
// hint_btn.addEventListener("click", () => {
//   hint_popup.hidden = false;
// });

// // 팝업창 닫기
// close_btn.addEventListener("click", () => {
//   hint_popup.hidden = true;
// });

/*
    <div id="hint_popup hidden">
      <h2>HINT</h2>
      <p>돋보기 아이콘을 눌러 단서를 모두 찾아주세요.</p>

      <div class="hint_buttons">
        <button id="level_1">레벨1</button>
        <button id="level_2">레벨2</button>
        <button id="level_3">레벨3</button>
      </div>

      <div class="hint_content">힌트 단계를 선택해주세요.</div>

      <button id="close_btn">닫기</button>
    </div>
*/
