import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav/Nav';
import TicTacToe from './components/TicTacToeBoard/TicTacToe';
import Inspiration from './components/Inspiration/Inspiration';
import chicken from './images/chicken.png';
import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './styles/theme/theme';
import { Route } from 'react-router-dom';

class App extends Component {
  state = {};

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div
          style={{
            backgroundImage: `url(${chicken})`,
            height: 'calc(100vh - 87px)',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            marginTop: '87px'
          }}
        >
          <Nav />
          <main>
            <Route exact path='/cyberBrain' render={() => <TicTacToe />} />
            <Route path='/inspiration' render={() => <Inspiration />} />
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
