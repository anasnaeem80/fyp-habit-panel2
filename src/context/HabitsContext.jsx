import React, { createContext, useContext } from "react";
import { useHabits } from "../hooks/useHabits";

const HabitsContext = createContext();

export const useHabitsContext = () => {
  const context = useContext(HabitsContext);
  if (!context) {
    throw new Error("useHabitsContext must be used within a HabitsProvider");
  }
  return context;
};

export const HabitsProvider = ({ children }) => {
  const habits = useHabits();

  return (
    <HabitsContext.Provider value={habits}>{children}</HabitsContext.Provider>
  );
};
