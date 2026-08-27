import React, { useEffect, useState } from 'react';
import { 
  Rocket, 
  Code, 
  CheckCircle2, 
  Clock, 
  Award, 
  ArrowRight, 
  Zap, 
  Layers, 
  Cpu, 
  Terminal,
  Target,
  Plus,
  Minus
} from 'lucide-react';

export default function HeroStats({ setActiveTab }) {
  const [studyGoal, setStudyGoal] = useState(() => Number(localStorage.getItem('senai_study_goal')) || 4);
  const [completedHours, setCompletedHours] = useState(() => Number(localStorage.getItem('senai_completed_hours')) || 0);

  useEffect(() => {
    localStorage.setItem('senai_study_goal', studyGoal);
    localStorage.setItem('senai_completed_hours', completedHours);
  }, [studyGoal, completedHours]);

  const progress = Math.min(100, Math.round((completedHours / studyGoal) * 100));

  const updateCompletedHours = (amount) => {
    setCompletedHours((currentHours) => Math.max(0, Math.min(studyGoal, currentHours + amount)));
  };

  const updateStudyGoal = (event) => {
    const nextGoal = Math.max(1, Math.min(12, Number(event.target.value) || 1));
    setStudyGoal(nextGoal);
    setCompletedHours((currentHours) => Math.min(currentHours, nextGoal));
  };

  const stats = [
    { title: 'Projetos no Hub', value: '6 Módulos', icon: Layers, color: 'blue', desc: 'Demos interativas ativas' },
    { title: 'Horas de Código', value: '45h+', icon: Clock, color: 'cyan', desc: 'Prática React & JS' },
    { title: 'Desafios Concluídos', value: '12 / 12', icon: CheckCircle2, color: 'green', desc: '100% dos exercícios' },
    { title: 'Desempenho SENAI', value: '9.8 / 10', icon: Award, color: 'amber', desc: 'Excelente rendimento' },
  ];

  const quickLinks = [
    { 
      id: 'tasks', 
      title: 'Gerenciador Kanban', 
      desc: 'Organize tarefas com prioridades, status e persistência no localStorage.',
      badge: 'Estado & Lista',
      icon: CheckCircle2,
      color: 'gradient-blue'
    },
    { 
      id: 'simulator', 
      title: 'Simulador de State', 
      desc: 'Visualize como o useState atualiza o renderizador e o histórico de estados.',
      badge: 'useState Hook',
      icon: Cpu,
      color: 'gradient-purple'
    },
    { 
      id: 'calculator', 
      title: 'Calculadora SENAI', 
      desc: 'Calcule média ponderada de provas, trabalhos e % de frequência das aulas.',
      badge: 'Lógica & Validação',
      icon: Terminal,
      color: 'gradient-green'
    },
    { 
      id: 'feed', 
      title: 'Feed Async de APIs', 
      desc: 'Simulação de chamadas HTTP com useEffect, loading skeletons e filtros.',
      badge: 'useEffect & Async',
      icon: Zap,
      color: 'gradient-amber'
    }
  ];

  return (
    <div className="dashboard-hero animate-fade-in">
      {/* Banner Principal */}
      <div className="hero-banner glass-card">
        <div className="banner-content">
          <div className="badge badge-cyan hero-badge">
            <Rocket size={14} /> SENAI Front-End • 2º Semestre
          </div>
          <h1>Bem-vindo ao <span className="text-gradient">SENAI DevHub React</span></h1>
          <p>
            Plataforma interativa desenvolvida em <strong>React 19</strong> para demonstrar
            conceitos fundamentais e avançados de desenvolvimento Front-End: manipulação de estado, 
            ciclo de vida com Hooks, arquitetura de componentes e consumo de APIs.
          </p>
          <div className="banner-actions">
            <button className="btn btn-primary" onClick={() => setActiveTab('tasks')}>
              Explorar Kanban <ArrowRight size={18} />
            </button>
            <button className="btn btn-secondary" onClick={() => setActiveTab('quiz')}>
              Testar Conhecimentos <Code size={18} />
            </button>
          </div>
        </div>

        <div className="banner-illustration">
          <div className="floating-card c1">
            <code>const [state, setState] = useState()</code>
          </div>
          <div className="floating-card c2">
            <Zap size={20} color="#3b82f6" /> <span>React 19 Ready</span>
          </div>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="stats-grid">
        {stats.map((st, idx) => {
          const Icon = st.icon;
          return (
            <div key={idx} className={`stat-card glass-card border-${st.color}`}>
              <div className="stat-header">
                <div className={`stat-icon icon-${st.color}`}>
                  <Icon size={22} />
                </div>
                <span className="stat-value">{st.value}</span>
              </div>
              <div className="stat-body">
                <h3>{st.title}</h3>
                <p>{st.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="study-goal-card glass-card">
        <div className="study-goal-heading">
          <div className="stat-icon icon-cyan">
            <Target size={22} />
          </div>
          <div>
            <h3>Meta diária de estudo</h3>
            <p>Registre seu progresso e mantenha o ritmo.</p>
          </div>
          <label className="goal-input-label">
            <span>Meta</span>
            <input type="number" min="1" max="12" value={studyGoal} onChange={updateStudyGoal} aria-label="Meta diária em horas" />
            <span>h</span>
          </label>
        </div>
        <div className="study-goal-progress">
          <div className="progress-info">
            <span>{completedHours}h concluídas de {studyGoal}h</span>
            <strong>{progress}%</strong>
          </div>
          <div className="progress-bar-bg" aria-label={`${progress}% da meta concluída`}>
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className="study-goal-actions">
          <button className="btn btn-secondary btn-sm" onClick={() => updateCompletedHours(-1)} disabled={completedHours === 0}>
            <Minus size={16} /> Remover 1h
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => updateCompletedHours(1)} disabled={completedHours === studyGoal}>
            <Plus size={16} /> Registrar 1h
          </button>
        </div>
      </div>

      {/* Seção de Módulos Rápidos */}
      <div className="section-title">
        <h2>Módulos & Experimentos Interativos</h2>
        <p>Selecione uma demonstração abaixo para interagir em tempo real</p>
      </div>

      <div className="modules-grid">
        {quickLinks.map((mod) => {
          const Icon = mod.icon;
          return (
            <div key={mod.id} className="module-card glass-card" onClick={() => setActiveTab(mod.id)}>
              <div className="module-top">
                <span className="badge badge-blue">{mod.badge}</span>
                <div className="module-icon-bg">
                  <Icon size={24} />
                </div>
              </div>
              <h3>{mod.title}</h3>
              <p>{mod.desc}</p>
              <div className="module-footer">
                <span className="link-text">Abrir Módulo</span>
                <ArrowRight size={16} className="arrow" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
