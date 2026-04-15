import { createContext, useContext } from 'react';

export type AppState = 'Normal' | 'Loading' | 'Empty' | 'Error';
export type SubState = 'Normal' | 'Loading' | 'Empty';

interface ViewStateContextValue {
  appState: AppState;
  setAppState: (state: AppState) => void;
  subState: SubState;
  setSubState: (state: SubState) => void;
}

export const ViewStateContext = createContext<ViewStateContextValue>({
  appState: 'Normal',
  setAppState: () => {},
  subState: 'Normal',
  setSubState: () => {},
});

export function useViewStateContext() {
  return useContext(ViewStateContext);
}
