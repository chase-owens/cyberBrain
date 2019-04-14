import ADD_COMPUTER_WIN from './scoreboard.action';
import ADD_PLAYER_WIN from './scoreboard.action';

const initialState = {
  player1: 0,
  computerWins: 0
};

export const scoreboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLAYER_WIN:
      return Object.assign({}, state, {
        player1: state.player1 + 1
      });
    case ADD_COMPUTER_WIN:
      return Object.assign({}, state, {
        computerWins: state.computerWins + 1
      });
    default:
      return state;
  }
};
