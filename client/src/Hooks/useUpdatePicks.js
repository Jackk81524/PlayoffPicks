import { useState, useEffect } from 'react';

export const useSetPicks = () => {
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);


    const setPicks = async (url, Week, GameId, User, Pick) => {
        try {
            setLoading(true);

            const data = {
                "Week" : Week,
                "GameId" : GameId,
                "User" : User,
                "Pick" : Pick
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

            await new Promise(resolve => setTimeout(resolve, 500));

            setResult(res.result);

        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { setPicks, loading, error };
};