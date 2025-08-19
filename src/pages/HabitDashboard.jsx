import React from "react";
import { useHabitsContext } from "../context/HabitsContext";
import HabitCard from "../components/HabitCard";
import HabitCompletionChart from "../components/Charts/HabitCompletionChart";
import StreakChart from "../components/Charts/StreakChart";
import { Gauge, Waves, Target, Ship, Calendar, TrendingUp } from "lucide-react";

const HabitDashboard = () => {
  const { habits, toggleHabitCompletion, updateHabit, deleteHabit } =
    useHabitsContext();

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

  const currentDepth = Math.round(1240 * (totalCompletion / 100));

  return (
    <div className='p-6 space-y-6 bg-gradient-to-b from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 min-h-screen'>
      {/* Header Section */}
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-3xl font-bold text-blue-900 dark:text-white flex items-center'>
            <Ship size={32} className='mr-3 text-cyan-500' />
            DeepMotive
          </h1>
          <p className='text-blue-600 dark:text-gray-400 mt-2'>
            Tracking progress at {currentDepth}m depth
          </p>
        </div>

        <div className='flex items-center space-x-4'>
          <div className='text-right'>
            <p className='text-sm text-blue-600 dark:text-gray-400'>
              Current Depth
            </p>
            <p className='text-2xl font-bold text-cyan-600 dark:text-cyan-400'>
              {currentDepth}m
            </p>
          </div>
          <div className='w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center'>
            <Waves size={24} className='text-white' />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {/* Today's Completion */}
        <div className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700'>
          <div className='flex items-center justify-between mb-4'>
            <div className='w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center'>
              <Calendar
                size={24}
                className='text-green-600 dark:text-green-400'
              />
            </div>
            <span className='text-xs font-semibold bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 px-2 py-1 rounded-full'>
              TODAY
            </span>
          </div>
          <p className='text-3xl font-bold text-green-600 dark:text-green-400 mb-1'>
            {completedToday}/{habits.length}
          </p>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            Habits Completed
          </p>
        </div>

        {/* Mission Completion */}
        <div className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700'>
          <div className='flex items-center justify-between mb-4'>
            <div className='w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center'>
              <Target size={24} className='text-blue-600 dark:text-blue-400' />
            </div>
            <span className='text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full'>
              RATE
            </span>
          </div>
          <p className='text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1'>
            {Math.round(totalCompletion)}%
          </p>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            Mission Completion
          </p>
        </div>

        {/* Active Habits */}
        <div className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700'>
          <div className='flex items-center justify-between mb-4'>
            <div className='w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center'>
              <Ship
                size={24}
                className='text-purple-600 dark:text-purple-400'
              />
            </div>
            <span className='text-xs font-semibold bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 px-2 py-1 rounded-full'>
              FLEET
            </span>
          </div>
          <p className='text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1'>
            {habits.length}
          </p>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            Active Habits
          </p>
        </div>

        {/* Progress Circle */}
        <div className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700'>
          <div className='flex items-center justify-between mb-4'>
            <div className='w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center'>
              <TrendingUp
                size={24}
                className='text-amber-600 dark:text-amber-400'
              />
            </div>
            <span className='text-xs font-semibold bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 px-2 py-1 rounded-full'>
              PROGRESS
            </span>
          </div>
          <div className='flex items-center space-x-3'>
            <div className='relative w-16 h-16'>
              <div className='w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center'>
                <div className='w-14 h-14 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center'>
                  <span className='text-lg font-bold text-amber-600 dark:text-amber-400'>
                    65%
                  </span>
                </div>
              </div>
              <div className='absolute inset-0'>
                <svg
                  className='w-16 h-16 transform -rotate-90'
                  viewBox='0 0 100 100'
                >
                  <circle
                    cx='50'
                    cy='50'
                    r='45'
                    fill='none'
                    stroke='#e5e7eb'
                    strokeWidth='8'
                    className='dark:stroke-gray-600'
                  />
                  <circle
                    cx='50'
                    cy='50'
                    r='45'
                    fill='none'
                    stroke='#f59e0b'
                    strokeWidth='8'
                    strokeDasharray='283'
                    strokeDashoffset={283 * 0.35}
                    strokeLinecap='round'
                  />
                </svg>
              </div>
            </div>
            <div>
              <p className='text-sm font-semibold text-gray-600 dark:text-gray-400'>
                Mission Progress
              </p>
              <p className='text-lg font-bold text-amber-600 dark:text-amber-400'>
                65% Complete
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-blue-100 dark:border-gray-700'>
          <h3 className='text-lg font-semibold mb-4 flex items-center text-blue-900 dark:text-white'>
            <Waves size={20} className='mr-2 text-cyan-500' />
            Depth Progress Analysis
          </h3>
          <HabitCompletionChart habits={habits} />
        </div>
        <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-blue-100 dark:border-gray-700'>
          <h3 className='text-lg font-semibold mb-4 flex items-center text-blue-900 dark:text-white'>
            <Ship size={20} className='mr-2 text-cyan-500' />
            Expedition Streaks
          </h3>
          <StreakChart habits={habits} />
        </div>
      </div>

      {/* Habit Cards Section */}
      <div>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-2xl font-semibold text-blue-900 dark:text-white flex items-center'>
            <Ship size={24} className='mr-2 text-cyan-500' />
            Your Habit Fleet
          </h2>
          <span className='text-blue-600 dark:text-cyan-400 bg-blue-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm'>
            {habits.length} Active Expeditions
          </span>
        </div>

        {habits.length === 0 ? (
          <div className='bg-white dark:bg-gray-800 rounded-xl p-8 text-center border border-blue-100 dark:border-gray-700'>
            <div className='w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4'>
              <Ship size={32} className='text-blue-500 dark:text-blue-400' />
            </div>
            <h3 className='text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2'>
              No Active Missions
            </h3>
            <p className='text-gray-500 dark:text-gray-400 mb-4'>
              Start your journey by adding your first habit
            </p>
            <button className='btn btn-primary'>Create First Habit</button>
          </div>
        ) : (
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
        )}
      </div>

      {/* Mission Briefing */}
      <div className='bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-800 dark:to-cyan-800 rounded-xl p-6 text-white shadow-lg'>
        <h3 className='text-xl font-semibold mb-4 flex items-center'>
          <Target size={24} className='mr-2 text-cyan-300' />
          Mission Briefing
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-center'>
          <div className='p-4 bg-white/10 rounded-lg backdrop-blur-sm'>
            <div className='text-2xl font-bold text-green-300'>
              {completedToday}
            </div>
            <div className='text-sm text-blue-100'>Today's Successes</div>
          </div>
          <div className='p-4 bg-white/10 rounded-lg backdrop-blur-sm'>
            <div className='text-2xl font-bold text-amber-300'>
              {habits.length - completedToday}
            </div>
            <div className='text-sm text-blue-100'>Pending Missions</div>
          </div>
          <div className='p-4 bg-white/10 rounded-lg backdrop-blur-sm'>
            <div className='text-2xl font-bold text-cyan-300'>
              {Math.round(totalCompletion)}%
            </div>
            <div className='text-sm text-blue-100'>Overall Progress</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitDashboard;
