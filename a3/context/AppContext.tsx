"use client";

import { createContext, useContext, useState } from "react";

type AppContextType = {
  price: number | null;
  setPrice: (price: number | null) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [price, setPrice] = useState<number | null>(null);

  return (
    <AppContext.Provider value={{ price, setPrice }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider");
  }

  return context;
}