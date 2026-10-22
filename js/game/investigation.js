import { objects } from "../data/objects.js";
import { gameState } from "../state/gameState.js";

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