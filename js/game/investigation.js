import { objects } from "../data/objects.js";
import { gameState } from "../state/gameState.js";

// 오브젝트 조사!!
export function investigate(objectId) {
  const object = objects.find((item) => item.id === objectId);

  if (!object) {
    console.error(`조사 오브젝트를 찾을 수 없습니다: ${objectId}`);
    return;
  }

  const alreadyChecked = gameState.checkedObjects.includes(objectId);

  if (!alreadyChecked) {
    gameState.checkedObjects.push(objectId);
  }

  return {
    ...object,
    alreadyChecked,
  };
}

// 해당 챕터의 ""필수 조사가 모두 끝났는지 확인"""
export function isChapterChecked(chapterId) {
  const requiredObjects = objects.filter(
    (object) => object.chapter === chapterId && object.required
  );

  return requiredObjects.every((object) =>
    gameState.checkedObjects.includes(object.id)
  );
}