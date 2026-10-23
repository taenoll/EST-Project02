import { initDialogue } from "../game/dialogue.js";

// 챕터 3에서만 사용하는 진행 코드를 작성할 파일입니다.
const room404Dialogues = [
  {
    name: "주인공",
    text: "여긴 어디지...? 내 기억이 전혀 나지 않아."
  },
  {
    name: "주인공",
    text: "저 문 옆에 404라고 적혀 있네..."
  }
];

const room405Dialogues = [
  {
    name: "주인공",
    text: "여긴 어딘지 모르지만 축축하다."
  },
  {
    name: "주인공",
    text: "양지바른 곳으로 나가자"
  },
    {
    name: "주인공",
    text: "양지바른 곳으로 나가자"
  },
    {
    name: "주인공",
    text: "양지바른 곳으로 나가자"
  }
];


// 404호에 들어갈 때
function enterRoom404() {
  initDialogue(room404Dialogues);
}

