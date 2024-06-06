
# React Tic-Tac-Toe

A modern implementation of the classic Tic-Tac-Toe game built with React, TypeScript, and Chakra UI. This application allows players to play against each other or against a CPU with an intelligent algorithm. The game is hosted on GitHub Pages.

## Features

- Play against another person or a CPU
- Intelligent CPU player using the minimax algorithm
- Dark and Light mode using Chakra UI
- Game history tracking wins and draws
- Responsive design
- Hosted on GitHub Pages

## Technologies Used

- React
- TypeScript
- Chakra UI
- React Router
- GitHub Pages

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:

```sh
git clone https://github.com/6gal6ler6/react-tic-tac-toe.git
cd react-tic-tac-toe
```

2. Install the dependencies:

```sh
npm install
# or
yarn install
```

3. Start the development server:

```sh
npm start
# or
yarn start
```

The application will be available at `http://localhost:3000`.

### Deployment

To deploy the application to GitHub Pages:

1. Build the application:

```sh
npm run build
# or
yarn build
```

2. Deploy to GitHub Pages:

```sh
npm run deploy
# or
yarn deploy
```

The application will be available at `https://6gal6ler6.github.io/react-tic-tac-toe`.

## Application Structure

### Components

- `App.tsx`: The main application component that sets up routing.
- `Game.tsx`: The main game component that handles game logic, state management, and rendering.
- `Board.tsx`: The component that renders the game board.
- `Square.tsx`: The component that renders each square on the board.
- `OpponentSelection.tsx`: The component that allows the user to select the opponent (Player or CPU).

### Concepts Applied

#### 1. React Components

The application is broken down into reusable components, each responsible for a specific part of the UI and logic.

#### 2. State Management

State management is handled using the `useState` and `useEffect` hooks. The game state, including the current board, the next player, and whether the game is over, is managed within the `Game` component.

#### 3. Routing

React Router is used for navigation within the application. The `HashRouter` component is used to ensure compatibility with GitHub Pages.

#### 4. Minimax Algorithm

The CPU opponent uses the minimax algorithm to make intelligent moves. The algorithm recursively evaluates possible game states to choose the optimal move.

#### 5. Context API

The Context API is used to manage global state for tracking game history, including wins and draws.

#### 6. Chakra UI

Chakra UI is used for styling and theming. The application supports both dark and light modes.

#### 7. Deployment to GitHub Pages

The application is deployed to GitHub Pages using the `gh-pages` package. The `homepage` field in `package.json` is configured to ensure the application works correctly on GitHub Pages.

## Project Structure

```
react-tic-tac-toe/
│
├── public/
│   ├── index.html
│   └── ...
│
├── src/
│   ├── components/
│   │   ├── Board.tsx
│   │   ├── Game.tsx
│   │   ├── OpponentSelection.tsx
│   │   ├── Square.tsx
│   │   └── ...
│   ├── context/
│   │   ├── GameContext.tsx
│   ├── App.tsx
│   ├── index.tsx
│   ├── theme.ts
│   └── ...
│
├── .gitignore
├── package.json
├── README.md
└── ...
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
