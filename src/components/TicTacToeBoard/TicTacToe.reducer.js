import RESET_CARDS from './TicTacToe.action';
import FLIP_CARD from './TicTacToe.action';

const initialState = {
  cards: [
    { isFlipped: false, mark: '' },
    { isFlipped: false, mark: '' },
    { isFlipped: false, mark: '' },
    { isFlipped: false, mark: '' },
    { isFlipped: false, mark: '' },
    { isFlipped: false, mark: '' },
    { isFlipped: false, mark: '' },
    { isFlipped: false, mark: '' },
    { isFlipped: false, mark: '' }
  ]
};

export const tictactoeReducer = (state = initialState, action) => {
  const play = { isFlipped: true, mark: action.mark };
  switch (action.type) {
    case FLIP_CARD:
      return Object.assign({}, state, {
        cards: state.cards.splice(action.index, 1, play)
      });
    case RESET_CARDS:
      return Object.assign({}, state, {
        cards: initialState
      });
    default:
      return state;
  }
};
