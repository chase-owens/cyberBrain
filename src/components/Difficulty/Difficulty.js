import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { theme } from '../../styles/theme/theme';

const Difficulty = ({ difficulty, changeDifficulty }) => {
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
          onChange={changeDifficulty}
        >
          <MenuItem value='easy'>Easy</MenuItem>
          <MenuItem value='difficult'>Difficult</MenuItem>
          <MenuItem value='impossible'>Tie or Lose</MenuItem>
        </Select>
      </FormControl>
    </section>
  );
};

export default Difficulty;
