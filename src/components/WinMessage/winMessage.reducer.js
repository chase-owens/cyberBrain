import TOGGLE_MESSAGE from './winMessage.action';

const initialState = {
  open: false
};

export const winMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MESSAGE:
      return Object.assign({}, state, {
        open: !state.open
      });
    default:
      return state;
  }
};
