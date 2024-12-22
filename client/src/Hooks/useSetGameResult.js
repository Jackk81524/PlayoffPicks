import { useState, useEffect } from 'react';

export const useSetGameResult = () => {
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    const setGameResult = async (url, Week, GameId, gameResult) => {
        try {
            setLoading(true);

            const data = {
                "Week" : Week,
                "GameId" : GameId,
                "Result" : gameResult
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

    return { setGameResult, loading, error };
};