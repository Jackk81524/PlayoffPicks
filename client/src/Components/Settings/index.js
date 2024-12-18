import AddGame from './AddGame';
import './index.scss';
import React, { useEffect, useState } from 'react'
import SetResult from './SetResult';
import AddWeek from './AddWeek';

const Settings = () => {
    const [addGameView, setAddGameView] = useState(true);
    const [addWeekView, setAddWeekView] = useState(null);
    const [resultView, setResultView] = useState(null);
    
    const handleAddGame = () => {
        setAddGameView(true);
        setAddWeekView(false);
        setResultView(false);
    };

    const handleAddWeek = () => {
        setAddGameView(false);
        setAddWeekView(true);
        setResultView(false);
    };

    const handleSetResult = () => {
        setAddGameView(false);
        setAddWeekView(false);
        setResultView(true);
    };

    return (
        <div className='settings-page'>
            <div className='settings-toggle'>
                <button onClick={handleAddGame}>Add Game</button>
                <button onClick={handleAddWeek}>Add Week</button>
                <button onClick={handleSetResult}>Set Result</button>
            </div>
            {addGameView && 
                <div>
                    <AddGame />
                </div>
            }
            {addWeekView && 
                <div>
                    <AddWeek />
                </div>
            }
            {resultView && 
                <div>
                    <SetResult />
                </div>
            }
        </div>
    )
}

export default Settings