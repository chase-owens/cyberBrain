import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { flipCard, updateGameState } from './TicTacToe.action';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TTCCard from '../Card/TTCCard';
import Difficulty from '../Difficulty/Difficulty';
import ScoreBoard from '../ScoreBoard/ScoreBoard';
import WinMessage from '../WinMessage/WinMessage';

import { theme } from '../../styles/theme/theme';

const mapStateToProps = state => {
  console.log('STATE: ', state);
  return {
    cardArray2: state.tictactoeState.cards,
    win2: state.tictactoeState.win
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ flipCard, updateGameState }, dispatch);
};

class TicTacToe extends Component {
  state = {
    cardArray: [
      { isFlipped: false, mark: '' },
      { isFlipped: false, mark: '' },
      { isFlipped: false, mark: '' },
      { isFlipped: false, mark: '' },
      { isFlipped: false, mark: '' },
      { isFlipped: false, mark: '' },
      { isFlipped: false, mark: '' },
      { isFlipped: false, mark: '' },
      { isFlipped: false, mark: '' }
    ],
    player1: true,
    difficulty: 'easy',
    win: { someoneHasWon: false, whoHasWon: null },
    player1Wins: 0,
    computerWins: 0,
    open: false
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    this.state.win !== prevState.win &&
      this.state.win.someoneHasWon !== false &&
      this.setState({ open: true });

    this.state.cardArray !== prevState.cardArray &&
      console.log('Should check for win');

    this.state.player1 !== prevState.player1 &&
      this.state.player1 === false &&
      this.getComputerMove();
  }

  render() {
    const { cardArray2, win2 } = this.props;
    console.log(cardArray2, win2);
    return (
      <section>
        <Grid
          style={{
            paddingTop: 40,
            paddingBottom: 10,
            width: 363,
            margin: 'auto'
          }}
          container
          justify='space-between'
        >
          <Grid item>
            <Difficulty
              changeDifficulty={this.changeDifficulty}
              difficulty={this.state.difficulty}
            />
          </Grid>
          <Grid item>
            <Button
              onClick={this.resetGame}
              style={{
                marginTop: 8,
                backgroundColor: theme.palette.text.light,
                border: 'thin solid black'
              }}
            >
              New Game
            </Button>
          </Grid>
        </Grid>
        <Grid
          style={{
            width: 363,
            height: 363,
            margin: 'auto'
          }}
          container
          justify='space-between'
          spacing={8}
        >
          {this.state.cardArray.map((card, i) => (
            <Grid key={i} item style={{ width: '30.3%' }}>
              <TTCCard
                value={i}
                card={card}
                handleCardClick={this.handleCardClick}
              />
            </Grid>
          ))}
        </Grid>
        <Grid
          style={{
            width: 363,
            margin: 'auto'
          }}
          section
        >
          <ScoreBoard
            player1Wins={this.state.player1Wins}
            computerWins={this.state.computerWins}
          />
        </Grid>
        <WinMessage
          open={this.state.open}
          handleCloseWinMessage={this.handleCloseWinMessage}
          winner={this.state.win.whoHasWon}
        />
      </section>
    );
  }

  handleCardClick = e => {
    let player1 = this.state.player1;
    let win = this.state.win.someoneHasWon;
    if (player1 && !win) {
      this.play(e);
    }
  };

  handleCloseWinMessage = (evt, reason) => {
    setTimeout(() => {
      this.setState({ open: false });
    }, 400);
  };

  getComputerMove = () => {
    if (
      this.state.win.someoneHasWon === false &&
      this.getOpenSpaces().length > 0
    ) {
      setTimeout(() => {
        if (this.state.player1 === false) {
          switch (this.state.difficulty) {
            case 'easy':
              this.easyPlay();
              break;
            case 'difficult':
              this.difficultPlay();
              break;
            default:
              this.impossiblePlay();
              break;
          }
        }
      }, this.getRandomNumber(4) * 100);
    }
  };

  resetGame = () => {
    let cardArray = [
      { isFlipped: false, mark: '' },
      { isFlipped: false, mark: '' },
      { isFlipped: false, mark: '' },
      { isFlipped: false, mark: '' },
      { isFlipped: false, mark: '' },
      { isFlipped: false, mark: '' },
      { isFlipped: false, mark: '' },
      { isFlipped: false, mark: '' },
      { isFlipped: false, mark: '' }
    ];
    this.setState({
      cardArray,
      player1: true,
      win: { someoneHasWon: false, whoHasWon: null }
    });
  };

