import React, { createContext, useState } from 'react';
import { useFetchWeeks } from '../Hooks/useFetchWeeks';

export const PicksContext = createContext();

export const PicksProvider = ({ children }) => {
  const {weeksList, weeksData, loading, error} = useFetchWeeks('/Weeks.json');

  return (
    <PicksContext.Provider value={{ weeksList, weeksData, loading, error }}>
      {children}
    </PicksContext.Provider>
  );
};
