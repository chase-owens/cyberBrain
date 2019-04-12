import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const ScoreBoard = ({ player1Wins, computerWins }) => {
  return (
    <Grid container justify='space-between' style={{ width: '100%' }}>
      <Grid item>
        <TextField
          id='user-score'
          label='User Wins'
          value={player1Wins}
          margin='normal'
          variant='outlined'
          style={{ width: 150, height: 70 }}
        />
      </Grid>
      <Grid item>
        <TextField
          id='computer-score'
          label='Robo Wins'
          value={computerWins}
          margin='normal'
          variant='outlined'
          style={{ width: 150, height: 70 }}
        />
      </Grid>
    </Grid>
  );
};

export default ScoreBoard;
