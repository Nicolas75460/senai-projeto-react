import React, { useState } from 'react';
import { 
  Sliders, 
  RotateCcw, 
  Plus, 
  Minus, 
  History, 
  Code, 
  Sparkles, 
  Layers 
} from 'lucide-react';

export default function StateSimulator() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const [history, setHistory] = useState([
    { id: 1, action: 'Inicialização', prev: 0, current: 0, timestamp: new Date().toLocaleTimeString() }
  ]);

  // Exemplo de estado de objeto do usuário
  const [userProfile, setUserProfile] = useState({
    nome: 'Nicolas',
    curso: 'Front-End SENAI',
    modulo: 'React 19 Hooks',
    semestre: '2º Semestre'
  });

  const handleIncrement = () => {
    const nextValue = count + step;
    addHistory(`Incrementou +${step}`, count, nextValue);
    setCount(nextValue);
  };

  const handleDecrement = () => {
    const nextValue = count - step;
    addHistory(`Decrementou -${step}`, count, nextValue);
    setCount(nextValue);
  };

  const handleReset = () => {
    addHistory('Reset de Estado', count, 0);
    setCount(0);
  };

  const addHistory = (action, prev, current) => {
    const newEntry = {
      id: Date.now(),
      action,
      prev,
      current,
      timestamp: new Date().toLocaleTimeString()
    };
    setHistory(prevHist => [newEntry, ...prevHist.slice(0, 7)]);
  };

  const updateProfileModule = (newModule) => {
    setUserProfile(prev => ({
      ...prev,
      modulo: newModule
    }));
  };

  return (
    <div className="simulator-container animate-fade-in">
      <div className="page-header">
        <div>
          <div className="badge badge-purple">
            <Sliders size={14} /> Módulo 02 • useState Hook Simulator
          </div>
          <h2>Simulador de Estado & Renderização</h2>
          <p>Entenda visualmente a reatividade do React e a atualização do DOM virtual.</p>
        </div>
      </div>

      <div className="simulator-grid">
        {/* Card 1: Contador Reativo */}
        <div className="glass-card sim-card">
          <div className="sim-card-header">
            <h3><Layers size={18} color="var(--accent-blue)" /> Estado Primitivo (Contador)</h3>
            <span className="badge badge-blue">useState(0)</span>
          </div>

          <div className="counter-display">
            <span className="counter-label">Valor Atual do Estado</span>
            <span className="counter-number">{count}</span>
          </div>

          <div className="step-controls">
            <label>Tamanho do Passo (Step):</label>
            <div className="step-buttons">
              {[1, 5, 10, 50].map(s => (
                <button 
                  key={s} 
                  onClick={() => setStep(s)}
                  className={`btn btn-sm ${step === s ? 'btn-primary' : 'btn-secondary'}`}
                >
                  +{s}
                </button>
              ))}
            </div>
          </div>

          <div className="action-buttons">
            <button className="btn btn-secondary" onClick={handleDecrement}>
              <Minus size={18} /> Diminuir
            </button>
            <button className="btn btn-primary" onClick={handleIncrement}>
              <Plus size={18} /> Aumentar
            </button>
            <button className="btn btn-danger" onClick={handleReset} title="Resetar Contador">
              <RotateCcw size={18} />
            </button>
          </div>
        </div>

        {/* Card 2: Estado de Objeto Composto */}
        <div className="glass-card sim-card">
          <div className="sim-card-header">
            <h3><Code size={18} color="var(--accent-purple)" /> Estado Imutável de Objeto</h3>
            <span className="badge badge-purple">useState(&#123;...&#125;)</span>
          </div>

          <div className="json-preview">
            <pre>
              {JSON.stringify(userProfile, null, 2)}
            </pre>
          </div>

          <div className="profile-actions">
            <label>Alterar Módulo em Foco:</label>
            <div className="module-selector-buttons">
              {['React 19 Hooks', 'Context API & Redux', 'Styled Components', 'Next.js App Router'].map(m => (
                <button 
                  key={m}
                  onClick={() => updateProfileModule(m)}
                  className={`btn btn-sm ${userProfile.modulo === m ? 'btn-accent' : 'btn-secondary'}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Card 3: Histórico de Re-renderização */}
        <div className="glass-card sim-card history-card" style={{ gridColumn: '1 / -1' }}>
          <div className="sim-card-header">
            <h3><History size={18} color="var(--accent-cyan)" /> Log de Re-renderizações em Tempo Real</h3>
            <span className="badge badge-cyan"><Sparkles size={12} /> {history.length} Eventos</span>
          </div>

          <div className="history-table-wrapper">
            <table className="history-table">
              <thead>
                <tr>
                  <th>Horário</th>
                  <th>Ação Disparada</th>
                  <th>Valor Anterior</th>
                  <th>Novo Valor State</th>
                  <th>Status Re-render</th>
                </tr>
              </thead>
              <tbody>
                {history.map(item => (
                  <tr key={item.id}>
                    <td>{item.timestamp}</td>
                    <td><strong>{item.action}</strong></td>
                    <td className="text-muted">{item.prev}</td>
                    <td className="text-highlight">{item.current}</td>
                    <td><span className="badge badge-green">DOM Atualizado</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
