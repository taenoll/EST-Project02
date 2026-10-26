import { getNode } from "../../lib/dom/getNode.js";
import { closeModal } from "../dom/renderModal.js";

// 정답 확인 함수
export function checkAnswer(user_answer, answer, onSuccess) {
  const answer_message = getNode("#answer_message");
  const digit_1 = getNode("#digit_1");
  const digit_2 = getNode("#digit_2");
  const digit_3 = getNode("#digit_3");
  const digits = [digit_1, digit_2, digit_3];

  if (user_answer === answer) {
    answer_message.textContent = "정답입니다";

    setTimeout(() => {
      closeModal();

      if (onSuccess) {
        onSuccess();
      }
    }, 2000);

    // TODO: 정답일때 모달창이 닫히고,.. 일어나는 일??
  } else {
    answer_message.textContent = "오답입니다";
    digits.forEach((digit) => {
      digit.textContent = 0;
    });
  }
}
