import { useState, useEffect } from 'react';

export const useFetchWeeks = (url) => {
    const [weeksList, setWeeksList] = useState([]);
    const [weeksData, setWeeksData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   
    // test
    useEffect(() => {
        let isMounted = true; 

        const fetchWeeks = async () => {
            try {
                setLoading(true);

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
        
                const result = await response.json();

                if (isMounted) {
                    const sortedWeeks = Object.entries(result.Weeks)
                        .sort((a, b) => new Date(b[1].startTime) - new Date(a[1].startTime)) // Descending order
                        .map(week => week[0]);
                    
                    setWeeksList(sortedWeeks);
                    setWeeksData(result.Weeks);
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message);
                    setLoading(false);
                }
            }
        };

        fetchWeeks();

        return () => {
            isMounted = false; 
        };
    }, [url]);

    return { weeksList, weeksData, loading, error };
};