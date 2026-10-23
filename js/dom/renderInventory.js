// 인벤토리를 화면에 렌더링하는 UI 코드를 작성할 파일입니다.
import { gameState } from "../state/gameState.js";
import { addItem, getItem, openItem } from "../game/inventory.js";

export function renderInventory() {
  const itemList = document.querySelector(".inventory-list");

  // 기존 목록 비우기
  itemList.innerHTML = "";

  gameState.inventory.forEach((itemId) => {
    const item = getItem(itemId);

    if (!item) return;

    const template = `
      <li>
        <button type="button" data-item-id="${item.id}">
          <img src="${item.image}" alt="${item.name}" />
          <span>${item.name}</span>
        </button>
      </li>
    `;

    // HTML에 아이템 추가하기
    itemList.insertAdjacentHTML("beforeend", template);
  });
}