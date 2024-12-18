import AddGame from './AddGame';
import './index.scss';
import React, { useEffect, useState } from 'react'
import SetResult from './SetResult';
import AddWeek from './AddWeek';

const Settings = () => {
    const [addGameView, setAddGameView] = useState(true);
    const [addWeekView, setAddWeekView] = useState(false);
    const [resultView, setResultView] = useState(false);
    
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
                <button className={`settings-box ${addGameView ? 'active' :  ''}`} onClick={handleAddGame}>Add Game</button>
                <button className={`settings-box ${addWeekView ? 'active' :  ''}`} onClick={handleAddWeek}>Add Week</button>
                <button className={`settings-box ${resultView ? 'active' :  ''}`} onClick={handleSetResult}>Set Result</button>
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