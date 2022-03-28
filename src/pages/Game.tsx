import React from 'react';

import SevenCardStud from '../components/games/SevenCardStud';
import MineClicker from '../components/games/MineClicker';

type GameType = 'seven-card-stud' | 'mine-clicker';

type Props = {
  game: GameType;
};

const renderGame = (game: GameType) => {
  switch (game) {
    case 'seven-card-stud':
      return <SevenCardStud />;
    case 'mine-clicker':
      return <MineClicker />;
    default:
      return null;
  }
};

function Game({ game }: Props) {
  return <>{renderGame(game)}</>;
}

export default Game;
