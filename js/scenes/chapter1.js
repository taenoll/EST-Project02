// 챕터 1에서만 사용하는 진행 코드를 작성할 파일입니다.

import {
  investigate,
  isChapterChecked,
} from "../game/investigation.js";

import { gameState } from "../state/gameState.js";

const investigateButtons = document.querySelectorAll(".investigate-button");


// 이미 조사한 오브젝트라면 화면에 "조사 완료로 연하게" 표시
investigateButtons.forEach((button) => {
  const objectId = button.dataset.objectId;

  if (gameState.checkedObjects.includes(objectId)) {
    button.classList.add("is-checked");
  }
});


// 조사 버튼 클릭 이벤트
investigateButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const objectId = button.dataset.objectId;

    const result = investigate(objectId);

    if (!result) return;

    // 현재는 대화창 연결 전이라 콘솔 확인 용
    console.log(result.text);

    // 조사 완료 표시
    button.classList.add("is-checked");

    // CH1 필수 조사 완료 여부 확인
    console.log("CH1 필수 조사 완료:", isChapterChecked(1));


    // TODO: 경찬님 대화창 함수 연결
    // showDialog(result.text);


    // TODO: 소연님 아이템 함수 연결
    // 처음 조사했을 때만 아이템 획득
    // if (!result.alreadyChecked && result.itemId) {
    //   addItem(result.itemId);
    // }


    // TODO: 자동 저장 연결
    // saveGame();
  });
});