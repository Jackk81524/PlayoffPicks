import AddGame from './AddGame';
import './index.scss';
import React, { useEffect, useState, useContext } from 'react'
import SetResult from './SetResult';
import AddWeek from './AddWeek';
import { UserContext } from '../../Context/UserContext';
import { PicksContext } from '../../Context/PicksContext';

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

    const { user } = useContext(UserContext);

    const { url: picksUrl } = useContext(PicksContext);

    const handleResetScores = async () => {
        const confirmed = window.confirm('Are you sure you want to permanently delete all Picks and reset all users\' Wins/Losses to 0? This cannot be undone.');
        if (!confirmed) return;
        // prefer PicksContext url (already includes /api/ in this app),
        // otherwise use REACT_APP_API_URL or default to server port 5001
        const fallback = (process.env.REACT_APP_API_URL || 'http://localhost:5001').replace(/\/$/, '');
        const raw = (picksUrl && picksUrl.toString()) || fallback;
        const baseNoSlash = raw.replace(/\/$/, '');

        // If picksUrl already contains '/api', don't add another one
        let endpoint = baseNoSlash;
        if (!/\/api(\/|$)/.test(baseNoSlash)) endpoint = `${baseNoSlash}/api`;
        endpoint = `${endpoint.replace(/\/$/, '')}/resetScores`;
        try {
            const resp = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user: (user && (user.name || user)) || 'Unknown' })
            });
            const json = await resp.json();
            if (resp.ok) {
                alert('Reset successful');
            } else {
                alert('Reset failed: ' + (json.error || JSON.stringify(json)));
            }
        } catch (err) {
            console.error('resetScores error', err);
            alert('Reset failed. See console for details.');
        }
    };

    return (
        <div className='settings-page'>
            <div className='settings-toggle'>
                <button className={`settings-box ${addGameView ? 'active' :  ''}`} onClick={handleAddGame}>Add Game</button>
                <button className={`settings-box ${addWeekView ? 'active' :  ''}`} onClick={handleAddWeek}>Add Week</button>
                <button className={`settings-box ${resultView ? 'active' :  ''}`} onClick={handleSetResult}>Set Result</button>
            </div>
            
            {user && (user === 'Jack' || (user.name && user.name === 'Jack')) && (
                <div className='settings-reset'>
                    <button className={`reset-button`} onClick={handleResetScores}>Reset All Scores</button>
                </div>
            )}
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