import React, { createContext, useContext, useEffect, useState } from 'react';
import { useFetchWeeks } from '../Hooks/useFetchWeeks';
import { UserContext } from './UserContext';

export const PicksContext = createContext();

export const PicksProvider = ({ children }) => {
  // const {weeksList, weeksData, loading, error} = useFetchWeeks('/Weeks.json');
  const url = 'http://localhost:5000/api/';
  const {weeksList, weeksData, loading, error} = useFetchWeeks(url + 'allData');
  // const {weeksList, weeksData, loading, error} = useFetchWeeks('https://playoff-picks-server.vercel.app/api/allData');
  
  return (
    <PicksContext.Provider value={{ weeksList, weeksData, loading, error, url }}>
      {children}
    </PicksContext.Provider>
  );
};
