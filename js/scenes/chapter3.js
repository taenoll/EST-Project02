import { items } from "../data/items.js";
import { nextChapterOption } from "../dom/renderModal.js";
import { initDialogue } from "../game/dialogue.js";

// 챕터 3에서만 사용하는 진행 코드를 작성할 파일입니다.
const room404Dialogues = [
  {
    name: "주인공",
    text: "여긴 어디지...? 내 기억이 전혀 나지 않아.",
  },
  {
    name: "주인공",
    text: "저 문 옆에 404라고 적혀 있네...",
  },
];

const room405Dialogues = [
  {
    name: "주인공",
    text: "여긴 어딘지 모르지만 축축하다.",
  },
  {
    name: "주인공",
    text: "양지바른 곳으로 나가자",
  },
  {
    name: "주인공",
    text: "양지바른 곳으로 나가자",
  },
  {
    name: "주인공",
    text: "양지바른 곳으로 나가자",
  },
];

export const gameState = [
  {
    currentChapter: 1,
  },
];

// 404호에 들어갈 때
function enterRoom404() {
  initDialogue(room405Dialogues);
}

enterRoom404();

let total = items.filter(
  (item) => item.chapter === gameState[0].currentChapter,
).length;
let count = 0;
// count 변수는 조사이벤트가 활성화 될때 마다 1씩 증가하게 할 것.
// total은 한챕터당 아이템의 갯수

nextChapterOption(3, total);
