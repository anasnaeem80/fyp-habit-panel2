import React from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from "date-fns";

const Calendar = ({ habits, selectedDate, onDateSelect }) => {
  const currentDate = new Date();
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getHabitsForDate = (date) => {
    return habits.filter((habit) => {
      const habitDate = new Date(habit.createdAt);
      return isSameDay(habitDate, date);
    });
  };

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h3 className='text-lg font-semibold mb-4'>
        {format(currentDate, "MMMM yyyy")}
      </h3>

      <div className='grid grid-cols-7 gap-2 mb-2'>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className='text-center text-sm font-medium text-gray-500'
          >
            {day}
          </div>
        ))}
      </div>

      <div className='grid grid-cols-7 gap-2'>
        {days.map((day) => {
          const dayHabits = getHabitsForDate(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isSelected = selectedDate && isSameDay(day, selectedDate);

          return (
            <div
              key={day.toString()}
              onClick={() => onDateSelect(day)}
              className={`p-2 rounded-lg cursor-pointer transition-colors ${
                isSelected
                  ? "bg-blue-500 text-white"
                  : isCurrentMonth
                  ? "bg-gray-100 hover:bg-gray-200"
                  : "bg-gray-50 text-gray-400"
              }`}
            >
              <div className='text-sm font-medium mb-1'>{format(day, "d")}</div>

              {dayHabits.length > 0 && (
                <div className='flex justify-center space-x-1'>
                  {dayHabits.slice(0, 3).map((habit) => (
                    <div
                      key={habit.id}
                      className={`w-2 h-2 rounded-full ${habit.color}`}
                    ></div>
                  ))}
                  {dayHabits.length > 3 && (
                    <span className='text-xs'>+{dayHabits.length - 3}</span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
