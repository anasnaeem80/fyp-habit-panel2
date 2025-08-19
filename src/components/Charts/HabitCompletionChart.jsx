import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const HabitCompletionChart = ({ habits }) => {
  const data = habits.map((habit) => ({
    name: habit.name,
    completion:
      (habit.completion.filter(Boolean).length / habit.completion.length) * 100,
    currentStreak: habit.currentStreak,
  }));

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h3 className='text-lg font-semibold mb-4'>Habit Completion Rate</h3>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip formatter={(value) => `${value}%`} />
          <Bar dataKey='completion' fill='#3B82F6' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HabitCompletionChart;
