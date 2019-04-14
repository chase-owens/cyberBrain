export const setDifficulty = difficulty => ({
  type: SET_DIFFICULTY,
  difficulty
});

export const SET_DIFFICULTY = 'SET_DIFFICULTY';

export const DifficultyOptions = {
  EASY: 'EASY',
  DIFFICULT: 'DIFFICULT',
  TIE_OR_LOSE: 'TIE_OR_LOSE'
};
