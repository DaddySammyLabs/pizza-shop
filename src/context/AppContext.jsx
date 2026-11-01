import { createContext, useContext } from "react";

import useAppState from "@/useAppState";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const appState = useAppState();

  return <AppContext.Provider value={appState}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used inside AppProvider");
  }

  return context;
};
