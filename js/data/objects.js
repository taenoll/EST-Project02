import { openModal } from "../dom/renderModal";

export const objects = [
  // ===== CHAPTER 1 =====
  {
    id: "bed",
    chapter: 1,
    text: "오래된 침대다. 침대 밑에 무언가 보인다.",
    required: true, // 다음 챕터 이동 조건에 포함되는 조사인지 표시하는 값
    itemId: "patient-record", // 조사했을 때 얻는 아이템이 있으면 넣음
  },
  {
    id: "clock",
    chapter: 1,
    text: "벽시계가 멈춰 있다.",
    required: true,
    itemId: null,
  },
  {
    id: "window",
    chapter: 1,
    text: "창밖은 어둡고 아무것도 보이지 않는다.",
    required: false,
    itemId: null,
  },

  // ===== CHAPTER 2 =====
  {
    id: "board1",
    chapter: 2,
    text: "무언가 붙어있다.",
    required: true,
    itemId: "night-duty-log",
  },
  {
    id: "trashcan",
    chapter: 2,
    text: "쓰레기통을 뒤져본다.",
    required: true,
    itemId: "medicine-log",
  },
  {
    id: "desk",
    chapter: 2,
    text: "데스크 위에 어떤 서류가 올려져 있다.",
    required: true,
    itemId: "m04-medication-record",
  },
  {
    id: "computer",
    chapter: 2,
    text: "한 녹취 기록이 저장되어 있다.",
    required: true,
    itemId: "nurse-recording",
  },
  {
    id: "drawer1",
    chapter: 2,
    text: "서랍의 세 번째 칸이 좌물쇠로 잠겨져 있다.",
    required: true,
    itemId: "director-key",
  },
  {
    id: "sink",
    chapter: 2,
    text: "물이 나오지 않는다.",
    required: false,
    itemId: null,
  },
  {
    id: "mirror",
    chapter: 2,
    text: "거울이 더럽다.",
    required: false,
    itemId: null,
  },
  {
    id: "board2",
    chapter: 2,
    text: "오늘의 구내식당 메뉴가 붙어있다.",
    required: false,
    itemId: null,
  },
  {
    id: "chair",
    chapter: 2,
    text: "의자에서 끼익끼익 소리가 난다.",
    required: false,
    itemId: null,
  },
  {
    id: "drawer2",
    chapter: 2,
    text: "알 수 없는 약들이 들어있다.",
    required: false,
    itemId: null,
  },

  // ===== CHAPTER 3 =====
];

/**
 * 전달받은 ID와 일치하는 오브젝트 데이터를 objects 배열에서 찾아 반환합니다.
 * @param {string} id - 조회할 오브젝트 ID (예: "board1", "desk")
 * @returns {Object|undefined} 찾은 오브젝트 객체 또는 undefined
 */
function getObject(id) {
  return objects.find((object) => {
    return object.id === id;
  });
}

/**
 * 오브젝트 ID를 받아 해당 오브젝트의 텍스트를 모달창에 표시합니다.
 * @param {string} id - 상세 정보를 표시할 오브젝트 ID
 * @returns {void}
 */
export function openObject(id) {
  const object = getObject(id);
  if (!object) return;

  const { text } = object;

  const content = `
    <div class="object-detail">
      <p>${text}</p>
    </div>
  `;

  openModal(content);
}
