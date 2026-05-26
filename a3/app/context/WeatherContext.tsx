"use client";

import { createContext, useContext, useState } from "react";

type WeatherResult = {
  status: string;
  price: number;
};

type WeatherContextType = {
  result: WeatherResult;
  setResult: React.Dispatch<React.SetStateAction<WeatherResult>>;
};

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function WeatherProvider({ children }: { children: React.ReactNode }) {
  const [result, setResult] = useState<WeatherResult>({
    status: "Waiting for request",
    price: 0,
  });

  return (
    <WeatherContext.Provider value={{ result, setResult }}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);

  if (context === undefined) {
    throw new Error("useWeather must be used inside WeatherProvider");
  }

  return context;
}