import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const StreakChart = ({ habits }) => {
  const data = habits.map((habit) => ({
    name: habit.name,
    currentStreak: habit.currentStreak,
    longestStreak: habit.longestStreak,
  }));

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h3 className='text-lg font-semibold mb-4'>Current vs Longest Streaks</h3>
      <ResponsiveContainer width='100%' height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Line
            type='monotone'
            dataKey='currentStreak'
            stroke='#3B82F6'
            strokeWidth={2}
          />
          <Line
            type='monotone'
            dataKey='longestStreak'
            stroke='#10B981'
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StreakChart;
