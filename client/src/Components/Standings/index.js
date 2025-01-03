import React, { useContext, useState } from 'react'
import './index.scss';
import { useFetchStandings } from '../../Hooks/useFetchStandings';
import { PicksContext } from '../../Context/PicksContext';
import LoadingSpinner from '../Spinner';

const Standings = () => {
  const { url } = useContext(PicksContext);
  const { usersList, winsList, lossList, percentList, loading, error } = useFetchStandings(url + 'getStandings');

  if(loading) return <p><LoadingSpinner /></p>
  if(error) return <p>Error: {error}</p>

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
        {usersList && winsList && lossList && percentList && usersList.map((u, index) => (
          <div className="row" key={index}>
            <div>{u}</div>
            <div>{winsList[index]}</div>
            <div>{lossList[index]}</div>
            <div>{Math.round(percentList[index])}%</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Standings