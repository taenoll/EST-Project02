import { getNode } from "../../lib/dom/getNode.js";
import { hintData } from "../data/puzzles.js";
import { gameState } from "../state/gameState.js";

export function renderHint(level) {
  const hint_content = getNode(".hint_content");

  const chapter = `CH${gameState.currentChapter}`; // 'CH1'/'CH2'/'CH3'가 출력되어야 함. -> 변경전에는 0, 1,2 .. 라고 뜨고 힌트에는 CH1이기 때문에...
  const hintArr = hintData[chapter];

  //힌트 데이터가 없으면 함수를 종료
  if (!hintArr) return;

  hint_content.textContent = hintArr[level - 1];
}
