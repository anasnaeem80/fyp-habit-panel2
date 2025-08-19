import React, { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { challenges as initialChallenges } from "../data/mockData";
import { Trophy, Users, Calendar, Target, Plus, X } from "lucide-react";

const Challenges = () => {
  const [challenges, setChallenges] = useLocalStorage(
    "challenges",
    initialChallenges
  );
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newChallenge, setNewChallenge] = useState({
    title: "",
    description: "",
    duration: 7,
    goal: "",
  });

  const joinChallenge = (challengeId) => {
    setChallenges(
      challenges.map((challenge) =>
        challenge.id === challengeId
          ? { ...challenge, joined: true, progress: 0 }
          : challenge
      )
    );
  };

  const updateProgress = (challengeId, amount) => {
    setChallenges(
      challenges.map((challenge) => {
        if (challenge.id === challengeId) {
          const newProgress = Math.min(
            challenge.progress + amount,
            challenge.duration
          );
          const completed = newProgress >= challenge.duration;
          return {
            ...challenge,
            progress: newProgress,
            completed,
          };
        }
        return challenge;
      })
    );
  };

  const createChallenge = (e) => {
    e.preventDefault();
    const challenge = {
      ...newChallenge,
      id: Date.now(),
      participants: 1,
      progress: 0,
      completed: false,
      joined: true,
    };
    setChallenges([...challenges, challenge]);
    setNewChallenge({ title: "", description: "", duration: 7, goal: "" });
    setShowCreateModal(false);
  };

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-semibold'>Challenges & Goals</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className='btn btn-primary'
        >
          <Plus size={20} className='mr-2' />
          Create Challenge
        </button>
      </div>

      {showCreateModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg w-full max-w-md'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-lg font-semibold'>Create New Challenge</h3>
              <button onClick={() => setShowCreateModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={createChallenge} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  Challenge Title
                </label>
                <input
                  type='text'
                  value={newChallenge.title}
                  onChange={(e) =>
                    setNewChallenge({ ...newChallenge, title: e.target.value })
                  }
                  className='w-full p-2 border rounded-md'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium mb-1'>
                  Description
                </label>
                <textarea
                  value={newChallenge.description}
                  onChange={(e) =>
                    setNewChallenge({
                      ...newChallenge,
                      description: e.target.value,
                    })
                  }
                  className='w-full p-2 border rounded-md'
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium mb-1'>
                  Duration (days)
                </label>
                <input
                  type='number'
                  value={newChallenge.duration}
                  onChange={(e) =>
                    setNewChallenge({
                      ...newChallenge,
                      duration: parseInt(e.target.value),
                    })
                  }
                  className='w-full p-2 border rounded-md'
                  min='1'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium mb-1'>
                  Goal Description
                </label>
                <input
                  type='text'
                  value={newChallenge.goal}
                  onChange={(e) =>
                    setNewChallenge({ ...newChallenge, goal: e.target.value })
                  }
                  className='w-full p-2 border rounded-md'
                  required
                />
              </div>

              <div className='flex justify-end space-x-2 pt-4'>
                <button
                  type='button'
                  onClick={() => setShowCreateModal(false)}
                  className='btn btn-ghost'
                >
                  Cancel
                </button>
                <button type='submit' className='btn btn-primary'>
                  Create Challenge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {challenges.map((challenge) => (
          <div key={challenge.id} className='bg-white p-6 rounded-lg shadow-md'>
            <div className='flex items-center justify-between mb-4'>
              <div className='w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center'>
                <Trophy className='text-yellow-600' size={20} />
              </div>
              {!challenge.joined ? (
                <button
                  onClick={() => joinChallenge(challenge.id)}
                  className='btn btn-sm btn-primary'
                >
                  Join
                </button>
              ) : (
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    challenge.completed
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {challenge.completed ? "Completed" : "Joined"}
                </span>
              )}
            </div>

            <h3 className='font-semibold text-lg mb-2'>{challenge.title}</h3>
            <p className='text-gray-600 text-sm mb-4'>
              {challenge.description}
            </p>

            <div className='flex items-center justify-between text-sm text-gray-500 mb-4'>
              <div className='flex items-center space-x-1'>
                <Users size={14} />
                <span>{challenge.participants} participants</span>
              </div>
              <div className='flex items-center space-x-1'>
                <Calendar size={14} />
                <span>{challenge.duration} days</span>
              </div>
            </div>

            {challenge.joined && (
              <>
                <div className='mb-4'>
                  <div className='flex justify-between text-sm text-gray-600 mb-1'>
                    <span>Progress</span>
                    <span>
                      {challenge.progress}/{challenge.duration}
                    </span>
                  </div>
                  <div className='w-full bg-gray-200 rounded-full h-2'>
                    <div
                      className='bg-blue-500 h-2 rounded-full transition-all duration-300'
                      style={{
                        width: `${
                          (challenge.progress / challenge.duration) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                {!challenge.completed && (
                  <div className='flex space-x-2'>
                    <button
                      onClick={() => updateProgress(challenge.id, 1)}
                      className='btn btn-sm btn-primary flex-1'
                    >
                      +1 Day
                    </button>
                    <button
                      onClick={() => updateProgress(challenge.id, -1)}
                      className='btn btn-sm btn-ghost'
                      disabled={challenge.progress <= 0}
                    >
                      Undo
                    </button>
                  </div>
                )}
              </>
            )}

            {challenge.completed && (
              <div className='bg-green-50 border border-green-200 rounded-lg p-3 text-center'>
                <Trophy className='text-green-600 mx-auto mb-2' size={24} />
                <p className='text-green-800 font-medium'>
                  Challenge Completed!
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className='mt-8 bg-white p-6 rounded-lg shadow-md'>
        <h3 className='text-lg font-semibold mb-4'>Goal Setting Guidelines</h3>
        <div className='prose'>
          <p>Effective goal setting follows the SMART framework:</p>
          <ul className='list-disc list-inside space-y-1'>
            <li>
              <strong>Specific</strong> - Clearly define what you want to
              achieve
            </li>
            <li>
              <strong>Measurable</strong> - Ensure you can track progress
            </li>
            <li>
              <strong>Achievable</strong> - Set realistic goals
            </li>
            <li>
              <strong>Relevant</strong> - Align goals with your values
            </li>
            <li>
              <strong>Time-bound</strong> - Set a deadline for completion
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Challenges;
