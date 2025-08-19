import React from "react";
import { CheckCircle, Circle, MoreVertical, Trash2, Edit } from "lucide-react";

const HabitCard = ({ habit, onToggle, onEdit, onDelete }) => {
  const completionRate =
    (habit.completion.filter(Boolean).length / habit.completion.length) * 100;
  const todayIndex = new Date().getDay(); // 0-6, where 0 is Sunday

  return (
    <div className='bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow'>
      <div className='flex justify-between items-start mb-4'>
        <div>
          <h3 className='font-semibold text-lg text-gray-800'>{habit.name}</h3>
          <p className='text-gray-600 text-sm'>{habit.description}</p>
        </div>
        <div className='dropdown dropdown-end'>
          <label tabIndex={0} className='btn btn-ghost btn-sm btn-circle'>
            <MoreVertical size={16} />
          </label>
          <ul
            tabIndex={0}
            className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52'
          >
            <li>
              <button onClick={() => onEdit(habit)}>
                <Edit size={14} /> Edit
              </button>
            </li>
            <li>
              <button onClick={() => onDelete(habit.id)}>
                <Trash2 size={14} /> Delete
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className='mb-4'>
        <div className='flex justify-between text-sm text-gray-600 mb-1'>
          <span>Completion</span>
          <span>{Math.round(completionRate)}%</span>
        </div>
        <div className='w-full bg-gray-200 rounded-full h-2'>
          <div
            className='bg-blue-500 h-2 rounded-full transition-all duration-300'
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
      </div>

      <div className='flex justify-between items-center mb-4'>
        <div className='text-center'>
          <div className='text-2xl font-bold text-blue-600'>
            {habit.currentStreak}
          </div>
          <div className='text-xs text-gray-500'>Current Streak</div>
        </div>
        <div className='text-center'>
          <div className='text-2xl font-bold text-green-600'>
            {habit.longestStreak}
          </div>
          <div className='text-xs text-gray-500'>Longest Streak</div>
        </div>
        <div className='text-center'>
          <div className='text-2xl font-bold text-purple-600'>{habit.goal}</div>
          <div className='text-xs text-gray-500'>Goal</div>
        </div>
      </div>

      <div className='flex justify-between items-center'>
        <div className='flex space-x-1'>
          {habit.completion.map((completed, index) => (
            <button
              key={index}
              onClick={() => onToggle(habit.id, index)}
              className='p-1'
            >
              {completed ? (
                <CheckCircle size={20} className='text-green-500' />
              ) : (
                <Circle size={20} className='text-gray-300' />
              )}
            </button>
          ))}
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${habit.color} text-white`}
        >
          {habit.category}
        </span>
      </div>
    </div>
  );
};

export default HabitCard;
