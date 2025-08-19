import { useState, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { habits as initialHabits } from "../data/mockData";

export const useHabits = () => {
  const [habits, setHabits] = useLocalStorage("habits", initialHabits);
  const [selectedHabit, setSelectedHabit] = useState(null);

  const addHabit = (habit) => {
    const newHabit = {
      ...habit,
      id: Date.now(),
      currentStreak: 0,
      longestStreak: 0,
      completion: Array(7).fill(false),
      createdAt: new Date(),
    };
    setHabits([...habits, newHabit]);
  };

  const updateHabit = (id, updates) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, ...updates } : habit
      )
    );
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  const toggleHabitCompletion = (id, dayIndex) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id === id) {
          const newCompletion = [...habit.completion];
          newCompletion[dayIndex] = !newCompletion[dayIndex];

          // Calculate new streak
          let newStreak = 0;
          for (let i = newCompletion.length - 1; i >= 0; i--) {
            if (newCompletion[i]) newStreak++;
            else break;
          }

          return {
            ...habit,
            completion: newCompletion,
            currentStreak: newStreak,
            longestStreak: Math.max(habit.longestStreak, newStreak),
          };
        }
        return habit;
      })
    );
  };

  return {
    habits,
    selectedHabit,
    setSelectedHabit,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleHabitCompletion,
  };
};
