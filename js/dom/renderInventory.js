// 인벤토리를 화면에 렌더링하는 UI 코드를 작성할 파일입니다.
import { gameState } from "../state/gameState.js";
import { addItem, getItem, openItem } from "../game/inventory.js";

//아이템 추가되면 인텐토리에 저장
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

//클릭하면 모달창에 아이템 이미지,이름,설명
function handleInventoryClick(e) {
  const button = e.target.closest("button[data-item-id]");

  if (!button) return;

  const itemId = button.dataset.itemId;

  openItem(itemId);
}
addItem("patient-record");//지우기
addItem("warning-memo");//지우기
addItem("nurse-card");//지우기
addItem("night-duty-log");//지우기
addItem("director-key");//지우기
renderInventory();


//위 아래 버튼
const prevButton = document.querySelector('.inventory-prev');
const nextButton = document.querySelector('.inventory-next');
function handleInventoryPrev(){
  const itemList = document.querySelector('.inventory-list');
  const item = itemList.querySelector('li');
  
  if(itemList.scrollTop === 0) return
    itemList.scrollTop -= item.offsetHeight;
  
}

function handleInventoryNext(){
  const itemList = document.querySelector('.inventory-list');
  const item = itemList.querySelector('li');
  
  if(itemList.scrollTop === 0) itemList.scrollTop += item.offsetHeight;
}


document.removeEventListener("click", handleInventoryClick);
document.addEventListener("click", handleInventoryClick);

prevButton.addEventListener("click", handleInventoryPrev);
nextButton.addEventListener("click", handleInventoryNext);