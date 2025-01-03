import React, { createContext, useContext, useEffect, useState } from 'react';
import { useFetchWeeks } from '../Hooks/useFetchWeeks';

export const PicksContext = createContext();

export const PicksProvider = ({ children }) => {
  const url = 'http://localhost:5000/api/';
  // const url = 'https://playoff-picks-server.vercel.app/api/';
  const {weeksList, weeksData, loading, error} = useFetchWeeks(url + 'allData');
  
  return (
    <PicksContext.Provider value={{ weeksList, weeksData, loading, error, url }}>
      {children}
    </PicksContext.Provider>
  );
};
