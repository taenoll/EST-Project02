import { getNode } from "../../lib/dom/getNode.js";
import { hintData } from "../data/puzzles.js";

const hint_content = getNode(".hint_content");

export function renderHint(level) {
  const chapter = "gameState.currentChapter";
  const hintArr = hintData[chapter];

  hint_content.textContent = hintArr[level - 1];
}
