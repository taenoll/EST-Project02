// 챕터 1에서만 사용하는 진행 코드를 작성할 파일입니다.

import { investigate } from "../game/investigation.js";

const investigateButtons = document.querySelectorAll(".investigate-button");

investigateButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const objectId = button.dataset.objectId;

    const result = investigate(objectId);

    if (!result) return;

    console.log(result.text);

    button.classList.add("is-checked");

    // TODO: 경찬님 대화창 함수 연결
    // showDialog(result.text);

    // TODO: 소연님 아이템 함수 연결
    // if (result.itemId) {
    //   addItem(result.itemId);
    // }

    // TODO: 자동 저장 연결
    // saveGame();
  });
});
