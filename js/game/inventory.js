// 여러 장면에서 공통으로 사용하는 인벤토리 로직을 작성할 파일입니다.
import { items } from "../data/items.js";
import { openModal } from "../dom/renderModal.js";
import { gameState } from "../state/gameState.js";


// 아이템 소유 여부 확인
export function hasItem(itemId) {
  return gameState.inventory.includes(itemId);
}

// 아이템 획득
export function addItem(itemId) {

  if(!hasItem(itemId)) gameState.inventory.push(itemId)
}

//아이템 정보 가져오기
export function getItem(itemId) {
  return items.find((item) => {
    return item.id === itemId;
  });
}

//아이템 열기 이미지 상세정보
export function openItem(itemId){
  const item = getItem(itemId);
  const {name, description, image} = item;

  const content = `
    <div class="item-detail">
      <img src="${image}" alt="${name}" />
      <h2>${name}</h2>
      <p>${description}</p>
    </div>
  `;

  openModal(content);
}