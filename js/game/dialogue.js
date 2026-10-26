//각 챕터별로 대사를 표현하기 위한 코드입니다.
//사용법은 아래와 같습니다.
// 1. .html에 '<div id="dialogueContainer"></div>' 입력
// 2. 각 챕터의 js코드에 'initDialogue(Dialogues);' 을 입력해줍니다.
// 3. 다이얼로그 함수 선언 예시입니다.

/* const room404Dialogues = [
  {
    name: "주인공",
    text: "여긴 어디지...? 내 기억이 전혀 나지 않아."
  },
  {
    name: "주인공",
    text: "저 문 옆에 404라고 적혀 있네..."
  }
]; */

let currentIndex = 0;
let isTransitioning = false;
let dialogues = [];

// 대화창 생성
function createDialogue() {
  document.querySelector("#dialogueContainer").innerHTML = `
    <div class="dialogue-box" id="dialogueBox">
      <div class="dialogue-portrait">
        <img
          id="dialoguePortrait"
          src="./assets/images/characters/player1.png"
          alt="주인공"
        />
      </div>

      <div class="dialogue-content">
        <p id="dialogueName"></p>
        <p id="dialogueText"></p>
      </div>

      <span id="dialogueNext">CLICK TO CONTINUE ▷</span>
    </div>
  `;
}

// 현재 대사 표시
function showDialogue(dialogues) {
  const dialogue = dialogues[currentIndex];

  if (!dialogue) return;

  document.querySelector("#dialogueName").textContent = dialogue.name;
  document.querySelector("#dialogueText").textContent = dialogue.text;
}

// 다음 대사로 이동
function nextDialogue(dialogues) {
  const content = document.querySelector(".dialogue-content");

  if (isTransitioning) return;

  isTransitioning = true;
  content.classList.add("fade-out");

  setTimeout(() => {
    currentIndex++;

    if (currentIndex >= dialogues.length) {
      document.querySelector("#dialogueBox").style.display = "none";
      isTransitioning = false;
      return;
    }

    showDialogue(dialogues);
    content.classList.remove("fade-out");
    isTransitioning = false;
  }, 250);
}

// 대화창 초기화 및 이벤트 연결
export function initDialogue(dialogueData) {
  dialogues = dialogueData;
  currentIndex = 0;
  isTransitioning = false;

  createDialogue();
  showDialogue(dialogues);

  document
    .querySelector("#dialogueBox")
    .addEventListener("click", () => nextDialogue(dialogues));
}
