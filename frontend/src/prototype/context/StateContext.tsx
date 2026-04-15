import { createContext, useContext, useState } from 'react';

export type AppState = 'Normal' | 'Loading' | 'Empty' | 'Error';
export type SubState = 'Normal' | 'Loading' | 'Empty';

interface StateContextType {
  appState: AppState;
  setAppState: (s: AppState) => void;
  subState: SubState;
  setSubState: (s: SubState) => void;
}

export const StateContext = createContext<StateContextType>({
  appState: 'Normal',
  setAppState: () => {},
  subState: 'Normal',
  setSubState: () => {}
});

export const useStateContext = () => useContext(StateContext);
