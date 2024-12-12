import React, { createContext, useContext, useEffect, useState } from 'react';
import { useFetchWeeks } from '../Hooks/useFetchWeeks';
import { UserContext } from './UserContext';

export const PicksContext = createContext();

export const PicksProvider = ({ children }) => {
  // const {weeksList, weeksData, loading, error} = useFetchWeeks('/Weeks.json');
  const {weeksList, weeksData, loading, error} = useFetchWeeks('http://localhost:5000/api/allData');
  
  return (
    <PicksContext.Provider value={{ weeksList, weeksData, loading, error }}>
      {children}
    </PicksContext.Provider>
  );
};
