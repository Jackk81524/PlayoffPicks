import { PicksContext } from '../../../Context/PicksContext';
import { useSetGameResult } from '../../../Hooks/useSetGameResult';
import Picker from '../../Home/Picker';
import LoadingSpinner from '../../Spinner';
import './index.scss';

import React, { useContext, useEffect, useState } from 'react'

const SetResult = () => {
  const { weeksList, weeksData, loading, error, url } = useContext(PicksContext);
  const { setGameResult, loading: submitLoading, error: submitError } = useSetGameResult();

  const [ selectedWeek, setSelectedWeek ] = useState('');
  const [ selectedGame, setSelectedGame ] = useState('');
  const [ selectedWinner, setSelectedWinner ] = useState('');
  const [ gamesDict, setGamesDict] = useState([]);

  useEffect(() => {
    if (!loading) {
        setSelectedWeek(weeksList[0]);
    }
  }, [weeksList]);

  useEffect(() => {
    if(selectedWeek !== '' 
      && weeksData[selectedWeek] 
      && weeksData[selectedWeek].Games) {
      setSelectedGame(Object.keys(weeksData[selectedWeek].Games)[0]);
      setGamesDict(weeksData[weeksList[0]].Games)
    }
  }, [selectedWeek])

  useEffect(() => {
    if(selectedGame !== '' 
      && gamesDict[selectedGame]) {
      setSelectedWinner(gamesDict[selectedGame].team1);
    }
  }, [selectedGame])

  const handleSubmission = async () => {
    await setGameResult(url + 'addResult', selectedWeek, selectedGame, selectedWinner);
  }

  if(loading) return <p><LoadingSpinner /></p>
  if(error) return <p>Error: {error}</p>

  return (
    <div className='settings-child'>
      <select className="dropdown" value={selectedWeek} onChange={(e) => setSelectedWeek(e.target.value)}>
                {weeksList && weeksList.map((week, index) => (
                    <option className='option' key={index} value={week}>
                        {week}
                    </option>
                ))}
      </select>
      <select className="dropdown" value={selectedGame} onChange={(e) => setSelectedGame(e.target.value)}>
                {gamesDict && Object.entries(gamesDict).map((game, index) => (
                    <option className='option' key={index} value={game[0]}>
                        {game[1].team1} vs {game[1].team2}
                    </option>
                ))}
      </select>
      {gamesDict && selectedGame && gamesDict[selectedGame] &&
        <select className="dropdown" value={selectedWinner} onChange={(e) => setSelectedWinner(e.target.value)}>
          <option className="option" value={gamesDict[selectedGame].team1}>
            {gamesDict[selectedGame].team1}
          </option>
          <option className="option" value={gamesDict[selectedGame].team2}>
            {gamesDict[selectedGame].team2}
          </option>
        </select>
      }
      <button className='submission' onClick={handleSubmission} disabled={false}>
          {submitLoading ? (
              <LoadingSpinner /> 
          ) : (
              `Submit`
          )}
      </button>
      <div className='result-message'>
        {submitError && <p className="error">{submitError.message}</p>}
      </div>
    </div>
  )
}

export default SetResult