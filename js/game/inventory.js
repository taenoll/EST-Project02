// 여러 장면에서 공통으로 사용하는 인벤토리 로직을 작성할 파일입니다.
import { items } from "../data/items.js";
import { handleInventoryClick, inventoryClickButton, renderInventory } from "../dom/renderInventory.js";
import { openModal } from "../dom/renderModal.js";
import { gameState } from "../state/gameState.js";
import { gameSave } from "../state/storage.js";

/**
 * 플레이어가 특정 아이템을 가지고 있는지 확인합니다.
 *
 * gameState.inventory에 해당 아이템 ID가 있는지 검사합니다.
 * 아이템 사용 조건이나 특정 아이템 소유 여부를 확인할 때 사용합니다.
 *
 * @param {string} itemId - 소유 여부를 확인할 아이템 ID
 * @returns {boolean} 소유하면 true, 없으면 false
 *
 * @example
 * // 간호사실 출입 카드를 가지고 있는지 확인
 * if (hasItem("nurse-card")) {
 *   console.log("출입 가능합니다.");
 * }
 */
export function hasItem(itemId) {
  return gameState.inventory.includes(itemId);
}


/**
 * 플레이어의 인벤토리에 아이템을 추가합니다.
 *
 * 조사 또는 퍼즐 보상으로 아이템을 획득했을 때 사용합니다.
 * 이미 소유한 아이템은 중복 추가하지 않습니다.
 *
 * 아이템이 새로 추가되면 gameSave()가 자동 실행되어
 * 게임 진행 상황이 localStorage에 저장됩니다.
 *
 * 주의:
 * 이 함수는 인벤토리 화면을 직접 갱신하지 않습니다.
 * 아이템 획득 후 화면 갱신이 필요하면 renderInventory()를 호출하세요.
 *
 * @param {string} itemId - 획득할 아이템 ID
 * @returns {void} 반환값 없음
 *
 * @example
 * // 조사 후 아이템 획득 및 화면 갱신
 * addItem("patient-record");
 * renderInventory();
 */
export function addItem(itemId) {
  const item = getItem(itemId);

  if (!item) return;
  
  if(!hasItem(itemId)){
    gameState.inventory.push(itemId);
    gameSave();
  }
}

/**
 * 아이템 ID로 해당 아이템의 상세 정보를 가져옵니다.
 *
 * items.js에서 일치하는 아이템을 찾아 반환합니다.
 * 아이템 이름, 설명, 이미지, important 등의 정보가
 * 필요할 때 사용합니다.
 *
 * 주의:
 * 해당 ID가 존재하지 않으면 undefined를 반환합니다.
 *
 * @param {string} itemId - 조회할 아이템 ID
 * @returns {(typeof items)[number] | undefined} 아이템 객체 또는 undefined
 *
 * @example
 * const item = getItem("warning-memo");
 *
 * if (item) {
 *   console.log(item.name);
 *   console.log(item.important);
 * }
 */
export function getItem(itemId) {
  return items.find((item) => {
    return item.id === itemId;
  });
}

/**
 * 선택한 아이템의 상세 정보를 모달로 표시합니다.
 *
 * 인벤토리에서 아이템을 클릭했을 때 사용합니다.
 * 아이템의 이름, 설명, 이미지를 공통 모달로 보여줍니다.
 *
 * 주의:
 * items.js에 등록된 아이템 ID를 전달해야 합니다.
 * 존재하지 않는 ID를 전달하면 오류가 발생할 수 있습니다.
 *
 * @param {string} itemId - 상세 정보를 표시할 아이템 ID
 * @returns {void} 반환값 없음
 *
 * @example
 * // 아이템 상세 정보 열기
 * openItem("patient-record");
 */
export function openItem(itemId){
  const item = getItem(itemId);
  if(!item) return;
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

/**
 * 챕터 이동 시 중요 아이템만 인벤토리에 남깁니다.
 *
 * 현재 인벤토리에서 important: true인 아이템만 유지하고
 * 나머지 아이템은 제거합니다.
 *
 * 정리된 인벤토리는 renderInventory()로 화면에 반영되고,
 * gameSave()를 통해 자동 저장됩니다.
 *
 * 사용 시점:
 * 현재 챕터의 미션을 완료하고 다음 챕터로 이동이
 * 확정되었을 때 호출하세요.
 *
 * 주의:
 * - 이 함수는 챕터 번호를 변경하지 않습니다.
 * - 챕터 번호 변경 후에는 gameSave()를 호출해야 합니다.
 * - 새로고침이나 일반 화면 전환 시 호출하지 마세요.
 * - items.js에 없는 아이템 ID는 인벤토리에서 제외됩니다.
 *
 * @returns {void} 반환값 없음
 *
 * @example
 * // 챕터 이동 시 중요 아이템만 유지
 * clearChapterItems();
 *
 * // 실제 챕터 변경 처리는 챕터 담당 함수에서 진행
 */
export function clearChapterItems() {
  const result = gameState.inventory.filter((itemId)=>{
    const item = getItem(itemId);
    if(item && item.important === true) {
      return true;
    }

    return false;
  });

  gameState.inventory = result;

  renderInventory();
  gameSave();
}

export function openInventoryItems(){
  const inventoryList = app.querySelector(".inventory-list");
  
  inventoryList.addEventListener("click", handleInventoryClick);
  
  inventoryClickButton();

}