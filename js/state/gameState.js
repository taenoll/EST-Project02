export const gameState = {
  currentScene: "title",
  currentChapter: 0,
  inventory: [],
  checkedObjects: [],
  solvedPuzzles: [],
  unlockedRooms: [],
  usedItems: [],

  introSeen: {
    chapter1: false,
    chapter2: false,
    chapter3: false,
  },

  hintLevel: {
    chapter1: 0,
    chapter2: 0,
    chapter3: 0,
  },

  audio: {
    bgmOn: true,
    sfxOn: true,
  },
};