  // -> T/F
  checkTheseThreeForAWin = moves => {
    let win = false;
    let firstTwoIndiciesLineUp = this.checkIfOnSameLine(moves[0], moves[1]);
    if (
      firstTwoIndiciesLineUp !== null &&
      firstTwoIndiciesLineUp === moves[2]
    ) {
      win = true;
    }
    return win;
  };

  // -> T/F - SetState win, player1
  checkForWin = () => {
    let moves = this.getMovesPlayed();
    let player1Moves = moves[0];
    let win = false;

    switch (player1Moves.length) {
      case 3:
        win = this.checkTheseThreeForAWin(player1Moves);
        win &&
          this.setState((prevState, props) => ({
            win: { someoneHasWon: true, whoHasWon: true },
            player1Wins: prevState.player1Wins + 1
          }));
        break;
      case 4:
        win = this.checkTheseThreeForAWin([
          player1Moves[0],
          player1Moves[1],
          player1Moves[2]
        ]);
        !win &&
          (win = this.checkTheseThreeForAWin([
            player1Moves[1],
            player1Moves[2],
            player1Moves[3]
          ]));
        !win &&
          (win = this.checkTheseThreeForAWin([
            player1Moves[0],
            player1Moves[1],
            player1Moves[3]
          ]));
        !win &&
          (win = this.checkTheseThreeForAWin([
            player1Moves[0],
            player1Moves[2],
            player1Moves[3]
          ]));
        win &&
          this.setState((prevState, props) => ({
            win: { someoneHasWon: true, whoHasWon: true },
            player1Wins: prevState.player1Wins + 1
          }));
        break;
      case 5:
        win = this.checkTheseThreeForAWin([
          player1Moves[0],
          player1Moves[1],
          player1Moves[2]
        ]);
        !win &&
          (win = this.checkTheseThreeForAWin([
            player1Moves[1],
            player1Moves[2],
            player1Moves[3]
          ]));
        !win &&
          (win = this.checkTheseThreeForAWin([
            player1Moves[0],
            player1Moves[1],
            player1Moves[3]
          ]));
        !win &&
          (win = this.checkTheseThreeForAWin([
            player1Moves[0],
            player1Moves[2],
            player1Moves[3]
          ]));
        !win &&
          (win = this.checkTheseThreeForAWin([
            player1Moves[0],
            player1Moves[1],
            player1Moves[4]
          ]));
        !win &&
          (win = this.checkTheseThreeForAWin([
            player1Moves[0],
            player1Moves[2],
            player1Moves[4]
          ]));
        !win &&
          (win = this.checkTheseThreeForAWin([
            player1Moves[0],
            player1Moves[3],
            player1Moves[4]
          ]));
        !win &&
          (win = this.checkTheseThreeForAWin([
            player1Moves[1],
            player1Moves[2],
            player1Moves[4]
          ]));
        !win &&
          (win = this.checkTheseThreeForAWin([
            player1Moves[1],
            player1Moves[3],
            player1Moves[4]
          ]));
        !win &&
          (win = this.checkTheseThreeForAWin([
            player1Moves[2],
            player1Moves[3],
            player1Moves[4]
          ]));
        win &&
          this.setState((prevState, props) => ({
            win: { someoneHasWon: true, whoHasWon: true },
            player1Wins: prevState.player1Wins + 1
          }));
        break;
      default:
        break;
    }

    const gameOver = this.getOpenSpaces().length;

    !win &&
      gameOver === 0 &&
      this.setState({ win: { someoneHasWon: null, whoHasWon: null } });

    !win &&
      gameOver !== 0 &&
      this.setState((prevState, props) => ({
        player1: !prevState.player1
      }));

    if (win || gameOver === 0) {
      return true;
    } else {
      return false;
    }
  };

  play = index => {
    let cardArray = this.state.cardArray;
    const mark = this.state.player1 ? 'x' : 'o';
    let card = { isFlipped: true, mark: mark };
    cardArray.splice(index, 1, card);
    this.setState({ cardArray }, () => this.checkForWin());
  };

  changeDifficulty = evt => {
    let difficulty = evt.target.value;
    this.setState({ difficulty });
  };

  determineWhereOnBoardFromIndex = index => {
    if (index === 4) {
      return 'center';
    } else if (index % 2 === 1) {
      return 'side';
    } else {
      return 'corner';
    }
  };

