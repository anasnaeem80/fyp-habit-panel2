import React, { useState } from "react";
import { useHabits } from "../hooks/useHabits";
import { Plus, X } from "lucide-react";

const HabitSetup = () => {
  const { addHabit } = useHabits();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    frequency: "daily",
    goal: 7,
    category: "Wellness",
    color: "bg-blue-500",
  });

  const categories = [
    "Wellness",
    "Fitness",
    "Learning",
    "Productivity",
    "Social",
    "Other",
  ];
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-red-500",
    "bg-yellow-500",
    "bg-indigo-500",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    addHabit(formData);
    setFormData({
      name: "",
      description: "",
      frequency: "daily",
      goal: 7,
      category: "Wellness",
      color: "bg-blue-500",
    });
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-semibold'>Habit Setup</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className='btn btn-primary'
        >
          <Plus size={20} className='mr-2' />
          Add New Habit
        </button>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg w-full max-w-md'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-lg font-semibold'>Create New Habit</h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  Habit Name
                </label>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  className='w-full p-2 border rounded-md'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium mb-1'>
                  Description
                </label>
                <textarea
                  name='description'
                  value={formData.description}
                  onChange={handleChange}
                  className='w-full p-2 border rounded-md'
                  rows={3}
                />
              </div>

              <div>
                <label className='block text-sm font-medium mb-1'>
                  Frequency
                </label>
                <select
                  name='frequency'
                  value={formData.frequency}
                  onChange={handleChange}
                  className='w-full p-2 border rounded-md'
                >
                  <option value='daily'>Daily</option>
                  <option value='weekly'>Weekly</option>
                  <option value='monthly'>Monthly</option>
                </select>
              </div>

              <div>
                <label className='block text-sm font-medium mb-1'>
                  Goal (times per week)
                </label>
                <input
                  type='number'
                  name='goal'
                  value={formData.goal}
                  onChange={handleChange}
                  min='1'
                  max='7'
                  className='w-full p-2 border rounded-md'
                />
              </div>

              <div>
                <label className='block text-sm font-medium mb-1'>
                  Category
                </label>
                <select
                  name='category'
                  value={formData.category}
                  onChange={handleChange}
                  className='w-full p-2 border rounded-md'
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className='block text-sm font-medium mb-1'>Color</label>
                <div className='flex space-x-2'>
                  {colors.map((color) => (
                    <button
                      key={color}
                      type='button'
                      onClick={() => setFormData({ ...formData, color })}
                      className={`w-8 h-8 rounded-full ${color} ${
                        formData.color === color
                          ? "ring-2 ring-offset-2 ring-blue-500"
                          : ""
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className='flex justify-end space-x-2 pt-4'>
                <button
                  type='button'
                  onClick={() => setIsModalOpen(false)}
                  className='btn btn-ghost'
                >
                  Cancel
                </button>
                <button type='submit' className='btn btn-primary'>
                  Create Habit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className='bg-white p-6 rounded-lg shadow-md'>
        <h3 className='text-lg font-semibold mb-4'>Habit Creation Guide</h3>
        <div className='prose'>
          <p>Creating effective habits involves:</p>
          <ul className='list-disc list-inside space-y-1'>
            <li>Starting with small, achievable actions</li>
            <li>Being specific about what you'll do and when</li>
            <li>Linking new habits to existing routines</li>
            <li>Tracking your progress consistently</li>
            <li>Celebrating small wins along the way</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HabitSetup;
