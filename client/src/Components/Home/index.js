import { useContext, useEffect, useState } from 'react'
import './index.scss'
import { PicksContext } from '../../Context/PicksContext';
import Picker from './Picker';
import { useSetPicks } from '../../Hooks/useUpdatePicks';
import { UserContext } from '../../Context/UserContext';
import LoadingSpinner from '../Spinner';
// import 

const Home = () => {
    const { user } = useContext(UserContext);
    const { weeksList, weeksData, loading, error, url } = useContext(PicksContext);
    const [ selectedWeek, setSelectedWeek ] = useState('');

    const { setPicks, loading: submitLoading, error: submitError } = useSetPicks();

    useEffect(() => {
        if (!loading) {
            setSelectedWeek(weeksList[0]);
        }
    }, [weeksList]);

    
    const handleSubmission = async () => {
        for(let game in weeksData[selectedWeek].Games){
            const pick = weeksData[selectedWeek].Games[game].picks[user];
            await setPicks(url + 'updatePick', selectedWeek, game, user, pick)
        }
    }

    if(loading) return <p>Loading...</p>
    if(error) return <p>Error: {error}</p>

    return (
        <div className='home'>
            <select className="dropdown" value={selectedWeek} onChange={(e) => setSelectedWeek(e.target.value)}>
                {weeksList && weeksList.map((week, index) => (
                    <option className='option' key={index} value={week}>
                        {week}
                    </option>
                ))}
            </select>
            <div className='pick'>
                {selectedWeek && weeksData[selectedWeek].Games &&
                    Object.values(weeksData[selectedWeek].Games).map((game, index) => {
                        return (
                        <Picker 
                            key={index} 
                            game={game}
                        />
                        );
                    })
                }
            </div>
            <div>
                
                <button className='submission' onClick={handleSubmission} disabled={submitLoading}>
                    {submitLoading ? (
                        <LoadingSpinner /> 
                    ) : (
                        'Submit'
                    )}
                </button>
                <div className='result-message'>
                    {submitError && <p className="error">{submitError.message}</p>}
                </div>

            </div>
        </div>
    )
}

export default Home