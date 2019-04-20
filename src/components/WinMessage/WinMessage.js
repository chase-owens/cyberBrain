import React from 'react';
import SnackBar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import { theme } from '../../styles/theme/theme';
import { toggleWinMessage } from './winMessage.action';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const mapStateToProps = state => {
  return { winner: state.tictactoeState.win, open: state.winMessageState.open };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ toggleWinMessage }, dispatch);
};

const getWinMessage = winner => {
  let winMessage = null;

  switch (winner) {
    case 'TIE':
      winMessage = "Kiss your cousin, it's a tie";
      break;
    case 'WIN':
      winMessage = 'You Win!!';
      break;
    case 'LOSE':
      winMessage = 'Computer Wins!!';
      break;
    default:
      break;
  }
  return winMessage;
};

const WinMessage = ({ open, winner, toggleWinMessage }) => {
  return (
    <SnackBar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={open}
      onClose={toggleWinMessage}
      autoHideDuration={5500}
      message={
        <span style={{ color: theme.palette.text.light }} id='win-message-id'>
          {getWinMessage(winner)}
        </span>
      }
      action={[
        <IconButton key='close' aria-label='Close' onClick={toggleWinMessage}>
          <i style={{ color: theme.palette.error.main }} class='material-icons'>
            close
          </i>
        </IconButton>
      ]}
    />
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WinMessage);
