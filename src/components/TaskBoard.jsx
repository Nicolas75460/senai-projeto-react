import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  CheckCircle2, 
  Trash2, 
  Filter, 
  Clock, 
  AlertCircle, 
  Sparkles, 
  ListTodo 
} from 'lucide-react';

const INITIAL_TASKS = [
  {
    id: '1',
    title: 'Criar componentes reutilizáveis em React',
    category: 'Projetos SENAI',
    priority: 'alta',
    status: 'completed',
    createdAt: '2026-08-10'
  },
  {
    id: '2',
    title: 'Estudar Hooks (useState e useEffect)',
    category: 'Estudos',
    priority: 'alta',
    status: 'in_progress',
    createdAt: '2026-08-11'
  },
  {
    id: '3',
    title: 'Estilizar interface com CSS Flexbox e Grid',
    category: 'Aulas SENAI',
    priority: 'media',
    status: 'in_progress',
    createdAt: '2026-08-12'
  },
  {
    id: '4',
    title: 'Implementar consumo de API com async/await',
    category: 'Projetos SENAI',
    priority: 'baixa',
    status: 'todo',
    createdAt: '2026-08-12'
  }
];

export default function TaskBoard() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('senai_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Aulas SENAI');
  const [priority, setPriority] = useState('media');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    localStorage.setItem('senai_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      category,
      priority,
      status: 'todo',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setTasks([newTask, ...tasks]);
    setTitle('');
  };

  const handleToggleStatus = (id) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === 'todo' ? 'in_progress' : t.status === 'in_progress' ? 'completed' : 'todo';
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(t => {
    const matchCat = filterCategory === 'all' || t.category === filterCategory;
    const matchStat = filterStatus === 'all' || t.status === filterStatus;
    return matchCat && matchStat;
  });

  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="task-board-container animate-fade-in">
      <div className="page-header">
        <div>
          <div className="badge badge-blue">
            <ListTodo size={14} /> Módulo 01 • Gerenciamento de Estado
          </div>
          <h2>Quadro de Tarefas & Kanban SENAI</h2>
          <p>Aplicação interativa utilizando listas imutáveis, filtros e localStorage em React.</p>
        </div>

        {/* Progress Bar */}
        <div className="progress-card glass-card">
          <div className="progress-info">
            <span>Progresso Geral</span>
            <strong>{completedCount} de {tasks.length} concluídas ({progressPercent}%)</strong>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>
      </div>

      <div className="task-layout">
        {/* Formulário de Criação */}
        <form onSubmit={handleAddTask} className="task-form glass-card">
          <h3><Plus size={18} /> Nova Tarefa</h3>
          <div className="form-group">
            <label>Descrição da Tarefa</label>
            <input 
              type="text" 
              className="input-field"
              placeholder="Ex: Refatorar estado com useEffect..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Categoria</label>
              <select 
                className="input-field"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Aulas SENAI">Aulas SENAI</option>
                <option value="Projetos SENAI">Projetos SENAI</option>
                <option value="Estudos">Estudos</option>
              </select>
            </div>

            <div className="form-group">
              <label>Prioridade</label>
              <select 
                className="input-field"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
            Adicionar Tarefa <Sparkles size={16} />
          </button>
        </form>

        {/* Lista e Filtros */}
        <div className="task-list-section">
          {/* Filtros */}
          <div className="filter-bar glass-card">
            <div className="filter-item">
              <Filter size={16} color="var(--text-muted)" />
              <span>Filtrar Categoria:</span>
              <select 
                className="input-field select-sm"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="all">Todas as Categorias</option>
                <option value="Aulas SENAI">Aulas SENAI</option>
                <option value="Projetos SENAI">Projetos SENAI</option>
                <option value="Estudos">Estudos</option>
              </select>
            </div>

            <div className="filter-item">
              <span>Status:</span>
              <select 
                className="input-field select-sm"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">Todos os Status</option>
                <option value="todo">Pendente</option>
                <option value="in_progress">Em Andamento</option>
                <option value="completed">Concluída</option>
              </select>
            </div>
          </div>

          {/* Cards de Tarefas */}
          <div className="tasks-grid">
            {filteredTasks.length === 0 ? (
              <div className="empty-state glass-card">
                <AlertCircle size={40} color="var(--text-muted)" />
                <p>Nenhuma tarefa encontrada para este filtro.</p>
              </div>
            ) : (
              filteredTasks.map((t) => {
                const priorityBadge = 
                  t.priority === 'alta' ? 'badge-red' : 
                  t.priority === 'media' ? 'badge-amber' : 'badge-cyan';
                
                const statusLabel = 
                  t.status === 'completed' ? 'Concluída' : 
                  t.status === 'in_progress' ? 'Em Andamento' : 'Pendente';

                const statusColor = 
                  t.status === 'completed' ? 'status-done' : 
                  t.status === 'in_progress' ? 'status-doing' : 'status-todo';

                return (
                  <div key={t.id} className={`task-card glass-card ${t.status === 'completed' ? 'completed-card' : ''}`}>
                    <div className="task-card-header">
                      <span className={`badge ${priorityBadge}`}>Prioridade {t.priority}</span>
                      <span className="task-category">{t.category}</span>
                    </div>

                    <h4 className="task-title">{t.title}</h4>

                    <div className="task-card-footer">
                      <button 
                        onClick={() => handleToggleStatus(t.id)}
                        className={`status-toggle-btn ${statusColor}`}
                        title="Clique para alternar o status"
                      >
                        <CheckCircle2 size={16} /> {statusLabel}
                      </button>

                      <div className="task-actions">
                        <span className="task-date"><Clock size={12} /> {t.createdAt}</span>
                        <button 
                          onClick={() => handleDeleteTask(t.id)}
                          className="delete-btn"
                          title="Excluir Tarefa"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
