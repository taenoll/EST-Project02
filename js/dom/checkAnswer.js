import { getNode } from "../../lib/dom/getNode.js";
import { closeModal } from "../dom/renderModal.js";
import { addItem } from "../game/inventory.js";
import { renderInventory } from "./renderInventory.js";

// 정답 확인 함수
export function checkAnswer(user_answer, answer, itemId = null) {
  const answer_message = getNode("#answer_message");
  const digit_1 = getNode("#digit_1");
  const digit_2 = getNode("#digit_2");
  const digit_3 = getNode("#digit_3");
  const digits = [digit_1, digit_2, digit_3];

  if (user_answer === answer) {
    answer_message.textContent = "정답입니다";

    // 모달이 닫히고, 인벤토리에 아이템이 들어옴.
    setTimeout(() => {
      closeModal();
    }, 1000);
    setTimeout(() => {
      if (itemId) {
        addItem(itemId);
        renderInventory();
      }
    }, 1000);
  } else {
    answer_message.textContent = "오답입니다";
    digits.forEach((digit) => {
      digit.textContent = 0;
    });
  }
}
