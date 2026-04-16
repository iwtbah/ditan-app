import { createContext, useContext, useState, type PropsWithChildren } from "react";

export type PreviewAppState = "Normal" | "Loading" | "Empty" | "Error";
export type PreviewSubState = "Normal" | "Loading" | "Empty";

interface PreviewStateContextValue {
  appState: PreviewAppState;
  setAppState: (state: PreviewAppState) => void;
  subState: PreviewSubState;
  setSubState: (state: PreviewSubState) => void;
}

const noop = () => {};

export const PreviewStateContext = createContext<PreviewStateContextValue>({
  appState: "Normal",
  setAppState: noop,
  subState: "Normal",
  setSubState: noop,
});

export function PreviewStateProvider({ children }: PropsWithChildren) {
  const [appState, setAppState] = useState<PreviewAppState>("Normal");
  const [subState, setSubState] = useState<PreviewSubState>("Normal");

  return (
    <PreviewStateContext.Provider value={{ appState, setAppState, subState, setSubState }}>
      {children}
    </PreviewStateContext.Provider>
  );
}

export function usePreviewStateContext() {
  return useContext(PreviewStateContext);
}
