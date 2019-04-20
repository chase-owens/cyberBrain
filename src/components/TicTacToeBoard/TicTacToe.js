import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  updateCards,
  setComputerMove,
  resetGame,
  declareWin,
  changeTurn
} from './TicTacToe.action';
import { addComputerWin, addPlayerWin } from '../ScoreBoard/scoreboard.action';
import { toggleWinMessage } from '../WinMessage/winMessage.action';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TTCCard from '../Card/TTCCard';
import Difficulty from '../Difficulty/Difficulty';
import ScoreBoard from '../ScoreBoard/ScoreBoard';
import WinMessage from '../WinMessage/WinMessage';

import { theme } from '../../styles/theme/theme';

const mapStateToProps = state => {
  return {
    cards: state.tictactoeState.cards,
    win: state.tictactoeState.win,
    player1: state.tictactoeState.player1,
    difficultyState: state.difficultyState
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateCards,
      setComputerMove,
      declareWin,
      addComputerWin,
      addPlayerWin,
      toggleWinMessage,
      resetGame,
      changeTurn
    },
    dispatch
  );
};

class TicTacToe extends Component {
  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    // Handle Win
    if (this.props.win !== prevProps.win && this.props.win !== null) {
      switch (this.props.win) {
        case 'WIN':
          this.props.addPlayerWin();
          this.props.toggleWinMessage();
          break;
        case 'LOSE':
          this.props.addComputerWin();
          this.props.toggleWinMessage();
          break;
        case 'TIE':
          this.props.toggleWinMessage();
          break;
        default:
          return;
      }
    }

    this.props.cards !== prevProps.cards && this.checkForWin();

    // Get Computer Move
    this.props.player1 !== prevProps.player1 &&
      this.props.player1 === false &&
      this.getComputerMove();
  }

  render() {
    const { cards } = this.props;
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
            <Difficulty />
          </Grid>
          <Grid item>
            <Button
              onClick={this.props.resetGame}
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
          {cards !== undefined &&
            cards.map((card, i) => (
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
          <ScoreBoard />
        </Grid>
        <WinMessage />
      </section>
    );
  }

  handleCardClick = e => {
    if (this.props.player1 && this.props.win === null) {
      this.play(e);
    }
  };

  getComputerMove = () => {
    if (this.props.win === null && this.getOpenSpaces().length > 0) {
      if (this.props.player1 === false) {
        switch (this.props.difficultyState) {
          case 'EASY':
            this.easyPlay();
            break;
          case 'DIFFICULT':
            this.difficultPlay();
            break;
          case 'IMPOSSIBLE':
            this.impossiblePlay();
            break;
          default:
            return;
        }
      }
    }
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
        win && this.props.declareWin('WIN');
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
        win && this.props.declareWin('WIN');
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
        win && this.props.declareWin('WIN');
        break;
      default:
        break;
    }

    const gameOver = this.getOpenSpaces().length;

    !win && gameOver === 0 && this.props.declareWin('TIE');

    !win && gameOver !== 0 && this.props.changeTurn();

    if (win || gameOver === 0) {
      return true;
    } else {
      return false;
    }
  };

  play = index => {
    const mark = this.props.player1 ? 'x' : 'o';
    let cards = this.props.cards.slice(0);
    let card = { isFlipped: true, mark: mark };
    cards.splice(index, 1, card);
    console.log(this.props.player1);
    this.props.player1
      ? this.props.updateCards(cards)
      : this.props.setComputerMove(cards);
    // this.checkForWin();
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
    this.props.cards.forEach((move, i) => {
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
    this.props.cards.map((move, i) => {
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
      this.props.declareWin('LOSE');
    } else {
      this.playRandomSquare();
    }
  };

  difficultPlay = () => {
    let win = this.checkIfCanWin();
    if (win !== null) {
      this.play(win);
      this.props.declareWin('LOSE');
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
        this.props.declareWin('LOSE');
        addComputerWin();
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
