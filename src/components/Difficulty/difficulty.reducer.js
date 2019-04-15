import * as difficultyActions from './difficulty.actions';

const { EASY } = difficultyActions.DifficultyOptions;

const difficultyReducer = (state = EASY, action) => {
  switch (action.type) {
    case difficultyActions.SET_DIFFICULTY:
      return Object.assign({}, state, {
        difficulty: action.difficulty
      });
    default:
      return state;
  }
};

export default difficultyReducer;
