export const objects = [
  // ===== CHAPTER 1 =====
  {
    id: "bed",
    chapter: 1,
    text: "오래된 침대다. 침대 밑에 무언가 보인다.",
    required: true,  // 다음 챕터 이동 조건에 포함되는 조사인지 표시하는 값
    itemId: "patient-record", // 조사했을 때 얻는 아이템이 있으면 넣dma
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

  // ===== CHAPTER 3 =====
];