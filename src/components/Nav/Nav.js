import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { theme } from '../../styles/theme/theme';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <AppBar
      style={{
        background: theme.palette.primary.main,
        borderTop: `8px solid ${theme.palette.primary.dark}`
      }}
      className='Nav'
    >
      <Grid container justify='space-between'>
        <Grid item>
          <div className='TextWrap'>
            <Typography
              style={{ color: theme.palette.primary.contrastText }}
              variant='h6'
              className='TitleText'
            >
              # Cyber Brain
            </Typography>
          </div>
        </Grid>
        <Grid item>
          <Grid container justify='space-between'>
            <Grid item>
              <div className='NavButton'>
                <Link style={{ textDecoration: 'none' }} to='/cyberBrain'>
                  <Button
                    style={{
                      color: theme.palette.primary.contrastText
                    }}
                  >
                    Game
                  </Button>
                </Link>
              </div>
            </Grid>
            <Grid item>
              <div className='NavButton'>
                <Link style={{ textDecoration: 'none' }} to='/inspiration'>
                  <Button style={{ color: theme.palette.primary.contrastText }}>
                    Inspiration
                  </Button>
                </Link>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default Nav;
