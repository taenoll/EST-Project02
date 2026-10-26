import { openModal } from "../dom/renderModal.js";

export const objects = [
  // ===== CHAPTER 1 =====
  {
    id: "bed",
    chapter: 1,
    text: "오래된 침대다. 침대 밑에 무언가 보인다.",
    required: true,
    itemId: "patient-record",
  },
  {
    id: "clock",
    chapter: 1,
    text: "벽시계가 멈춰 있다. 이상하게도 시간이 정확히 기억에 남는다.",
    required: true,
    itemId: null,
  },
  {
    id: "drawer",
    chapter: 1,
    text: "서랍 안에 구겨진 메모가 들어 있다.",
    required: true,
    itemId: "warning-memo",
  },
  {
    id: "window",
    chapter: 1,
    text: "창밖은 어둡다. 병원 밖에는 아무것도 보이지 않는다.",
    required: false,
    itemId: null,
  },
  {
    id: "chart",
    chapter: 1,
    text: "오래된 환자 차트다. 일부 기록이 검게 지워져 있다.",
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
    text: "좌물쇠로 잠겨있다.",
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
    id: "board2",
    chapter: 2,
    text: "오늘의 구내식당 메뉴가 붙어있다.",
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

  {
    id: "accident-report",
    chapter: 3,
    description: "간호사실 기록과 비교해 사건 은폐 사실을 확인",
    important: false,
    itemId: "accident-report",
  },
  {
    id: "staff-photo",
    chapter: 3,
    important: false,
    itemId: "staff-photo",
  },
  {
    id: "cctv-photo",
    chapter: 3,
    important: true,
    itemId: "cctv-photo",
  },
  {
    id: "director-secret-memo",
    chapter: 3,
    important: true,
    itemId: "director-secret-memo",
  },
  {
    id: "restricted-area-card",
    chapter: 3,
    important: false,
    itemId: "restricted-area-card",
  },
];
