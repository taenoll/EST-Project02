// 인벤토리를 화면에 렌더링하는 UI 코드를 작성할 파일입니다.
import { gameState } from "../state/gameState.js";
import { getItem, openItem } from "../game/inventory.js";

/**
 * 현재 인벤토리에 있는 아이템을 화면에 표시합니다.
 *
 * gameState.inventory에 저장된 아이템 ID를 기준으로
 * 아이템 이미지와 이름을 목록에 출력합니다.
 *
 * 아이템을 획득하거나 인벤토리 내용이 변경된 후
 * 화면을 갱신할 때 사용합니다.
 *
 * 주의:
 * - 인벤토리 데이터 자체를 변경하지 않습니다.
 * - 실제 저장은 gameSave()에서 처리합니다.
 * - .inventory-list 요소가 화면에 있어야 합니다.
 *
 * @returns {void} 반환값 없음
 *
 * @example
 * // 아이템 획득 후 화면 갱신
 * addItem("patient-record");
 * renderInventory();
 */
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

    // HTML에 아이템 추가
    itemList.insertAdjacentHTML("beforeend", template);
  });
}

/**
 * 인벤토리 아이템 클릭 시 상세 모달을 엽니다.
 *
 * 클릭한 요소에서 data-item-id를 가진 버튼을 찾고
 * 해당 아이템 ID를 openItem()에 전달합니다.
 *
 * 인벤토리 버튼이 아닌 곳을 클릭하면 실행하지 않습니다.
 *
 * 이 함수는 아래에서 클릭 이벤트에 연결되어 있으므로
 * 다른 파일에서 직접 호출할 필요는 없습니다.
 *
 * @param {MouseEvent} e - 클릭 이벤트 객체
 * @returns {void} 반환값 없음
 */
function handleInventoryClick(e) {
  const button = e.target.closest("button[data-item-id]");

  if (!button) return;

  const itemId = button.dataset.itemId;

  openItem(itemId);
}

/**
 * 인벤토리 목록을 위쪽으로 스크롤합니다.
 *
 * 위쪽 버튼을 클릭하면 아이템 한 칸 높이만큼
 * 스크롤을 위로 이동시킵니다.
 *
 * 스크롤이 맨 위라면 더 이상 이동하지 않습니다.
 *
 * 이 함수는 아래에서 버튼 클릭 이벤트에 연결됩니다.
 *
 * @returns {void} 반환값 없음
 */
function handleInventoryPrev() {
  const itemList = document.querySelector(".inventory-list");
  const item = itemList.querySelector("li");

  if (!item || itemList.scrollTop === 0) return;

  itemList.scrollTop -= item.offsetHeight;
}

/**
 * 인벤토리 목록을 아래쪽으로 스크롤합니다.
 *
 * 아래쪽 버튼을 클릭하면 아이템 한 칸 높이만큼
 * 스크롤을 아래로 이동시킵니다.
 *
 * 스크롤이 맨 아래라면 더 이상 이동하지 않습니다.
 *
 * 이 함수는 아래에서 버튼 클릭 이벤트에 연결됩니다.
 *
 * @returns {void} 반환값 없음
 */
function handleInventoryNext() {
  const itemList = document.querySelector(".inventory-list");
  const item = itemList.querySelector("li");

  if (!item) return;

  if (itemList.scrollTop >= itemList.scrollHeight - itemList.clientHeight)
    return;

  itemList.scrollTop += item.offsetHeight;
}

// 인벤토리 위아래 버튼
export function inventoryClickButton() {
  const prevButton = document.querySelector(".inventory-prev");
  const nextButton = document.querySelector(".inventory-next");

  if (!prevButton || !nextButton) return;

  prevButton.addEventListener("click", handleInventoryPrev);
  nextButton.addEventListener("click", handleInventoryNext);
}