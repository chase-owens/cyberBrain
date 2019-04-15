import { combineReducers } from 'redux';
import winMessageReducer from './components/WinMessage/winMessage.reducer';
import scoreboardReducer from './components/ScoreBoard/scoreboard.reducer';
import tictactoeReducer from './components/TicTacToeBoard/tictactoe.reducer';
import difficultyReducer from './components/Difficulty/difficulty.reducer';

const ticTacToeApp = combineReducers({
  winMessageState: winMessageReducer,
  scoreboardState: scoreboardReducer,
  tictactoeState: tictactoeReducer,
  difficultyState: difficultyReducer
});

export default ticTacToeApp;
