import React, { useContext } from 'react'
import { UserContext } from '../../Context/UserContext'

const Standings = () => {
  const { user } = useContext(UserContext);

  return (  
    <div>
        Standings
    </div>
  )
}

export default Standings