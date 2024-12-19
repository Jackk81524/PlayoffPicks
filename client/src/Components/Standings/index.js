import React, { useContext, useState } from 'react'
import { UserContext } from '../../Context/UserContext'
import './index.scss';

const Standings = () => {
  const { user } = useContext(UserContext);
  const [usersList, setUsersList] = useState(["Jack", "Kyle", "Matt", "Logan", "Nick", "Mogo", "Rich"]);
  const [winsList, setWinsList] = useState(["0", "0", "0", "0","0", "0", "0"]);
  const [lossList, setLossList] = useState(["0", "0", "0", "0","0", "0", "0"]);
  const [percentage, setPercentage] = useState(["0%", "0%", "0%", "0%", "0%", "0%", "0%"]);

  return (  
    <div className="standings">
      <h1>Standings</h1>
      <div className="standings-table">
        <div className="row title">
          <div>User</div>
          <div>Wins</div>
          <div>Losses</div>
          <div>Percentage</div>
        </div>
        {usersList.map((u, index) => (
          <div className="row" key={index}>
            <div>{u}</div>
            <div>{winsList[index]}</div>
            <div>{lossList[index]}</div>
            <div>{percentage[index]}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Standings