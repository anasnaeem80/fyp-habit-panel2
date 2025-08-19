import React from "react";
import { useHabits } from "../hooks/useHabits";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, Calendar, Target, BarChart3 } from "lucide-react";

const Analytics = () => {
  const { habits } = useHabits();

  // Calculate completion rate data for bar chart
  const completionData = habits.map((habit) => ({
    name: habit.name,
    completion:
      (habit.completion.filter(Boolean).length / habit.completion.length) * 100,
    currentStreak: habit.currentStreak,
  }));

  // Calculate category distribution for pie chart
  const categoryData = habits.reduce((acc, habit) => {
    const existing = acc.find((item) => item.name === habit.category);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: habit.category, value: 1 });
    }
    return acc;
  }, []);

  const COLORS = [
    "#3B82F6",
    "#10B981",
    "#8B5CF6",
    "#EF4444",
    "#F59E0B",
    "#6366F1",
  ];

  // Calculate overall statistics
  const totalCompletion =
    (habits.reduce((total, habit) => {
      return (
        total +
        habit.completion.filter(Boolean).length / habit.completion.length
      );
    }, 0) /
      habits.length) *
      100 || 0;

  const averageStreak =
    habits.reduce((sum, habit) => sum + habit.currentStreak, 0) /
      habits.length || 0;
  const consistencyRate =
    (habits.filter((habit) => habit.currentStreak > 0).length / habits.length) *
      100 || 0;

  return (
    <div className='p-6 space-y-6'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <div className='flex items-center space-x-3 mb-4'>
            <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>
              <BarChart3 className='text-blue-600' size={20} />
            </div>
            <h3 className='text-lg font-semibold'>Overall Completion</h3>
          </div>
          <p className='text-3xl font-bold text-blue-600'>
            {Math.round(totalCompletion)}%
          </p>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-md'>
          <div className='flex items-center space-x-3 mb-4'>
            <div className='w-10 h-10 bg-green-100 rounded-full flex items-center justify-center'>
              <TrendingUp className='text-green-600' size={20} />
            </div>
            <h3 className='text-lg font-semibold'>Avg. Streak</h3>
          </div>
          <p className='text-3xl font-bold text-green-600'>
            {Math.round(averageStreak)} days
          </p>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-md'>
          <div className='flex items-center space-x-3 mb-4'>
            <div className='w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center'>
              <Target className='text-purple-600' size={20} />
            </div>
            <h3 className='text-lg font-semibold'>Consistency Rate</h3>
          </div>
          <p className='text-3xl font-bold text-purple-600'>
            {Math.round(consistencyRate)}%
          </p>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h3 className='text-lg font-semibold mb-4'>Habit Completion Rates</h3>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={completionData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip formatter={(value) => `${value}%`} />
              <Bar dataKey='completion' fill='#3B82F6' />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h3 className='text-lg font-semibold mb-4'>Habit Categories</h3>
          <ResponsiveContainer width='100%' height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx='50%'
                cy='50%'
                outerRadius={80}
                fill='#8884d8'
                dataKey='value'
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className='bg-white p-6 rounded-lg shadow-md'>
        <h3 className='text-lg font-semibold mb-4'>Performance Insights</h3>
        <div className='space-y-3'>
          {habits
            .sort((a, b) => {
              const aRate =
                a.completion.filter(Boolean).length / a.completion.length;
              const bRate =
                b.completion.filter(Boolean).length / b.completion.length;
              return aRate - bRate;
            })
            .slice(0, 3)
            .map((habit) => (
              <div key={habit.id} className='p-4 border rounded-lg'>
                <h4 className='font-medium mb-2'>{habit.name}</h4>
                <p className='text-sm text-gray-600 mb-2'>
                  Completion rate:{" "}
                  {Math.round(
                    (habit.completion.filter(Boolean).length /
                      habit.completion.length) *
                      100
                  )}
                  %
                </p>
                <div className='w-full bg-gray-200 rounded-full h-2'>
                  <div
                    className='bg-blue-500 h-2 rounded-full'
                    style={{
                      width: `${
                        (habit.completion.filter(Boolean).length /
                          habit.completion.length) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
