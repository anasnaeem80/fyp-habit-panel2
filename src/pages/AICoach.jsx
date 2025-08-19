import React, { useState } from "react";
import { useHabits } from "../hooks/useHabits";
import {
  Bot,
  Sparkles,
  Lightbulb,
  TrendingUp,
  Clock,
  Target,
} from "lucide-react";

const AICoach = () => {
  const { habits } = useHabits();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! I'm your AI Habit Coach. I'm here to help you build better habits and achieve your goals. What would you like help with today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Analyze habits to generate insights
  const analyzeHabits = () => {
    const completedHabits = habits.filter(
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

    const bestHabit = habits.reduce(
      (best, habit) =>
        habit.currentStreak > best.currentStreak ? habit : best,
      { currentStreak: 0 }
    );

    const strugglingHabit = habits.reduce((worst, habit) => {
      const completionRate =
        habit.completion.filter(Boolean).length / habit.completion.length;
      const worstRate =
        worst.completion.filter(Boolean).length / worst.completion.length;
      return completionRate < worstRate ? habit : worst;
    }, habits[0] || { completion: [false] });

    return {
      completedToday: completedHabits,
      totalCompletion: Math.round(totalCompletion),
      bestHabit: bestHabit.name || "No habits yet",
      bestStreak: bestHabit.currentStreak,
      strugglingHabit: strugglingHabit.name || "No habits yet",
      strugglingRate: Math.round(
        (strugglingHabit.completion.filter(Boolean).length /
          strugglingHabit.completion.length) *
          100
      ),
    };
  };

  const insights = analyzeHabits();

  const aiResponses = [
    "Based on your progress, I suggest focusing on one habit at a time to build consistency.",
    "Great job on your streaks! Remember that consistency is more important than perfection.",
    "I notice you're struggling with some habits. Would you like me to help you break them down into smaller steps?",
    "Your current completion rate is good, but there's room for improvement. Let's set some specific targets!",
    "Based on successful habit formation research, I recommend implementing implementation intentions (if-then planning).",
  ];

  const sendMessage = (e) => {
    e.preventDefault();
    if (inputText.trim() === "") return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const randomResponse =
        aiResponses[Math.floor(Math.random() * aiResponses.length)];
      const aiMessage = {
        id: messages.length + 2,
        text: randomResponse,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const quickActions = [
    {
      title: "Help me stay motivated",
      prompt: "I'm losing motivation with my habits, what should I do?",
    },
    {
      title: "Create a new habit plan",
      prompt: "Help me create a plan for building a new habit",
    },
    {
      title: "Analyze my progress",
      prompt: "How am I doing with my current habits?",
    },
    {
      title: "Suggest improvements",
      prompt: "What can I do to improve my habit consistency?",
    },
  ];

  const handleQuickAction = (prompt) => {
    setInputText(prompt);
  };

  return (
    <div className='p-6'>
      <div className='flex items-center space-x-3 mb-6'>
        <div className='w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center'>
          <Bot size={24} className='text-white' />
        </div>
        <div>
          <h2 className='text-2xl font-semibold'>AI Habit Coach</h2>
          <p className='text-gray-600'>
            Get personalized guidance for your habit journey
          </p>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6'>
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <div className='flex items-center space-x-3 mb-4'>
            <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>
              <TrendingUp size={20} className='text-blue-600' />
            </div>
            <h3 className='text-lg font-semibold'>Today's Progress</h3>
          </div>
          <p className='text-2xl font-bold text-blue-600'>
            {insights.completedToday}/{habits.length} habits
          </p>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-md'>
          <div className='flex items-center space-x-3 mb-4'>
            <div className='w-10 h-10 bg-green-100 rounded-full flex items-center justify-center'>
              <Target size={20} className='text-green-600' />
            </div>
            <h3 className='text-lg font-semibold'>Best Performer</h3>
          </div>
          <p className='text-lg font-semibold text-green-600'>
            {insights.bestHabit}
          </p>
          <p className='text-sm text-gray-600'>
            {insights.bestStreak} day streak
          </p>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-md'>
          <div className='flex items-center space-x-3 mb-4'>
            <div className='w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center'>
              <Lightbulb size={20} className='text-orange-600' />
            </div>
            <h3 className='text-lg font-semibold'>Needs Attention</h3>
          </div>
          <p className='text-lg font-semibold text-orange-600'>
            {insights.strugglingHabit}
          </p>
          <p className='text-sm text-gray-600'>
            {insights.strugglingRate}% completion
          </p>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6'>
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={() => handleQuickAction(action.prompt)}
            className='bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-left'
          >
            <Sparkles size={16} className='text-purple-500 mb-2' />
            <p className='text-sm font-medium'>{action.title}</p>
          </button>
        ))}
      </div>

      <div className='bg-white rounded-lg shadow-md p-6'>
        <h3 className='text-lg font-semibold mb-4'>Chat with Coach</h3>

        <div className='h-96 overflow-y-auto mb-4 space-y-4'>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md p-4 rounded-lg ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <p>{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === "user"
                      ? "text-blue-100"
                      : "text-gray-500"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className='flex justify-start'>
              <div className='bg-gray-100 p-4 rounded-lg'>
                <div className='flex space-x-1'>
                  <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'></div>
                  <div
                    className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={sendMessage} className='flex space-x-2'>
          <input
            type='text'
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder='Ask something about your habits...'
            className='flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <button type='submit' className='btn btn-primary' disabled={isTyping}>
            Send
          </button>
        </form>
      </div>

      <div className='mt-6 bg-white p-6 rounded-lg shadow-md'>
        <h3 className='text-lg font-semibold mb-4'>Weekly Habit Tips</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='p-4 bg-blue-50 rounded-lg'>
            <div className='flex items-center space-x-2 mb-2'>
              <Clock size={16} className='text-blue-600' />
              <h4 className='font-medium'>Habit Stacking</h4>
            </div>
            <p className='text-sm text-gray-700'>
              Pair new habits with existing ones. After [current habit], I will
              [new habit].
            </p>
          </div>

          <div className='p-4 bg-green-50 rounded-lg'>
            <div className='flex items-center space-x-2 mb-2'>
              <Target size={16} className='text-green-600' />
              <h4 className='font-medium'>2-Minute Rule</h4>
            </div>
            <p className='text-sm text-gray-700'>
              Start with just 2 minutes of your habit to overcome
              procrastination.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICoach;
