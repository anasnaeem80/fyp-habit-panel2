import { useState, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { habits as initialHabits } from "../data/mockData";

export const useHabits = () => {
  const [habits, setHabits] = useLocalStorage("habits", []);
  const [selectedHabit, setSelectedHabit] = useState(null);

  // Initialize with mock data if no habits exist
  useEffect(() => {
    if (habits.length === 0) {
      setHabits(initialHabits);
    }
  }, [habits.length, setHabits]);

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
    // Prevent deleting the default mock habits
    const habitToDelete = habits.find((habit) => habit.id === id);
    const isMockHabit = initialHabits.some((mockHabit) => mockHabit.id === id);

    if (isMockHabit) {
      // Instead of deleting, reset the mock habit
      const originalHabit = initialHabits.find(
        (mockHabit) => mockHabit.id === id
      );
      setHabits(
        habits.map((habit) => (habit.id === id ? { ...originalHabit } : habit))
      );
    } else {
      // Delete user-created habits normally
      setHabits(habits.filter((habit) => habit.id !== id));
    }
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