  // Finds first move -> [indexOfFirstMove, spot: 'corner', 'side', 'center']
  findFirstMove = () => {
    let indexPlayed = null;
    this.state.cardArray.forEach((move, i) => {
      if (move.mark === 'x') {
        indexPlayed = i;
      }
      return indexPlayed;
    });
    let spot = this.determineWhereOnBoardFromIndex(indexPlayed);
    return [indexPlayed, spot];
  };

  // Check if on same line -> null/other index on line
  checkIfOnSameLine = (move, otherMove) => {
    switch (move) {
      case 0:
        if (
          otherMove === 1 ||
          otherMove === 2 ||
          otherMove === 3 ||
          otherMove === 4 ||
          otherMove === 6 ||
          otherMove === 8
        ) {
          switch (otherMove) {
            case 1:
              return 2;
            case 2:
              return 1;
            case 3:
              return 6;
            case 4:
              return 8;
            case 6:
              return 3;
            case 8:
              return 4;
            default:
              break;
          }
        }
        break;
      case 1:
        if (
          otherMove === 0 ||
          otherMove === 2 ||
          otherMove === 4 ||
          otherMove === 7
        ) {
          switch (otherMove) {
            case 0:
              return 2;
            case 2:
              return 0;
            case 4:
              return 7;
            case 7:
              return 4;
            default:
              break;
          }
        }
        break;
      case 2:
        if (
          otherMove === 0 ||
          otherMove === 1 ||
          otherMove === 4 ||
          otherMove === 5 ||
          otherMove === 6 ||
          otherMove === 8
        ) {
          switch (otherMove) {
            case 0:
              return 1;
            case 1:
              return 0;
            case 4:
              return 6;
            case 5:
              return 8;
            case 6:
              return 4;
            case 8:
              return 5;
            default:
              break;
          }
        }
        break;
      case 3:
        if (
          otherMove === 0 ||
          otherMove === 4 ||
          otherMove === 5 ||
          otherMove === 6
        ) {
          switch (otherMove) {
            case 0:
              return 6;
            case 4:
              return 5;
            case 5:
              return 4;
            case 6:
              return 0;
            default:
              break;
          }
        }
        break;
      case 4:
        if (
          otherMove === 0 ||
          otherMove === 1 ||
          otherMove === 2 ||
          otherMove === 3 ||
          otherMove === 5 ||
          otherMove === 6 ||
          otherMove === 7 ||
          otherMove === 8
        ) {
          switch (otherMove) {
            case 0:
              return 8;
            case 1:
              return 7;
            case 2:
              return 6;
            case 3:
              return 5;
            case 5:
              return 3;
            case 6:
              return 2;
            case 7:
              return 1;
            case 8:
              return 0;
            default:
              break;
          }
        }
        break;
      case 5:
        if (
          otherMove === 2 ||
          otherMove === 3 ||
          otherMove === 4 ||
          otherMove === 8
        ) {
          switch (otherMove) {
            case 2:
              return 8;
            case 3:
              return 4;
            case 4:
              return 3;
            case 8:
              return 2;
            default:
              break;
          }
        }
        break;
      case 6:
        if (
          otherMove === 0 ||
          otherMove === 2 ||
          otherMove === 3 ||
          otherMove === 4 ||
          otherMove === 7 ||
          otherMove === 8
        ) {
          switch (otherMove) {
            case 0:
              return 3;
            case 2:
              return 4;
            case 3:
              return 0;
            case 4:
              return 2;
            case 7:
              return 8;
            case 8:
              return 7;
            default:
              break;
          }
        }
        break;
      case 7:
        if (
          otherMove === 1 ||
          otherMove === 4 ||
          otherMove === 6 ||
          otherMove === 8
        ) {
          switch (otherMove) {
            case 1:
              return 4;
            case 4:
              return 1;
            case 6:
              return 8;
            case 8:
              return 6;
            default:
              break;
          }
        }
        break;
      case 8:
        if (
          otherMove === 0 ||
          otherMove === 2 ||
          otherMove === 4 ||
          otherMove === 5 ||
          otherMove === 6 ||
          otherMove === 7
        ) {
          switch (otherMove) {
            case 0:
              return 4;
            case 2:
              return 5;
            case 4:
              return 0;
            case 5:
              return 2;
            case 6:
              return 7;
            case 7:
              return 6;
            default:
              break;
          }
        }
        break;
      default:
        return null;
    }
    return null;
  };

