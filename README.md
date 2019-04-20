# Cyber Brain

---

Inspired by [Bird Brain](https://www3.uca.edu/iqzoo/Exhibits/bird_brain.htm).

## Run the app

To run the app [click here](https://chase-owens.github.io/cyberBrain) or follow the steps below.

Clone the repository or download the zipped folder. Then open the terminal and navigate to the project folder, load the dependencies, and run the app with these commands.

```
cd cyberBrain
npm install
npm start
```

## Development

- This progressive web application is built with [React.js](https://reactjs.org).
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- All presentational components use [Material-UI](https://material-ui.com).
- Flip functionality took advantage of open-sourced [ReactCardFlip](https://www.npmjs.com/package/react-card-flip).
- Navigation is accomplished using [React Router Dom](https://www.npmjs.com/package/react-router-dom).
- Data was managed with [Redux](https://redux.js.org).
- Used [Redux Thunk](https://www.npmjs.com/package/redux-thunk) to delay the computer play.

## Offline First

Bootsrapping with Create React App provides offline-first functionality for the production build. To create a production build of the app use the command

```
npm run build
```

instead of

```
npm start
```

## App Overview

Tic-Tac-Toe app. Players can play on easy, hard, or tie-or-lose difficulty levels. On easy, the computer will win if it can or play in a random spot otherwise. On hard, the computer will win if it can, block player from winning, or play a random square. On tie-or-lose, the computer places its first move in the middle if it can or play in a corner otherwise. If the player is deploying the triangle, encirclement, or arrowhead strategy, the computer counters the strategy. Then if follows the rules of the hard difficulty: check if can win, check for blocking move, play random space.
