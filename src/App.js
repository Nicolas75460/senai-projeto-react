import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroStats from './components/HeroStats';
import TaskBoard from './components/TaskBoard';
import StateSimulator from './components/StateSimulator';
import GradeCalculator from './components/GradeCalculator';
import TechFeed from './components/TechFeed';
import ReactCheatsheet from './components/ReactCheatsheet';
import Quiz from './components/Quiz';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('senai_theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('senai_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="app-layout">
      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        theme={theme} 
        toggleTheme={toggleTheme} 
      />

      {/* Main Content Area */}
      <main className="main-content">
        <div className="container">
          {activeTab === 'dashboard' && <HeroStats setActiveTab={setActiveTab} />}
          {activeTab === 'tasks' && <TaskBoard />}
          {activeTab === 'simulator' && <StateSimulator />}
          {activeTab === 'calculator' && <GradeCalculator />}
          {activeTab === 'feed' && <TechFeed />}
          {activeTab === 'cheatsheet' && <ReactCheatsheet />}
          {activeTab === 'quiz' && <Quiz />}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
