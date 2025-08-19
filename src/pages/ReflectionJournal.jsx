import React, { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { journalEntries as initialEntries } from "../data/mockData";
import { Plus, Edit3, Trash2, Smile, Frown, Meh } from "lucide-react";

const ReflectionJournal = () => {
  const [entries, setEntries] = useLocalStorage(
    "journalEntries",
    initialEntries
  );
  const [isEditing, setIsEditing] = useState(false);
  const [currentEntry, setCurrentEntry] = useState({
    id: null,
    content: "",
    mood: "neutral",
  });
  const [showForm, setShowForm] = useState(false);

  const moods = [
    { value: "happy", label: "Happy", icon: Smile, color: "text-green-500" },
    { value: "neutral", label: "Neutral", icon: Meh, color: "text-yellow-500" },
    { value: "sad", label: "Sad", icon: Frown, color: "text-red-500" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentEntry.content.trim() === "") return;

    if (isEditing) {
      setEntries(
        entries.map((entry) =>
          entry.id === currentEntry.id ? { ...entry, ...currentEntry } : entry
        )
      );
    } else {
      const newEntry = {
        ...currentEntry,
        id: Date.now(),
        date: new Date(),
      };
      setEntries([newEntry, ...entries]);
    }

    setCurrentEntry({ id: null, content: "", mood: "neutral" });
    setShowForm(false);
    setIsEditing(false);
  };

  const handleEdit = (entry) => {
    setCurrentEntry(entry);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-semibold'>Reflection Journal</h2>
        <button onClick={() => setShowForm(true)} className='btn btn-primary'>
          <Plus size={20} className='mr-2' />
          New Entry
        </button>
      </div>

      {showForm && (
        <div className='bg-white p-6 rounded-lg shadow-md mb-6'>
          <h3 className='text-lg font-semibold mb-4'>
            {isEditing ? "Edit Entry" : "New Journal Entry"}
          </h3>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium mb-2'>
                How are you feeling?
              </label>
              <div className='flex space-x-4'>
                {moods.map((mood) => {
                  const Icon = mood.icon;
                  return (
                    <button
                      key={mood.value}
                      type='button'
                      onClick={() =>
                        setCurrentEntry({ ...currentEntry, mood: mood.value })
                      }
                      className={`flex flex-col items-center p-3 rounded-lg border-2 ${
                        currentEntry.mood === mood.value
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Icon size={24} className={mood.color} />
                      <span className='text-sm mt-1'>{mood.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium mb-2'>
                Reflection
              </label>
              <textarea
                value={currentEntry.content}
                onChange={(e) =>
                  setCurrentEntry({ ...currentEntry, content: e.target.value })
                }
                className='w-full p-3 border rounded-lg h-32'
                placeholder="Write about your day, your progress, challenges, or anything else you'd like to reflect on..."
              />
            </div>

            <div className='flex justify-end space-x-3'>
              <button
                type='button'
                onClick={() => {
                  setShowForm(false);
                  setIsEditing(false);
                  setCurrentEntry({ id: null, content: "", mood: "neutral" });
                }}
                className='btn btn-ghost'
              >
                Cancel
              </button>
              <button type='submit' className='btn btn-primary'>
                {isEditing ? "Update Entry" : "Save Entry"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className='space-y-4'>
        {entries.length === 0 ? (
          <div className='text-center py-12'>
            <div className='w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <Edit3 size={32} className='text-gray-400' />
            </div>
            <h3 className='text-lg font-medium text-gray-900 mb-2'>
              No entries yet
            </h3>
            <p className='text-gray-500'>
              Start writing to reflect on your habit journey
            </p>
          </div>
        ) : (
          entries.map((entry) => {
            const moodConfig = moods.find((m) => m.value === entry.mood);
            const MoodIcon = moodConfig?.icon || Meh;

            return (
              <div key={entry.id} className='bg-white p-6 rounded-lg shadow-md'>
                <div className='flex justify-between items-start mb-4'>
                  <div className='flex items-center space-x-3'>
                    <div
                      className={`p-2 rounded-full ${moodConfig?.color.replace(
                        "text",
                        "bg"
                      )} bg-opacity-20`}
                    >
                      <MoodIcon size={20} className={moodConfig?.color} />
                    </div>
                    <div>
                      <h3 className='font-semibold'>{moodConfig?.label} Day</h3>
                      <p className='text-sm text-gray-500'>
                        {formatDate(entry.date)}
                      </p>
                    </div>
                  </div>

                  <div className='flex space-x-2'>
                    <button
                      onClick={() => handleEdit(entry)}
                      className='p-2 text-gray-400 hover:text-gray-600'
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className='p-2 text-gray-400 hover:text-red-600'
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <p className='text-gray-700 whitespace-pre-wrap'>
                  {entry.content}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ReflectionJournal;
