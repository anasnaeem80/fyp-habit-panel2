import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  PlusCircle,
  Calendar,
  BarChart3,
  BookOpen,
  Trophy,
  Bot,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", icon: Home, label: "Dashboard" },
    { path: "/setup", icon: PlusCircle, label: "Habit Setup" },
    { path: "/streak", icon: Calendar, label: "Streak Tracker" },
    { path: "/analytics", icon: BarChart3, label: "Analytics" },
    { path: "/journal", icon: BookOpen, label: "Reflection Journal" },
    { path: "/challenges", icon: Trophy, label: "Challenges" },
    { path: "/ai-coach", icon: Bot, label: "AI Coach" },
  ];

  return (
    <div className='w-64 bg-blue-900 text-white h-screen fixed left-0 top-0 p-6'>
      <div className='mb-10'>
        <h1 className='text-2xl font-bold'>DeepMotive</h1>
        <p className='text-blue-200 text-sm'>Habit Mastery</p>
      </div>

      <nav className='space-y-2'>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-700 text-white"
                  : "text-blue-200 hover:bg-blue-800 hover:text-white"
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className='absolute bottom-6 left-6 right-6'>
        <div className='p-4 bg-blue-800 rounded-lg'>
          <div className='w-12 h-12 bg-blue-600 rounded-full mx-auto mb-3 flex items-center justify-center'>
            <div className='w-3 h-3 bg-green-400 rounded-full'></div>
          </div>
          <p className='text-center text-sm text-blue-200'>
            Submarine Level: 5
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
