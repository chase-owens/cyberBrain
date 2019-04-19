import React from 'react';
import SnackBar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import { theme } from '../../styles/theme/theme';

import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { winner: state.tictactoeState.win };
};

const WinMessage = ({ open, handleCloseWinMessage, winner }) => {
  let winMessage;
  winner === null && (winMessage = "Kiss your cousin, it's a tie");
  winner !== null &&
    (winner ? (winMessage = 'You Win!!') : (winMessage = 'Computer Wins!!'));

  return (
    <SnackBar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={open}
      onClose={handleCloseWinMessage}
      autoHideDuration={5500}
      message={
        <span style={{ color: theme.palette.text.light }} id='win-message-id'>
          {winMessage}
        </span>
      }
      action={[
        <IconButton
          key='close'
          aria-label='Close'
          onClick={handleCloseWinMessage}
        >
          <i style={{ color: theme.palette.error.main }} class='material-icons'>
            close
          </i>
        </IconButton>
      ]}
    />
  );
};

export default connect(mapStateToProps)(WinMessage);
