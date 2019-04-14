export const addPlayerWin = winner => ({
  type: ADD_PLAYER_WIN,
  winner
});

export const addComputerWin = winner => ({
  type: ADD_COMPUTER_WIN,
  winner
});

export const ADD_COMPUTER_WIN = 'ADD_COMPUTER_WIN';
export const ADD_PLAYER_WIN = 'ADD_PLAYER_WIN';
