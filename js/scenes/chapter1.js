// 챕터 1에서만 사용하는 진행 코드를 작성할 파일입니다.

import { investigate, isChapterChecked, } from "../game/investigation.js";

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

    // 조사 문구는 다시 확인할 수 있음
    console.log(result.text);

    button.classList.add("is-checked");


    // 처음 조사한 경우에만 상태 변경
    if (!result.alreadyChecked) {

      // TODO: 소연님 아이템 함수 연결
      // if (result.itemId) {
      //   addItem(result.itemId);
      // }

      // 필수 조사 완료 여부 확인
      const isComplete = isChapterChecked(1);

      console.log("CH1 필수 조사 완료:", isComplete);

      // TODO: 자동 저장
      // saveGame();
    }


    // TODO: 경찬님 대화창 함수 연결
    // showDialog(result.text);
  });
});