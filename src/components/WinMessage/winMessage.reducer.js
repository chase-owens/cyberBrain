import * as winMessage from './winMessage.action';

const initialState = {
  open: false
};

const winMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case winMessage.TOGGLE_MESSAGE:
      return Object.assign({}, state, {
        open: !state.open
      });
    default:
      return state;
  }
};

export default winMessageReducer;
