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
import { Waves } from "lucide-react";

const HabitCompletionChart = ({ habits }) => {
  const data = habits.map((habit) => ({
    name: habit.name.substring(0, 12) + (habit.name.length > 12 ? "..." : ""),
    completion:
      (habit.completion.filter(Boolean).length / habit.completion.length) * 100,
    currentStreak: habit.currentStreak,
  }));

  return (
    <div className='w-full'>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray='3 3' stroke='#e2e8f0' />
          <XAxis dataKey='name' stroke='#64748b' fontSize={12} />
          <YAxis stroke='#64748b' fontSize={12} />
          <Tooltip
            formatter={(value) => [`${value}%`, "Completion Rate"]}
            contentStyle={{
              backgroundColor: "#1e40af",
              border: "none",
              borderRadius: "8px",
              color: "white",
            }}
          />
          <Bar dataKey='completion' fill='#0ea5e9' radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HabitCompletionChart;
