import * as cards from './TicTacToe.action';

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

const tictactoeReducer = (state = initialState, action) => {
  const play = { isFlipped: true, mark: action.mark };
  switch (action.type) {
    case cards.FLIP_CARD:
      return Object.assign({}, state, {
        cards: state.cards.splice(action.index, 1, play)
      });
    case cards.RESET_CARDS:
      return Object.assign({}, state, {
        cards: initialState
      });
    default:
      return state;
  }
};

export default tictactoeReducer;
