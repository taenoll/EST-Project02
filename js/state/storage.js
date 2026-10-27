// 게임 진행 상황을 localStorage에 저장하고 불러오는 기능을 작성할 파일입니다.

import { gameState } from "./index.js";

/**
 * 현재 게임 진행 상황 전체를 localStorage에 저장합니다.
 *
 * gameState 객체를 JSON 문자열로 변환하여 저장합니다.
 * 아이템, 챕터, 퍼즐, 조사 기록, 힌트 등
 * gameState에 포함된 모든 진행 정보를 저장합니다.
 *
 * 사용 시점:
 * - 아이템을 획득했을 때
 * - 퍼즐을 해결했을 때
 * - 조사 완료 상태가 변경되었을 때
 * - 힌트를 사용했을 때
 * - 챕터 이동 및 진행 상태가 변경되었을 때
 *
 * 주의:
 * - 기존 저장 데이터가 있다면 현재 gameState로 덮어씁니다.
 * - gameState 값이 변경된 후 호출해야 합니다.
 * - 아이템 획득 시에는 addItem()에서 자동으로 호출됩니다.
 *
 * @returns {void} 반환값 없음
 *
 * @example
 * // 퍼즐 해결 후 게임 저장
 * gameState.solvedPuzzles.push("chapter1-lock");
 * gameSave();
 *
 * @example
 * // 챕터 번호 변경 후 게임 저장
 * gameState.currentChapter = 2;
 * gameSave();
 */
export function gameSave(){
  localStorage.setItem('gameState',JSON.stringify(gameState))
}


/**
 * localStorage에 저장된 게임 진행 상황을 불러옵니다.
 *
 * 저장된 gameState 데이터를 가져와 객체로 변환하고,
 * 현재 게임에서 사용하는 gameState에 적용합니다.
 *
 * 사용 시점:
 * - 타이틀 화면에서 '이어하기' 버튼을 클릭했을 때
 * - 저장된 게임 진행 상황을 복원해야 할 때
 *
 * 복원되는 데이터:
 * - 현재 화면 및 챕터
 * - 획득한 아이템
 * - 조사 완료 기록
 * - 퍼즐 해결 기록
 * - 잠금 해제된 공간
 * - 아이템 사용 기록
 * - 힌트 및 기타 gameState에 저장된 설정
 *
 * 주의:
 * - 저장된 데이터가 없으면 아무 작업도 하지 않습니다.
 * - 저장 데이터가 잘못된 JSON이면 오류가 발생할 수 있습니다.
 * - 데이터 복원 후 필요한 화면 갱신은 별도로 처리해야 합니다.
 * - 이 함수는 화면을 직접 이동시키지 않습니다.
 *
 * @returns {void} 반환값 없음
 *
 * @example
 * // 저장된 게임 상태 불러오기
 * gameLoad();
 *
 * @example
 * // 불러온 데이터로 인벤토리 화면 갱신
 * gameLoad();
 * renderInventory();
 *
 * // 실제 게임 화면 전환은 별도의 화면 담당 함수에서 처리
 */
export function gameLoad(){
  const data = localStorage.getItem('gameState');
  if( data === null) return;
  const loadedData = JSON.parse(data);
  
  const entries = Object.entries(loadedData);

  for(const [key, value] of entries){
    gameState[key] = value;
  }
}

/**
 * 게임 진행 데이터를 초기 상태로 되돌리는 함수입니다.
 *
 * @description
 * - gameState의 모든 진행 정보를 초기화합니다.
 * - localStorage에 저장된 게임 데이터를 삭제합니다.
 * - 새 게임을 시작할 때 사용합니다.
 *
 * @returns {void} 반환값 없음
 *
 * @example
 * // 새 게임을 시작할 때
 * gameReset();
 * renderProlog();
 */
export function gameReset() {
  gameState.currentScene = "title";
  gameState.currentChapter = 0;

  gameState.inventory = [];
  gameState.checkedObjects = [];
  gameState.solvedPuzzles = [];
  gameState.unlockedRooms = [];
  gameState.usedItems = [];

  gameState.introSeen = {
    chapter1: false,
    chapter2: false,
    chapter3: false,
  };

  gameState.hintLevel = {
    chapter1: 0,
    chapter2: 0,
    chapter3: 0,
  };

  localStorage.removeItem("gameState");
}