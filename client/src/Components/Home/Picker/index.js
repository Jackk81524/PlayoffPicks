import React, { useState } from 'react'
import './index.scss'

const Picker = ({team1, team2}) => {
  const [selected, setSelected] = useState(null);

  const handleSelection = (selection) => {
    setSelected(selection === selected ? null : selection);
  };

  return (
    <div className='picker'>
      <button 
        onClick={() => handleSelection(team1)}
        className={`${selected === team1 ? 'selected' : ''} left`}>
          {team1}
      </button>
      <button 
        onClick={() => handleSelection(team2)}
        className={`${selected === team2 ? 'selected' : ''} right`}>
          {team2}
      </button>
    </div>
  )
}

export default Picker