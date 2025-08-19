import React from "react";
import { Bell, Settings, User } from "lucide-react";

const Header = () => {
  return (
    <header className='ml-64 bg-white border-b border-gray-200 p-4 flex justify-between items-center'>
      <div>
        <h1 className='text-2xl font-semibold text-gray-800'>
          Habit Dashboard
        </h1>
        <p className='text-gray-600'>
          Track your progress and build better habits
        </p>
      </div>

      <div className='flex items-center space-x-4'>
        <button className='p-2 rounded-full hover:bg-gray-100'>
          <Bell size={20} className='text-gray-600' />
        </button>
        <button className='p-2 rounded-full hover:bg-gray-100'>
          <Settings size={20} className='text-gray-600' />
        </button>
        <div className='flex items-center space-x-2'>
          <div className='w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center'>
            <User size={20} className='text-white' />
          </div>
          <span className='text-gray-700'>Anas</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
