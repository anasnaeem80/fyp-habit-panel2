export const habits = [
  {
    id: 1,
    name: "Morning Meditation",
    description: "10 minutes of mindfulness meditation",
    frequency: "daily",
    goal: 7,
    currentStreak: 5,
    longestStreak: 12,
    completion: [true, true, true, true, true, false, false],
    category: "Wellness",
    color: "bg-blue-500",
    createdAt: new Date(2023, 9, 1),
  },
  {
    id: 2,
    name: "Exercise",
    description: "30 minutes of physical activity",
    frequency: "5 times a week",
    goal: 5,
    currentStreak: 3,
    longestStreak: 10,
    completion: [true, true, true, false, false, false, false],
    category: "Fitness",
    color: "bg-green-500",
    createdAt: new Date(2023, 9, 5),
  },
  {
    id: 3,
    name: "Reading",
    description: "Read 20 pages daily",
    frequency: "daily",
    goal: 7,
    currentStreak: 7,
    longestStreak: 15,
    completion: [true, true, true, true, true, true, true],
    category: "Learning",
    color: "bg-purple-500",
    createdAt: new Date(2023, 9, 10),
  },
];

export const journalEntries = [
  {
    id: 1,
    date: new Date(2023, 9, 15),
    content:
      "Felt really good about my meditation today. Focus was better than usual.",
    mood: "happy",
  },
  {
    id: 2,
    date: new Date(2023, 9, 14),
    content:
      "Missed my exercise routine due to a busy schedule. Need to plan better tomorrow.",
    mood: "sad",
  },
];

export const challenges = [
  {
    id: 1,
    title: "7-Day Meditation Challenge",
    description: "Meditate every day for 7 days straight",
    duration: 7,
    participants: 145,
    progress: 5,
    completed: false,
  },
  {
    id: 2,
    title: "30-Day Fitness Challenge",
    description: "Complete 20 workouts in 30 days",
    duration: 30,
    participants: 289,
    progress: 12,
    completed: false,
  },
];
