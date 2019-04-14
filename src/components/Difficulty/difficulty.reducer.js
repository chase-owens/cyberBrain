import SET_DIFFICULTY from './difficulty.actions';
import DifficultyOptions from './difficulty.actions';

const initialState = {
  difficulty: DifficultyOptions.EASY
};

export const difficultyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DIFFICULTY:
      return Object.assign({}, state, {
        difficulty: action.difficulty
      });
    default:
      return state;
  }
};
