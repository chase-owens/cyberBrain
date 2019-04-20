export const updateCards = cards => ({
  type: UPDATE_CARDS,
  cards
});

export const declareWin = winner => ({
  type: UPDATE_GAME_STATE,
  win: winner
});

export const resetGame = () => ({
  type: RESET_GAME
});

export const changeTurn = () => ({
  type: CHANGE_PLAYER_TURN
});

export const CHANGE_PLAYER_TURN = 'CHANGE_PLAYER_TURN';
export const RESET_GAME = 'RESET_GAME';
export const UPDATE_CARDS = 'UPDATE_CARDS';
export const UPDATE_GAME_STATE = 'UPDATE_GAME_STATE';
