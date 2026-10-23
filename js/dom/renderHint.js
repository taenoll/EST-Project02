import { getNode } from "../../lib/dom/getNode.js";
import { hintData } from "../data/puzzles.js";

export function renderHint(level) {
  const hint_content = getNode(".hint_content");

  const chapter = gameState.currentChapter; // 'CH1'/'CH2'/'CH3'가 출력되어야 함.
  const hintArr = hintData[chapter];

  hint_content.textContent = hintArr[level - 1];
}
