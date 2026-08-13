import React from 'react';
import { 
  Code2, 
  LayoutDashboard, 
  CheckSquare, 
  Sliders, 
  GraduationCap, 
  Globe, 
  BookOpen, 
  HelpCircle, 
  Sun, 
  Moon, 
  Sparkles 
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, theme, toggleTheme }) {
  const navItems = [
    { id: 'dashboard', label: 'Painel Geral', icon: LayoutDashboard },
    { id: 'tasks', label: 'Kanban Tasks', icon: CheckSquare },
    { id: 'simulator', label: 'Simulador State', icon: Sliders },
    { id: 'calculator', label: 'Calculadora SENAI', icon: GraduationCap },
    { id: 'feed', label: 'Feed API', icon: Globe },
    { id: 'cheatsheet', label: 'Hooks React', icon: BookOpen },
    { id: 'quiz', label: 'Desafio Quiz', icon: HelpCircle },
  ];

  return (
    <header className="sticky-nav">
      <div className="nav-container">
        <div className="brand-logo" onClick={() => setActiveTab('dashboard')} style={{ cursor: 'pointer' }}>
          <div className="logo-icon-wrapper">
            <Code2 size={24} color="#ffffff" />
          </div>
          <div className="logo-text">
            <span className="brand-title">SENAI <span className="highlight">DevHub</span></span>
            <span className="brand-subtitle">FrontEnd • 2º Semestre</span>
          </div>
        </div>

        <nav className="nav-menu">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="nav-actions">
          <button 
            className="theme-toggle-btn" 
            onClick={toggleTheme}
            title={`Mudar para modo ${theme === 'dark' ? 'Claro' : 'Escuro'}`}
          >
            {theme === 'dark' ? <Sun size={20} className="icon-sun" /> : <Moon size={20} className="icon-moon" />}
          </button>

          <div className="user-profile-badge">
            <div className="avatar">N</div>
            <div className="user-info">
              <span className="user-name">Nicolas</span>
              <span className="user-status"><Sparkles size={10} /> Aluno SENAI</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
