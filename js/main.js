// 프로젝트 진입점으로 필요한 모듈의 import와 최초 실행을 작성할 파일입니다.

import "./dom/events.js";
import { renderChapter1 } from "./scenes/chapter1.js";

renderChapter1();







import { renderInventory } from "./dom/renderInventory.js";
import { gameLoad } from "./state/storage.js";

// 저장된 게임 상태 불러오기
gameLoad();

// 복원된 인벤토리를 화면에 표시
renderInventory();