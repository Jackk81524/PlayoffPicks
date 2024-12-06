import { useContext, useEffect, useState } from 'react'
import './index.scss'
import { PicksContext } from '../../Context/PicksContext';
import Picker from './Picker';

const Home = () => {
    const { weeksList, weeksData, loading, error } = useContext(PicksContext);
    const [ selectedWeek, setSelectedWeek ] = useState('')

    useEffect(() => {
        if (!loading) {
            setSelectedWeek(weeksList[0]);
        }
    }, [weeksList]);

    if(loading) return <p>Loading...</p>
    if(error) return <p>Error: {error}</p>

    return (
        <div className='home'>
            <select className="dropdown" value={selectedWeek} onChange={(e) => setSelectedWeek(e.target.value)}>
                {weeksList && weeksList.map((week, index) => (
                    <option key={index} value={week}>
                        {week}
                    </option>
                ))}
            </select>
            <div className='pick'> 
                <Picker team1="Jets" team2="Giants"/>
            </div>
        </div>
    )
}

export default Home