  // Check if spot on line is open -> t/f
  checkIfOtherSpotOnTheLineIsOpen = (indexOfInterest, moves) => {
    return !moves.some(move => move === indexOfInterest);
  };

  // Get indicies played -> [player1, computer]
  getMovesPlayed = () => {
    let player1Moves = null;
    let computerMoves = null;
    this.state.cardArray.map((move, i) => {
      if (move.mark === 'x' && player1Moves !== null) {
        player1Moves.push(i);
      } else if (move.mark === 'x') {
        player1Moves = [i];
      }
      if (move.mark === 'o' && computerMoves !== null) {
        computerMoves.push(i);
      } else if (move.mark === 'o') {
        computerMoves = [i];
      }
      return null;
    });
    return [player1Moves, computerMoves];
  };

  // Check if risk losing -> null/index to block win
  checkRiskLosing = () => {
    let allMoves = this.getMovesPlayed();
    let player1Moves = allMoves[0];
    let computerMoves = allMoves[1];
    let blockingMove = null;

    if (computerMoves !== null) {
      let player1MovesSorted = player1Moves.sort();

      player1MovesSorted.forEach((move, i) => {
        player1MovesSorted.forEach(otherMove => {
          if (otherMove > move) {
            let areOnALine = this.checkIfOnSameLine(move, otherMove);
            if (areOnALine !== null) {
              if (
                this.checkIfOtherSpotOnTheLineIsOpen(areOnALine, computerMoves)
              ) {
                blockingMove = areOnALine;
              }
            }
          }
        });
      });
    }
    return blockingMove;
  };

  // Check if going to win -> null/index to win
  checkIfCanWin = () => {
    let allMoves = this.getMovesPlayed();
    let player1Moves = allMoves[0];
    let computerMoves = allMoves[1];
    let winningMove = null;

    if (computerMoves !== null) {
      let computerMovesSorted = computerMoves.sort();
      computerMovesSorted.forEach((move, i) => {
        computerMovesSorted.forEach(otherMove => {
          if (otherMove > move) {
            let areOnALine = this.checkIfOnSameLine(move, otherMove);
            if (areOnALine !== null) {
              if (
                this.checkIfOtherSpotOnTheLineIsOpen(areOnALine, player1Moves)
              ) {
                winningMove = areOnALine;
              }
            }
          }
        });
      });
    }
    return winningMove;
  };

  // Get all open spaces -> []
  getOpenSpaces = () => {
    const possibleSpaces = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let openSpaces;
    let allMoves = this.getMovesPlayed();
    if (allMoves[0] === null && allMoves[1] === null) {
      allMoves = null;
    } else if (allMoves[0] === null && allMoves[1] !== null) {
      allMoves = allMoves[1];
    } else if (allMoves[0] !== null && allMoves[1] === null) {
      allMoves = allMoves[0];
    } else {
      allMoves = allMoves[0].concat(allMoves[1]);
    }
    openSpaces = possibleSpaces.filter(
      number => !allMoves.some(num => num === number)
    );

    return openSpaces;
  };

  // Get random number up to n(th) index
  // Can be anything from 0 to max - 1
  getRandomNumber = max => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  // Get random value from an array
  selectRandomPlaceToPlay = arrayOfOpenPlacesToPlay => {
    return arrayOfOpenPlacesToPlay[
      this.getRandomNumber(arrayOfOpenPlacesToPlay.length)
    ];
  };

  // Returns nothing
  // Plays a random play
  playRandomSquare = () => {
    let num = this.selectRandomPlaceToPlay(this.getOpenSpaces());
    this.play(num);
  };

  // investigates wether a common tactic is being deployed
  // -> null if no tactic discovered || num to counter if tactic is discovered
  combatCommonTactics = () => {
    let moves = this.getMovesPlayed();
    let counterMove;
    let player1Moves = moves[0];
    let computerMoves = moves[1];
    counterMove = this.susceptibleToTriangleTactic(player1Moves, computerMoves);

    counterMove === null &&
      (counterMove = this.susceptibleToEncirclementTactic(player1Moves));

    counterMove === null &&
      (counterMove = this.susceptibleToArrowheadTactic(player1Moves));

    return counterMove;
  };

