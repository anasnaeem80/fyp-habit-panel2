import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Layout/Sidebar";
import Header from "./components/Layout/Header";
import HabitDashboard from "./pages/HabitDashboard";
import HabitSetup from "./pages/HabitSetup";
import StreakTracker from "./pages/StreakTracker";
import Analytics from "./pages/Analytics";
import ReflectionJournal from "./pages/ReflectionJournal";
import Challenges from "./pages/Challenges";
import AICoach from "./pages/AICoach";
import { HabitsProvider } from "./context/HabitsContext";
import { DarkModeProvider } from "./context/DarkModeContext";

function App() {
  return (
    <DarkModeProvider>
      <HabitsProvider>
        <Router>
          <div className='flex'>
            <Sidebar />
            <div className='ml-64 flex-1 min-h-screen bg-gray-50 dark:bg-gray-900'>
              <Header />
              <main>
                <Routes>
                  <Route path='/dashboard' element={<HabitDashboard />} />
                  <Route path='/setup' element={<HabitSetup />} />
                  <Route path='/streak' element={<StreakTracker />} />
                  <Route path='/analytics' element={<Analytics />} />
                  <Route path='/journal' element={<ReflectionJournal />} />
                  <Route path='/challenges' element={<Challenges />} />
                  <Route path='/ai-coach' element={<AICoach />} />
                  <Route path='/' element={<HabitDashboard />} />
                </Routes>
              </main>
            </div>
          </div>
        </Router>
      </HabitsProvider>
    </DarkModeProvider>
  );
}

export default App;
