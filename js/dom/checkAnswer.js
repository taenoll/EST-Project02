import { getNode } from "../../lib/dom/getNode.js";
import { closeModal } from "../dom/renderModal.js";
import { addItem, hasItem } from "../game/inventory.js";
import { renderInventory } from "./renderInventory.js";
import { showNextChapterButton } from "../dom/renderModal.js";

// 정답 확인 함수
export function checkAnswer(
  user_answer,
  answer,
  itemId = null,
  onSuccess = null,
) {
  const answer_message = getNode("#answer_message");
  const digit_1 = getNode("#digit_1");
  const digit_2 = getNode("#digit_2");
  const digit_3 = getNode("#digit_3");

  const digits = [digit_1, digit_2, digit_3];

  // 정답
  if (user_answer === answer) {
    answer_message.textContent = "정답입니다";

    setTimeout(() => {
      closeModal();

      if (itemId) {
        addItem(itemId);
        renderInventory();
      }

      // 정답 이후 추가로 실행할 함수가 있으면 실행(CH1)
      if (onSuccess) {
        onSuccess();
      }

      // 정답 이후 추가로 실행할 함수가 있으면 실행(CH2)
      if (hasItem("director-key")) {
        setTimeout(() => {
          showNextChapterButton();
        }, 1000);
      }
    }, 1000);
    return;
  }

  answer_message.textContent = "오답입니다";

  digits.forEach((digit) => {
    digit.textContent = 0;
  });
}
