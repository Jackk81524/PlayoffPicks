import { PicksContext } from '../../../Context/PicksContext';
import { useAddGame } from '../../../Hooks/useAddGame';
import LoadingSpinner from '../../Spinner';
import './index.scss';

import React, { useContext, useEffect, useState } from 'react'

const AddGame = () => {
    const { weeksList, url } = useContext(PicksContext);
    const { addGame, loading, error } = useAddGame();

    const [ selectedWeek, setSelectedWeek ] = useState('');
    const [team1, setTeam1 ] = useState('');
    const [team2, setTeam2 ] = useState('');
    const [gameTime, setGameTime] = useState('');

    useEffect(() => {
        if (!loading) {
            setSelectedWeek(weeksList[0]);
        }
    }, [weeksList]);

    const handleDateChange = (e) => {
        setGameTime(e.target.value); // Update the state with the selected date
    };

    const handleTeam1Change = (e) => {
        setTeam1(e.target.value);
    };

    const handleTeam2Change = (e) => {
        setTeam2(e.target.value);
    };

    const handleSubmission = async () => {
        const gameTimeUtc = '';
        if(gameTime != '') {
            const newDate = new Date(gameTime);
            gameTimeUtc = newDate.toISOString();
        }
        await addGame(url + 'addGame', selectedWeek, gameTimeUtc, team1, team2);
        
        setTeam1('');
        setTeam2('');
        setGameTime('');
    }

    return (
        <div className='settings-child'>
            <select className="dropdown" value={selectedWeek} onChange={(e) => setSelectedWeek(e.target.value)}>
                {weeksList && weeksList.map((week, index) => (
                    <option className='option' key={index} value={week}>
                        {week}
                    </option>
                ))}
            </select>
            <input 
                type="text"
                value={team1}
                onChange={handleTeam1Change}
                placeholder='Team 1'
                className='settings-box'
            />
            <input 
                type="text"
                value={team2}
                onChange={handleTeam2Change}
                placeholder='Team 2'
                className='settings-box'
            />
            <input 
                type="datetime-local" 
                value={gameTime} 
                onChange={handleDateChange}
                className='settings-box'
            />
            <button className='submission'onClick={handleSubmission}>
                {loading ? (
                    <LoadingSpinner /> 
                ) : (
                    'Submit'
                )}
            </button>
            <div className='result-message'>
                    {error && <p className="error">{error.message}</p>}
            </div>
        </div>
    )
}

export default AddGame