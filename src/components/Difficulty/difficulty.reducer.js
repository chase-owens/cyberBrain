import SET_DIFFICULTY from './difficulty.actions';
import DifficultyOptions from './difficulty.actions';

const { EASY } = DifficultyOptions;

export const difficultyReducer = (state = EASY, action) => {
  switch (action.type) {
    case SET_DIFFICULTY:
      return Object.assign({}, state, {
        difficulty: action.difficulty
      });
    default:
      return state;
  }
};
