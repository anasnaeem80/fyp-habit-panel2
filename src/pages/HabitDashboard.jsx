import React from "react";
import { useHabits } from "../hooks/useHabits";
import HabitCard from "../components/HabitCard";
import HabitCompletionChart from "../components/Charts/HabitCompletionChart";
import StreakChart from "../components/Charts/StreakChart";

const HabitDashboard = () => {
  const { habits, toggleHabitCompletion, updateHabit, deleteHabit } =
    useHabits();

  const completedToday = habits.filter(
    (habit) => habit.completion[new Date().getDay()]
  ).length;

  const totalCompletion =
    (habits.reduce((total, habit) => {
      return (
        total +
        habit.completion.filter(Boolean).length / habit.completion.length
      );
    }, 0) /
      habits.length) *
      100 || 0;

  return (
    <div className='p-6 space-y-6'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg text-white'>
          <h3 className='text-lg font-semibold mb-2'>Total Habits</h3>
          <p className='text-3xl font-bold'>{habits.length}</p>
        </div>

        <div className='bg-gradient-to-r from-green-500 to-teal-600 p-6 rounded-lg text-white'>
          <h3 className='text-lg font-semibold mb-2'>Completed Today</h3>
          <p className='text-3xl font-bold'>
            {completedToday}/{habits.length}
          </p>
        </div>

        <div className='bg-gradient-to-r from-orange-500 to-red-600 p-6 rounded-lg text-white'>
          <h3 className='text-lg font-semibold mb-2'>Overall Completion</h3>
          <p className='text-3xl font-bold'>{Math.round(totalCompletion)}%</p>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <HabitCompletionChart habits={habits} />
        <StreakChart habits={habits} />
      </div>

      <div>
        <h2 className='text-2xl font-semibold mb-4'>Your Habits</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onToggle={toggleHabitCompletion}
              onEdit={() => {
                /* Will implement edit modal */
              }}
              onDelete={deleteHabit}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HabitDashboard;
