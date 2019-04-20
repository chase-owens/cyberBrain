import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { theme } from '../../styles/theme/theme';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setDifficulty } from './difficulty.actions';

const mapStateToProps = state => {
  return {
    difficulty: state.difficultyState
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ setDifficulty }, dispatch);
};

const Difficulty = ({ difficulty, setDifficulty }) => {
  return (
    <section style={{ width: 170 }}>
      <FormControl>
        <InputLabel
          style={{ color: theme.palette.text.main }}
          htmlFor='difficulty'
        >
          Difficulty
        </InputLabel>
        <Select
          style={{ width: 200 }}
          id='difficulty'
          value={difficulty}
          onChange={e => setDifficulty(e.target.value)}
        >
          <MenuItem value='EASY'>Easy</MenuItem>
          <MenuItem value='DIFFICULT'>Difficult</MenuItem>
          <MenuItem value='IMPOSSIBLE'>Tie or Lose</MenuItem>
        </Select>
      </FormControl>
    </section>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Difficulty);
