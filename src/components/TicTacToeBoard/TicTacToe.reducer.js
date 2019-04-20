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
  win: null,
  player1: true
};

const tictactoeReducer = (state = initialState, action) => {
  switch (action.type) {
    case game.UPDATE_CARDS:
      return { ...state, cards: action.cards };
    case game.RESET_GAME:
      return {
        ...state,
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
        win: null,
        player1: true
      };
    case game.UPDATE_GAME_STATE:
      return { ...state, win: action.win };
    case game.CHANGE_PLAYER_TURN:
      return { ...state, player1: !state.player1 };
    default:
      return state;
  }
};

export default tictactoeReducer;
