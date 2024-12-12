import React, { useContext, useEffect, useState } from 'react';
import './index.scss';
import { UserContext } from '../../../Context/UserContext';

const Picker = ({ game }) => {
  const { user } = useContext(UserContext);
  const [selected, setSelected] = useState(game?.picks[user] || null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [result, setResult] = useState(null);

  const handleSelection = (selection) => {
    game.picks[user] = selection === selected ? null : selection;
    setSelected(selection === selected ? null : selection);
  };

  useEffect(() => {
    if (game) {
      const currentDate = new Date();
      const lockDate = new Date(game.gameTime);

      if (currentDate > lockDate || result != null) {
        setIsGameStarted(true);
      }

      if (game.result !== null) {
        setResult(game.result === game.picks[user] ? 'correct' : 'incorrect');
      } else {
        setResult(null);
      }
    }
  }, [game, result]);

  const getButtonClass = (team) => {
    
    if (selected === team) {
      if (result === 'correct') return 'selected correct';
      if (result === 'incorrect') return 'selected incorrect';
      if (result === null) return 'selected pending';
    }
    return '';
  };

  return (
    <div className="picker">
      <button
        onClick={() => handleSelection(game.team1)}
        className={`left ${getButtonClass(game.team1)}`}
        disabled={isGameStarted}
      >
        {game.team1}
      </button>
      <button
        onClick={() => handleSelection(game.team2)}
        className={`right ${getButtonClass(game.team2)}`}
        disabled={isGameStarted}
      >
        {game.team2}
      </button>
    </div>
  );
};

export default Picker;
