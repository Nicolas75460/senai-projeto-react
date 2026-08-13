import React, { useState } from 'react';
import { 
  GraduationCap, 
  Calculator, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Award, 
  Percent 
} from 'lucide-react';

export default function GradeCalculator() {
  const [prova1, setProva1] = useState(8.5);
  const [prova2, setProva2] = useState(9.0);
  const [projeto, setProjeto] = useState(9.5);
  const [aulasTotais, setAulasTotais] = useState(80);
  const [presencas, setPresencas] = useState(72);

  // Pesos SENAI: Prova 1 (30%), Prova 2 (30%), Projeto (40%)
  const mediaFinal = Number(((prova1 * 0.3) + (prova2 * 0.3) + (projeto * 0.4)).toFixed(1));
  const frequenciaPercent = Number(((presencas / (aulasTotais || 1)) * 100).toFixed(1));

  let status = { text: 'Aprovado', color: 'green', icon: CheckCircle, desc: 'Parabéns! Desempenho excelente no semestre.' };

  if (frequenciaPercent < 75) {
    status = { text: 'Reprovado por Frequência', color: 'red', icon: XCircle, desc: 'Frequência mínima exigida no SENAI é de 75%.' };
  } else if (mediaFinal < 6.0) {
    status = { text: 'Recuperação', color: 'amber', icon: AlertTriangle, desc: 'Média abaixo de 6.0. Necessário realizar prova substitutiva.' };
  } else if (mediaFinal >= 9.0) {
    status = { text: 'Aprovado com Excelência', color: 'blue', icon: Award, desc: 'Destaque acadêmico no curso de Front-End SENAI!' };
  }

  const StatusIcon = status.icon;

  return (
    <div className="calculator-container animate-fade-in">
      <div className="page-header">
        <div>
          <div className="badge badge-green">
            <GraduationCap size={14} /> Módulo 03 • Lógica & Regras de Negócio
          </div>
          <h2>Calculadora de Notas & Frequência SENAI</h2>
          <p>Simulador de avaliação acadêmica com cálculo de média ponderada e validação de presença.</p>
        </div>
      </div>

      <div className="calculator-grid">
        {/* Entradas de Dados */}
        <div className="glass-card calc-card">
          <h3><Calculator size={18} color="var(--accent-green)" /> Inserir Notas do Semestre</h3>

          <div className="input-group">
            <label>Nota Prova 1 (Peso 30%):</label>
            <input 
              type="number" 
              step="0.1" 
              min="0" 
              max="10" 
              className="input-field" 
              value={prova1}
              onChange={(e) => setProva1(Math.min(10, Math.max(0, parseFloat(e.target.value) || 0)))}
            />
          </div>

          <div className="input-group">
            <label>Nota Prova 2 (Peso 30%):</label>
            <input 
              type="number" 
              step="0.1" 
              min="0" 
              max="10" 
              className="input-field" 
              value={prova2}
              onChange={(e) => setProva2(Math.min(10, Math.max(0, parseFloat(e.target.value) || 0)))}
            />
          </div>

          <div className="input-group">
            <label>Nota Projeto React (Peso 40%):</label>
            <input 
              type="number" 
              step="0.1" 
              min="0" 
              max="10" 
              className="input-field" 
              value={projeto}
              onChange={(e) => setProjeto(Math.min(10, Math.max(0, parseFloat(e.target.value) || 0)))}
            />
          </div>

          <hr className="divider" />

          <h3><Percent size={18} color="var(--accent-cyan)" /> Controlar Frequência de Aulas</h3>

          <div className="input-row">
            <div className="input-group">
              <label>Total de Aulas:</label>
              <input 
                type="number" 
                className="input-field" 
                value={aulasTotais}
                onChange={(e) => setAulasTotais(Math.max(1, parseInt(e.target.value) || 1))}
              />
            </div>

            <div className="input-group">
              <label>Aulas Frequentadas:</label>
              <input 
                type="number" 
                className="input-field" 
                value={presencas}
                onChange={(e) => setPresencas(Math.min(aulasTotais, Math.max(0, parseInt(e.target.value) || 0)))}
              />
            </div>
          </div>
        </div>

        {/* Resultado e Parecer */}
        <div className="glass-card result-card">
          <h3>Resultado da Avaliação</h3>

          <div className="metrics-row">
            <div className="metric-box">
              <span className="metric-title">Média Final</span>
              <span className={`metric-value score-${mediaFinal >= 6 ? 'high' : 'low'}`}>
                {mediaFinal.toFixed(1)}
              </span>
            </div>

            <div className="metric-box">
              <span className="metric-title">% Frequência</span>
              <span className={`metric-value freq-${frequenciaPercent >= 75 ? 'high' : 'low'}`}>
                {frequenciaPercent}%
              </span>
            </div>
          </div>

          {/* Status Box */}
          <div className={`status-alert-box alert-${status.color}`}>
            <div className="alert-icon">
              <StatusIcon size={28} />
            </div>
            <div className="alert-content">
              <h4>{status.text}</h4>
              <p>{status.desc}</p>
            </div>
          </div>

          <div className="formula-breakdown">
            <h4>Detalhamento do Cálculo:</h4>
            <ul>
              <li>Média = ({prova1} × 0.3) + ({prova2} × 0.3) + ({projeto} × 0.4)</li>
              <li>Presença = ({presencas} ÷ {aulasTotais}) × 100%</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
