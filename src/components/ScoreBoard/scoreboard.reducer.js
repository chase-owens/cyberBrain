import * as win from './scoreboard.action';

const initialState = {
  player1Wins: 0,
  computerWins: 0
};

const scoreboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case win.ADD_PLAYER_WIN:
      return Object.assign({}, state, {
        player1Wins: state.player1Wins + 1
      });
    case win.ADD_COMPUTER_WIN:
      return Object.assign({}, state, {
        computerWins: state.computerWins + 1
      });
    default:
      return state;
  }
};

export default scoreboardReducer;