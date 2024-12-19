import { useState, useEffect } from 'react';

export const useFetchStandings = (url) => {
    const [usersList, setUsersList] = useState(null);
    const [winsList, setWinsList] = useState(null);
    const [lossList, setLossList] = useState(null);
    const [percentList, setPercentList] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true; 

        const fetchStandings = async () => {
            try {
                setLoading(true);
                
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                
                const result = await response.json();

                if (isMounted) {
                    setUsersList(result.users);
                    setWinsList(result.wins);
                    setLossList(result.losses);
                    setPercentList(result.percentages);
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message);
                    setLoading(false);
                }
            }
        };

        fetchStandings();

        return () => {
            isMounted = false; 
        };
    }, [url]);

    return { usersList, winsList, lossList, percentList, loading, error };
};