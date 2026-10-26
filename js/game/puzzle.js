// 퍼즐의 정답 판정과 해결 처리를 작성할 파일입니다.
import { getNode } from "../../lib/dom/getNode.js";
import { openModal } from "../dom/renderModal.js";
import { checkAnswer } from "../dom/checkAnswer.js";

/** 사용방법 :
 * elem.addEventListener('click', callPuzzle('퍼즐의 정답 세자리 숫자'));
 */

export function callPuzzle(puzzle_answer, onSuccess) {
  openModal(`
    <div class="puzzle_popup hidden">
      <h2>암호를 입력하세요.</h2>
      <div class="puzzle_nums">
        <!--첫 번째 숫자-->
        <div class="dial">
            <button 
             class="arrow_btn" 
             data-direction="up" 
             id="up_btn1" 
             aira-label="첫 번째 숫자 올리기"
             >⌃
            </button>
            <span class="dial_number" id="digit_1"></span>
            <button 
             class="arrow_btn" 
             data-direction="down" 
             id="down_btn1" 
             aria-label="첫 번째 숫자 내리기"
             >⌄
            </button>
        </div>

        <!--두 번째 숫자-->
        <div class="dial">
            <button 
             class="arrow_btn" 
             data-direction="up" 
             id="up_btn2" 
             aira-label="두 번째 숫자 올리기"
             >⌃
            </button>
            <span class="dial_number" id="digit_2"></span>
            <button 
             class="arrow_btn" 
             data-direction="down" 
             id="down_btn2" 
             aria-label="두 번째 숫자 내리기"
             >⌄
            </button>
        </div>

        <!--세 번째 숫자-->
        <div class="dial">
            <button 
             class="arrow_btn" 
             data-direction="up" 
             id="up_btn3" 
             aira-label="세 번째 숫자 올리기"
             >⌃
            </button>
            <span class="dial_number" id="digit_3"></span>
            <button 
             class="arrow_btn" 
             data-direction="down" 
             id="down_btn3" 
             aria-label="세 번째 숫자 내리기"
             >⌄
            </button>
        </div>

        <div class="check_answer">
            <button id="check_btn">CHECK</button>
            <p id="answer_message"></p> 
        </div>
      </div>
    </div>
`);
  let answer = puzzle_answer;

  const digit_1 = getNode("#digit_1");
  const digit_2 = getNode("#digit_2");
  const digit_3 = getNode("#digit_3");
  const digits = [digit_1, digit_2, digit_3];

  const up_btn1 = getNode("#up_btn1");
  const up_btn2 = getNode("#up_btn2");
  const up_btn3 = getNode("#up_btn3");
  const down_btn1 = getNode("#down_btn1");
  const down_btn2 = getNode("#down_btn2");
  const down_btn3 = getNode("#down_btn3");

  const check_btn = getNode("#check_btn");
  const answer_message = getNode("#answer_message");

  // 처음 모달창 열었을 때 setting
  digits.forEach((digit) => {
    digit.textContent = 0;
  });
  answer_message.textContent = "";

  // 이벤트 리스너
  check_btn.addEventListener("click", () => {
    let user_answer = digits.map((digit) => digit.textContent).join("");
    checkAnswer(user_answer, answer, onSuccess);
  });

  // 숫자 올리기 & 내리기
  // 첫 번째 숫자
  up_btn1.addEventListener("click", () => {
    digit_1.textContent = (Number(digit_1.textContent) + 1) % 10;
  });
  down_btn1.addEventListener("click", () => {
    digit_1.textContent = (Number(digit_1.textContent) + 9) % 10;
  });

  // 두 번째 숫자
  up_btn2.addEventListener("click", () => {
    digit_2.textContent = (Number(digit_2.textContent) + 1) % 10;
  });
  down_btn2.addEventListener("click", () => {
    digit_2.textContent = (Number(digit_2.textContent) + 9) % 10;
  });

  // 세 번째 숫자
  up_btn3.addEventListener("click", () => {
    digit_3.textContent = (Number(digit_3.textContent) + 1) % 10;
  });
  down_btn3.addEventListener("click", () => {
    digit_3.textContent = (Number(digit_3.textContent) + 9) % 10;
  });
}
