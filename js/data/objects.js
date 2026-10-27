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
    text: [
      "낡은 벽시계다.",
      "분침은 움직이고 있는데, 시침만 4를 가리킨 채 멈춰 있다.",
      "단순히 고장 난 걸까?",
    ],
    required: true,
    itemId: null,
  },
  {
    id: "drawer",
    chapter: 1,
    text: "서랍 안에 구겨진 메모가 들어 있다. 확인해보자.",
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
    text: [
      "오래된 투약 차트다. 대부분의 기록이 검게 지워져 있다.",
      "가장자리에는 '04 → 4'처럼 보이는 희미한 표시가 남아 있다.",
      "누군가 일부러 남겨둔 걸까?",
    ],
    required: true,
    itemId: null,
  },
  {
    id: "medicine-cabinet",
    chapter: 1,
    text: ["잠긴 약 보관함이다.", "세 자리 숫자를 맞추면 열리는 것 같다."],
    required: true,
    itemId: null,
  },

  // ===== CHAPTER 2 =====
  {
    id: "board",
    chapter: 2,
    text: "간호사들의 최근 야간 근무 시간들이 적혀있다.",
    required: true,
    itemId: "night-duty-log",
  },
  {
    id: "desk",
    chapter: 2,
    text: "알 수 없는 약들이 적혀있다.",
    required: true,
    itemId: "medicine-log",
  },
  {
    id: "books",
    chapter: 2,
    text: ["책들이 쌓여있다.", "책을 뒤져보자."],
    required: true,
    itemId: "m04-medication-record",
  },
  {
    id: "cellphone",
    chapter: 2,
    text: "한 녹취 기록이 저장되어 있다.",
    required: true,
    itemId: "nurse-recording",
  },
  {
    id: "drawer2",
    chapter: 2,
    text: "좌물쇠로 잠겨있어 열리지 않는다.",
    required: true,
    itemId: "director-key",
  },
  {
    id: "sink",
    chapter: 2,
    text: "세면대 물이 나오지 않는다.",
    required: false,
    itemId: null,
  },
  {
    id: "noticeboard",
    chapter: 2,
    text: "오늘의 구내식당 메뉴가 붙어있다.",
    required: false,
    itemId: null,
  },
  {
    id: "shelf",
    chapter: 2,
    text: ["약들이 놓여있다.", "안에는 수상한 액체가 담겨있다."],
    required: false,
    itemId: null,
  },

  // ===== CHAPTER 3 =====

  {
    id: "accident-report",
    chapter: 3,
    text: "파일화한 종이뭉치, 읽어보기 싫은 보고서다.",
    important: false,
    itemId: "accident-report",
  },
  {
    id: "staff-photo",
    chapter: 3,
    text: "이 병원의 구성원들로 보이는 사진, 이 사람들은 어떻게 되었을까.",
    important: false,
    itemId: "staff-photo",
  },
  {
    id: "cctv-photo",
    chapter: 3,
    text: "사건 당일 404호 앞의 CCTV 사진, 이사람은 누구지?",
    important: true,
    itemId: "cctv-photo",
  },
  {
    id: "director-secret-memo",
    chapter: 3,
    text: "이해하기 힘든 지시가 적혀있는 메모, 오래된듯 종이가 삭아있다.",
    important: true,
    itemId: "director-secret-memo",
  },
  {
    id: "restricted-area-card",
    chapter: 3,
    text: "오래되어 보이는 출입카드, 왜인지 피가 묻어있다.",
    important: false,
    itemId: "restricted-area-card",
  },
];
