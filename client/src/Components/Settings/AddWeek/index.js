import { PicksContext } from '../../../Context/PicksContext';
import { useAddWeek } from '../../../Hooks/useAddWeek';
import LoadingSpinner from '../../Spinner';
import './index.scss';

import React, { useContext, useState } from 'react'

const AddWeek = () => {
  const { url } = useContext(PicksContext);
  const { addWeek, loading, error } = useAddWeek();

  const [week, setWeek ] = useState('');
  const [startTime, setStartTime] = useState('');

  const handleDateChange = (e) => {
      setStartTime(e.target.value); // Update the state with the selected date
  };

  const handleWeekChange = (e) => {
      setWeek(e.target.value);
  };

  const isSubmitDisabled = () => {
    if(week != '' && startTime != ''){   
      return false
    } else {
      return true;
    }
  }

  const handleSubmission = async () => {
      const newDate = new Date(startTime);
      const startTimeUtc = newDate.toISOString();

      await addWeek(url + 'addWeek', week, startTimeUtc);
      
      setWeek('');
      setStartTime('');
  }

  return (
    <div className='settings-child'>
        <input 
            type="text"
            value={week}
            onChange={handleWeekChange}
            placeholder='Week'
            className='settings-box'
        />
        <input 
            type="datetime-local" 
            value={startTime} 
            onChange={handleDateChange}
            className='settings-box'
        />
        <button className='submission'onClick={handleSubmission} disabled={isSubmitDisabled()}>
            {loading ? (
                <LoadingSpinner /> 
            ) : (
                'Submit'
            )}
        </button>
        <div className='result-message'>
                {error && <p className="error">{error.message}</p>}
        </div>
    </div>
  )
}

export default AddWeek