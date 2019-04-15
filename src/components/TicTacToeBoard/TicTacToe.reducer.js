import * as game from './TicTacToe.action';

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
  ],
  win: { someoneHasWon: false, whoHasWon: null }
};

const tictactoeReducer = (state = initialState, action) => {
  const play = { isFlipped: true, mark: action.mark };
  switch (action.type) {
    case game.FLIP_CARD:
      return Object.assign({}, state, {
        cards: state.cards.splice(action.index, 1, play)
      });
    case game.RESET_CARDS:
      return Object.assign({}, state, {
        cards: initialState
      });
    case game.UPDATE_GAME_STATE:
      return Object.assign({}, state, {
        win: {
          someoneHasWon: action.someoneHasWon,
          whoHasWon: action.whoHasWon
        }
      });
    default:
      return state;
  }
};

export default tictactoeReducer;
