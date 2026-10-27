import { getNode } from "../../lib/dom/getNode.js";
import { hintData } from "../data/puzzles.js";
import { gameState } from "../state/gameState.js";
import { gameSave } from "../state/storage.js";

export function renderHint(level) {
  const hint_content = getNode(".hint_content");

  const chapter = `CH${gameState.currentChapter}`;
  console.log("현재 챕터 키:", chapter);
  console.log("가져온 힌트 배열:", hintData[chapter]);

  const hintArr = hintData[chapter];

  //힌트 데이터가 없으면 함수를 종료
  if (!hintArr) return;

  hint_content.textContent = hintArr[level - 1];

  //현재 챕터의 힌트 기록 이름 생성
  const chapterKey = `chapter${gameState.currentChapter}`;

  //기존 기록보다 높은 힌트 단계를 사용했을 때만 갱신
  if (gameState.hintLevel[chapterKey] < level) {
    gameState.hintLevel[chapterKey] = level;
    gameSave();
  }
}
