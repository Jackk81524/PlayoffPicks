import { useState, useEffect } from 'react';

export const useAddGame = () => {
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    const addGame = async (url, Week, gameTime, team1, team2) => {
        try {
            setLoading(true);

            const data = {
                "Week" : Week,
                "gameTime" : gameTime,
                "team1" : team1,
                "team2" : team2
            }

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Indicate that the body content is JSON
                    },
                    body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const res = await response.json();

            setResult(res.result);

        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { addGame, loading, error };
};