  // check if susceptible to triangle tactic (center + corner)
  // -> null if not, counter move if susceptible
  susceptibleToTriangleTactic = (player1Moves, computerMoves) => {
    let wherePlayer1Is = null;
    let counterMove = null;
    let onCorner = false;
    let onCenter = player1Moves.some(move => move === 4);
    if (onCenter) {
      player1Moves
        .filter(move => move !== 4)
        .forEach(move => {
          switch (move) {
            case 0:
              onCorner = 0;
              break;
            case 2:
              onCorner = 2;
              break;
            case 6:
              onCorner = 6;
              break;
            case 8:
              onCorner = 8;
              break;
            default:
              onCorner = false;
              break;
          }
        });
    }

    onCenter && onCorner && (wherePlayer1Is = [4, onCorner]);

    wherePlayer1Is !== null &&
      (counterMove = this.selectRandomPlaceToPlay(
        this.getFreeCorners(onCorner, computerMoves)
      ));

    return counterMove;
  };

  // check if susceptible to encirclement tactic (opposing corners)
  // -> null if not, counter move if susceptible
  susceptibleToEncirclementTactic = player1Moves => {
    let counterMove = null;
    let onCorners = player1Moves.every(move => move % 2 === 0 && move !== 4);
    if (onCorners) {
      counterMove = this.selectRandomPlaceToPlay([1, 3, 5, 7]);
    }
    return counterMove;
  };

  // check if susceptible to encirclement tactic (opposing corners)
  // -> null if not, counter move if susceptible
  susceptibleToArrowheadTactic = player1Moves => {
    let counterMove = null;
    let player1MovesSum = player1Moves[0] + player1Moves[1];
    let onSides = player1Moves.every(move => move % 2 === 1);
    if (onSides) {
      switch (player1MovesSum) {
        case 4:
          counterMove = 0;
          break;
        case 6:
          counterMove = 2;
          break;
        case 10:
          counterMove = 6;
          break;
        case 12:
          counterMove = 8;
          break;
        default:
          break;
      }
    }
    return counterMove;
  };

  // returns [] of open corners based on arguments provided (int, [])
  getFreeCorners = (cornerPlayer1IsOn, computerMoves) => {
    let possibleCorners = [0, 2, 6, 8];
    let cornersLeft = possibleCorners.filter(
      corner => corner !== cornerPlayer1IsOn
    );
    let cornersComputerIsOn = computerMoves.filter(
      move => move % 2 === 0 && move !== 4
    );
    let openCorners = cornersLeft.filter(corner => {
      let existingCorner;
      cornersComputerIsOn.forEach(cornerTaken => {
        if (corner !== cornerTaken) {
          existingCorner = true;
        }
      });
      return existingCorner;
    });
    return openCorners;
  };

  easyPlay = () => {
    let win = this.checkIfCanWin();
    if (win !== null) {
      this.play(win);
      this.setState((prevState, props) => ({
        win: { someoneHasWon: true, whoHasWon: false },
        computerWins: prevState.computerWins + 1
      }));
    } else {
      this.playRandomSquare();
    }
  };

  difficultPlay = () => {
    let win = this.checkIfCanWin();
    if (win !== null) {
      this.play(win);
      this.setState((prevState, props) => ({
        win: { someoneHasWon: true, whoHasWon: false },
        computerWins: prevState.computerWins + 1
      }));
    } else {
      let block = this.checkRiskLosing();
      if (block !== null) {
        this.play(block);
      } else {
        this.playRandomSquare();
      }
    }
  };

  impossiblePlay = () => {
    // Handle opening move
    let moves = this.getMovesPlayed();
    if (moves[0].length === 1) {
      let firstMove = this.findFirstMove();
      if (firstMove[1] !== 'center') {
        this.play(4);
      } else {
        this.play(this.selectRandomPlaceToPlay([0, 2, 6, 8]));
      }
    } else if (moves[0].length === 2) {
      // Win or Block
      let win = this.checkIfCanWin();
      if (win !== null) {
        this.play(win);
        this.setState((prevState, props) => ({
          win: { someoneHasWon: true, whoHasWon: false },
          computerWins: prevState.computerWins + 1
        }));
      } else {
        let block = this.checkRiskLosing();
        if (block !== null) {
          this.play(block);
        } else {
          let counterMove = this.combatCommonTactics();
          if (counterMove !== null) {
            this.play(counterMove);
          } else {
            this.playRandomSquare();
          }
        }
      }
    } else {
      this.difficultPlay();
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicTacToe);
